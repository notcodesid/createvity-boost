# Creativity

**Think better. Create more.**

---

## Problem

I know the science of creativity — walk when stuck, capture immediately, separate generation from evaluation — and I still fail to run the system.

What actually happens:

1. Ideas die unrecorded (not because I stop having them).
2. The inner critic shows up mid-generation and kills volume.
3. Blank pages freeze me; total freedom is the enemy.
4. Work never leaves the notebook — studio door stays closed.

Creative tools are either empty notes apps or AI that writes *for* you. I needed a **protocol**, not another blank page.

---

## Solution

**Creativity** is a free creativity OS:

| Layer | What it does |
|---|---|
| **Offchain (app + API)** | Idea vault, Catch / Generate / Walk / Prompt / Decide, success goals |
| **Onchain (Monad)** | When you ship, write a public **ShipReceipt** — proof the work left your head |

Personal problem → practical product → real onchain component (not wallet-connect cosplay).

---

## How it works (user loop)

```
Google sign-in
    → Catch messy ideas (status: raw)
    → Grow three ways: Generate · Walk · Prompt
    → Decide: Keep · Kill · Ship
    → Ship on Monad → public receipt + vault marks "shipped"
```

**Story:** Catch → Grow → Decide → Ship  
**Tabs:** Catch · Generate · Walk · Prompt · Decide (Ship is the action inside Decide)

### Modes (5 tabs)

1. **Catch** — Save the idea before it disappears. Judge later.
2. **Generate** — Make more ideas. Inner critic off. Volume before quality.
3. **Walk** — Phone-free timer; catch ideas when you return (Stanford walking study).
4. **Prompt** — Checklist when stuck (SCAMPER under the hood: Substitute → Rearrange).
5. **Decide** — Keep, drop, or ship a public version.

### Sidebar

- **First creative loop** checklist (run the science once end-to-end)
- **Creative velocity** (raw / keep / shipped counts)
- **Success on your terms** (Klein — define success + 10-year dream)
- **Ships** (onchain history)
- **Feed the network** (input diet: art, boredom, phone away)

### Onchain design

- Ideas and drafts stay **private** (API).
- Only **ship** hits the chain: public title, optional link, content hash, creator, timestamp.
- Contract: append-only `ShipReceipt` — no tokens, no payments, no private text storage.

---

## Why Monad / why onchain

Spark requires a real onchain component. Ours is meaningful:

> **If the work has value, get it into the world** (Paul Klein).  
> A public, timestamped receipt is harder to fake to yourself than a private note.

Accountability layer on top of a research-backed habit system.

---

## Tech stack

| Piece | Stack |
|---|---|
| **Web** | Next.js 16, React, Tailwind, wagmi/viem |
| **Auth** | Simple Google OAuth (`/api/auth/callback/google`) + session JWT |
| **API** | Hono, JWT auth, idea/session/profile/ship-meta APIs |
| **Contracts** | Solidity + Foundry, Monad testnet |
| **Monorepo** | pnpm workspaces: `apps/web`, `apps/api`, `contracts`, `packages/*` |

```
createvity-boost/
├── apps/web          Next.js studio + Google OAuth routes
├── apps/api          Hono API (ideas, sessions, profile, receipts)
├── contracts         ShipReceipt.sol + Foundry tests + deploy
├── packages/shared   Shared domain types
├── packages/chain    Monad config + ABI + contract address
└── docs              Architecture + hack plan notes
```

---

## Contract (Monad Testnet)

| Field | Value |
|---|---|
| Name | `ShipReceipt` |
| Address | `0xB56f1d22C37c85C7658C66Fb692FD9AB74405c4E` |
| Chain ID | `10143` |
| RPC | `https://testnet-rpc.monad.xyz` |
| Explorer | https://testnet.monadvision.com/address/0xB56f1d22C37c85C7658C66Fb692FD9AB74405c4E |
| Deployer | `0xA2993a29E80253ADc5a24788eb452b15564437C8` |
| Deploy tx | `0xf54fb5937594e5ca1d68902d856a54ecdd6c2e89628036f32198da7f1fa6b3ec` |

### Interface

```solidity
function ship(string title, string link, bytes32 contentHash) external returns (uint256 id);
function getReceipt(uint256 id) external view returns (Receipt);
function receiptsOf(address creator) external view returns (uint256[]);
function totalShips() external view returns (uint256);
```

