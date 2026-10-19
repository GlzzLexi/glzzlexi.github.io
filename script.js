/**
 * GlzzLexiBear Game Studios - Interactive Systems
 * 4 3D First-Person Desktop Prototypes, Community Greenlight Voting,
 * Glaze Sprinkles Canvas, Audio Synthesis & Dossiers
 */

// --- 1. Confectionary Sound Effects (Web Audio API) ---
class GlazeAudioFX {
  constructor() {
    this.ctx = null;
    this.enabled = false;
  }

  init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
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

  playPop(freq = 480, duration = 0.06) {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + duration);
      
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  playClick() {
    this.playPop(520, 0.08);
  }

  playHover() {
    this.playPop(740, 0.03);
  }

  playVote() {
    if (!this.enabled || !this.ctx) return;
    const chords = [523.25, 659.25, 783.99, 1046.50];
    chords.forEach((note, i) => {
      setTimeout(() => this.playPop(note, 0.12), i * 60);
    });
  }
}

const glazeAudio = new GlazeAudioFX();

// --- 2. Interactive Glaze & Sprinkle Particle Canvas ---
function initGlazeCanvas() {
  const canvas = document.getElementById('glaze-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let sprinkles = [];
  const sprinkleCount = 50;

  const colors = [
    '#ff758c', // Strawberry coral
    '#ffa74f', // Honey amber
    '#fff5ea', // Vanilla cream
    '#6d3d22', // Cocoa
    '#ffd8c0'  // Peach
  ];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  let mouseX = -1000;
  let mouseY = -1000;
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  class Sprinkle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.length = Math.random() * 8 + 4;
      this.thickness = Math.random() * 2.5 + 2;
      this.angle = Math.random() * Math.PI * 2;
      this.vAngle = (Math.random() - 0.5) * 0.02;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.alpha = Math.random() * 0.5 + 0.25;
      this.isRound = Math.random() > 0.6;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.angle += this.vAngle;

      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        const force = (100 - dist) / 100;
        this.x += (dx / dist) * force * 3;
        this.y += (dy / dist) * force * 3;
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

      if (this.isRound) {
        ctx.beginPath();
        ctx.arc(0, 0, this.thickness, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.roundRect(-this.length / 2, -this.thickness / 2, this.length, this.thickness, this.thickness / 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  for (let i = 0; i < sprinkleCount; i++) {
    sprinkles.push(new Sprinkle());
  }

  function loop() {
    ctx.clearRect(0, 0, width, height);
    sprinkles.forEach(s => {
      s.update();
      s.draw();
    });
    requestAnimationFrame(loop);
  }

  loop();
}

// --- 3. The 4 Prototypes Database ---
const PROTOTYPES = {
  nine_to_five: {
    title: "9-5 Get Me Out",
    tagline: "Employee of the month. Your boss will do whatever it takes to keep you trapped.",
    genre: "3D First-Person Workplace Stealth & Psychological Escape Thriller",
    engine: "Desktop PC / DirectX 12 / High-Fidelity 3D First Person",
    image: "assets/prototype_9_5.jpg",
    logline: `You are the ultimate 9-to-5 corporate grinder: sharp, efficient, and successful. But your sinister boss knows you are planning to quit. Desperate to keep his top performer, he secretly sabotages your promotions, intercepts your resignation letters, and locks down the floor after hours.`,
    mechanics: [
      "Cubicle Stealth: Crouch behind partitions, peek over monitors, and time your moves around roaming HR drones and security cameras.",
      "Evidence & Blackmail: Dig through corporate shredders, hack the boss's server room, and collect incriminating evidence of sabotage to earn your legal freedom.",
      "Sanity & Overtime: The longer you remain trapped after 5:00 PM, the more the office warps with psychological paranoia."
    ],
    controls: "WASD Movement, Left Shift Sprint, Left Ctrl Crouch, E Interact / Hack, Q/E Peek Lean, Mouse Look."
  },

  study_picky: {
    title: "Study Picky",
    tagline: "Final exam starts in 2 hours. Your brain has chosen to remember a 2012 jingle instead.",
    genre: "3D First-Person ADHD & Memory Sensory Overload Survival Simulator",
    engine: "Desktop PC / Physicalized 3D Desk Environment",
    image: "assets/prototype_study.jpg",
    logline: `You sit at your study desk under a warm lamp with an insurmountable stack of textbooks. Your goal is simple: study and get a passing grade. The problem? Your character suffers from extreme memory lapses, intrusive daydream apparitions, paper airplanes flying across your vision, and sensory overload.`,
    mechanics: [
      "Daydream Defense: Swat away floating intrusive neon thoughts and distracting paper planes with your ruler before they erase your study progress.",
      "Memory Flashcards: Retain formulas and facts before sudden brain fog washes them away.",
      "Caffeine vs. Jitters: Sip coffee to boost focus speed, but balance your heart-rate meter to prevent catastrophic anxiety panics."
    ],
    controls: "Mouse Cursor Free-Look / Desk Hand Interaction, Space Swat Distraction, Tab Check Notes, Left Click Highlight Text."
  },

  mark_mark: {
    title: "Mark Mark What The",
    tagline: "Two brains fighting over one pair of hands. Zero peace.",
    genre: "3D First-Person Dual-Personality Chaotic Puzzle-Action Adventure",
    engine: "Desktop PC / Dynamic Shader & Glitch Engine",
    image: "assets/prototype_mark.jpg",
    logline: `You play as Mark, a sharp-witted operative tasked with solving high-stakes escape scenarios. However, you share your body with a manic alter-ego who can hijack control of your hands at any second. Your left hand tries to defuse the bomb while your right hand suddenly decides to slap a guard or throw your tools across the room.`,
    mechanics: [
      "Dual Control Hijacking: Adapt when the screen glitches into magenta fury and your alter-ego takes over your movement and mouse input.",
      "Chaotic Cooperation: Sometimes the alter-ego's unhinged strength is the only way to smash locked vault doors that Mark cannot crack.",
      "Mirror Diagnostics: Talk to yourself in mirrors to negotiate temporary truces and synchronize your powers."
    ],
    controls: "WASD Walk, Left Click (Mark Action / Cyan), Right Click (Alter-Ego Punch / Magenta), Q Argue With Yourself."
  },

  guys_watch: {
    title: "Guys Watch Me Now",
    tagline: "Play for the views. Obey the chat. Survive the stream.",
    genre: "3D First-Person Interactive AI Livestreamer Simulator & Psychological Horror-Comedy",
    engine: "Desktop PC / Real-Time Simulated AI Chat Engine",
    image: "assets/prototype_streamer.jpg",
    logline: `You play as Clyde, an ambitious desktop live streamer trying to make it big. Sitting at your battlestation, an interactive simulated AI audience analyzes your every camera angle, microphone inflection, and game skill in real time. To keep the viewer count alive, you must juggle streaming actual games while fulfilling escalating, unhinged chat dares.`,
    mechanics: [
      "Interactive AI Chat: Viewers roast your plays, spam custom memes, send TTS donations, and vote on what you must do next.",
      "Escalating Apartment Dares: The chat demands you investigate weird noises in your dark hallway or order cursed midnight food deliveries.",
      "Swatting & Clout: Balance going viral against staying safe as paranoid troll viewers threaten to swat your house."
    ],
    controls: "WASD Walk around apartment, Mouse Look, Left Click Keyboard/Mouse Gaming, F Adjust Stream Cam, T Answer Chat."
  }
};

// --- 4. Community Greenlight Voting System ---
// Connected to live Cloudflare Worker API with IP anti-duplication
const API_BASE_URL = "https://glzz-voting-api.glzzjhn.workers.dev"; 

const INITIAL_VOTES = {
  nine_to_five: 184,
  study_picky: 162,
  mark_mark: 171,
  guys_watch: 198
};

function getLocalVoteData() {
  const saved = localStorage.getItem('glzz_prototype_votes');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {}
  }
  return { ...INITIAL_VOTES };
}

function saveLocalVoteData(data) {
  localStorage.setItem('glzz_prototype_votes', JSON.stringify(data));
}

async function fetchLiveVotes() {
  if (!API_BASE_URL) {
    updateVotingUI(getLocalVoteData());
    return;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/votes`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.votes) {
        updateVotingUI(data.votes);
        return;
      }
    }
  } catch (err) {
    console.warn("Could not reach live voting backend, using local tallies", err);
  }
  updateVotingUI(getLocalVoteData());
}

function updateVotingUI(votes) {
  const total = Object.values(votes).reduce((a, b) => a + b, 0);

  Object.keys(votes).forEach(key => {
    const count = votes[key];
    const pct = total > 0 ? Math.round((count / total) * 100) : 25;

    const bar = document.getElementById(`bar-${key}`);
    const countLabel = document.getElementById(`count-${key}`);
    const cardVoteLabel = document.getElementById(`votes-card-${key}`);

    if (bar) bar.style.width = `${pct}%`;
    if (countLabel) countLabel.textContent = `${count} votes (${pct}%)`;
    if (cardVoteLabel) cardVoteLabel.textContent = `🔥 ${count} Votes (${pct}%)`;
  });

  const userVote = localStorage.getItem('glzz_user_cast_vote');
  if (userVote) {
    document.querySelectorAll('.btn-vote').forEach(btn => {
      btn.classList.remove('voted');
      const originalText = btn.getAttribute('data-original-text');
      if (originalText) btn.textContent = originalText;
    });

    const votedItem = document.querySelector(`.vote-item[data-game="${userVote}"] .btn-vote`);
    if (votedItem) {
      if (!votedItem.getAttribute('data-original-text')) {
        votedItem.setAttribute('data-original-text', votedItem.textContent);
      }
      votedItem.classList.add('voted');
      votedItem.textContent = "Your Vote ✓";
    }
  }
}

async function castVote(gameKey) {
  glazeAudio.playVote();
  const game = PROTOTYPES[gameKey];
  const gameTitle = game ? game.title : gameKey;

  // 1. If live backend is configured
  if (API_BASE_URL) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ game: gameKey })
      });

      const data = await res.json();

      if (res.status === 403 || data.alreadyVoted) {
        showGlazedToast(`⚠️ Your IP network has already cast a vote! Each player gets 1 vote to keep the competition fair.`);
        return;
      }

      if (data.success && data.votes) {
        localStorage.setItem('glzz_user_cast_vote', gameKey);
        updateVotingUI(data.votes);
        showGlazedToast(`🎉 OFFICIAL VOTE LOGGED! You voted for "${gameTitle}"! Backend recorded your vote.`);
        return;
      }
    } catch (e) {
      console.warn("Backend error, falling back to local storage vote", e);
    }
  }

  // 2. Local Fallback Mode
  const votes = getLocalVoteData();
  const previousVote = localStorage.getItem('glzz_user_cast_vote');

  if (previousVote && votes[previousVote] && previousVote !== gameKey) {
    votes[previousVote] = Math.max(0, votes[previousVote] - 1);
  }

  if (previousVote !== gameKey) {
    votes[gameKey] = (votes[gameKey] || 0) + 1;
  }

  saveLocalVoteData(votes);
  localStorage.setItem('glzz_user_cast_vote', gameKey);
  updateVotingUI(votes);

  showGlazedToast(`🎉 VOTE RECORDED! You voted for "${gameTitle}"! Connect Cloudflare Worker to enable global IP deduplication.`);
}

// --- 5. Prototype Dossier Modal System ---
function openGameModal(key) {
  glazeAudio.playClick();
  const game = PROTOTYPES[key];
  if (!game) return;

  const modal = document.getElementById('game-modal');
  const container = document.getElementById('modal-content');

  const mechanicsHtml = game.mechanics.map(m => `
    <li style="margin-bottom: 10px; color: #cbd5e1; font-size: 0.94rem; line-height: 1.6;">${m}</li>
  `).join('');

  container.innerHTML = `
    <div class="modal-hero-img-wrap">
      <img src="${game.image}" alt="${game.title} Concept Screenshot" class="modal-hero-img">
    </div>

    <div style="margin-bottom: 20px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); padding-bottom: 16px;">
      <span class="section-tag-badge" style="margin-bottom: 8px;">3D FIRST-PERSON PROTOTYPE</span>
      <h2 style="font-family: var(--font-display); font-size: 2rem; color: #fff; margin: 8px 0 4px 0;">${game.title}</h2>
      <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--glaze-coral);">${game.genre}</div>
    </div>

    <p style="color: #fff; font-size: 1.08rem; font-style: italic; margin-bottom: 16px; border-left: 3px solid var(--glaze-honey); padding-left: 12px;">
      "${game.tagline}"
    </p>

    <p style="color: #94a3b8; font-size: 1.02rem; line-height: 1.7; margin-bottom: 24px;">
      ${game.logline}
    </p>

    <h4 style="font-family: var(--font-display); font-size: 1.05rem; color: #fff; margin-bottom: 10px;">CORE GAMEPLAY SYSTEMS</h4>
    <ul style="padding-left: 20px; margin-bottom: 24px;">
      ${mechanicsHtml}
    </ul>

    <h4 style="font-family: var(--font-display); font-size: 1.05rem; color: #fff; margin-bottom: 10px;">DESKTOP PC CONTROLS & ARCHITECTURE</h4>
    <div class="modal-spec-grid">
      <div class="modal-spec-card">
        <span>Control Scheme</span>
        <strong>${game.controls}</strong>
      </div>
      <div class="modal-spec-card">
        <span>Target Platform</span>
        <strong>Steam (Windows PC) & Steam Deck</strong>
      </div>
    </div>

    <div style="display: flex; gap: 14px; flex-wrap: wrap; margin-top: 24px;">
      <button class="btn btn-glazed" onclick="castVote('${key}'); closeGameModal();">
        <span>Vote to Build This First!</span>
        <span class="btn-arrow">&rarr;</span>
      </button>
      <button class="btn btn-outline" onclick="closeGameModal()">
        <span>Back to Prototypes</span>
      </button>
    </div>
  `;

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeGameModal() {
  glazeAudio.playClick();
  const modal = document.getElementById('game-modal');
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = 'auto';
}

function closeModalOnBackdrop(e) {
  if (e.target.id === 'game-modal') {
    closeGameModal();
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeGameModal();
});

// --- 6. Glazed Toast Notifications ---
function showGlazedToast(msg, duration = 4000) {
  const wrapper = document.getElementById('toast-wrapper');
  if (!wrapper) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
      <span style="font-size: 1.1rem;">🐻</span>
      <strong style="font-family: var(--font-display); color: var(--glaze-coral); font-size: 0.88rem; letter-spacing: 0.5px;">GLZZLEXIBEAR STUDIOS</strong>
    </div>
    <div style="color: #cbd5e1; font-size: 0.92rem;">${msg}</div>
  `;

  wrapper.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (toast.parentElement) toast.parentElement.removeChild(toast);
    }, 400);
  }, duration);
}

