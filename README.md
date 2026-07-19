# Createvity Boost

Research-backed creativity OS + onchain ship receipts on Monad.

Built for [BuildAnything Spark](https://buildanything.so/hackathons/spark).

## Problem

Creative systems fail because generation, evaluation, and shipping blur. Ideas die unrecorded; work never leaves the studio.

## Solution

- **Offchain:** capture, diverge / converge, walk protocol, SCAMPER
- **Onchain:** `ShipReceipt` on Monad — public proof when you ship

## Monorepo layout

```
apps/web          Frontend (creativity OS UI) — not built yet
apps/api          Offchain API (Hono + SQLite) ✅
contracts         ShipReceipt.sol (Foundry) ✅ deployed
packages/shared   Shared types ✅
packages/chain    ABI + addresses ✅
docs              Architecture notes
```

## Status

- **Contracts:** ShipReceipt on Monad testnet, tested
- **API:** ideas / sessions / profile / ship-meta ✅
- **Web:** Next.js studio UI ✅

## Setup

```bash
pnpm install
pnpm dev              # api :8787 + web :3000
pnpm dev:api          # api only
pnpm dev:web          # web only
```

## Live

- Contract: `0xB56f1d22C37c85C7658C66Fb692FD9AB74405c4E` (Monad testnet `10143`)
- Explorer: https://testnet.monadvision.com/address/0xB56f1d22C37c85C7658C66Fb692FD9AB74405c4E
- API health: `http://localhost:8787/health`


## License

MIT
