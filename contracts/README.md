# @createvity/contracts

**ShipReceipt** — public, append-only proof of shipping on [Monad](https://docs.monad.xyz/).

Part of Creativity Boost (Spark hack): ideas stay offchain; only ship events hit the chain.

## What it does

| Function | Description |
|----------|-------------|
| `ship(title, link, contentHash)` | Record a public ship; emits `Shipped` |
| `getReceipt(id)` | Read one receipt |
| `receiptsOf(creator)` | All receipt ids for an address |
| `shipCount(creator)` / `totalShips()` | Counters |

**Not stored onchain:** private drafts, full idea body, walk timers, SCAMPER notes.

## Layout

```
src/ShipReceipt.sol
test/ShipReceipt.t.sol
script/Deploy.s.sol
foundry.toml              # Monad testnet default (chain 10143)
deployments/              # Fill after deploy
```

## Prerequisites

- [Foundry](https://book.getfoundry.sh/) (or [Monad Foundry](https://docs.monad.xyz/tooling-and-infra/toolkits/monad-foundry): `curl -L https://foundry.category.xyz | bash` then `foundryup --network monad`)
- Testnet MON from [faucet.monad.xyz](https://faucet.monad.xyz)

## Setup

```bash
cd contracts
forge install foundry-rs/forge-std --no-commit   # if lib/ missing
forge build
forge test
```

## Deploy (Monad Testnet)

Official guide: [Deploy with Foundry](https://docs.monad.xyz/guides/deploy-smart-contract/foundry)

### 1. Keystore (recommended)

```bash
# Create encrypted deployer keystore (saves address to terminal)
cast wallet import monad-deployer --private-key $(cast wallet new | grep 'Private key:' | awk '{print $3}')

cast wallet address --account monad-deployer
# Fund this address via https://faucet.monad.xyz
```

### 2. Deploy with script

```bash
cd contracts

forge script script/Deploy.s.sol:Deploy \
  --rpc-url https://testnet-rpc.monad.xyz \
  --account monad-deployer \
  --broadcast
```

Or `forge create`:

```bash
forge create src/ShipReceipt.sol:ShipReceipt \
  --rpc-url https://testnet-rpc.monad.xyz \
  --account monad-deployer \
  --broadcast
```

Copy **Deployed to** address into `deployments/monad-testnet.json` and the Spark submission form.

### Mainnet

```bash
# chain id 143 — https://docs.monad.xyz/
forge script script/Deploy.s.sol:Deploy \
  --rpc-url https://rpc.monad.xyz \
  --account monad-deployer \
  --broadcast
```

## Verify

Official guide: [Verify with Foundry](https://docs.monad.xyz/guides/verify-smart-contract/foundry)

### MonadVision (Sourcify) — testnet

```bash
forge verify-contract \
  <CONTRACT_ADDRESS> \
  ShipReceipt \
  --chain 10143 \
  --verifier sourcify \
  --verifier-url https://sourcify-api-monad.blockvision.org/
```

### Monadscan (Etherscan-compatible) — testnet

```bash
forge verify-contract \
  <CONTRACT_ADDRESS> \
  ShipReceipt \
  --chain 10143 \
  --verifier etherscan \
  --etherscan-api-key <YOUR_API_KEY> \
  --watch
```

Explorers:

- Testnet MonadVision: https://testnet.monadvision.com  
- Testnet Monadscan: https://testnet.monadscan.com  

## Frontend hash convention (offchain)

Client should compute something like:

```ts
contentHash = keccak256(encodePacked(ideaId, title, link))
// or abi.encode for clearer separation
```

Title + link are public onchain; body stays local.

## Network reference

| | Testnet | Mainnet |
|--|---------|---------|
| Chain ID | `10143` | `143` |
| RPC | `https://testnet-rpc.monad.xyz` | `https://rpc.monad.xyz` |
| Symbol | MON | MON |
| Faucet | https://faucet.monad.xyz | — |

## Security notes

- No owner, no upgrades, no payments — append-only log.
- Anyone can call `ship` (by design); `msg.sender` is the creator.
- Do not put secrets or private idea text in `title` / `link`.
- Audit before mainnet production use.

## Resources

- [Monad docs](https://docs.monad.xyz/)
- [Monskills](https://skills.devnads.com/)
- [Monskills prompts](https://skills.devnads.com/prompts)
- [Impeccable](https://impeccable.style/) (frontend design later)
