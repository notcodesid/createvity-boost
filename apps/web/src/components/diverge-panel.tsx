"use client";

import { useState } from "react";
import { CaptureBar } from "./capture-bar";
import { IdeaList } from "./idea-list";
import { DIVERGE_PROMPTS } from "@/lib/research-content";

export function DivergePanel() {
  const [activePrompt, setActivePrompt] = useState(DIVERGE_PROMPTS[0]);

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-line bg-cream p-4">
        <p className="label">Pick a prompt</p>
        <div className="flex flex-wrap gap-2">
          {DIVERGE_PROMPTS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setActivePrompt(p)}
              className={`rounded-lg border px-3 py-2 text-left text-xs leading-snug focus-ring ${
                activePrompt === p
                  ? "border-amber bg-amber/10 text-ink"
                  : "border-line bg-paper-muted/40 text-muted hover:text-ink"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <CaptureBar
        heading="Add ideas"
        contextNote={`Generate prompt: ${activePrompt}`}
      />

      <section>
        <h2 className="mb-2 text-sm font-semibold text-ink">Raw ideas</h2>
        <IdeaList
          filter="raw"
          mode="browse"
          emptyTitle="No raw ideas yet"
          emptyBody="Add a few above. No judging here."
        />
      </section>
    </div>
  );
}
