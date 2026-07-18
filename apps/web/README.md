# @createvity/web

Frontend for Createvity Boost (creativity OS UI).

## Planned stack

- React + Next.js (or Vite) — TBD at implementation
- Local-first idea storage
- Wallet only on Ship (wagmi/viem)

## Source layout

```
src/
  app/           Routes / pages
  components/    UI by area (capture, sessions, ship, ui)
  features/      Feature modules (ideas, sessions, ship)
  hooks/         React hooks
  lib/           storage, hash, chain config
  types/         App-level types
public/          Static assets
```

No application code yet.
