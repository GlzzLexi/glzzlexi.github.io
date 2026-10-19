# GlzzLexi Studios — Official Website Architecture

> **"SHARP WIT. SWEET GLAZE."**  
> Independent Game Company founded by **John Gabriel** (Gabriel Ronao).  
> Evolving from modular Roblox systems to our first standalone paid **3D First-Person Desktop PC game**, sold and distributed directly right here on this website.

Official Website Repository for **GlzzLexi Studios** ([@GlzzLexi](https://github.com/GlzzLexi)).  
Frontend built with a **lightweight HTML shell** (`index.html`) hydrated dynamically by client-side JavaScript. Minified for ultra-fast production loading, with unminified human-readable source code organized in `src/` for private development.

---

## 📁 Repository Structure

```text
glzzlexi-website/
├── index.html              # Minimal production HTML shell (~40 lines)
├── style.min.css           # Minified production CSS (27 KB)
├── script.min.js           # Minified production JavaScript app (39 KB)
├── package.json            # npm scripts for minification and dev server
├── assets/                 # High-resolution visual assets
│   ├── logo.png            # Official GlzzLexiBear / GlzzLexi Studios logo
│   ├── prototype_9_5.jpg   # 3D First-Person: 9-5 Get Me Out
│   ├── prototype_study.jpg # 3D First-Person: Study Picky
│   ├── prototype_mark.jpg  # 3D First-Person: Mark Mark What The
│   └── prototype_streamer.jpg # 3D First-Person: Guys Watch Me Now
├── src/                    # 🔒 Readable unminified source code for Private Repo
│   ├── app.js              # Complete modular JavaScript application source
│   ├── style.css           # Complete handcrafted stylesheet source
│   └── index.html          # Dev version template pointing to readable src/
└── backend/                # Cloudflare Worker voting edge API scripts
    ├── cloudflare-worker.js
    ├── requirements.txt
    └── README.md
```

---

## 🔒 Pushing Readable Source to Your Personal Private GitHub Repo

If you want to keep the readable unminified code in your **private repository** while deploying the root production build to GitHub Pages, you can configure two git remotes:

### 1. View your current remotes
```powershell
git remote -v
```

### 2. Add your personal private repository as a remote
```powershell
git remote add private https://github.com/YOUR_USERNAME/glzzlexi-source-private.git
```

### 3. Push all branches and unminified `src/` files to your private repo
```powershell
git push -u private main
```

*(You can also push to both origin and private with a single command whenever you make updates!)*

---

## 🛠️ Modifying & Rebuilding Minified Files

Whenever you edit `src/style.css` or `src/app.js`, rebuild the minified production files with:

```powershell
# Run the complete build (minifies both CSS and JS)
npm run build

# Or individually:
npm run build:css
npm run build:js
```

---

## 🎮 What This Website Features

1. **GlzzLexi Studios & Founder Story**:
   - Founded and led by **John Gabriel** (Gabriel Ronao), a 3rd-year Computer Engineering student.
   - Built on a shared foundation of modular game systems, data persistence, and development tooling.
   - Currently solo-operated, with the vision to grow into a specialized indie team of developers, technical artists, and scripters.
   - Candid, authentic student dev message explaining the reality of balancing thesis, coursework, and solo game development.

2. **Roblox Track Record & Pipeline**:
   - **Steal an Anomaly: Lab Breach Tycoon**: Live studio release on Roblox ([Play Here](https://www.roblox.com/games/134889225269060/STEAL-AN-ANOMALY-LAB-BREACH-TYCOON)).
   - **Untitled Anime Project (Tensura-Inspired)**: Systems-driven RPG showcase on hold while foundational releases advance.
   - **Untitled Zombie Roadtrip Game**: Survival co-op roadtrip in active development.

3. **The 4 3D First-Person Desktop Prototypes**:
   - **`9-5 Get Me Out`**: 3D first-person workplace stealth & boss sabotage escape thriller.
   - **`Study Picky`**: 3D first-person ADHD sensory defense & memory survival comedy.
   - **`Mark Mark What The`**: 3D first-person chaotic dual-personality action puzzle.
   - **`Guys Watch Me Now`**: 3D first-person interactive AI livestreamer simulation horror-comedy.

4. **Community Greenlight Voting (Live Cloudflare Worker API)**:
   - Connected directly to: `https://glzz-voting-api.glzzjhn.workers.dev`.
   - **1 vote per IP address** (via `CF-Connecting-IP` + SHA-256 hash).
   - Only **ONE** game will be chosen to be developed and released first!

5. **Direct Website Commerce Blueprint (No Steam Fees)**:
   - Zero \$100 Steam fee, zero 30% platform cut.
   - Direct standalone DRM-free Windows `.exe` download.
   - Local Philippine payments (GCash QR, Maya) + Global (Debit/Credit Cards, PayPal).

---

## 🚀 Instant Local Preview

Run this in PowerShell to open the site in your browser:
```powershell
Start-Process "C:\Users\USER\.gemini\antigravity\scratch\glzzlexi-website\index.html"
```

Or run a local HTTP server:
```powershell
npm run serve
```
