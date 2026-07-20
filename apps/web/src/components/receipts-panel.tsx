"use client";

import { ExternalLink } from "lucide-react";
import { useReceipts } from "@/hooks/use-ideas";

export function ReceiptsPanel() {
  const { data, isLoading, isError, error, refetch } = useReceipts();

  if (isLoading) {
    return <div className="h-20 animate-pulse border border-zinc-900 bg-zinc-950/40" />;
  }

  if (isError) {
    return (
      <div className="space-y-2 py-1">
        <p className="text-sm text-coral">{(error as Error).message}</p>
        <button type="button" className="btn-ghost" onClick={() => void refetch()}>
          Retry
        </button>
      </div>
    );
  }

  const receipts = data?.receipts ?? [];

  return (
    <div className="space-y-3 py-1">
      <h2 className="font-semibold text-ink">Ships</h2>
      {receipts.length === 0 ? (
        <p className="text-sm text-muted">None yet. Ship from Decide.</p>
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
                  #{r.shipReceiptId ?? "—"}
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
