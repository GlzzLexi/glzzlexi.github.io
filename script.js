/**
 * GlzzLexiBear Game Studios
 * Handcrafted vanilla JS by an indie dev & Computer Engineering student.
 * Features:
 * - Live Cloudflare Worker voting endpoint with IP deduplication
 * - 4 3D First-Person prototype dossiers
 * - Direct website distribution / payment simulation modal
 * - Web Audio API bubble pop synthesizer
 * - Glazed sprinkles background canvas
 */

// --- 1. CONFIGURATION ---
const API_BASE_URL = "https://glzz-voting-api.glzzjhn.workers.dev";

// --- 2. AUDIO SYNTHESIS (Zero External MP3 Assets) ---
class AudioSynthesizer {
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

const sfx = new AudioSynthesizer();

// --- 3. AMBIENT SPRINKLES CANVAS ---
function initSprinklesCanvas() {
  const canvas = document.getElementById('glaze-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let sprinkles = [];
  const count = 42;

  const palette = ['#ff758c', '#ffa74f', '#fff5ea', '#6d3d22', '#c084fc'];

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

// --- 4. 4 PROTOTYPES DATABASE ---
const PROTOTYPES = {
  nine_to_five: {
    title: "9-5 Get Me Out",
    subtitle: "Workplace Stealth & Psychological Escape Thriller",
    pitch: `Naranasan mo na ba yung feeling na gusto mo nang mag-resign pero ayaw ka pakawalan ng boss mo? You are the most productive corporate employee, but your boss secretly sabotages your promotion papers, intercepts your resignation letters, and locks down the floor with CCTV cameras.`,
    mechanics: [
      "Cubicle Stealth: Crouch behind desks, peek over monitors, and time your moves around roaming HR staff and cameras.",
      "Evidence & Blackmail: Dig through corporate shredders, unlock the manager's desk, and find evidence of illegal sabotage to earn your freedom.",
      "Sanity Meter: The longer you're trapped past 5:00 PM, the more the office shifts into psychological surrealism."
    ],
    controls: "WASD Walk & Crouch, E Interact / Hack, Q/E Lean Peek, Mouse Look",
    image: "assets/prototype_9_5.jpg"
  },

  study_picky: {
    title: "Study Picky",
    subtitle: "ADHD Sensory Defense & Memory Survival Simulator",
    pitch: `Final exam mo na in 2 hours pero lumilipad ang utak mo. Sit at your physical study desk under a warm lamp. Swat away flying intrusive thoughts, neon paper planes, and sensory distractions using your ruler before they erase your study progress!`,
    mechanics: [
      "Distraction Swatting: Hit daydream apparitions before they distract you and drain your focus bar.",
      "Memory Flashcards: Retain complex equations before brain fog wipes your short-term memory.",
      "Caffeine Balance: Drink coffee to study faster, but don't overdo it or your hands will shake uncontrollably."
    ],
    controls: "Mouse Cursor Free-Look / Desk Interaction, Spacebar Swat Distraction, Tab Notes",
    image: "assets/prototype_study.jpg"
  },

  mark_mark: {
    title: "Mark Mark What The",
    subtitle: "Chaotic Dual-Personality 3D Puzzle Action",
    pitch: `You play as Mark, trying to solve high-stakes escape missions. The twist? Your unhinged alter-ego can hijack control of your right hand anytime. One moment you're trying to carefully lockpick a safe, the next moment your right arm punches a guard or chucks your keycard out the window!`,
    mechanics: [
      "Hand Hijacking: Adapt instantly when your right hand starts doing unpredictable actions on its own.",
      "Chaotic Co-op: Sometimes the crazy alter-ego's brute strength is the only way to smash locked vault doors that Mark cannot open.",
      "Mirror Truce: Speak to yourself in mirrors to negotiate temporary control windows."
    ],
    controls: "WASD Walk, Left Click (Mark / Calm), Right Click (Alter-Ego / Chaos), Q Self-Talk",
    image: "assets/prototype_mark.jpg"
  },

  guys_watch: {
    title: "Guys Watch Me Now",
    subtitle: "Interactive AI Livestreamer Simulator & Horror-Comedy",
    pitch: `You are Clyde, an ambitious desktop streamer. Sitting in front of your dual monitors, an interactive simulated AI audience watches and judges your every move in real time. To keep the viewer count from dropping to zero, you must balance playing games while fulfilling chaotic real-life apartment dares from the chat!`,
    mechanics: [
      "Interactive AI Chat: Viewers roast your plays, spam custom memes, send TTS donations, and vote on your next dare.",
      "Apartment Dares: Chat dares you to investigate weird noises in your hallway or eat cursed midnight food deliveries.",
      "Swatting & Clout: Balance viral fame against paranoid troll viewers trying to swat your apartment."
    ],
    controls: "WASD Walk Apartment, Mouse Look, Left Click PC Gaming, F Stream Cam, T Chat",
    image: "assets/prototype_streamer.jpg"
  }
};

// --- 5. LIVE VOTING (CLOUDFLARE WORKER + IP PROTECTION) ---
const FALLBACK_VOTES = {
  nine_to_five: 184,
  study_picky: 162,
  mark_mark: 171,
  guys_watch: 198
};

async function fetchLiveVotes() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/votes`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.votes) {
        renderVoteTally(data.votes);
        return;
      }
    }
  } catch (e) {
    console.warn("Backend unavailable, using cached tallies", e);
  }

  // Local fallback
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
      const original = btn.getAttribute('data-txt');
      if (original) btn.textContent = original;
    });

    const activeBtn = document.querySelector(`.vote-row[data-game="${myVote}"] .btn-vote`);
    if (activeBtn) {
      if (!activeBtn.getAttribute('data-txt')) {
        activeBtn.setAttribute('data-txt', activeBtn.textContent);
      }
      activeBtn.classList.add('voted');
      activeBtn.textContent = "Your Vote ✓";
    }
  }
}

async function castVote(gameKey) {
  sfx.playChime();
  const game = PROTOTYPES[gameKey];
  const name = game ? game.title : gameKey;

  try {
    const res = await fetch(`${API_BASE_URL}/api/vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ game: gameKey })
    });

    const data = await res.json();

    if (res.status === 403 || data.alreadyVoted) {
      showToast(`⚠️ Naka-boto na ang IP address mo! 1 vote per IP network lang to avoid spam.`);
      return;
    }

    if (data.success && data.votes) {
      localStorage.setItem('glzz_cast_choice', gameKey);
      renderVoteTally(data.votes);
      showToast(`🎉 OFFICIAL VOTE RECORDED! Bumoto ka para sa "${name}". Live na na-log sa Cloudflare!`);
      return;
    }
  } catch (err) {
    console.warn("API request failed, fallback local", err);
  }

  // Local fallback simulation
  const cached = localStorage.getItem('glzz_local_votes');
  const votes = cached ? JSON.parse(cached) : { ...FALLBACK_VOTES };
  votes[gameKey] = (votes[gameKey] || 0) + 1;
  localStorage.setItem('glzz_local_votes', JSON.stringify(votes));
  localStorage.setItem('glzz_cast_choice', gameKey);
  renderVoteTally(votes);
  showToast(`🎉 VOTE RECORDED! Bumoto ka para sa "${name}"!`);
}

