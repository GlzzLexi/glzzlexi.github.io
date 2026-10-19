# GlzzLexiBear Game Studios — Official Website

> **"SHARP WIT. SWEET GLAZE."**  
> From Roblox fan-favorite gameplay loops to our very first standalone **3D First-Person Desktop PC game**.

This website is the official web portal for **GlzzLexiBear Studios**. Built with zero dependencies (pure HTML5, modern CSS3, and Vanilla JavaScript), making it **100% free to host forever on GitHub Pages with your free GitHub Education custom domain**.

---

## 🎮 What This Website Features

1. **The Authentic Studio Story**:
   - Proudly tells the story of our roots building fan-favorite games on **Roblox**.
   - Details the studio founder's leap into our **first standalone 3D First-Person Desktop PC game** on Steam.

2. **The 4 3D First-Person Desktop Prototypes (with Generated Screenshots)**:
   - **`9-5 Get Me Out`**: 3D first-person psychological office escape & boss sabotage thriller.
   - **`Study Picky`**: 3D first-person ADHD distraction defense & memory survival comedy simulator.
   - **`Mark Mark What The`**: 3D first-person dual-personality chaotic puzzle-action adventure.
   - **`Guys Watch Me Now`**: 3D first-person interactive AI live-streamer simulator & apartment horror-comedy.

3. **Interactive Community Greenlight Voting Booth**:
   - Visitors can vote on which of the 4 games we should build first!
   - Saves votes locally, calculates live percentage progress bars, and plays celebration sound chimes.

4. **Authentic GlzzLexiBear Brand & Candy SFX**:
   - Matches the official `GlzzLexiBear-Logo` palette: Strawberry Coral (`#ff758c`), Honey Peach (`#ffa74f`), Vanilla Cream (`#fff5ea`), and Cocoa Brown (`#6d3d22`).
   - Interactive drifting confectionery sprinkles canvas.
   - Web Audio API candy bubble-pop sound effects toggle.

---

## 🚀 Instant Local Preview

Run this command in PowerShell to view the updated site in your browser right now:
```powershell
Start-Process "C:\Users\USER\.gemini\antigravity\scratch\glzzlexi-website\index.html"
```

---

## 🌐 Deploy to GitHub Pages with Free GitHub Education Domain

### Step 1: Push Local Git Repository to GitHub
The local repository is already initialized on branch `main`. Create a new repository on [GitHub](https://github.com/new), then link and push:
```powershell
cd C:\Users\USER\.gemini\antigravity\scratch\glzzlexi-website
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

### Step 2: Enable GitHub Pages
1. Go to your repo **Settings** $\rightarrow$ **Pages**.
2. Under **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: **main** / Folder: `/(root)`
3. Click **Save**.

### Step 3: Link Your Free GitHub Education Domain
1. In your domain provider DNS panel (Namecheap, Name.com, .tech, etc.):
   - Add four **A Records** for `@` pointing to:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - Add a **CNAME Record** for `www` pointing to `<your-username>.github.io`.
2. Rename `CNAME.example` to `CNAME`, set your domain name inside (e.g. `glzzlexibear.me`), commit and push.
3. In GitHub repo **Settings -> Pages -> Custom domain**, enter your domain and check **Enforce HTTPS**.
