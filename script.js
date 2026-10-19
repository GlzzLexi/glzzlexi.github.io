/**
 * GlzzLexi Game Studios - Interactive Scripts
 * Handles Ambient Canvas, Game Catalog Filtering, Modals, Audio Synthesis & Navigation
 */

// --- 1. Sound Synthesis (Web Audio API) ---
class StudioAudioFX {
  constructor() {
    this.ctx = null;
    this.enabled = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
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

  playTone(freq = 440, type = 'sine', duration = 0.08, gainVal = 0.05) {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio FX error", e);
    }
  }

  playHover() {
    this.playTone(600, 'sine', 0.04, 0.02);
  }

  playClick() {
    this.playTone(880, 'triangle', 0.1, 0.05);
  }

  playSuccess() {
    if (!this.enabled || !this.ctx) return;
    this.playTone(523.25, 'triangle', 0.1, 0.04);
    setTimeout(() => this.playTone(659.25, 'triangle', 0.1, 0.04), 100);
    setTimeout(() => this.playTone(783.99, 'triangle', 0.15, 0.05), 200);
  }
}

const sfx = new StudioAudioFX();

// --- 2. Ambient Particles Canvas ---
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = 45;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 1.6 + 0.8;
      this.alpha = Math.random() * 0.5 + 0.2;
      this.color = Math.random() > 0.5 ? '#00f2fe' : '#a855f7';
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function loop() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines if close
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = '#00f2fe';
          ctx.globalAlpha = (1 - dist / 120) * 0.12;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(loop);
  }

  loop();
}

// --- 3. Game Portfolio Filtering ---
function initGameFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const gameCards = document.querySelectorAll('.game-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sfx.playClick();
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      gameCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

// --- 4. Game Dossier Database & Modal ---
const GAME_DATABASE = {
  aetheria: {
    title: "Aetheria: Zero Protocol",
    status: "Flagship Desktop Active Dev (Target: 2027)",
    genre: "Kinetic Sci-Fi Action RPG / High-Speed Slasher",
    platforms: "Steam (Windows PC), Desktop Native",
    engine: "Unreal Engine 5.4 / DirectX 12 Ultimate / Lumen",
    description: `Aetheria: Zero Protocol represents GlzzLexi's bold expansion into high-budget desktop PC gameplay. 
    Constructed around high-velocity wall-running, responsive parry-timing, and fluid weapon transformations, the game challenges players inside an abandoned atmospheric research satellite.`,
    specs: [
      { label: "Target Framerate", val: "Uncapped (144+ FPS Recommended)" },
      { label: "Display Support", val: "16:9, 21:9, and 32:9 Super Ultra-Wide" },
      { label: "Input Tech", val: "DirectInput 8000Hz polling + Gamepad mapping" },
      { label: "Audio", val: "Dynamic HRTF 3D Ambisonics" }
    ],
    features: [
      "Customizable combat modules: swap sword blades, kinetic rail charges, and nano-grappling hooks.",
      "Destructible biomechanical environments powered by Chaos physics.",
      "Full offline singleplayer campaign with scheduled co-op raid dungeons."
    ]
  },
  hypervibe: {
    title: "HyperVibe: Neon Drift",
    status: "Closed Alpha / Desktop Demo in Testing",
    genre: "High-Speed Anti-Gravity Rhythm Arcade",
    platforms: "Steam (Windows & macOS)",
    engine: "Custom Low-Latency Engine + Vulkan",
    description: `Rip through synthetic neon hyper-highways hovering millimeters above magnetic tracks. Every turn, boost, and air-brake pulses in exact sync with heavy electronic soundscapes. Includes built-in track editor and Steam Workshop integration.`,
    specs: [
      { label: "Latency Target", val: "Sub-4ms input response" },
      { label: "Tracks", val: "24 Official + Community Custom Circuit Editor" },
      { label: "Multiplayer", val: "16-Player Peer-to-Peer Rollback Netcode" },
      { label: "Visual Mode", val: "Synthesizer Reactive HDR Mode" }
    ],
    features: [
      "Full flight-stick, keyboard, and controller analog trigger calibration.",
      "Custom beatmap generator: import personal WAV / FLAC / MP3 tracks.",
      "Global desktop speedrun leaderboards and ghost replay sharing."
    ]
  },
  echoes: {
    title: "Echoes of Lexi",
    status: "Studio Foundational Debut (Available)",
    genre: "Atmospheric Narrative Puzzle Adventure",
    platforms: "PC (Desktop) & Mobile",
    engine: "Unity 3D / Universal Render Pipeline",
    description: `The game that founded GlzzLexi's identity. Explore mysterious ancient clockwork ruins and restore energy to long-dormant celestial observatories. A serene, contemplative narrative puzzle journey praised for its art style and emotive piano-driven score.`,
    specs: [
      { label: "Playtime", val: "6 - 8 Hours of Handcrafted Puzzles" },
      { label: "Audio", val: "Original 22-track orchestral acoustic score" },
      { label: "Languages", val: "English, Japanese, French, German, Spanish" },
      { label: "Achievements", val: "30 Hidden Lore Trophies" }
    ],
    features: [
      "No dialogue, pure visual storytelling and environment cues.",
      "Innovative celestial alignment mechanics manipulating solar gears.",
      "Photo mode with vintage cinematic filters."
    ]
  },
  tactics: {
    title: "Glzz Tactics: Iron Grid",
    status: "Glzz Labs Prototype (Pre-Production)",
    genre: "Turn-Based Tactical Squad Skirmisher / Roguelite",
    platforms: "Windows Desktop PC",
    engine: "Godot 4.2 / High-performance 2.5D C# Core",
    description: `An experimental project emerging from GlzzLexi internal hackathons. Command an underdog mercenary lance of customized bipedal mechs in tight grid-based tactical encounters with permadeath and systemic elemental hazards.`,
    specs: [
      { label: "Turn System", val: "Simultaneous resolution / initiative timeline" },
      { label: "Procedural", val: "Randomized urban hazard contracts" },
      { label: "Modding", val: "JSON-based mech weapon tuning & skinning" },
      { label: "Platform", val: "Optimized for Desktop Mouse & Keyboard commands" }
    ],
    features: [
      "Heat management and localized limb armor damage simulation.",
      "Dynamic weather hazards (Ion storms disable radar, acidic rain corrodes shields).",
      "Permadeath roguelite campaign mode."
    ]
  }
};

function openGameModal(gameKey) {
  sfx.playClick();
  const game = GAME_DATABASE[gameKey];
  if (!game) return;

  const modal = document.getElementById('game-modal');
  const modalContent = document.getElementById('modal-body-content');

  const specsHtml = game.specs.map(s => `
    <div class="modal-spec-item">
      <span>${s.label}</span>
      <strong>${s.val}</strong>
    </div>
  `).join('');

  const featuresHtml = game.features.map(f => `
    <li style="margin-bottom: 8px; color: #cbd5e1; font-size: 0.95rem;">${f}</li>
  `).join('');

  modalContent.innerHTML = `
    <div class="modal-dossier-header">
      <div class="pill pill-pc" style="display: inline-block; margin-bottom: 10px;">${game.status}</div>
      <h2 style="font-family: var(--font-display); font-size: 1.8rem; color: #fff; margin-bottom: 6px;">${game.title}</h2>
      <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--neon-cyan);">${game.genre}</div>
    </div>
    <div class="modal-body-text">
      <p style="color: #94a3b8; font-size: 1.02rem; line-height: 1.68; margin-bottom: 20px;">
        ${game.description}
      </p>

      <h4 style="font-family: var(--font-display); font-size: 1rem; color: #fff; margin-bottom: 10px;">DESKTOP & TECHNICAL ARCHITECTURE</h4>
      <div class="modal-spec-grid">
        ${specsHtml}
      </div>

      <h4 style="font-family: var(--font-display); font-size: 1rem; color: #fff; margin: 20px 0 10px 0;">CORE HIGHLIGHTS</h4>
      <ul style="padding-left: 20px; line-height: 1.6; margin-bottom: 30px;">
        ${featuresHtml}
      </ul>

      <div style="display: flex; gap: 14px; flex-wrap: wrap;">
        <button class="btn btn-primary" onclick="showToast('Registered! You will receive alpha build updates for ${game.title}')">
          <span>Apply for Private Alpha</span>
        </button>
        <button class="btn btn-outline" onclick="closeGameModal()">
          <span>Close Dossier</span>
        </button>
      </div>
    </div>
  `;

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeGameModal() {
  sfx.playClick();
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

// ESC key closes modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeGameModal();
  }
});

