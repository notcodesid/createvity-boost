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

  const pathD =
    activeCount > 0
      ? "M 0 22 Q 15 10 30 18 T 60 5 T 90 12 L 100 8"
      : "M 0 20 Q 25 20 50 20 T 100 20";

  return (
    <div className="relative overflow-hidden py-1">
      <p className="text-[11px] font-medium uppercase tracking-widest text-zinc-500">
        Creative velocity
      </p>
      <div className="mt-1 flex items-baseline gap-1.5">
        <span className="text-3xl font-semibold tabular-nums text-white">
          {activeCount}
        </span>
        <span className="text-xs text-zinc-500">active ideas</span>
      </div>
      <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
        {activeCount === 0
          ? "Empty vault = capture first. Volume before quality."
          : raw > keep + shipped
            ? `${raw} still raw — good diverge energy. Converge when the pile is large.`
            : shipCount > 0
              ? `${shipCount} shipped onchain. Klein would approve.`
              : "Ideas alive. Walk, SCAMPER, or ship something public."}
      </p>
      <dl className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px]">
        <div className="bg-zinc-950/40 border border-zinc-900 py-1.5">
          <dt className="text-zinc-500">Raw</dt>
          <dd className="font-semibold tabular-nums text-white">{raw}</dd>
        </div>
        <div className="bg-zinc-950/40 border border-zinc-900 py-1.5">
          <dt className="text-zinc-500">Keep</dt>
          <dd className="font-semibold tabular-nums text-white">{keep}</dd>
        </div>
        <div className="bg-zinc-950/40 border border-zinc-900 py-1.5">
          <dt className="text-zinc-500">Shipped</dt>
          <dd className="font-semibold tabular-nums text-white">{shipCount}</dd>
        </div>
      </dl>
      <div className="pointer-events-none mt-4 h-8 w-full opacity-80">
        <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="h-full w-full">
          <path
            d={pathD}
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
