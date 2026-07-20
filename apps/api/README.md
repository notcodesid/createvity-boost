# @createvity/api

Offchain backend for Creativity Boost.

- **Ideas** (capture vault)
- **Sessions** (diverge / converge / walk / scamper)
- **Profile** (Klein success definition / 10-year dream)
- **Ship meta** (mirror of onchain ships after wallet tx)

Onchain shipping still happens in the **browser** via `ShipReceipt` on Monad.  
This API **never** holds private keys.

## Auth model (Privy — same pattern as Swish)

1. Frontend: `@privy-io/react-auth` login (wallet / email / X / Google)
2. Client sends: `Authorization: Bearer <privy_access_token>`
3. API verifies token with `@privy-io/server-auth` using `PRIVY_APP_SECRET`
4. Vault rows keyed by Privy user id (`did:privy:…`)

```bash
# apps/api/.env
PRIVY_APP_ID=cmrriqmv8001i0cl13t8hrtuv
PRIVY_APP_SECRET=   # from https://dashboard.privy.io/
```

Without `PRIVY_APP_SECRET`, authenticated API calls return 503.

## Run

```bash
# from repo root
pnpm install
pnpm --filter @createvity/api dev
```

Default: `http://localhost:8787`

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/health` | no | Health + contract info |
| GET | `/api/ideas` | yes | List ideas (`?status=&q=&limit=&offset=`) |
| POST | `/api/ideas` | yes | Create idea |
| GET | `/api/ideas/:id` | yes | Get idea |
| PATCH | `/api/ideas/:id` | yes | Update idea |
| DELETE | `/api/ideas/:id` | yes | Delete idea |
| POST | `/api/ideas/:id/ship-meta` | yes | Attach onchain ship result |
| GET | `/api/sessions` | yes | List sessions |
| POST | `/api/sessions` | yes | Start session |
| PATCH | `/api/sessions/:id` | yes | End / update session |
| GET | `/api/profile` | yes | Get profile |
| PUT | `/api/profile` | yes | Upsert profile |
| GET | `/api/receipts` | yes | Shipped ideas + explorer links |
| GET | `/receipts/contract` | no | Contract address / chain |

## Env

```bash
PORT=8787
DATABASE_PATH=./data/createvity.sqlite
CORS_ORIGIN=*
```

## Ship flow

1. Client creates/updates idea via API  
2. Client calls `ShipReceipt.ship()` with wallet on Monad  
3. Client `POST /api/ideas/:id/ship-meta` with tx hash + receipt id  
4. Idea status becomes `shipped`
