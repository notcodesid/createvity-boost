import { Hono } from "hono";
import {
  SHIP_RECEIPT_ADDRESS,
  SHIP_RECEIPT_CHAIN_ID,
  MONAD_TESTNET,
} from "@createvity/chain";
import { query, type IdeaRow } from "../db.js";
import { mapIdea } from "../mappers.js";
import { getClientId, type AppVariables } from "../middleware.js";

/**
 * Offchain mirror of ships (joined to ideas).
 * Source of truth for "did they ship" onchain is still Monad;
 * this list is for app UX / history.
 */
export const receiptsRouter = new Hono<{ Variables: AppVariables }>();

receiptsRouter.get("/", async (c) => {
  const clientId = getClientId(c);
  const rows = await query<IdeaRow>(
    `SELECT * FROM ideas
     WHERE client_id = $1 AND status = 'shipped' AND ship_tx_hash IS NOT NULL
     ORDER BY updated_at DESC`,
    [clientId],
  );

  const receipts = rows.map((row) => {
    const idea = mapIdea(row);
    return {
      ideaId: idea.id,
      shipTitle: idea.shipTitle ?? idea.title,
      shipLink: idea.shipLink ?? null,
      shipTxHash: idea.shipTxHash!,
      shipReceiptId: idea.shipReceiptId ?? null,
      contentHash: idea.contentHash ?? null,
      walletAddress: idea.walletAddress ?? null,
      shippedAt: idea.updatedAt,
      explorerTxUrl: idea.shipTxHash
        ? `${MONAD_TESTNET.blockExplorers.default.url}/tx/${idea.shipTxHash}`
        : null,
    };
  });

  return c.json({
    contract: {
      address: SHIP_RECEIPT_ADDRESS,
      chainId: SHIP_RECEIPT_CHAIN_ID,
      explorer: `${MONAD_TESTNET.blockExplorers.default.url}/address/${SHIP_RECEIPT_ADDRESS}`,
    },
    receipts,
  });
});
