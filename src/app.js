/**
 * ============================================================================
 * GLZZLEXI STUDIOS - CLIENT-SIDE APPLICATION ENGINE (src/app.js)
 * "Sharp Wit. Sweet Glaze. Going Standalone on PC."
 * 
 * Company: GlzzLexi Studios (brand: GlzzLexiBear)
 * Founder & Lead Developer: John Gabriel (Gabriel Ronao)
 * 3rd-Year Computer Engineering Student
 * 
 * Core Architecture:
 * - Dynamic Client-Side DOM Injection into #app
 * - Live Cloudflare Worker Voting Backend with 1-Vote-Per-IP Anti-Duplication
 * - 4 Handcrafted 3D First-Person Desktop Prototypes
 * - Roblox Track Record & Modular Luau Framework
 * - Direct Website Distribution Architecture (0% Steam Cut / Local GCash + Maya)
 * - Confectionary Glaze Sprinkles Canvas Simulation
 * - Web Audio API Synthesizer (Zero External Audio Assets)
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// 1. CONFIGURATION & CONSTANTS
// ----------------------------------------------------------------------------
const CONFIG = {
  apiBaseUrl: "https://glzz-voting-api.glzzjhn.workers.dev",
  studioName: "GlzzLexi Studios",
  brandName: "GlzzLexiBear",
  founderName: "John Gabriel",
  founderRole: "Founder & Lead Developer (3rd-Year CpE Student)",
  githubUrl: "https://github.com/GlzzLexi",
  robloxProfileUrl: "https://github.com/GlzzLexi/.github/blob/main/profile/README.md"
};

// ----------------------------------------------------------------------------
// 2. PROTOTYPES DATABASE (4 Standalone 3D First-Person Desktop Concepts)
// ----------------------------------------------------------------------------
const PROTOTYPES = {
  nine_to_five: {
    id: "nine_to_five",
    title: "9-5 Get Me Out",
    genre: "Workplace Stealth & Psychological Escape Thriller",
    tagline: "Your boss will do anything to keep you trapped in your cubicle.",
    pitch: `You are the most productive corporate employee, but your boss secretly sabotages your promotion papers, intercepts your resignation letters, and locks down the floor after hours. You must sneak through dark cubicles, avoid CCTV cameras, search through shredders for evidence of his sabotage, and orchestrate your escape.`,
    perspective: "3D First-Person",
    status: "PROTOTYPE CANDIDATE #1",
    barClass: "bar-coral",
    image: "assets/prototype_9_5.jpg",
    mechanics: [
      "Cubicle Stealth: Crouch behind partitions, peek over monitors, and time movements around roaming staff and cameras.",
      "Evidence & Blackmail: Dig through shredders, unlock manager desks, and find proof of illegal sabotage to earn your freedom.",
      "Sanity Meter: The longer you remain trapped past 5:00 PM, the more the office shifts into psychological surrealism."
    ],
    controls: "WASD Walk & Crouch, E Interact / Hack, Q/E Lean Peek, Mouse Look"
  },

  study_picky: {
    id: "study_picky",
    title: "Study Picky",
    genre: "ADHD Sensory Defense & Memory Survival Simulator",
    tagline: "Final exam in 2 hours. Swat distractions before your focus hits zero.",
    pitch: `Final exam in 2 hours. You sit at your study desk under a warm lamp, but your character deals with heavy sensory distraction, sudden memory lapses, and intrusive thoughts. Swat away flying daydreams and paper airplanes with your ruler before they erase your study progress!`,
    perspective: "3D First-Person",
    status: "PROTOTYPE CANDIDATE #2",
    barClass: "bar-honey",
    image: "assets/prototype_study.jpg",
    mechanics: [
      "Distraction Swatting: Hit daydream apparitions and floating intrusive thoughts before they drain your focus bar.",
      "Memory Flashcards: Retain complex engineering formulas before brain fog washes them away.",
      "Caffeine Balance: Sip coffee to boost focus speed, but balance your heart-rate meter to prevent panic."
    ],
    controls: "Mouse Cursor Free-Look / Desk Interaction, Spacebar Swat Distraction, Tab Notes"
  },

  mark_mark: {
    id: "mark_mark",
    title: "Mark Mark What The",
    genre: "Chaotic Dual-Personality 3D Puzzle Action",
    tagline: "Two minds. One body. And your right arm has a mind of its own.",
    pitch: `You play as Mark trying to solve high-stakes escape missions. The twist? Your unhinged alter-ego can hijack control of your right hand at any second. One moment you are defusing a lock, the next moment your right arm punches a guard or throws your keycard out the window!`,
    perspective: "3D First-Person",
    status: "PROTOTYPE CANDIDATE #3",
    barClass: "bar-purple",
    image: "assets/prototype_mark.jpg",
    mechanics: [
      "Hand Hijacking: Adapt instantly when your right hand starts executing unpredictable actions.",
      "Chaotic Cooperation: Sometimes the crazy alter-ego's brute strength is the only way to smash locked vault doors that Mark cannot open.",
      "Mirror Truce: Speak to yourself in mirrors to negotiate temporary control truces."
    ],
    controls: "WASD Walk, Left Click (Mark / Calm), Right Click (Alter-Ego / Chaos), Q Self-Talk"
  },

  guys_watch: {
    id: "guys_watch",
    title: "Guys Watch Me Now",
    genre: "Interactive AI Livestreamer Simulator & Horror-Comedy",
    tagline: "The viewers are judging your every move... and daring you into madness.",
    pitch: `You play as Clyde, an ambitious desktop live streamer. Sitting in front of your dual monitors, an interactive simulated AI audience watches and judges your every move in real time. To keep the viewer count from dropping to zero, you must balance gaming skill while fulfilling chaotic real-life apartment dares from the chat!`,
    perspective: "3D First-Person",
    status: "PROTOTYPE CANDIDATE #4",
    barClass: "bar-cyan",
    image: "assets/prototype_streamer.jpg",
    mechanics: [
      "Interactive AI Chat: Viewers roast your plays, spam custom memes, send TTS donations, and vote on your next dare.",
      "Apartment Dares: Chat dares you to investigate weird noises in your hallway or eat cursed midnight food deliveries.",
      "Swatting & Clout: Balance viral fame against paranoid troll viewers trying to swat your apartment."
    ],
    controls: "WASD Walk Apartment, Mouse Look, Left Click PC Gaming, F Stream Cam, T Chat"
  }
};

// ----------------------------------------------------------------------------
// 3. ROBLOX TRACK RECORD & MODULAR LUAU PIPELINE
// ----------------------------------------------------------------------------
const ROBLOX_PROJECTS = [
  {
    title: "STEAL AN ANOMALY: LAB BREACH TYCOON",
    badgeClass: "status-live",
    badgeText: "LIVE ROBLOX RELEASE",
    statusText: "Live (Evaluation Phase)",
    role: "Inaugural Studio Release / Lightweight Prototype",
    url: "https://www.roblox.com/games/134889225269060/STEAL-AN-ANOMALY-LAB-BREACH-TYCOON",
    buttonText: "Play on Roblox",
    desc: "Built to validate baseline deployment, tycoon mechanics, and data persistence in a live Roblox production environment. Minimalist core loop engineered with modular Luau architecture."
  },
  {
    title: "UNTITLED ANIME PROJECT (Tensura-Inspired)",
    badgeClass: "status-hold",
    badgeText: "STUDIO HIGHLIGHT",
    statusText: "In Development (On Hold / Delayed)",
    role: "Flagship RPG Showcase",
    url: "https://github.com/GlzzLexi/.github/blob/main/profile/README.md",
    buttonText: "View Specs on GitHub",
    desc: "Inspired by 'That Time I Got Reincarnated as a Slime'. Systems-driven RPG focusing on deep progression mechanics, custom skill architectures, and immersive world-building atop our modular Luau framework."
  },
  {
    title: "UNTITLED ZOMBIE ROADTRIP GAME",
    badgeClass: "status-dev",
    badgeText: "ACTIVE PIPELINE",
    statusText: "In Active Development",
    role: "Survival / Co-op / Dynamic Environments",
    url: "https://github.com/GlzzLexi/.github/blob/main/profile/README.md",
    buttonText: "Inspect Roadmap",
    desc: "Co-op survival experience with dynamic environmental road hazards and cooperative resource management, prototyping core loops for our desktop ambitions."
  }
];

// Fallback vote values if API is unreachable
const FALLBACK_VOTES = {
  nine_to_five: 184,
  study_picky: 162,
  mark_mark: 171,
  guys_watch: 198
};

// ----------------------------------------------------------------------------
// 4. WEB AUDIO API SYNTHESIZER (No External Audio Files)
// ----------------------------------------------------------------------------
class StudioAudioSynthesizer {
  constructor() {
    this.ctx = null;
    this.enabled = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }

  toggle() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.enabled = !this.enabled;
    return this.enabled;
  }

  playPop(freq = 520, duration = 0.06) {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.4, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  playChime() {
    if (!this.enabled || !this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playPop(freq, 0.1), idx * 65);
    });
  }
}

const sfx = new StudioAudioSynthesizer();

// ----------------------------------------------------------------------------
// 5. AMBIENT SPRINKLES CANVAS
// ----------------------------------------------------------------------------
function initSprinklesCanvas() {
  const canvas = document.getElementById('glaze-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let sprinkles = [];
  const count = 44;

  const palette = ['#ff758c', '#ffa74f', '#fff5ea', '#6d3d22', '#c084fc', '#38bdf8'];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  let mouse = { x: -1000, y: -1000 };
  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.len = Math.random() * 8 + 4;
      this.thickness = Math.random() * 2 + 1.8;
      this.angle = Math.random() * Math.PI * 2;
      this.spin = (Math.random() - 0.5) * 0.02;
      this.color = palette[Math.floor(Math.random() * palette.length)];
      this.alpha = Math.random() * 0.45 + 0.2;
      this.isDot = Math.random() > 0.55;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.angle += this.spin;

      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 90) {
        const force = (90 - dist) / 90;
        this.x += (dx / dist) * force * 2.5;
        this.y += (dy / dist) * force * 2.5;
      }

      if (this.x < -20) this.x = width + 20;
      if (this.x > width + 20) this.x = -20;
      if (this.y < -20) this.y = height + 20;
      if (this.y > height + 20) this.y = -20;
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;

      if (this.isDot) {
        ctx.beginPath();
        ctx.arc(0, 0, this.thickness, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.roundRect(-this.len / 2, -this.thickness / 2, this.len, this.thickness, this.thickness / 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  for (let i = 0; i < count; i++) {
    sprinkles.push(new Particle());
  }

  function render() {
    ctx.clearRect(0, 0, width, height);
    sprinkles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(render);
  }
  render();
}

// ----------------------------------------------------------------------------
// 6. DOM RENDERER ENGINE (Mounting All UI into #app)
// ----------------------------------------------------------------------------
function buildApp() {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <!-- Ambient Background Glows -->
    <div class="ambient-glow glow-top" aria-hidden="true"></div>
    <div class="ambient-glow glow-bottom" aria-hidden="true"></div>

    <!-- 1. Header Navigation -->
    ${renderHeader()}

    <main>
      <!-- 2. Hero Section -->
      ${renderHero()}

      <!-- 3. The 4 Prototypes Section -->
      ${renderPrototypesSection()}

      <!-- 4. Live Greenlight Voting Booth -->
      ${renderVotingSection()}

      <!-- 5. Roblox Track Record & Modular Luau -->
      ${renderRobloxSection()}

      <!-- 6. Direct Website Distribution & Store -->
      ${renderDirectStoreSection()}

      <!-- 7. Founder Story & Studio Vision -->
      ${renderFounderSection()}

      <!-- 8. Feedback / Suggestions Form -->
      ${renderContactSection()}
    </main>

    <!-- 9. Footer -->
    ${renderFooter()}

    <!-- 10. Modals & Toast Container -->
    ${renderModals()}
  `;

  // Attach interactive listeners
  attachEventListeners();
}

// ----------------------------------------------------------------------------
// 7. COMPONENT TEMPLATES
// ----------------------------------------------------------------------------

function renderHeader() {
  return `
    <header class="site-header" id="header">
      <div class="container header-container">
        <a href="#hero" class="brand-link" aria-label="GlzzLexi Studios Home">
          <img src="assets/logo.png" alt="GlzzLexi Studios Logo" class="header-logo-img">
        </a>

        <nav class="nav-menu" id="nav-menu">
          <a href="#hero" class="nav-link active">Home</a>
          <a href="#prototypes" class="nav-link">4 Prototypes</a>
          <a href="#voting" class="nav-link">Greenlight Vote</a>
          <a href="#roblox-pipeline" class="nav-link">Roblox Track Record</a>
          <a href="#direct-store" class="nav-link">Direct Store</a>
          <a href="#studio-story" class="nav-link">About GlzzLexi</a>
        </nav>

        <div class="header-actions">
          <button id="sfx-toggle" class="btn-sfx" title="Toggle Audio Feedback" aria-label="Toggle UI Audio">
            <span class="sfx-dot"></span>
            <span class="sfx-label">SFX: OFF</span>
          </button>

          <a href="#voting" class="btn btn-glazed btn-sm">
            <span>Vote Prototype</span>
            <span class="btn-icon">&rarr;</span>
          </a>

          <button class="menu-toggle" id="menu-toggle" aria-label="Toggle navigation">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  `;
}

function renderHero() {
  return `
    <section class="hero-section" id="hero">
      <div class="container hero-container">
        <div class="hero-text-block">
          <div class="studio-badge-pill">
            <span class="pill-dot"></span>
            <span class="badge-title">INDEPENDENT GAME STUDIO &bull; FOUNDED BY JOHN GABRIEL</span>
          </div>

          <h1 class="hero-heading">
            SHARP WIT.<br>
            SWEET GLAZE.<br>
            <span class="glazed-coral">GOING STANDALONE ON PC.</span>
          </h1>

          <!-- Authentic Founder Personal Message -->
          <div class="founder-voice-card">
            <div class="founder-voice-header">
              <span class="voice-avatar">🐻</span>
              <div>
                <strong>A Quick Note from the Founder:</strong>
                <small>John Gabriel (Gabriel Ronao) &bull; 3rd-Year Computer Engineering Student</small>
              </div>
            </div>
            <p class="founder-voice-text">
              "Hi, I'm the one making games under <strong>GlzzLexiBear</strong>. Most of my games right now are on <strong>Roblox</strong>, but I'm planning to make my first standalone <strong>3D first-person desktop game</strong>.
            </p>
            <p class="founder-voice-text">
              Di ko muna ilalagay sa Steam kasi may <strong>$100 fee per game</strong> and I don't have the budget for that yet. I'll just sell and release the game <strong>directly on this website</strong>. Since ako lang mag-isa gumagawa habang nag-aaral, isa lang muna ang tatapusin ko. Vote below which one you want me to make first."
            </p>
          </div>

          <p class="hero-sublead">
            <strong>GlzzLexi Studios</strong> started as an independent solo operation, but our roadmap is built to expand into a tight, specialized team of developers, scripters, and technical artists.
          </p>

          <div class="hero-cta-group">
            <a href="#voting" class="btn btn-glazed btn-lg">
              <span>Vote Which 1 Gets Built First</span>
              <span class="btn-arrow">&rarr;</span>
            </a>
            <a href="#prototypes" class="btn btn-outline btn-lg">
              <span>Inspect 4 Prototypes</span>
            </a>
          </div>

          <div class="hero-specs-row">
            <div class="spec-card">
              <span class="spec-k">FOUNDER & LEAD</span>
              <strong class="spec-v">John Gabriel (CpE)</strong>
            </div>
            <div class="spec-divider"></div>
            <div class="spec-card">
              <span class="spec-k">ROBLOX PORTFOLIO</span>
              <strong class="spec-v">Modular Systems & Tycoons</strong>
            </div>
            <div class="spec-divider"></div>
            <div class="spec-card">
              <span class="spec-k">DESKTOP RELEASE</span>
              <strong class="spec-v">Direct Website Download</strong>
            </div>
          </div>
        </div>

        <div class="hero-visual-block">
          <div class="hero-card-frame">
            <div class="logo-hero-showcase">
              <div class="glazed-ring ring-1"></div>
              <div class="glazed-ring ring-2"></div>
              
              <div class="hero-logo-wrapper">
                <img src="assets/logo.png" alt="GlzzLexi Studios - Sharp Wit. Sweet Glaze." class="hero-main-logo">
              </div>

              <div class="hud-tag hud-top-left">
                <span class="hud-dot"></span>
                <span>DESKTOP EXPANSION ACTIVE</span>
              </div>
              <div class="hud-tag hud-bottom-right">
                <span>4 PROTOTYPES &bull; 1 WINNER</span>
              </div>
            </div>

            <div class="card-caption">
              <strong>GlzzLexi Studios (GlzzLexiBear)</strong> &bull; Founded by John Gabriel. From modular Luau systems on Roblox to standalone desktop gaming.
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderPrototypesSection() {
  const cardsHtml = Object.values(PROTOTYPES).map(proto => `
    <article class="prototype-card" data-key="${proto.id}">
      <div class="proto-screen-frame">
        <img src="${proto.image}" alt="${proto.title} 3D In-Engine Screenshot" class="proto-screen-img" loading="lazy">
        <div class="proto-screen-overlay">
          <div class="hud-view-tag">3D FIRST-PERSON HUD</div>
          <div class="proto-status-pill">${proto.status}</div>
        </div>
      </div>

      <div class="proto-content">
        <div class="proto-header-meta">
          <span class="proto-category">${proto.genre}</span>
          <span class="votes-badge" id="votes-card-${proto.id}">Loading votes...</span>
        </div>

        <h3 class="proto-title">${proto.title}</h3>
        <p class="proto-tagline">${proto.tagline}</p>
        <p class="proto-pitch">${proto.pitch}</p>

        <div class="proto-action-row">
          <button class="btn btn-outline btn-sm" onclick="openGameModal('${proto.id}')">
            <span>Inspect Dossier</span>
          </button>
          <button class="btn btn-glazed btn-sm" onclick="castVote('${proto.id}')">
            <span>Vote This Game</span>
            <span class="btn-arrow">&rarr;</span>
          </button>
        </div>
      </div>
    </article>
  `).join('');

  return `
    <section class="section prototypes-section" id="prototypes">
      <div class="container">
        <div class="section-tag-badge">LAB PROTOTYPES &bull; 3D FIRST PERSON</div>
        <h2 class="section-title">4 IDEAS IN THE CHAMBER. <span class="glazed-coral">ONLY 1 COMES ALIVE.</span></h2>
        
        <div class="studio-reality-banner">
          <div class="reality-icon">💡</div>
          <div>
            <strong>Real Student Dev Reality:</strong>
            Hindi ko kaya gawin lahat nang sabay-sabay. I'm balancing computer engineering subjects, thesis, circuitry, and late-night game dev. <strong>Only ONE game will be developed and released for PC first</strong>. Ang boto ninyo ang pipili kung ano ang gagawin ko.
          </div>
        </div>

        <div class="prototypes-grid">
          ${cardsHtml}
        </div>
      </div>
    </section>
  `;
}

function renderVotingSection() {
  const voteItemsHtml = Object.values(PROTOTYPES).map(proto => `
    <div class="vote-item" data-game="${proto.id}">
      <div class="vote-info">
        <h4>${proto.title}</h4>
        <p>${proto.genre}</p>
      </div>

      <div class="vote-progress-track">
        <div class="vote-bar ${proto.barClass}" id="bar-${proto.id}" style="width: 25%;"></div>
      </div>

      <div class="vote-meta">
        <span class="vote-count" id="count-${proto.id}">Fetching live votes...</span>
        <button class="btn-vote" onclick="castVote('${proto.id}')" data-original-txt="Cast Vote">
          Cast Vote
        </button>
      </div>
    </div>
  `).join('');

  return `
    <section class="section voting-section" id="voting">
      <div class="container">
        <div class="voting-banner">
          <div class="voting-header">
            <div class="section-tag-badge">COMMUNITY GREENLIGHT BOOTH</div>
            <h2 class="voting-title">WHICH DESKTOP GAME SHOULD I BUILD FIRST?</h2>
            <p class="voting-subtitle">
              Connected to our live Cloudflare Worker edge backend. To keep the vote honest and prevent spam, <strong>strictly 1 vote per IP address network</strong> is allowed.
            </p>
          </div>

          <div class="voting-booth-grid">
            ${voteItemsHtml}
          </div>

          <div class="voting-footer-note">
            <span class="live-dot"></span>
            <span><strong>Anti-Spam Verification:</strong> SHA-256 IP Hashed &bull; Cloudflare KV Edge Storage &bull; Real-Time Aggregation</span>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderRobloxSection() {
  const robloxHtml = ROBLOX_PROJECTS.map(proj => `
    <div class="pipeline-card">
      <span class="pipe-status-tag ${proj.badgeClass}">${proj.badgeText}</span>
      <h3>${proj.title}</h3>
      <div class="pipe-meta">
        <span>${proj.statusText}</span> &bull; <span>${proj.role}</span>
      </div>
      <p class="pipe-desc">${proj.desc}</p>
      <a href="${proj.url}" target="_blank" rel="noopener" class="btn btn-outline btn-sm" style="margin-top: auto; align-self: flex-start;">
        <span>${proj.buttonText}</span>
        <span class="btn-arrow">&rarr;</span>
      </a>
    </div>
  `).join('');

  return `
    <section class="section roblox-pipeline-section" id="roblox-pipeline">
      <div class="container">
        <div class="section-tag-badge">STUDIO TRACK RECORD</div>
        <h2 class="section-title">ROBLOX FOUNDATION &rarr; <span class="glazed-coral">DESKTOP EVOLUTION</span></h2>
        <p class="section-subtitle">
          GlzzLexi Studios builds on a shared foundation of reusable, modular Luau frameworks. Here is our live pipeline before stepping onto standalone desktop PC.
        </p>

        <div class="pipeline-grid">
          ${robloxHtml}
        </div>
      </div>
    </section>
  `;
}

function renderDirectStoreSection() {
  return `
    <section class="section direct-store-section" id="direct-store">
      <div class="container">
        <div class="section-tag-badge">DIRECT RELEASE ARCHITECTURE</div>
        <h2 class="section-title">WHY SELL DIRECTLY ON THIS WEBSITE?</h2>
        <p class="section-subtitle">
          No \$100 Steam fee, no 30% Valve cut. Direct distribution lets 100% of the funds go straight into development, tuition, hardware, and hiring the studio's first developers.
        </p>

        <div class="direct-cards-grid">
          <div class="direct-feature-card">
            <div class="f-icon">⚡</div>
            <h4>Direct Executable (.exe) Download</h4>
            <p>Once the greenlit game is ready, you download the verified desktop installer directly from this domain. DRM-free, zero third-party launchers required.</p>
          </div>

          <div class="direct-feature-card">
            <div class="f-icon">🇵🇭</div>
            <h4>Local Philippine & Global Payments</h4>
            <p>Built for accessibility. We will support <strong>GCash QR, Maya, Credit/Debit cards</strong>, and <strong>PayPal</strong> with instant automated download tokens.</p>
          </div>

          <div class="direct-feature-card">
            <div class="f-icon">💎</div>
            <h4>100% Supports Studio Expansion</h4>
            <p>Every peso or dollar directly funds developer software licenses, hardware upgrades, and our dream of scaling GlzzLexi into a full indie team.</p>
          </div>
        </div>

        <div class="checkout-simulation-banner">
          <div class="sim-text">
            <div class="sim-tag">DIRECT COMMERCE SIMULATION</div>
            <h3>Simulate Direct Checkout (GCash / Maya / Card)</h3>
            <p>See how fast and straightforward the direct checkout experience will be once the winning game releases.</p>
          </div>
          <button class="btn btn-glazed btn-md" onclick="openDirectPaymentModal()">
            <span>Preview Direct Checkout</span>
            <span class="btn-arrow">&rarr;</span>
          </button>
        </div>
      </div>
    </section>
  `;
}

function renderFounderSection() {
  return `
    <section class="section studio-story-section" id="studio-story">
      <div class="container story-grid">
        <div class="story-info-col">
          <div class="section-tag-badge">STUDIO & FOUNDER PROFILE</div>
          <h2 class="section-title">ABOUT GLZZLEXI STUDIOS</h2>
          
          <p class="lead-p">
            <strong>GlzzLexi Studios</strong> is an independent game studio founded and led by <strong>John Gabriel</strong> (Gabriel Ronao). The studio began as a solo-operated indie effort, engineering modular Luau modules covering data persistence, gameplay frameworks, and tooling for Roblox.
          </p>

          <p>
            While John remains the solo developer today balancing his 3rd year in <strong>Computer Engineering</strong>, GlzzLexi is designed from day one to grow into a specialized, close-knit team of gameplay scripters, technical artists, and 3D environment designers.
          </p>

          <p>
            Expanding into standalone desktop gaming is our next chapter. By taking systems-driven gameplay from Roblox into standalone 3D executables, we can push mechanical depth without the restrictions of a sandbox platform.
          </p>

          <div class="studio-profile-badges">
            <span class="p-badge">💻 3rd Year Computer Engineering</span>
            <span class="p-badge">⚡ Modular Luau Systems</span>
            <span class="p-badge">☁️ Cloudflare Edge Workers</span>
            <span class="p-badge">🕹️ First-Person 3D Game Design</span>
          </div>
        </div>

        <div class="terminal-col">
          <div class="terminal-box">
            <div class="terminal-bar">
              <span class="t-btn r"></span>
              <span class="t-btn y"></span>
              <span class="t-btn g"></span>
              <span class="t-title">glzz_engineering_manifesto.txt</span>
            </div>
            <div class="terminal-body">
              <div class="t-prompt"><span class="t-user">john@glzzlexi</span>:<span class="t-path">~/studio</span>$ cat manifesto.txt</div>
              <div class="t-dim">// GLZZLEXI STUDIOS CORE VALUES</div>
              <div class="t-row">1. <strong>Sharp Wit:</strong> Gameplay that makes you think, react, and laugh at absurd psychological twists.</div>
              <div class="t-row">2. <strong>Sweet Glaze:</strong> Polished visual identity, tactile feedback, satisfying UI and audio.</div>
              <div class="t-row">3. <strong>No Corporate Fluff:</strong> Real talk with players. No \$100 Steam fees, no microtransaction traps.</div>
              <div class="t-row">4. <strong>Independent Scaling:</strong> Starting as a student indie venture, building toward an awesome collaborative game studio.</div>
              <div class="t-prompt" style="margin-top: 14px;"><span class="t-user">john@glzzlexi</span>:<span class="t-path">~/studio</span>$ <span class="t-cursor">_</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderContactSection() {
  return `
    <section class="section contact-section" id="contact">
      <div class="container">
        <div class="contact-card">
          <div class="contact-inner-grid">
            <div class="contact-info">
              <div class="section-tag-badge">PITCH IN & TALK</div>
              <h2 class="section-title">SUGGEST A MECHANIC OR SAY HI</h2>
              <p class="contact-desc">
                Got a crazy idea for <em>9-5 Get Me Out</em> or <em>Guys Watch Me Now</em>? Or want to join GlzzLexi Studios in the future as a 3D artist or scripter? Send John Gabriel a message directly.
              </p>
            </div>

            <form class="contact-form" onsubmit="handleContactSubmit(event)">
              <div class="form-group">
                <label for="c-name">Your Name / Handle</label>
                <input type="text" id="c-name" class="form-input" placeholder="e.g. Alex (Roblox player)" required>
              </div>

              <div class="form-group">
                <label for="c-email">Email or Discord</label>
                <input type="text" id="c-email" class="form-input" placeholder="e.g. alex@gmail.com or @alex_cpe" required>
              </div>

              <div class="form-group">
                <label for="c-msg">Your Message / Prototype Suggestion</label>
                <textarea id="c-msg" class="form-input form-textarea" rows="4" placeholder="Anong suggestion mo sa gameplay or mechanics?" required></textarea>
              </div>

              <button type="submit" class="btn btn-glazed btn-md">
                <span>Send to John Gabriel</span>
                <span class="btn-arrow">&rarr;</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div class="footer-brand-col">
          <img src="assets/logo.png" alt="GlzzLexi Studios Logo" class="footer-logo">
          <p class="footer-tagline">
            Sharp Wit. Sweet Glaze. Independent game studio founded by John Gabriel (Gabriel Ronao). Evolving from modular Roblox systems to standalone desktop PC games.
          </p>
          <div class="footer-copy">
            &copy; <span id="year">${new Date().getFullYear()}</span> GlzzLexi Studios. All rights reserved.
          </div>
        </div>

        <div class="footer-links-grid">
          <div class="f-col">
            <h4>Prototypes</h4>
            <a href="#prototypes">9-5 Get Me Out</a>
            <a href="#prototypes">Study Picky</a>
            <a href="#prototypes">Mark Mark What The</a>
            <a href="#prototypes">Guys Watch Me Now</a>
          </div>

          <div class="f-col">
            <h4>Studio & Dev</h4>
            <a href="#roblox-pipeline">Roblox Track Record</a>
            <a href="#direct-store">Direct Release Store</a>
            <a href="#studio-story">Founder Story</a>
            <a href="${CONFIG.githubUrl}" target="_blank" rel="noopener">GitHub Organization</a>
          </div>

          <div class="f-col">
            <h4>Solo Dev Status</h4>
            <p class="footer-note">
              Solo indie dev today &bull; 3rd Year CpE &bull; Envisioned to expand into a small indie team.
            </p>
          </div>
        </div>
      </div>
    </footer>
  `;
}

function renderModals() {
  return `
    <!-- Prototype Inspection Modal -->
    <div class="modal-backdrop" id="proto-modal" onclick="closeModalOnBackdrop(event)" role="dialog" aria-hidden="true">
      <div class="modal-dialog">
        <button class="modal-x" onclick="closePrototypeModal()" aria-label="Close Modal">&times;</button>
        <div id="modal-body-inject"></div>
      </div>
    </div>

    <!-- Direct Checkout Preview Modal -->
    <div class="modal-backdrop" id="payment-modal" onclick="closePaymentModalOnBackdrop(event)" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-sm">
        <button class="modal-x" onclick="closePaymentModal()" aria-label="Close Modal">&times;</button>
        <div class="section-tag-badge">DIRECT RELEASE CHECKOUT PREVIEW</div>
        <h3 style="font-family: var(--font-display); font-size: 1.6rem; color: #fff; margin: 10px 0 8px;">
          Direct Website Download
        </h3>
        <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.6; margin-bottom: 20px;">
          When the winning prototype launches, you will be able to purchase and download the full executable right here with zero publisher cut.
        </p>

        <div class="payment-channels">
          <div class="pay-chan">
            <span class="chan-icon">🇵🇭</span>
            <div>
              <strong>GCash & Maya Instant QR</strong>
              <small>Scan and pay with Philippine e-wallets, zero transaction friction.</small>
            </div>
          </div>
          <div class="pay-chan">
            <span class="chan-icon">💳</span>
            <div>
              <strong>Debit & Credit Cards</strong>
              <small>Visa, Mastercard, JCB processed securely.</small>
            </div>
          </div>
          <div class="pay-chan">
            <span class="chan-icon">🌐</span>
            <div>
              <strong>PayPal & International</strong>
              <small>Instant access for global indie game supporters.</small>
            </div>
          </div>
        </div>

        <div style="background: rgba(255, 117, 140, 0.1); border: 1px dashed var(--glaze-coral); border-radius: 12px; padding: 14px; margin-bottom: 22px;">
          <small style="color: #fff; display: block; font-family: var(--font-mono); font-size: 0.78rem;">
            📦 INCLUDED: Standalone Windows .exe installer + Portable zip + Digital Receipt + Access to future updates directly on this domain.
          </small>
        </div>

        <button class="btn btn-glazed btn-md" style="width: 100%;" onclick="simulateCheckoutSuccess()">
          <span>Simulate Purchase Confirmation</span>
        </button>
      </div>
    </div>

    <!-- Toast Notification Container -->
    <div class="toast-container" id="toast-container" aria-live="polite"></div>
  `;
}

// ----------------------------------------------------------------------------
// 8. EVENT LISTENERS & INTERACTION
// ----------------------------------------------------------------------------
function attachEventListeners() {
  // SFX Toggle
  const sfxBtn = document.getElementById('sfx-toggle');
  const sfxLabel = sfxBtn ? sfxBtn.querySelector('.sfx-label') : null;

  if (sfxBtn) {
    sfxBtn.addEventListener('click', () => {
      const active = sfx.toggle();
      if (active) {
        sfxBtn.classList.add('active');
        if (sfxLabel) sfxLabel.textContent = "SFX: ON";
        sfx.playChime();
        showToast("Audio feedback enabled!");
      } else {
        sfxBtn.classList.remove('active');
        if (sfxLabel) sfxLabel.textContent = "SFX: OFF";
        showToast("Audio muted");
      }
    });
  }

  // Hover sound on buttons and cards
  document.querySelectorAll('.btn, .prototype-card, .btn-vote, .pipeline-card, .direct-feature-card').forEach(el => {
    el.addEventListener('mouseenter', () => sfx.playPop(720, 0.02));
  });

  // Mobile navigation toggle
  const burger = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav-menu');

  if (burger && nav) {
    burger.addEventListener('click', () => {
      nav.classList.toggle('open');
      sfx.playPop(520);
    });

    nav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => nav.classList.remove('open'));
    });
  }

  // Escape key closes modals
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closePrototypeModal();
      closePaymentModal();
    }
  });

  // Fetch live votes from Cloudflare Worker
  fetchLiveVotes();
}

// ----------------------------------------------------------------------------
// 9. LIVE VOTING API (Cloudflare Worker Integration + IP Check)
// ----------------------------------------------------------------------------
async function fetchLiveVotes() {
  try {
    const res = await fetch(`${CONFIG.apiBaseUrl}/api/votes`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.votes) {
        renderVoteTally(data.votes);
        return;
      }
    }
  } catch (e) {
    console.warn("Cloudflare API offline, using cached tallies", e);
  }

  const cached = localStorage.getItem('glzz_local_votes');
  renderVoteTally(cached ? JSON.parse(cached) : FALLBACK_VOTES);
}

function renderVoteTally(votes) {
  const total = Object.values(votes).reduce((sum, v) => sum + v, 0);

  Object.keys(votes).forEach(key => {
    const count = votes[key] || 0;
    const pct = total > 0 ? Math.round((count / total) * 100) : 25;

    const bar = document.getElementById(`bar-${key}`);
    const countLabel = document.getElementById(`count-${key}`);
    const cardBadge = document.getElementById(`votes-card-${key}`);

    if (bar) bar.style.width = `${pct}%`;
    if (countLabel) countLabel.textContent = `${count} votes (${pct}%)`;
    if (cardBadge) cardBadge.textContent = `🔥 ${count} Votes (${pct}%)`;
  });

  const myVote = localStorage.getItem('glzz_cast_choice');
  if (myVote) {
    document.querySelectorAll('.btn-vote').forEach(btn => {
      btn.classList.remove('voted');
      const orig = btn.getAttribute('data-original-txt');
      if (orig) btn.textContent = orig;
    });

    const activeItem = document.querySelector(`.vote-item[data-game="${myVote}"] .btn-vote`);
    if (activeItem) {
      if (!activeItem.getAttribute('data-original-txt')) {
        activeItem.setAttribute('data-original-txt', activeItem.textContent);
      }
      activeItem.classList.add('voted');
      activeItem.textContent = "Your Vote ✓";
    }
  }
}

async function castVote(gameKey) {
  sfx.playChime();
  const game = PROTOTYPES[gameKey];
  const name = game ? game.title : gameKey;

  try {
    const res = await fetch(`${CONFIG.apiBaseUrl}/api/vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ game: gameKey })
    });

    const data = await res.json();

    if (res.status === 403 || data.alreadyVoted) {
      showToast(`⚠️ Naka-boto na ang IP address mo! 1 vote per IP network lang to keep the vote honest.`);
      return;
    }

    if (data.success && data.votes) {
      localStorage.setItem('glzz_cast_choice', gameKey);
      renderVoteTally(data.votes);
      showToast(`🎉 OFFICIAL VOTE LOGGED! Bumoto ka para sa "${name}". Live na na-record sa Cloudflare!`);
      return;
    }
  } catch (err) {
    console.warn("API call failed, fallback to local storage", err);
  }

  // Local fallback
  const cached = localStorage.getItem('glzz_local_votes');
  const votes = cached ? JSON.parse(cached) : { ...FALLBACK_VOTES };
  votes[gameKey] = (votes[gameKey] || 0) + 1;
  localStorage.setItem('glzz_local_votes', JSON.stringify(votes));
  localStorage.setItem('glzz_cast_choice', gameKey);
  renderVoteTally(votes);
  showToast(`🎉 VOTE RECORDED! Bumoto ka para sa "${name}"!`);
}

// ----------------------------------------------------------------------------
// 10. MODAL CONTROLLERS & TOASTS
// ----------------------------------------------------------------------------
function openGameModal(key) {
  sfx.playPop(580);
  const game = PROTOTYPES[key];
  if (!game) return;

  const modal = document.getElementById('proto-modal');
  const container = document.getElementById('modal-body-inject');

  const mechanicsList = game.mechanics.map(m => `
    <li style="margin-bottom: 8px; color: #cbd5e1; font-size: 0.94rem; line-height: 1.6;">${m}</li>
  `).join('');

  container.innerHTML = `
    <div class="modal-hero-img-wrap">
      <img src="${game.image}" alt="${game.title} Concept Screenshot" class="modal-hero-img">
    </div>

    <div style="margin-bottom: 18px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); padding-bottom: 14px;">
      <span class="section-tag-badge" style="margin-bottom: 8px;">3D FIRST-PERSON PROTOTYPE</span>
      <h2 style="font-family: var(--font-display); font-size: 1.9rem; color: #fff; margin: 6px 0 4px 0;">${game.title}</h2>
      <div style="font-family: var(--font-mono); font-size: 0.84rem; color: var(--glaze-coral);">${game.genre}</div>
    </div>

    <p style="color: #cbd5e1; font-size: 1.02rem; line-height: 1.7; margin-bottom: 22px;">
      ${game.pitch}
    </p>

    <h4 style="font-family: var(--font-heading); font-size: 1rem; color: #fff; margin-bottom: 8px;">CORE GAMEPLAY SYSTEMS:</h4>
    <ul style="padding-left: 20px; margin-bottom: 22px;">
      ${mechanicsList}
    </ul>

    <div class="modal-spec-grid">
      <div class="modal-spec-card">
        <span>PLANNED CONTROLS</span>
        <strong>${game.controls}</strong>
      </div>
      <div class="modal-spec-card">
        <span>RELEASE MODEL</span>
        <strong>Direct Website Purchase (No Steam Fee)</strong>
      </div>
    </div>

    <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-top: 22px;">
      <button class="btn btn-glazed" onclick="castVote('${key}'); closePrototypeModal();">
        <span>Vote to Build This First!</span>
        <span class="btn-arrow">&rarr;</span>
      </button>
      <button class="btn btn-secondary" onclick="closePrototypeModal()">
        <span>Close</span>
      </button>
    </div>
  `;

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closePrototypeModal() {
  sfx.playPop(440);
  const modal = document.getElementById('proto-modal');
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }
  document.body.style.overflow = 'auto';
}

function closeModalOnBackdrop(e) {
  if (e.target.id === 'proto-modal') closePrototypeModal();
}

function openDirectPaymentModal() {
  sfx.playPop(620);
  const modal = document.getElementById('payment-modal');
  if (modal) {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  }
  document.body.style.overflow = 'hidden';
}

function closePaymentModal() {
  sfx.playPop(440);
  const modal = document.getElementById('payment-modal');
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }
  document.body.style.overflow = 'auto';
}

function closePaymentModalOnBackdrop(e) {
  if (e.target.id === 'payment-modal') closePaymentModal();
}

function simulateCheckoutSuccess() {
  sfx.playChime();
  closePaymentModal();
  showToast("🎉 SIMULATION: Order verified! In production, your direct .exe download token would start immediately.");
}

function showToast(msg, duration = 4000) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `
    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
      <span style="font-size: 1.1rem;">🐻</span>
      <strong style="font-family: var(--font-heading); color: var(--glaze-coral); font-size: 0.82rem; letter-spacing: 0.5px;">GLZZLEXI STUDIOS</strong>
    </div>
    <div style="color: #cbd5e1; font-size: 0.9rem;">${msg}</div>
  `;

  container.appendChild(t);

  setTimeout(() => {
    t.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    t.style.opacity = '0';
    t.style.transform = 'translateY(10px)';
    setTimeout(() => {
      if (t.parentElement) t.parentElement.removeChild(t);
    }, 300);
  }, duration);
}

function handleContactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('c-name').value;
  sfx.playChime();
  showToast(`Salamat, ${name}! Your feedback has been sent directly to John Gabriel.`);
  e.target.reset();
}

// Global exposure for inline onclick handlers
window.castVote = castVote;
window.openGameModal = openGameModal;
window.closePrototypeModal = closePrototypeModal;
window.closeModalOnBackdrop = closeModalOnBackdrop;
window.openDirectPaymentModal = openDirectPaymentModal;
window.closePaymentModal = closePaymentModal;
window.closePaymentModalOnBackdrop = closePaymentModalOnBackdrop;
window.simulateCheckoutSuccess = simulateCheckoutSuccess;
window.handleContactSubmit = handleContactSubmit;

// ----------------------------------------------------------------------------
// 11. BOOTSTRAP APPLICATION
// ----------------------------------------------------------------------------
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initSprinklesCanvas();
    buildApp();
  });
} else {
  initSprinklesCanvas();
  buildApp();
}
