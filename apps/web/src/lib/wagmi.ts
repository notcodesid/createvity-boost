import { http, createConfig } from "wagmi";
import { injected } from "wagmi/connectors";
import type { Chain } from "viem";
import {
  MONAD_TESTNET,
  SHIP_RECEIPT_ADDRESS,
  SHIP_RECEIPT_CHAIN_ID,
} from "@createvity/chain";

export const monadTestnet = {
  id: MONAD_TESTNET.id,
  name: MONAD_TESTNET.name,
  nativeCurrency: MONAD_TESTNET.nativeCurrency,
  rpcUrls: MONAD_TESTNET.rpcUrls,
  blockExplorers: MONAD_TESTNET.blockExplorers,
} as const satisfies Chain;

export const config = createConfig({
  chains: [monadTestnet],
  connectors: [injected()],
  transports: {
    [monadTestnet.id]: http(
      process.env.NEXT_PUBLIC_RPC_URL ?? MONAD_TESTNET.rpcUrls.default.http[0],
    ),
  },
  ssr: true,
});

export { SHIP_RECEIPT_ADDRESS, SHIP_RECEIPT_CHAIN_ID };
