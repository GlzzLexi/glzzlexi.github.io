/**
 * GlzzLexiBear Community Voting API - Cloudflare Worker
 * 
 * Features:
 * - 100% Free hosting on Cloudflare Workers (100,000 reqs/day)
 * - Anti-duplication voting verification using hashed client IP (CF-Connecting-IP)
 * - Privacy-friendly SHA-256 IP hashing (never stores raw IP addresses)
 * - CORS headers enabled for GitHub Pages & custom domains
 * - Supports Cloudflare KV (or in-memory fallback for testing)
 */

// Allowed game keys
const VALID_GAMES = ['nine_to_five', 'study_picky', 'mark_mark', 'guys_watch'];

// Default starting baseline votes
const DEFAULT_VOTES = {
  nine_to_five: 184,
  study_picky: 162,
  mark_mark: 171,
  guys_watch: 198
};

// In-memory fallback if Cloudflare KV is not bound
let inMemoryVotes = { ...DEFAULT_VOTES };
let inMemoryVoters = new Set();

// CORS Headers helper
function corsHeaders(request) {
  const origin = request.headers.get('Origin') || '*';
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400'
  };
}

// SHA-256 Hashing for IP privacy
async function hashIP(ipString) {
  const msgUint8 = new TextEncoder().encode(ipString + '_glzz_salt_2026');
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export default {
  async fetch(request, env, ctx) {
    const cors = corsHeaders(request);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    // --- GET /api/votes : Retrieve current tallies ---
    if (request.method === 'GET' && (path === '/api/votes' || path === '/votes')) {
      let votes = { ...DEFAULT_VOTES };

      if (env.VOTES_KV) {
        const stored = await env.VOTES_KV.get('vote_tallies', { type: 'json' });
        if (stored) votes = stored;
      } else {
        votes = inMemoryVotes;
      }

      const total = Object.values(votes).reduce((a, b) => a + b, 0);

      return new Response(JSON.stringify({ success: true, votes, total }), {
        headers: { ...cors, 'Content-Type': 'application/json' }
      });
    }

    // --- POST /api/vote : Cast a vote with IP duplicate protection ---
    if (request.method === 'POST' && (path === '/api/vote' || path === '/vote')) {
      try {
        const clientIP = request.headers.get('CF-Connecting-IP') || 
                         request.headers.get('X-Forwarded-For') || 
                         '127.0.0.1';
        
        const ipHash = await hashIP(clientIP);

        const body = await request.json();
        const gameKey = body.game;

        if (!VALID_GAMES.includes(gameKey)) {
          return new Response(JSON.stringify({ 
            success: false, 
            error: 'Invalid game key. Choose from: ' + VALID_GAMES.join(', ') 
          }), { status: 400, headers: { ...cors, 'Content-Type': 'application/json' } });
        }

        // Check if IP has already voted
        if (env.VOTES_KV) {
          const alreadyVoted = await env.VOTES_KV.get(`voter:${ipHash}`);
          if (alreadyVoted) {
            return new Response(JSON.stringify({ 
              success: false, 
              alreadyVoted: true,
              error: 'Your network IP has already voted! Only one vote is allowed per player.' 
            }), { status: 403, headers: { ...cors, 'Content-Type': 'application/json' } });
          }

          // Fetch current tallies, increment, and save
          let votes = (await env.VOTES_KV.get('vote_tallies', { type: 'json' })) || { ...DEFAULT_VOTES };
          votes[gameKey] = (votes[gameKey] || 0) + 1;

          await env.VOTES_KV.put('vote_tallies', JSON.stringify(votes));
          await env.VOTES_KV.put(`voter:${ipHash}`, JSON.stringify({ game: gameKey, timestamp: Date.now() }));

          const total = Object.values(votes).reduce((a, b) => a + b, 0);
          return new Response(JSON.stringify({ success: true, votes, total, votedFor: gameKey }), {
            headers: { ...cors, 'Content-Type': 'application/json' }
          });
        } else {
          // Fallback in-memory check
          if (inMemoryVoters.has(ipHash)) {
            return new Response(JSON.stringify({ 
              success: false, 
              alreadyVoted: true,
              error: 'Your network IP has already voted! Only one vote is allowed per player.' 
            }), { status: 403, headers: { ...cors, 'Content-Type': 'application/json' } });
          }

          inMemoryVoters.add(ipHash);
          inMemoryVotes[gameKey] = (inMemoryVotes[gameKey] || 0) + 1;
          const total = Object.values(inMemoryVotes).reduce((a, b) => a + b, 0);

          return new Response(JSON.stringify({ success: true, votes: inMemoryVotes, total, votedFor: gameKey }), {
            headers: { ...cors, 'Content-Type': 'application/json' }
          });
        }
      } catch (err) {
        return new Response(JSON.stringify({ success: false, error: err.message }), {
          status: 500,
          headers: { ...cors, 'Content-Type': 'application/json' }
        });
      }
    }

    return new Response(JSON.stringify({ message: "GlzzLexiBear Voting API is Online" }), {
      headers: { ...cors, 'Content-Type': 'application/json' }
    });
  }
};
