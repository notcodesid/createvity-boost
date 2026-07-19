# @createvity/web

Next.js frontend for Createvity Boost.

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
- Ship on Monad via wallet → `ShipReceipt` + ship-meta API

## Env

See `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:8787
NEXT_PUBLIC_SHIP_RECEIPT_ADDRESS=0xB56f1d22C37c85C7658C66Fb692FD9AB74405c4E
NEXT_PUBLIC_CHAIN_ID=10143
NEXT_PUBLIC_RPC_URL=https://testnet-rpc.monad.xyz
NEXT_PUBLIC_PRIVY_APP_ID=cmrriqmv8001i0cl13t8hrtuv
```

## Auth

Privy sign-in gate → access token on all API calls → ship with connected/embedded wallet on Monad testnet.

In [Privy Dashboard](https://dashboard.privy.io/): allow `http://localhost:3000` and enable login methods (wallet, email, twitter, google) + embedded wallets.
