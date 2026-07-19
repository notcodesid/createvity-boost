"use client";

import { ExternalLink } from "lucide-react";
import { useReceipts } from "@/hooks/use-ideas";

export function ReceiptsPanel() {
  const { data, isLoading, isError, error, refetch } = useReceipts();

  if (isLoading) {
    return <div className="h-28 animate-pulse border border-zinc-900 bg-zinc-950/40" />;
  }

  if (isError) {
    return (
      <div className="space-y-2 py-1">
        <p className="mb-2 text-sm text-coral">{(error as Error).message}</p>
        <button type="button" className="btn-ghost" onClick={() => void refetch()}>
          Retry
        </button>
      </div>
    );
  }

  const receipts = data?.receipts ?? [];

  return (
    <div className="space-y-3 py-1">
      <h2 className="font-semibold text-ink">Ships into the world</h2>
      <p className="mt-1 mb-3 text-xs leading-relaxed text-muted">
        Klein: if the work has value, you have an obligation to get it out. Onchain
        receipts are public proof — not private notes.
      </p>
      {receipts.length === 0 ? (
        <div className="border border-dashed border-zinc-900 p-3 text-sm text-muted">
          None yet. When something is ready, open <strong className="text-ink">Converge</strong>{" "}
          → Ship on Monad. Draft body stays private; only title + link go public.
        </div>
      ) : (
        <ul className="space-y-3">
          {receipts.map((r) => (
            <li
              key={r.shipTxHash}
              className="flex flex-wrap items-center justify-between gap-2 border-t border-line pt-3 first:border-0 first:pt-0"
            >
              <div>
                <p className="font-medium text-ink">{r.shipTitle}</p>
                <p className="font-mono text-xs text-muted">
                  receipt #{r.shipReceiptId ?? "—"}
                </p>
              </div>
              {r.explorerTxUrl ? (
                <a
                  href={r.explorerTxUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost text-xs"
                >
                  Explorer
                  <ExternalLink className="h-3 w-3" aria-hidden />
                </a>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
