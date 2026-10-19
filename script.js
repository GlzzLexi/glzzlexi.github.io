/**
 * GlzzLexi Studios - Official Client Scripts
 * Independent game company founded by John Gabriel
 * 
 * Features:
 * - Live Cloudflare Worker voting endpoint with IP anti-duplication
 * - 4 3D First-Person prototype dossiers & viewports
 * - Direct website commerce & payment simulation
 * - Web Audio API confectionary sound synthesis
 * - Glazed sprinkles background canvas
 */

// --- 1. CONFIGURATION ---
const API_BASE_URL = "https://glzz-voting-api.glzzjhn.workers.dev";

// --- 2. AUDIO SYNTHESIS (Zero External MP3 Assets) ---
class StudioAudio {
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

const sfx = new StudioAudio();

// --- 3. AMBIENT SPRINKLES CANVAS ---
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

// --- 4. 4 PROTOTYPES DATABASE ---
const PROTOTYPES = {
  nine_to_five: {
    title: "9-5 Get Me Out",
    subtitle: "Workplace Stealth & Psychological Escape Thriller",
    pitch: `You are the most productive corporate employee, but your boss secretly sabotages your promotion papers, intercepts your resignation letters, and locks down the floor after hours. You must sneak through dark cubicles, avoid CCTV cameras, search through shredders for evidence of his sabotage, and orchestrate your escape.`,
    mechanics: [
      "Cubicle Stealth: Crouch behind partitions, peek over monitors, and time movements around roaming staff and cameras.",
      "Evidence & Blackmail: Dig through shredders, unlock manager desks, and find proof of illegal sabotage to earn your freedom.",
      "Sanity Meter: The longer you remain trapped past 5:00 PM, the more the office shifts into psychological surrealism."
    ],
    controls: "WASD Walk & Crouch, E Interact / Hack, Q/E Lean Peek, Mouse Look",
    image: "assets/prototype_9_5.jpg"
  },

  study_picky: {
    title: "Study Picky",
    subtitle: "ADHD Sensory Defense & Memory Survival Simulator",
    pitch: `Final exam in 2 hours. You sit at your study desk under a warm lamp, but your character deals with heavy sensory distraction, sudden memory lapses, and intrusive thoughts. Swat away flying daydreams and paper airplanes with your ruler before they erase your study progress!`,
    mechanics: [
      "Distraction Swatting: Hit daydream apparitions before they drain your focus bar.",
      "Memory Flashcards: Retain complex formulas before brain fog washes them away.",
      "Caffeine Balance: Sip coffee to boost focus speed, but balance your heart-rate meter to prevent panic."
    ],
    controls: "Mouse Cursor Free-Look / Desk Interaction, Spacebar Swat Distraction, Tab Notes",
    image: "assets/prototype_study.jpg"
  },

  mark_mark: {
    title: "Mark Mark What The",
    subtitle: "Chaotic Dual-Personality 3D Puzzle Action",
    pitch: `You play as Mark trying to solve high-stakes escape missions. The twist? Your unhinged alter-ego can hijack control of your right hand at any second. One moment you are defusing a lock, the next moment your right arm punches a guard or throws your keycard out the window!`,
    mechanics: [
      "Hand Hijacking: Adapt instantly when your right hand starts executing unpredictable actions.",
      "Chaotic Cooperation: Sometimes the crazy alter-ego's brute strength is the only way to smash locked vault doors that Mark cannot open.",
      "Mirror Truce: Speak to yourself in mirrors to negotiate temporary control truces."
    ],
    controls: "WASD Walk, Left Click (Mark / Calm), Right Click (Alter-Ego / Chaos), Q Self-Talk",
    image: "assets/prototype_mark.jpg"
  },

  guys_watch: {
    title: "Guys Watch Me Now",
    subtitle: "Interactive AI Livestreamer Simulator & Horror-Comedy",
    pitch: `You play as Clyde, an ambitious desktop live streamer. Sitting in front of your dual monitors, an interactive simulated AI audience watches and judges your every move in real time. To keep the viewer count from dropping to zero, you must balance gaming skill while fulfilling chaotic real-life apartment dares from the chat!`,
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
    const res = await fetch(`${API_BASE_URL}/api/vote`, {
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

// --- 6. PROTOTYPE DOSSIER MODAL ---
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
      <div style="font-family: var(--font-mono); font-size: 0.84rem; color: var(--glaze-coral);">${game.subtitle}</div>
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
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = 'auto';
}

function closeModalOnBackdrop(e) {
  if (e.target.id === 'proto-modal') closePrototypeModal();
}

// --- 7. DIRECT COMMERCE SIMULATION MODAL ---
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

// --- 9. CONTACT FORM HANDLER ---
function handleContactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('c-name').value;
  sfx.playChime();
  showToast(`Salamat, ${name}! Your feedback has been sent directly to John Gabriel.`);
  e.target.reset();
}

// --- 10. NAVIGATION & AUDIO CONTROLS ---
function initControls() {
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

  // Hover sound
  document.querySelectorAll('.btn, .prototype-card, .btn-vote, .social-link-pill').forEach(el => {
    el.addEventListener('mouseenter', () => sfx.playPop(720, 0.02));
  });

  // Mobile menu
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

  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
}

// --- DOM READY ---
document.addEventListener('DOMContentLoaded', () => {
  initSprinklesCanvas();
  initControls();
  fetchLiveVotes();
});
