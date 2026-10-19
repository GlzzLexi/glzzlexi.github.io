# GlzzLexi Game Studios - Official Website

Welcome to the official static website for **GlzzLexi Studios** — an independent game studio showcasing our indie roots and spearheading our expansion into **high-performance desktop gaming**.

This project is built with zero runtime dependencies (pure HTML5, CSS3, modern Vanilla JavaScript), making it **lightning-fast, 100% free to host, and natively compatible with GitHub Pages and GitHub Education custom domains**.

---

## 🚀 Quick Local Preview

To test and preview the website right now:
1. Open the file directly in any modern browser:
   - Double-click `index.html` in your file explorer, OR
2. In PowerShell, run:
   ```powershell
   Start-Process "C:\Users\USER\.gemini\antigravity\scratch\glzzlexi-website\index.html"
   ```
3. Or start a local lightweight web server:
   ```bash
   python -m http.server 8000
   ```
   Then visit `http://localhost:8000`.

---

## 🌐 Deploying to GitHub Pages with Free GitHub Education Domain

### Step 1: Create a GitHub Repository
1. Go to [GitHub](https://github.com/new).
2. Create a new public repository (e.g. `glzzlexi-website` or `<your-username>.github.io`).
3. In your local terminal, initialize and push:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of GlzzLexi company website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```

---

### Step 2: Enable GitHub Pages
1. In your GitHub repository, click **Settings** (gear icon).
2. In the left sidebar, click **Pages** (under the "Code and automation" section).
3. Under **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: **main** / Folder: `/(root)`
4. Click **Save**. Within 1–2 minutes, your site will be live at:
   `https://<your-username>.github.io/<repo-name>/`

---

### Step 3: Connect Your Free GitHub Education Domain

Through the **GitHub Student Developer Pack**, you typically get free domains from registrars like:
- **Namecheap** (Free 1-year `.me` domain)
- **Name.com** (Free 1-year domain like `.live`, etc.)
- **get.tech** (Free 1-year `.tech` domain)

#### A. Configure DNS at Your Domain Registrar
Log into your domain registrar's DNS management dashboard (e.g. Namecheap Advanced DNS):

1. **If using Apex domain (`yourdomain.com` or `glzzlexi.me`):**
   Add four **A Records** pointing to GitHub's IPs:
   | Type | Host | Value |
   |------|------|-------|
   | A Record | `@` | `185.199.108.153` |
   | A Record | `@` | `185.199.109.153` |
   | A Record | `@` | `185.199.110.153` |
   | A Record | `@` | `185.199.111.153` |

2. **Add a CNAME Record for `www` (optional but recommended):**
   | Type | Host | Value |
   |------|------|-------|
   | CNAME | `www` | `<your-username>.github.io` |

#### B. Configure the Domain in GitHub
1. Create a file named `CNAME` in the root of your repo (you can rename `CNAME.example` to `CNAME`).
2. Add your domain inside it (e.g., `glzzlexi.me` or `www.glzzlexi.me`).
3. In your repo: **Settings -> Pages -> Custom domain**, type your domain and click **Save**.
4. Check **Enforce HTTPS** (GitHub generates a free SSL certificate automatically within a few minutes).

---

## 🎨 Website Structure & Features

- **Cyber-Dark Gamer Aesthetics**: Glowing neon accents, glassmorphic cards, custom typography (`Orbitron` & `Plus Jakarta Sans`).
- **Desktop Gaming Expansion Spotlight**: Dedicated section for your flagship PC project (`Project Aetheria: Zero Protocol`), ultrawide monitor specs, uncapped FPS badges, and Steam wishlist buttons.
- **Interactive Portfolio Catalog**: Filter between Desktop/PC, Indie & Mobile, and Experimental Labs.
- **Game Dossier Modals**: Click on any game card to inspect deep technical specs, target framerates, engine pipelines, and feature lists.
- **Web Audio API UI Sounds**: Built-in futuristic synthesizer sound effects with a toggle/mute button (zero external MP3 assets needed).
- **Responsive Navigation**: Smooth scrolling with section-aware active states and mobile hamburger menu.
- **Playtest & Studio Contact Form**: Dedicated form for gamers and publishers to reach out.

---

## 🛠️ Customization Guide

- **Change Studio Name / Tagline**: Edit `index.html` lines 20-35.
- **Add / Edit Games**: Edit the game cards in `index.html` (under `<section class="games-section">`) and update `GAME_DATABASE` in `script.js` to change modal specs.
- **Colors & Glows**: Adjust CSS variables at the top of `style.css` (e.g., `--neon-cyan`, `--neon-purple`, `--bg-primary`).
