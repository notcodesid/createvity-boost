"use client";

import { useIdeas, useReceipts } from "@/hooks/use-ideas";

export function ActivityGraph() {
  const { data } = useIdeas("all");
  const { data: ships } = useReceipts();
  const ideas = data?.ideas ?? [];

  const raw = ideas.filter((i) => i.status === "raw").length;
  const keep = ideas.filter((i) => i.status === "keep").length;
  const shipped = ideas.filter((i) => i.status === "shipped").length;
  const activeCount = ideas.filter((i) => i.status !== "kill").length;
  const shipCount = ships?.receipts?.length ?? shipped;

  return (
    <div className="py-1">
      <p className="text-[11px] font-medium uppercase tracking-widest text-zinc-500">
        Ideas
      </p>
      <div className="mt-1 flex items-baseline gap-1.5">
        <span className="text-3xl font-semibold tabular-nums text-white">
          {activeCount}
        </span>
        <span className="text-xs text-zinc-500">active</span>
      </div>
      <dl className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px]">
        <div className="border border-zinc-900 bg-zinc-950/40 py-1.5">
          <dt className="text-zinc-500">Raw</dt>
          <dd className="font-semibold tabular-nums text-white">{raw}</dd>
        </div>
        <div className="border border-zinc-900 bg-zinc-950/40 py-1.5">
          <dt className="text-zinc-500">Keep</dt>
          <dd className="font-semibold tabular-nums text-white">{keep}</dd>
        </div>
        <div className="border border-zinc-900 bg-zinc-950/40 py-1.5">
          <dt className="text-zinc-500">Shipped</dt>
          <dd className="font-semibold tabular-nums text-white">{shipCount}</dd>
        </div>
      </dl>
    </div>
  );
}