// --- 7. Playtest Form Submission ---
function handleFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('form-name').value;
  const proto = document.getElementById('form-prototype').value;
  glazeAudio.playVote();
  showGlazedToast(`Welcome, ${name}! Your application for the "${proto}" desktop playtest has been received.`);
  e.target.reset();
}

// --- 8. Audio Toggle ---
function initAudioButton() {
  const btn = document.getElementById('sfx-toggle');
  if (!btn) return;

  const label = btn.querySelector('.sfx-label');

  btn.addEventListener('click', () => {
    const isNowOn = glazeAudio.toggle();
    if (isNowOn) {
      btn.classList.add('active');
      label.textContent = "SFX: ON";
      showGlazedToast("🍬 Juicy sound effects enabled!");
    } else {
      btn.classList.remove('active');
      label.textContent = "SFX: OFF";
      showGlazedToast("Muted sound effects");
    }
  });

  const hoverables = document.querySelectorAll('.btn, .prototype-card, .btn-vote, .social-pill');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => glazeAudio.playHover());
  });
}

// --- 9. Navigation ---
function initNavigation() {
  const header = document.getElementById('header');
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('nav-menu');
  const links = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
      glazeAudio.playClick();
    });

    links.forEach(l => {
      l.addEventListener('click', () => menu.classList.remove('open'));
    });
  }

  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const h = current.offsetHeight;
      const top = current.offsetTop - 140;
      const id = current.getAttribute('id');
      const target = document.querySelector(`.nav-menu a[href*="${id}"]`);
      if (target) {
        if (scrollY > top && scrollY <= top + h) {
          target.classList.add('active');
        } else {
          target.classList.remove('active');
        }
      }
    });
  });
}

function setYear() {
  const y = document.getElementById('current-year');
  if (y) y.textContent = new Date().getFullYear();
}

// Document Ready
document.addEventListener('DOMContentLoaded', () => {
  initGlazeCanvas();
  initAudioButton();
  initNavigation();
  fetchLiveVotes();
  setYear();
});
