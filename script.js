// GlzzLexiBear - Website Scripts
const API_URL = "https://glzz-voting-api.glzzjhn.workers.dev";

// Audio Synthesizer (Web Audio API)
let audioCtx = null;
let sfxEnabled = false;

function initAudio() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) audioCtx = new AudioContextClass();
  }
}

function playTone(freq = 520, duration = 0.05) {
  if (!sfxEnabled || !audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {}
}

// Prototypes Data
const PROTOTYPES = {
  nine_to_five: {
    title: "9-5 Get Me Out",
    type: "Workplace Stealth & Escape Thriller",
    desc: "You work a 9-5 job and you're good at it, but your boss is secretly undermining you and sabotaging your exit so you can never leave the company. You must sneak around after hours, avoid CCTV cameras, search through shredders for proof of his sabotage, and plan your escape.",
    controls: "WASD Movement, Left Shift Sprint, Left Ctrl Crouch, E Interact, Mouse Look",
    img: "assets/prototype_9_5.jpg"
  },
  study_picky: {
    title: "Study Picky",
    type: "ADHD Sensory & Memory Survival",
    desc: "You study at your desk for a final exam that starts in 2 hours. Your character deals with severe distractions, memory forgetfulness, and sensory overload. Swat away flying daydreams and paper planes with your ruler, retain flashcards before brain fog kicks in, and balance coffee intake to pass.",
    controls: "Mouse Free-Look, Spacebar Swat Distraction, Tab Notes, Left Click Highlight",
    img: "assets/prototype_study.jpg"
  },
  mark_mark: {
    title: "Mark Mark What The",
    type: "Dual Personality Action Puzzle",
    desc: "You play as Mark trying to solve high-stakes missions, but you have an unpredictable alter-ego that can take over at any moment. Your left hand tries to defuse a lock while your right hand suddenly punches a wall or throws your keycard. You have to adapt and find chaotic ways to cooperate.",
    controls: "WASD Walk, Left Click (Mark), Right Click (Alter-Ego Punch), Q Self-Talk",
    img: "assets/prototype_mark.jpg"
  },
  guys_watch: {
    title: "Guys Watch Me Now",
    type: "Interactive AI Streamer Simulation",
    desc: "You play as Clyde, a live streamer trying to make viral content. An interactive AI audience analyzes your gameplay and voice in real-time, spamming toxic roasts, sending donation alerts, and demanding you do unhinged dares around your dark apartment to keep the viewer count alive.",
    controls: "WASD Move around apartment, Mouse Look, Left Click Gaming PC, F Camera, T Chat",
    img: "assets/prototype_streamer.jpg"
  }
};

// Voting System (Cloudflare Worker)
const DEFAULT_VOTES = {
  nine_to_five: 184,
  study_picky: 162,
  mark_mark: 171,
  guys_watch: 198
};

async function loadVotes() {
  try {
    const res = await fetch(`${API_URL}/api/votes`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.votes) {
        updateVoteUI(data.votes);
        return;
      }
    }
  } catch (err) {
    console.warn("Could not reach Cloudflare API, using cached data.", err);
  }

  const cached = localStorage.getItem('glzz_votes');
  updateVoteUI(cached ? JSON.parse(cached) : DEFAULT_VOTES);
}

function updateVoteUI(votes) {
  const total = Object.values(votes).reduce((sum, v) => sum + v, 0);

  Object.keys(votes).forEach(key => {
    const count = votes[key] || 0;
    const pct = total > 0 ? Math.round((count / total) * 100) : 25;

    const bar = document.getElementById(`bar-${key}`);
    const stat = document.getElementById(`stat-${key}`);
    const cardTag = document.getElementById(`card-${key}`);

    if (bar) bar.style.width = `${pct}%`;
    if (stat) stat.textContent = `${count} (${pct}%)`;
    if (cardTag) cardTag.textContent = `${count} Votes (${pct}%)`;
  });

  const myVote = localStorage.getItem('glzz_user_vote');
  if (myVote) {
    document.querySelectorAll('.vote-btn').forEach(btn => {
      btn.classList.remove('voted');
      btn.textContent = "Vote";
    });

    const activeRowBtn = document.querySelector(`.vote-row[data-id="${myVote}"] .vote-btn`);
    if (activeRowBtn) {
      activeRowBtn.classList.add('voted');
      activeRowBtn.textContent = "Voted ✓";
    }
  }
}

