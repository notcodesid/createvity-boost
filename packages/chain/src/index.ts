/** Monad + ShipReceipt config for Creativity Boost. */

export const MONAD_TESTNET = {
  id: 10143,
  name: "Monad Testnet",
  nativeCurrency: { name: "MON", symbol: "MON", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://testnet-rpc.monad.xyz"] },
  },
  blockExplorers: {
    default: {
      name: "MonadVision",
      url: "https://testnet.monadvision.com",
    },
  },
} as const;

export const MONAD_MAINNET = {
  id: 143,
  name: "Monad",
  nativeCurrency: { name: "MON", symbol: "MON", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.monad.xyz"] },
  },
  blockExplorers: {
    default: {
      name: "MonadVision",
      url: "https://monadvision.com",
    },
  },
} as const;

/** Deployed ShipReceipt (Monad testnet) — see contracts/deployments/monad-testnet.json */
export const SHIP_RECEIPT_ADDRESS =
  "0xB56f1d22C37c85C7658C66Fb692FD9AB74405c4E" as const;

export const SHIP_RECEIPT_CHAIN_ID = 10143 as const;

/**
 * Minimal ABI for frontend/backend interactions.
 * Keep in sync with contracts/src/ShipReceipt.sol
 */
export const shipReceiptAbi = [
  {
    type: "function",
    name: "ship",
    stateMutability: "nonpayable",
    inputs: [
      { name: "title", type: "string" },
      { name: "link", type: "string" },
      { name: "contentHash", type: "bytes32" },
    ],
    outputs: [{ name: "id", type: "uint256" }],
  },
  {
    type: "function",
    name: "getReceipt",
    stateMutability: "view",
    inputs: [{ name: "id", type: "uint256" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "creator", type: "address" },
          { name: "contentHash", type: "bytes32" },
          { name: "title", type: "string" },
          { name: "link", type: "string" },
          { name: "timestamp", type: "uint64" },
        ],
      },
    ],
  },
  {
    type: "function",
    name: "receiptsOf",
    stateMutability: "view",
    inputs: [{ name: "creator", type: "address" }],
    outputs: [{ name: "", type: "uint256[]" }],
  },
  {
    type: "function",
    name: "shipCount",
    stateMutability: "view",
    inputs: [{ name: "creator", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "totalShips",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "nextId",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "event",
    name: "Shipped",
    inputs: [
      { name: "creator", type: "address", indexed: true },
      { name: "id", type: "uint256", indexed: true },
      { name: "contentHash", type: "bytes32", indexed: false },
      { name: "title", type: "string", indexed: false },
      { name: "link", type: "string", indexed: false },
    ],
  },
  {
    type: "error",
    name: "EmptyTitle",
    inputs: [],
  },
  {
    type: "error",
    name: "ReceiptNotFound",
    inputs: [{ name: "id", type: "uint256" }],
  },
] as const;
