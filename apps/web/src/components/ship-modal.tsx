"use client";

import { useEffect, useState } from "react";
import type { Idea } from "@createvity/shared";
import { shipReceiptAbi } from "@createvity/chain";
import { X } from "lucide-react";
import {
  useAccount,
  useConnect,
  usePublicClient,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { decodeEventLog } from "viem";
import { api } from "@/lib/api";
import { computeContentHash } from "@/lib/content-hash";
import { SHIP_RECEIPT_ADDRESS, monadTestnet } from "@/lib/wagmi";

type Props = {
  idea: Idea | null;
  open: boolean;
  onClose: () => void;
  onShipped: () => void;
};

export function ShipModal({ idea, open, onClose, onShipped }: Props) {
  const { address, isConnected, chainId } = useAccount();
  const { connect, connectors, isPending: connecting } = useConnect();
  const publicClient = usePublicClient({ chainId: monadTestnet.id });
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [phase, setPhase] = useState<"form" | "tx" | "meta" | "done">("form");

  const { writeContract, data: txHash, isPending, reset } = useWriteContract();
  const { isLoading: confirming, isSuccess, data: receipt } =
    useWaitForTransactionReceipt({ hash: txHash });

  useEffect(() => {
    if (idea && open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTitle(idea.title);
      setLink(idea.shipLink ?? "");
      setError(null);
      setPhase("form");
      reset();
    }
  }, [idea, open, reset]);

  useEffect(() => {
    if (!isSuccess || !receipt || !idea || !address || phase !== "tx") return;

    async function persist() {
      setPhase("meta");
      setError(null);
      try {
        let receiptId = "0";
        for (const log of receipt!.logs) {
          if (log.address.toLowerCase() !== SHIP_RECEIPT_ADDRESS.toLowerCase()) continue;
          try {
            const decoded = decodeEventLog({
              abi: shipReceiptAbi,
              data: log.data,
              topics: log.topics,
            });
            if (decoded.eventName === "Shipped") {
              receiptId = String((decoded.args as { id: bigint }).id);
              break;
            }
          } catch {
            /* not our event */
          }
        }

        if (receiptId === "0" && publicClient) {
          const total = await publicClient.readContract({
            address: SHIP_RECEIPT_ADDRESS,
            abi: shipReceiptAbi,
            functionName: "totalShips",
          });
          if (typeof total === "bigint" && total > BigInt(0)) {
            receiptId = String(total - BigInt(1));
          }
        }

        const contentHash = computeContentHash(idea!.id, title.trim(), link.trim());
        await api.shipMeta(idea!.id, {
          shipTxHash: txHash!,
          shipReceiptId: receiptId,
          shipTitle: title.trim(),
          shipLink: link.trim(),
          contentHash,
          walletAddress: address!,
        });
        setPhase("done");
        onShipped();
      } catch (e) {
        setError((e as Error).message);
        setPhase("form");
      }
    }

    void persist();
  }, [
    isSuccess,
    receipt,
    idea,
    address,
    phase,
    publicClient,
    title,
    link,
    txHash,
    onShipped,
  ]);

  if (!open || !idea) return null;

  const wrongChain = isConnected && chainId !== monadTestnet.id;
  const canShip =
    isConnected &&
    !wrongChain &&
    title.trim().length > 0 &&
    !isPending &&
    !confirming &&
    phase === "form";

  function onShip() {
    if (!idea || !canShip) return;
    setError(null);
    setPhase("tx");
    const contentHash = computeContentHash(idea.id, title.trim(), link.trim());
    writeContract(
      {
        address: SHIP_RECEIPT_ADDRESS,
        abi: shipReceiptAbi,
        functionName: "ship",
        args: [title.trim(), link.trim(), contentHash],
        chainId: monadTestnet.id,
      },
      {
        onError: (e) => {
          setError(e.message);
          setPhase("form");
        },
      },
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ship-title"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Close dialog backdrop"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-md card border-ink/10 p-5 shadow-xl">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h2 id="ship-title" className="text-lg font-semibold text-ink">
              Ship
            </h2>
            <p className="text-sm text-muted">
              Posts a public receipt on Monad. Draft body stays offchain.
            </p>
          </div>
          <button type="button" className="btn-ghost px-2" onClick={onClose} aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mb-4">
          {!isConnected ? (
            <button
              type="button"
              className="btn-primary w-full"
              disabled={connecting}
              onClick={() => {
                const injected =
                  connectors.find((c) => c.id === "injected") ?? connectors[0];
                if (injected) {
                  connect({ connector: injected, chainId: monadTestnet.id });
                }
              }}
            >
              {connecting ? "Connecting…" : "Connect wallet to ship"}
            </button>
          ) : (
            <p className="text-xs text-muted font-mono">
              Shipping as {address?.slice(0, 6)}…{address?.slice(-4)}
            </p>
          )}
        </div>

        {phase === "done" ? (
          <div className="rounded-xl border border-sage/30 bg-sage/10 p-4">
            <p className="font-medium text-ink">Shipped</p>
            {txHash ? (
              <a
                className="mt-2 inline-block text-sm text-amber-deep underline-offset-2 hover:underline"
                href={`https://testnet.monadvision.com/tx/${txHash}`}
                target="_blank"
                rel="noreferrer"
              >
                View transaction
              </a>
            ) : null}
            <button type="button" className="btn-primary mt-4 w-full" onClick={onClose}>
              Done
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <label className="label" htmlFor="ship-public-title">
                Public title
              </label>
              <input
                id="ship-public-title"
                className="input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={500}
                required
              />
            </div>
            <div>
              <label className="label" htmlFor="ship-link">
                Link (optional)
              </label>
              <input
                id="ship-link"
                className="input"
                type="url"
                placeholder="https://"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                maxLength={2000}
              />
            </div>
            <p className="text-xs text-muted">
              Contract{" "}
              <span className="font-mono">
                {SHIP_RECEIPT_ADDRESS.slice(0, 8)}…{SHIP_RECEIPT_ADDRESS.slice(-6)}
              </span>
            </p>
            <button
              type="button"
              className="btn-accent w-full"
              disabled={!canShip}
              onClick={onShip}
            >
              {isPending || confirming || phase === "meta"
                ? confirming
                  ? "Confirming…"
                  : phase === "meta"
                    ? "Saving receipt…"
                    : "Confirm in wallet…"
                : "Ship receipt"}
            </button>
            {wrongChain ? (
              <p className="text-sm text-coral">Switch to Monad testnet to ship.</p>
            ) : null}
            {error ? (
              <p className="text-sm text-coral" role="alert">
                {error}
              </p>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
