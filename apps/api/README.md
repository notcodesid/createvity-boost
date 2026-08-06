# @createvity/api

Offchain backend for Createvity.

- **Ideas** (capture vault)
- **Sessions** (diverge / converge / walk / scamper)
- **Profile** (Klein success definition / 10-year dream)

## Auth model (Google OAuth)

1. Frontend: Google OAuth login through the Next.js app
2. The app creates a signed session JWT using `AUTH_SECRET`
3. Client sends: `Authorization: Bearer <session_jwt>`
4. API verifies the JWT with the same `AUTH_SECRET`
5. Vault rows are keyed by the Google user id (`google:<id>`)

```bash
# apps/api/.env
AUTH_SECRET=the-same-long-random-string-as-apps-web
```

Without `AUTH_SECRET`, authenticated API calls return 503.

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