// --- 6. PROTOTYPE DOSSIER MODAL ---
function openPrototypeModal(key) {
  sfx.playPop(580);
  const game = PROTOTYPES[key];
  if (!game) return;

  const modal = document.getElementById('proto-modal');
  const container = document.getElementById('modal-body-inject');

  const mechanicsList = game.mechanics.map(m => `
    <li style="margin-bottom: 8px; color: #cbd5e1; font-size: 0.92rem; line-height: 1.55;">${m}</li>
  `).join('');

  container.innerHTML = `
    <div class="modal-img-wrap">
      <img src="${game.image}" alt="${game.title} Screenshot">
    </div>

    <div style="margin-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 12px;">
      <span class="section-badge" style="margin-bottom: 6px;">3D FIRST PERSON INDIE</span>
      <h2 style="font-family: var(--font-display); font-size: 1.8rem; color: #fff; margin: 4px 0;">${game.title}</h2>
      <div style="font-family: var(--font-code); font-size: 0.8rem; color: var(--coral);">${game.subtitle}</div>
    </div>

    <p style="color: #cbd5e1; font-size: 0.98rem; line-height: 1.65; margin-bottom: 20px;">
      ${game.pitch}
    </p>

    <h4 style="font-family: var(--font-heading); font-size: 0.98rem; color: #fff; margin-bottom: 8px;">CORE GAMEPLAY MECHANICS:</h4>
    <ul style="padding-left: 20px; margin-bottom: 20px;">
      ${mechanicsList}
    </ul>

    <div class="modal-specs-grid">
      <div>
        <span>PLANNED CONTROLS</span>
        <strong>${game.controls}</strong>
      </div>
      <div>
        <span>RELEASE MODEL</span>
        <strong>Direct Website Download (No Steam Cut)</strong>
      </div>
    </div>

    <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-top: 20px;">
      <button class="btn btn-primary" onclick="castVote('${key}'); closePrototypeModal();">
        <span>Vote to Build This One First!</span>
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
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = 'auto';
}

function closeModalOnBackdrop(e) {
  if (e.target.id === 'proto-modal') closePrototypeModal();
}

// --- 7. DIRECT PAYMENT MODAL SIMULATION ---
function openDirectPaymentModal() {
  sfx.playPop(620);
  const modal = document.getElementById('payment-modal');
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closePaymentModal() {
  sfx.playPop(440);
  const modal = document.getElementById('payment-modal');
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = 'auto';
}

function closePaymentModalOnBackdrop(e) {
  if (e.target.id === 'payment-modal') closePaymentModal();
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closePrototypeModal();
    closePaymentModal();
  }
});

// --- 8. TOAST NOTIFICATIONS ---
function showToast(msg, duration = 3800) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `
    <div style="font-family: var(--font-heading); color: var(--coral); font-size: 0.8rem; font-weight: 700; margin-bottom: 2px;">
      🐻 GLZZLEXIBEAR DEV NOTE
    </div>
    <div style="color: #e2e8f0; font-size: 0.88rem;">${msg}</div>
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

// --- 9. CONTACT FORM HANDLER ---
function handleContactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('c-name').value;
  sfx.playChime();
  showToast(`Salamat, ${name}! Na-receive ko na ang feedback mo para sa game dev alpha.`);
  e.target.reset();
}