Event: `Shipped(address indexed creator, uint256 indexed id, bytes32 contentHash, string title, string link)`

Verified on Sourcify (exact match) after deploy. Local tests: `pnpm contracts:test` (6/6 passing).

---

## Local setup

### Requirements

- Node 20+
- pnpm 9+
- Foundry (optional, for contracts)
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
NEXT_PUBLIC_CHAIN_ID=10143
NEXT_PUBLIC_SHIP_RECEIPT_ADDRESS=0xB56f1d22C37c85C7658C66Fb692FD9AB74405c4E
NEXT_PUBLIC_RPC_URL=https://testnet-rpc.monad.xyz

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

```bash
pnpm contracts:build
pnpm contracts:test
```

### Ship flow (needs wallet)

1. Sign in with Google  
2. Catch ideas → Generate / Walk / Prompt → Decide  
3. Connect wallet on **Monad testnet** (MON from faucet)  
4. **Ship on Monad** → confirm tx → receipt on explorer + vault status `shipped`

---

## Demo script (≤ 3 minutes)

1. **Open app** — problem: creativity systems fail; this is the protocol.  
2. **Sign in with Google.**  
3. **Catch** 2–3 messy ideas (seeds if needed).  
4. **Walk** — start timer (or end early) → forced catch.  
5. **Prompt** — one letter or full run on a base idea.  
6. **Decide** — Keep one, Kill one, **Ship** one.  
7. **Wallet** — Monad testnet → confirm `ship()`.  
8. **Show** explorer receipt + vault `shipped` + sidebar ships list.  
9. **Close** — Catch → Grow → Decide → Ship, with onchain proof.

---

## Spark submission fields (draft)

| Field | Content |
|---|---|
| **Name** | Creativity |
| **Description** | Research-backed creativity OS + onchain ship receipts on Monad |
| **Problem** | I know how to boost creativity but don’t run the system — ideas die unrecorded and never ship |
| **Solution** | Catch · Generate · Walk · Prompt · Decide, plus public ShipReceipt on Monad when work goes out |
| **Project URL** | *(hosted app)* |
| **Github** | https://github.com/notcodesid/createvity-boost |
| **Category** | Monad Testnet |
| **Contract** | `0xB56f1d22C37c85C7658C66Fb692FD9AB74405c4E` |
| **Demo video** | *(≤ 3 min, public)* |
| **Post URL** | *(optional — Most viral track)* |

---

## What’s intentionally out of scope

- AI that writes ideas for you  
- Team brainwriting / multiplayer  
- Payments / Pro tiers  
- Storing private drafts onchain  
- Mainnet production hardening  

One real vertical slice: **system + ship**.

---

## Research grounding (short)

Stronger empirics we encode as product behavior:

- **Walking ~60%** divergent boost (Stanford, Oppezzo & Schwartz)  
- **Capture now, evaluate later** (Epstein)  
- **Solo generation before evaluation** (brainstorming failure modes)  
- **SCAMPER / constraints** for blank-page paralysis  
- **Diverge → converge** (DMN + executive networks)  
- **Ship obligation + success on your terms** (Paul Klein)

Treat popular books as inspiration; walking / structure / diverge-converge have the strongest backing in our stack.

---

## Project links

A research-backed creativity OS that helps you **catch ideas without judging them**, **grow them with structure** (Generate · Walk · Prompt), then **decide and ship** — with a public **ShipReceipt** on **Monad** so work actually leaves the studio.

Built for **[BuildAnything Spark](https://buildanything.so/hackathons/spark)** — *build anything onchain that solves a personal problem*.

| | |
|---|---|
| **Repo** | https://github.com/notcodesid/createvity-boost |
| **Chain** | Monad Testnet (`10143`) |
| **Contract** | [`ShipReceipt`](https://testnet.monadvision.com/address/0xB56f1d22C37c85C7658C66Fb692FD9AB74405c4E) `0xB56f1d22C37c85C7658C66Fb692FD9AB74405c4E` |
| **Deploy tx** | [`0xf54fb593…`](https://testnet.monadvision.com/tx/0xf54fb5937594e5ca1d68902d856a54ecdd6c2e89628036f32198da7f1fa6b3ec) |
| **Live app** | *(add hosted Vercel / API URL before submit)* |

---

## License

MIT