async function submitVote(gameKey) {
  playTone(660);
  const game = PROTOTYPES[gameKey];
  const title = game ? game.title : gameKey;

  try {
    const res = await fetch(`${API_URL}/api/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ game: gameKey })
    });

    const data = await res.json();

    if (res.status === 403 || data.alreadyVoted) {
      toast("Naka-boto na ang IP address mo. 1 vote per IP lang po.");
      return;
    }

    if (data.success && data.votes) {
      localStorage.setItem('glzz_user_vote', gameKey);
      updateVoteUI(data.votes);
      toast(`Vote counted for "${title}"!`);
      return;
    }
  } catch (err) {
    console.warn("API error", err);
  }

  // Local fallback
  const cached = localStorage.getItem('glzz_votes');
  const votes = cached ? JSON.parse(cached) : { ...DEFAULT_VOTES };
  votes[gameKey] = (votes[gameKey] || 0) + 1;
  localStorage.setItem('glzz_votes', JSON.stringify(votes));
  localStorage.setItem('glzz_user_vote', gameKey);
  updateVoteUI(votes);
  toast(`Vote counted for "${title}"!`);
}

// Modal
function openModal(key) {
  playTone(540);
  const game = PROTOTYPES[key];
  if (!game) return;

  const modal = document.getElementById('modal');
  const container = document.getElementById('modal-content');

  container.innerHTML = `
    <img src="${game.img}" alt="${game.title}" class="modal-preview-img">
    <span class="tag" style="margin-bottom: 6px;">${game.type}</span>
    <h2 style="font-family: var(--font-title); font-size: 1.6rem; margin-bottom: 8px;">${game.title}</h2>
    <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 16px;">
      ${game.desc}
    </p>
    <div class="modal-spec-box">
      <strong>Planned Controls:</strong>
      ${game.controls}
    </div>
    <div style="display: flex; gap: 10px; margin-top: 18px;">
      <button class="btn btn-sm" onclick="submitVote('${key}'); closeModal();">Vote for This Game</button>
      <button class="btn btn-sm btn-outline" onclick="closeModal()">Close</button>
    </div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.classList.remove('open');
  document.body.style.overflow = 'auto';
}

function handleBackdrop(e) {
  if (e.target.id === 'modal') closeModal();
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// Toast
function toast(msg) {
  const container = document.getElementById('toast-wrap');
  if (!container) return;

  const el = document.createElement('div');
  el.className = 'toast-msg';
  el.textContent = msg;
  container.appendChild(el);

  setTimeout(() => {
    el.style.opacity = '0';
    setTimeout(() => el.remove(), 200);
  }, 3200);
}

// Contact form
function handleContact(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  toast(`Thanks, ${name}! Received your message.`);
  e.target.reset();
}

// Background sprinkles animation
function initCanvas() {
  const canvas = document.getElementById('sprinkles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const count = 35;
  const colors = ['#ff758c', '#ffa74f', '#fff5ea', '#c084fc'];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  class P {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.size = Math.random() * 2.5 + 1.5;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.alpha = Math.random() * 0.35 + 0.15;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.fill();
    }
  }

  for (let i = 0; i < count; i++) particles.push(new P());

  function loop() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }
  loop();
}

// Setup
document.addEventListener('DOMContentLoaded', () => {
  initCanvas();
  loadVotes();

  const sfxBtn = document.getElementById('sfx-btn');
  if (sfxBtn) {
    sfxBtn.addEventListener('click', () => {
      initAudio();
      sfxEnabled = !sfxEnabled;
      sfxBtn.classList.toggle('active', sfxEnabled);
      sfxBtn.textContent = sfxEnabled ? "SFX: ON" : "SFX: OFF";
      if (sfxEnabled) playTone(700);
    });
  }

  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('nav-links');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
});
