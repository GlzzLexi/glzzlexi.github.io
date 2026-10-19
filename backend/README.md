# GlzzLexiBear Voting API - Free Backend Guide

To prevent duplicate votes using IP addresses, we need a lightweight backend endpoint. Since you already use **PythonAnywhere**, here are the best **100% free hosting alternatives**:

---

## 🏆 Option 1 (Recommended): Cloudflare Workers
**Why it's the best for this:**
- **Cost**: 100% Free forever (100,000 requests per day).
- **Zero Cold Starts**: Never sleeps or delays, runs across 300+ edge locations worldwide.
- **Built-in IP Detection**: Automatically extracts the true client IP via `request.headers.get("CF-Connecting-IP")`.
- **Free Key-Value Storage**: Cloudflare KV (100k reads / 1k writes per day free).

### ⚡ 60-Second Cloudflare Workers Setup (No CLI Required):
1. Sign up for a free account at [Cloudflare](https://dash.cloudflare.com/).
2. On the left sidebar, click **Workers & Pages** &rarr; **Create application** &rarr; **Create Worker**.
3. Name it `glzz-voting-api` and click **Deploy**.
4. Click **Edit code**.
5. Copy everything from [`cloudflare-worker.js`](file:///C:/Users/USER/.gemini/antigravity/scratch/glzzlexi-website/backend/cloudflare-worker.js) and paste it into the editor replacing the default code.
6. Click **Deploy**.
7. *(Optional for permanent storage)*: In your worker settings under **Settings -> Variables -> KV Namespace Bindings**, create and bind a KV namespace named `VOTES_KV`.
8. Copy your worker's live URL (e.g. `https://glzz-voting-api.yourname.workers.dev`).
9. Paste that URL into [`script.js`](file:///C:/Users/USER/.gemini/antigravity/scratch/glzzlexi-website/script.js) at the top:
   ```javascript
   const API_BASE_URL = "https://glzz-voting-api.yourname.workers.dev";
   ```

---

## 🐍 Option 2: Render.com (Python FastAPI)
**Why choose Render:**
- Runs real Python (FastAPI + SQLite).
- 100% Free Web Service tier.
- *Note*: Free services on Render spin down after 15 minutes of inactivity and take ~40 seconds to wake up on the first request.

### Setup on Render:
1. Push this repository to GitHub.
2. Sign up at [Render.com](https://render.com/).
3. Click **New +** &rarr; **Web Service**.
4. Connect your GitHub repository.
5. Configure:
   - **Root Directory**: `backend`
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app:app --host 0.0.0.0 --port $PORT`
6. Click **Create Web Service**.
7. Copy the generated URL (e.g. `https://glzz-voting-api.onrender.com`) and paste it into [`script.js`](file:///C:/Users/USER/.gemini/antigravity/scratch/glzzlexi-website/script.js).

---

## 🚀 Option 3: Koyeb (Python or Node Docker)
- **Cost**: Free hobby tier.
- **Advantage**: Does NOT spin down / sleep like Render.
- Deploy with GitHub repository pointing to `backend`.
