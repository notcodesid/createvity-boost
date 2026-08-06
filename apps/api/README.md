# @createvity/api

Offchain backend for Creativity Boost.

- **Ideas** (capture vault)
- **Sessions** (diverge / converge / walk / scamper)
- **Profile** (Klein success definition / 10-year dream)

## Auth model (Privy)

1. Frontend: `@privy-io/react-auth` login (email / X / Google)
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
| GET | `/health` | no | Health |
| GET | `/api/ideas` | yes | List ideas (`?status=&q=&limit=&offset=`) |
| POST | `/api/ideas` | yes | Create idea |
| GET | `/api/ideas/:id` | yes | Get idea |
| PATCH | `/api/ideas/:id` | yes | Update idea |
| DELETE | `/api/ideas/:id` | yes | Delete idea |
| GET | `/api/sessions` | yes | List sessions |
| POST | `/api/sessions` | yes | Start session |
| PATCH | `/api/sessions/:id` | yes | End / update session |
| GET | `/api/profile` | yes | Get profile |
| PUT | `/api/profile` | yes | Upsert profile |

## Env

```bash
PORT=8787
CORS_ORIGIN=*
```
