# Creativity — Developer guide

Setup, architecture, contribution, and project links.

Product story (problem + personal pain + demo) lives in the [root README](../README.md).

---

## What this is (short)

**Creativity** is a free creativity OS:

| Layer | What it does |
|---|---|
| **App + API** | Idea vault, Catch / Generate / Walk / Prompt / Decide, success goals |

```
Google sign-in
    → Catch messy ideas (status: raw)
    → Grow three ways: Generate · Walk · Prompt
    → Decide: Keep · Kill
```

**Tabs:** Catch · Generate · Walk · Prompt · Decide

Ideas and drafts stay **private**.

---

## Tech stack

| Piece | Stack |
|---|---|
| **Web** | Next.js 16, React, Tailwind |
| **Auth** | Google OAuth (`/api/auth/callback/google`) + session JWT |
| **API** | Hono, JWT auth, idea/session/profile APIs |
| **Monorepo** | pnpm workspaces: `apps/web`, `apps/api`, `packages/*` |

```
createvity-boost/
├── apps/web          Next.js studio + Google OAuth routes
├── apps/api          Hono API (ideas, sessions, profile)
├── packages/shared   Shared domain types
└── docs              Architecture + this guide
```

Also see [ARCHITECTURE.md](./ARCHITECTURE.md).

---

## Local setup

### Requirements

- Node 20+
- pnpm 9+
- Google OAuth client (for sign-in)

### Install

```bash
git clone https://github.com/notcodesid/createvity-boost.git
cd createvity-boost
pnpm install
```

### Environment

**`apps/web/.env.local`**

```bash
NEXT_PUBLIC_API_URL=http://localhost:8787

AUTH_URL=http://localhost:3000
AUTH_SECRET=generate-a-long-random-string
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

**`apps/api/.env`**

```bash
PORT=8787
CORS_ORIGIN=*
AUTH_SECRET=same-as-web-AUTH_SECRET
DATABASE_URL=postgresql://...   # Postgres (e.g. Supabase) — required
```

**Google Cloud Console**

- Authorized JS origins:
  - `http://localhost:3000`
  - `https://createvity-boost-web.vercel.app` (production)
- Authorized redirect URIs:
  - `http://localhost:3000/api/auth/callback/google`
  - `https://createvity-boost-web.vercel.app/api/auth/callback/google`

**Vercel (production) — set these on the web project**

```bash
AUTH_URL=https://createvity-boost-web.vercel.app
AUTH_SECRET=<same long random string as local / API>
GOOGLE_CLIENT_ID=<from Google Cloud Console>
GOOGLE_CLIENT_SECRET=<from Google Cloud Console>
NEXT_PUBLIC_API_URL=<your deployed API URL>
```

Without `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` / `AUTH_SECRET`, `/api/auth/google` returns 500.

### Run

```bash
pnpm dev
# web  → http://localhost:3000
# api  → http://localhost:8787/health
```

### Demo script (≤ 3 minutes)

1. **Open app** — problem: creativity systems fail; this is the protocol.  
2. **Sign in with Google.**  
3. **Catch** 2–3 messy ideas (seeds if needed).  
4. **Walk** — start timer (or end early) → forced catch.  
5. **Prompt** — one letter or full run on a base idea.  
6. **Decide** — Keep one, Kill one.  
7. **Close** — Catch → Grow → Decide.

---

## What’s intentionally out of scope

- AI that writes ideas for you  
- Team brainwriting / multiplayer  
- Payments / Pro tiers  
- Onchain / blockchain storage

One real vertical slice: **the full creative loop**.

---

## Research grounding (short)

Stronger empirics we encode as product behavior:

- **Walking ~60%** divergent boost (Stanford, Oppezzo & Schwartz)  
- **Capture now, evaluate later** (Epstein)  
- **Solo generation before evaluation** (brainstorming failure modes)  
- **SCAMPER / constraints** for blank-page paralysis  
- **Diverge → converge** (DMN + executive networks)  
- **Success on your terms** (Paul Klein)

Treat popular books as inspiration; walking / structure / diverge-converge have the strongest backing in our stack.

---

## Contributing

Contributions are welcome.

1. Fork the repo and create a branch from `main`.
2. Keep the product loop intact: **Catch → Grow → Decide**.
3. Run what you can locally: `pnpm dev`.
4. Open a PR with a clear description of the problem and the change.

If you’re unsure where something belongs, start with [ARCHITECTURE.md](./ARCHITECTURE.md).

---

## Project links

| | |
|---|---|
| **Repo** | https://github.com/notcodesid/createvity-boost |
| **Live app** | https://createvity-boost-web.vercel.app |

---

## License

MIT
