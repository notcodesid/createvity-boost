"use client";

import { IdeaList } from "./idea-list";

export function ConvergePanel() {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-sm font-semibold text-ink">Decide</h2>
        <p className="text-sm text-muted">Keep or drop.</p>
      </div>
      <IdeaList
        filter="all"
        mode="converge"
        emptyTitle="No ideas yet"
        emptyBody="Catch some ideas first."
      />
    </section>
  );
}
