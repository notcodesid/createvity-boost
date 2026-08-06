# @createvity/web

Next.js frontend for Createvity.

## Run

```bash
# API must be running
pnpm --filter @createvity/api dev

# Web
pnpm --filter @createvity/web dev
# → http://localhost:3000
```

## Features

- Capture vault (API)
- Diverge / Converge modes
- Walk protocol timer + forced capture
- SCAMPER guided technique
- Profile (success definition)

## Env

Set `apps/web/.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:8787
AUTH_URL=http://localhost:3000
AUTH_SECRET=generate-a-long-random-string
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## Auth

Google OAuth issues a session JWT that the client sends to the API in its `Authorization` header.

In Google Cloud Console, add `http://localhost:3000` as an authorized JavaScript origin and `http://localhost:3000/api/auth/callback/google` as an authorized redirect URI.
