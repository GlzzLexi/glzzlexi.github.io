import hashlib
import sqlite3
import os
from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="GlzzLexiBear Voting API")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_PATH = os.environ.get("DB_PATH", "votes.db")
VALID_GAMES = ["nine_to_five", "study_picky", "mark_mark", "guys_watch"]
DEFAULT_VOTES = {
    "nine_to_five": 184,
    "study_picky": 162,
    "mark_mark": 171,
    "guys_watch": 198
}

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS votes (
            game_key TEXT PRIMARY KEY,
            count INTEGER NOT NULL
        )
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS voters (
            ip_hash TEXT PRIMARY KEY,
            game_key TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    # Seed default votes if table is empty
    cursor.execute("SELECT COUNT(*) FROM votes")
    if cursor.fetchone()[0] == 0:
        for k, v in DEFAULT_VOTES.items():
            cursor.execute("INSERT INTO votes (game_key, count) VALUES (?, ?)", (k, v))
    conn.commit()
    conn.close()

init_db()

def hash_ip(ip: str) -> str:
    salt = "glzz_bear_salt_2026"
    return hashlib.sha256((ip + salt).encode()).hexdigest()

class VoteRequest(BaseModel):
    game: str

@app.get("/api/votes")
def get_votes():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT game_key, count FROM votes")
    rows = cursor.fetchall()
    conn.close()
    
    votes = {row[0]: row[1] for row in rows}
    total = sum(votes.values())
    return {"success": True, "votes": votes, "total": total}

@app.post("/api/vote")
def cast_vote(payload: VoteRequest, request: Request):
    if payload.game not in VALID_GAMES:
        raise HTTPException(status_code=400, detail="Invalid game key")

    # Extract real client IP
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        client_ip = forwarded.split(",")[0].strip()
    else:
        client_ip = request.client.host if request.client else "127.0.0.1"

    ip_hash = hash_ip(client_ip)

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Check for existing vote
    cursor.execute("SELECT game_key FROM voters WHERE ip_hash = ?", (ip_hash,))
    existing = cursor.fetchone()
    if existing:
        conn.close()
        raise HTTPException(
            status_code=403, 
            detail="Your network IP has already voted! Only one vote is permitted per player."
        )

    # Record vote
    cursor.execute("INSERT INTO voters (ip_hash, game_key) VALUES (?, ?)", (ip_hash, payload.game))
    cursor.execute("UPDATE votes SET count = count + 1 WHERE game_key = ?", (payload.game,))
    conn.commit()

    # Get updated tallies
    cursor.execute("SELECT game_key, count FROM votes")
    rows = cursor.fetchall()
    conn.close()

    votes = {row[0]: row[1] for row in rows}
    total = sum(votes.values())

    return {"success": True, "votes": votes, "total": total, "votedFor": payload.game}
