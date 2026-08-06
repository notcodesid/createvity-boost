# @createvity/web

Next.js frontend for Creativity Boost.

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

See `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:8787
NEXT_PUBLIC_PRIVY_APP_ID=cmrriqmv8001i0cl13t8hrtuv
```

## Auth

Privy sign-in gate → access token on all API calls.

In [Privy Dashboard](https://dashboard.privy.io/): allow `http://localhost:3000` and enable login methods (email, twitter, google) + embedded wallets.
