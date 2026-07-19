# Architecture

## Principle

- Creativity system = **offchain** (capture, walk, SCAMPER, diverge/converge)
- Ship proof = **onchain** (Monad `ShipReceipt`)
- Backend = **optional** (local-first for Spark MVP)

## Domains

| Domain    | Where        |
|-----------|--------------|
| Ideas     | Offchain     |
| Sessions  | Offchain     |
| Ship      | Client + chain |
| Receipts  | Chain + local cache |

## Ship flow

1. User marks idea → Ship (public title + optional link)
2. Client computes content hash
3. Wallet calls `ship(title, link, contentHash)`
4. Idea status → `shipped`; store tx hash + receipt id

## Repo model

Single monorepo: `apps/web` + `apps/api` + `contracts` + `packages/*`.

## Backend

- **Stack:** Hono + better-sqlite3 + Zod
- **Auth:** `X-Client-Id` header (stable browser UUID)
- **Onchain:** client signs `ShipReceipt.ship()`; API only stores ship meta after success
- **Run:** `pnpm dev:api` → `http://localhost:8787`
