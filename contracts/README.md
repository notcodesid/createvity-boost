# @createvity/contracts

Onchain **ShipReceipt** for Createvity Boost (Monad).

## Purpose

Public proof of shipping — not idea storage.

## Planned layout

```
src/ShipReceipt.sol      Contract source
test/ShipReceipt.t.sol   Tests
script/Deploy.s.sol      Deploy script
deployments/             Deployed addresses per network
```

## Planned interface (not implemented yet)

- `ship(title, link, contentHash) → id`
- `getReceipt(id)`
- event `Shipped(creator, id, contentHash, title)`

No Solidity application code yet.