// --- 10. NAVIGATION & AUDIO TOGGLE ---
function initControls() {
  const sfxBtn = document.getElementById('sfx-btn');
  const sfxText = document.getElementById('sfx-text');

  if (sfxBtn) {
    sfxBtn.addEventListener('click', () => {
      const active = sfx.toggle();
      if (active) {
        sfxBtn.classList.add('active');
        sfxText.textContent = "AUDIO: ON";
        sfx.playChime();
        showToast("Audio feedback enabled!");
      } else {
        sfxBtn.classList.remove('active');
        sfxText.textContent = "AUDIO: OFF";
        showToast("Audio muted");
      }
    });
  }

  // Hover SFX
  document.querySelectorAll('.btn, .proto-card, .btn-vote, .social-btn').forEach(el => {
    el.addEventListener('mouseenter', () => sfx.playPop(720, 0.02));
  });

  // Mobile menu
  const burger = document.getElementById('burger-btn');
  const nav = document.getElementById('main-nav');

  if (burger && nav) {
    burger.addEventListener('click', () => {
      nav.classList.toggle('open');
      sfx.playPop(520);
    });

    nav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => nav.classList.remove('open'));
    });
  }

  // Year
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
}

// --- DOM READY ---
document.addEventListener('DOMContentLoaded', () => {
  initSprinklesCanvas();
  initControls();
  fetchLiveVotes();
});