// --- 5. Toast Notifications ---
function showToast(message, duration = 3500) {
  sfx.playSuccess();
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<strong>GLZZLEXI NOTIFICATION</strong><div style="margin-top: 4px; color: #cbd5e1;">${message}</div>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (toast.parentElement) toast.parentElement.removeChild(toast);
    }, 400);
  }, duration);
}

// --- 6. Form Submission Handler ---
function handleFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('user-name').value;
  const email = document.getElementById('user-email').value;
  const rig = document.getElementById('user-rig').value;

  showToast(`Thank you, ${name}! Your desktop playtest application has been logged.`);
  e.target.reset();
}

// --- 7. Header Navigation & Scroll Effects ---
function initNavigation() {
  const header = document.getElementById('header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navItems = document.querySelectorAll('.nav-item');

  // Sticky header class
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      sfx.playClick();
    });

    // Close when clicking nav items
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // Active section indicator
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNav = document.querySelector(`.nav-links a[href*="${sectionId}"]`);
      if (targetNav) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetNav.classList.add('active');
        } else {
          targetNav.classList.remove('active');
        }
      }
    });
  });
}

// --- 8. Audio Toggle ---
function initAudioToggle() {
  const sfxBtn = document.getElementById('sfx-toggle');
  if (!sfxBtn) return;

  const onIcon = sfxBtn.querySelector('.sfx-on-icon');
  const offIcon = sfxBtn.querySelector('.sfx-off-icon');

  sfxBtn.addEventListener('click', () => {
    const isEnabled = sfx.toggle();
    if (isEnabled) {
      onIcon.classList.remove('hidden');
      offIcon.classList.add('hidden');
      sfx.playSuccess();
      showToast('Synthesized UI audio enabled');
    } else {
      onIcon.classList.add('hidden');
      offIcon.classList.remove('hidden');
      showToast('Synthesized UI audio muted');
    }
  });

  // Add subtle hover sound to interactive elements
  const hoverables = document.querySelectorAll('.btn, .game-card, .filter-btn, .social-btn');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      sfx.playHover();
    });
  });
}

// --- 9. Dynamic Year ---
function setDynamicYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

// Document Ready
document.addEventListener('DOMContentLoaded', () => {
  initAmbientCanvas();
  initGameFilters();
  initNavigation();
  initAudioToggle();
  setDynamicYear();
});
