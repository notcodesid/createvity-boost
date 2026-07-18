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

Single monorepo: `apps/web` + `contracts` (+ optional `packages/*`, `apps/api` later).
