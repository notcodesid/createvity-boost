# Architecture

## Principle

- Creativity system = **offchain** (capture, walk, SCAMPER, diverge/converge)
- Backend = **optional** (local-first for MVP)

## Domains

| Domain    | Where        |
|-----------|--------------|
| Ideas     | Offchain     |
| Sessions  | Offchain     |
| Profile   | Offchain     |

## Repo model

Single monorepo: `apps/web` + `apps/api` + `packages/*`.

## Backend

- **Stack:** Hono + Postgres (Supabase) + Zod
- **Auth:** Privy session token (Google / email / X) → `Authorization` header
- **Run:** `pnpm dev:api` → `http://localhost:8787`
