/**
 * GlzzLexiBear Game Studios - Interactive Systems
 * Floating Glaze Sprinkles Canvas, Juicy Audio FX, Game Dossiers & Navigation
 */

// --- 1. Juicy Confectionary Audio Synthesis (Web Audio API) ---
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

  playSuccess() {
    if (!this.enabled || !this.ctx) return;
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((note, i) => {
      setTimeout(() => this.playPop(note, 0.1), i * 75);
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

      // Mouse repulsion
      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        const force = (100 - dist) / 100;
        this.x += (dx / dist) * force * 3;
        this.y += (dy / dist) * force * 3;
      }

      // Bounds wrap
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

// --- 3. Game Portfolio Catalog Filtering ---
function initCatalogFilters() {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.game-item-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      glazeAudio.playClick();
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(16px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

// --- 4. Game Dossier Database & Modal System ---
const GLZZ_GAMES = {
  sugarfist: {
    title: "SugarFist: Protocol Bear",
    status: "Flagship Desktop PC Project (Target: 2027)",
    genre: "Isometric Cyber-Confectionary Action Roguelike",
    platform: "Steam (Windows PC & Steam Deck Verified)",
    engine: "Unreal Engine 5.4 / DirectX 12 / Lumen",
    summary: `SugarFist: Protocol Bear combines GlzzLexiBear's juicy, vibrant art style with razor-sharp, punishing desktop combat. Step into the paw-guards of a cybernetically-enhanced teddy operative fighting through a rogue mechanized confectionary megacity.`,
    specs: [
      { label: "Input Precision", value: "8000Hz RawInput mouse & rebindable mechanical keyboard mapping" },
      { label: "Target Refresh", value: "Uncapped framerate (144Hz - 240Hz+ battlestation ready)" },
      { label: "Ultrawide Support", value: "Native 21:9 & 32:9 HUD scaling with zero letterboxing" },
      { label: "Steam Deck", value: "Tailored 60 FPS profile with custom gyro aiming" }
    ],
    features: [
      "Dynamic Glaze Gauge: Chaining frame-perfect parries charges your sweet glaze overdrive for kinetic room-clearing combos.",
      "Destructible candy environments with realistic Chaos physics and particle-heavy impact feedback.",
      "Full offline singleplayer campaign with scheduled co-op boss raids."
    ]
  },
  glazerunner: {
    title: "Glaze Runner: Overdrive",
    status: "PC Demo In Glzz Labs Testing",
    genre: "High-Speed Anti-Gravity Confectionary Racer",
    platform: "Steam (Windows & macOS)",
    engine: "Custom Low-Latency Engine + Vulkan",
    summary: `Supersonic anti-gravity arcade speedrunning along magnetic syrup tracks. Master tight analog steering, airbrake drift boosts, and dynamic soundtrack beat-matching.`,
    specs: [
      { label: "Engine Latency", value: "Sub-4ms input-to-photon latency target" },
      { label: "Course Editor", value: "Integrated Steam Workshop track creator" },
      { label: "Multiplayer", value: "16-Player Rollback Netcode with Ghost Leaderboards" },
      { label: "Audio Mix", value: "Reactive electronic chiptune basslines" }
    ],
    features: [
      "Analog throttle calibration designed for Hall-effect gamepad triggers and mechanical switches.",
      "Import your own music tracks for procedural speed course generation.",
      "Global speedrun leaderboards and replay sharing."
    ]
  },
  bearwitch: {
    title: "Bear Witch: Sweet Alchemist",
    status: "Original Studio Classic (Available)",
    genre: "Cozy RPG / Procedural Dungeon Delver",
    platform: "Desktop PC & Mobile",
    engine: "Unity 3D / Universal Render Pipeline",
    summary: `The game that defined the GlzzLexiBear charm: bake sweet enchanted pastries by morning, craft magical remedies, and descend into whimsical catacombs by moonlight.`,
    specs: [
      { label: "Playtime", value: "12+ Handcrafted hours of narrative & dungeon exploration" },
      { label: "Audio", value: "Original 24-track acoustic piano & accordion soundtrack" },
      { label: "Controller", value: "Full gamepad & touch screen gesture support" },
      { label: "Languages", value: "English, Japanese, German, French, Spanish" }
    ],
    features: [
      "Witty, humorous character interactions and cozy village management.",
      "Deep alchemical recipe experimentation with endless pastry variations.",
      "Zero pay-to-win mechanics — pure wholesome gameplay."
    ]
  },
  honeygrid: {
    title: "HoneyGrid Tactics",
    status: "Glzz Labs Sandbox Prototype",
    genre: "Hexagonal Squad Strategy / Roguelite",
    platform: "Windows Desktop PC",
    engine: "Godot 4.2 / High-Performance C# Core",
    summary: `Experimental tabletop-style squad skirmishes featuring customizable bear mechs on dynamic honeycomb grid battlefields with systemic chain reactions.`,
    specs: [
      { label: "Turn System", value: "Simultaneous timeline execution" },
      { label: "Resolution", value: "Pixel-perfect desktop scaling up to 4K" },
      { label: "Modding", value: "JSON-based mech weapon tuning & skinning" },
      { label: "Controls", value: "Designed specifically for fast mouse command macros" }
    ],
    features: [
      "Tactile honey-trap hazards that slow down and immobilize enemy forces.",
      "Custom squad mech builder with interchangeable chassis and armor plating.",
      "Community skirmish map sharing."
    ]
  }
};

function openGameModal(key) {
  glazeAudio.playClick();
  const game = GLZZ_GAMES[key];
  if (!game) return;

  const modal = document.getElementById('game-modal');
  const container = document.getElementById('modal-content');

  const specsHtml = game.specs.map(s => `
    <div class="modal-spec-card">
      <span>${s.label}</span>
      <strong>${s.value}</strong>
    </div>
  `).join('');

  const featuresHtml = game.features.map(f => `
    <li style="margin-bottom: 8px; color: #cbd5e1; font-size: 0.94rem;">${f}</li>
  `).join('');

  container.innerHTML = `
    <div style="margin-bottom: 20px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); padding-bottom: 18px;">
      <span class="category-pills" style="margin-bottom: 8px;">
        <span class="pill-berry">${game.status}</span>
      </span>
      <h2 style="font-family: var(--font-display); font-size: 1.9rem; color: #fff; margin: 8px 0 4px 0;">${game.title}</h2>
      <div style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--glaze-honey);">${game.genre} &bull; ${game.engine}</div>
    </div>

    <p style="color: #94a3b8; font-size: 1.05rem; line-height: 1.7; margin-bottom: 24px;">
      ${game.summary}
    </p>

    <h4 style="font-family: var(--font-display); font-size: 1.05rem; color: #fff; margin-bottom: 10px;">DESKTOP & TECHNICAL ARCHITECTURE</h4>
    <div class="modal-spec-grid">
      ${specsHtml}
    </div>

    <h4 style="font-family: var(--font-display); font-size: 1.05rem; color: #fff; margin: 24px 0 10px 0;">GAMEPLAY HIGHLIGHTS</h4>
    <ul style="padding-left: 20px; line-height: 1.6; margin-bottom: 30px;">
      ${featuresHtml}
    </ul>

    <div style="display: flex; gap: 14px; flex-wrap: wrap;">
      <button class="btn btn-glazed" onclick="showGlazedToast('Application logged for ${game.title} private testing!')">
        <span>Request Alpha Key</span>
        <span class="btn-arrow">&rarr;</span>
      </button>
      <button class="btn btn-outline" onclick="closeGameModal()">
        <span>Close Dossier</span>
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

// ESC closes modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeGameModal();
});

// --- 5. Glazed Toast Notifications ---
function showGlazedToast(msg, duration = 3500) {
  glazeAudio.playSuccess();
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

// --- 6. Form Submission ---
function handleFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('form-name').value;
  showGlazedToast(`Welcome to the crew, ${name}! Your desktop playtest application has been received.`);
  e.target.reset();
}

// --- 7. Audio Toggle Control ---
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

  // Hover sound for interactive elements
  const hoverables = document.querySelectorAll('.btn, .game-item-card, .filter-tab, .social-pill');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => glazeAudio.playHover());
  });
}

// --- 8. Navigation & Sticky Scroll ---
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

  // Active section spy
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

// --- 9. Dynamic Year ---
function setYear() {
  const y = document.getElementById('current-year');
  if (y) y.textContent = new Date().getFullYear();
}

// Ready
document.addEventListener('DOMContentLoaded', () => {
  initGlazeCanvas();
  initCatalogFilters();
  initAudioButton();
  initNavigation();
  setYear();
});
