"use client";

import { useState } from "react";
import { CaptureBar } from "./capture-bar";
import { IdeaList } from "./idea-list";
import { ModeGuide } from "./mode-guide";
import { DIVERGE_PROMPTS } from "@/lib/research-content";

export function DivergePanel() {
  const [activePrompt, setActivePrompt] = useState(DIVERGE_PROMPTS[0]);

  return (
    <div className="space-y-5">
      <ModeGuide
        title="Diverge — generation only"
        science="Creativity researchers frame work as toggling: divergent (many options) then convergent (select). Mixing them mid-stream activates the inner critic and kills volume. Solo ideation also beats classic group brainstorming (production blocking / anchoring)."
        how={[
          "Use a prompt below or invent chaos.",
          "Capture many raw ideas — quality is illegal here.",
          "Do not open Converge until the pile feels silly-large.",
          "Walk or SCAMPER if you stall.",
        ]}
      />

      <div className="rounded-xl border border-line bg-cream p-4">
        <p className="label">Divergent prompts</p>
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
        <p className="mt-3 rounded-lg bg-ink/[0.04] px-3 py-2 text-sm text-ink">
          <span className="font-medium">Active constraint: </span>
          {activePrompt}
        </p>
      </div>

      <CaptureBar
        contextNote={`Diverge prompt: ${activePrompt}`}
        seeds={[
          "Bad idea #1 under this prompt",
          "Even worse idea",
          "Surprisingly workable idea",
          "Opposite of my first instinct",
        ]}
      />

      <section>
        <h2 className="mb-2 text-sm font-semibold text-ink">Raw pile only</h2>
        <IdeaList
          filter="raw"
          mode="browse"
          emptyTitle="No raw ideas yet"
          emptyBody="Divergent mode only shows unjudged ideas. Capture freely — Keep/Kill lives in Converge."
        />
      </section>
    </div>
  );
}
