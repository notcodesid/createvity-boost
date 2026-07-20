"use client";

import type { Idea } from "@createvity/shared";
import { IdeaList } from "./idea-list";
import { ModeGuide } from "./mode-guide";
import { CONVERGE_RUBRIC } from "@/lib/research-content";

type Props = {
  onShip: (idea: Idea) => void;
};

export function ConvergePanel({ onShip }: Props) {
  return (
    <div className="space-y-5">
      <ModeGuide
        title="Decide — keep, drop, or ship"
        science="This is where you evaluate — only after you’ve made a messy pile. Klein: if it has value, get it into the world."
        how={[
          "Scan raw / keep ideas with fresh eyes.",
          "Keep = still alive. Kill = ego, not energy.",
          "Ship = public title + optional link on Monad.",
          "Draft body never goes onchain — only the ship receipt.",
        ]}
        accent="sage"
      />

      <div className="grid gap-3 sm:grid-cols-3">
        {CONVERGE_RUBRIC.map((r) => (
          <div
            key={r.action}
            className="rounded-xl border border-line bg-cream p-3"
          >
            <p className="text-sm font-semibold text-ink">{r.action}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">{r.when}</p>
          </div>
        ))}
      </div>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-ink">Your choices</h2>
        <IdeaList
          filter="all"
          mode="converge"
          onShip={onShip}
          emptyTitle="Nothing to decide yet"
          emptyBody="Grow first: Catch, Generate, Walk, or Prompt. Coming here with an empty vault is the wrong order."
        />
      </section>
    </div>
  );
}
