"use client";

import type { Idea } from "@createvity/shared";
import { IdeaList } from "./idea-list";

type Props = {
  onShip: (idea: Idea) => void;
};

export function ConvergePanel({ onShip }: Props) {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-sm font-semibold text-ink">Decide</h2>
        <p className="text-sm text-muted">Keep, drop, or ship.</p>
      </div>
      <IdeaList
        filter="all"
        mode="converge"
        onShip={onShip}
        emptyTitle="No ideas yet"
        emptyBody="Catch some ideas first."
      />
    </section>
  );
}
