"use client";

import {
  Footprints,
  Layers,
  Lightbulb,
  Scale,
  Shuffle,
} from "lucide-react";
import { useState } from "react";
import { AuthGate } from "./auth-gate";
import { ActivityGraph } from "./activity-graph";
import { CaptureBar } from "./capture-bar";
import { ConvergePanel } from "./converge-panel";
import { DivergePanel } from "./diverge-panel";
import { IdeaList } from "./idea-list";
import { ProtocolChecklist } from "./protocol-checklist";
import { ScamperPanel } from "./scamper-panel";
import { WalkPanel } from "./walk-panel";

const MODES = [
  { id: "capture", label: "Catch", icon: Lightbulb },
  { id: "diverge", label: "Generate", icon: Layers },
  { id: "walk", label: "Walk", icon: Footprints },
  { id: "scamper", label: "Prompt", icon: Shuffle },
  { id: "converge", label: "Decide", icon: Scale },
] as const;

type Mode = (typeof MODES)[number]["id"];

export function StudioApp() {
  const [mode, setMode] = useState<Mode>("capture");

  return (
    <AuthGate>
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between border-b border-zinc-900 pb-4">
          <div className="flex items-center gap-2">
            <TurbineIcon className="h-6 w-6 text-white" />
            <span className="font-semibold text-white text-lg tracking-tight">
              Createvity
            </span>
          </div>
        </header>

        <nav
          className="flex flex-wrap gap-1 border-b border-zinc-900 pb-px"
          aria-label="Studio modes"
        >
          {MODES.map(({ id, label, icon: Icon }) => {
            const active = mode === id;
            return (
              <button
                key={id}
                type="button"
                className={`focus-ring inline-flex min-h-10 items-center gap-2 rounded-t-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "border border-b-0 border-line bg-cream text-ink"
                    : "text-ink-soft hover:bg-paper-muted/60"
                }`}
                aria-current={active ? "page" : undefined}
                onClick={() => setMode(id)}
              >
                <Icon className="h-4 w-4" aria-hidden />
                {label}
              </button>
            );
          })}
        </nav>

        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
          <main className="min-w-0 space-y-5">
            {mode === "capture" ? (
              <>
                <CaptureBar />
                <section>
                  <h2 className="mb-2 text-sm font-semibold text-ink">Your ideas</h2>
                  <IdeaList
                    filter="all"
                    mode="browse"
                    emptyTitle="No ideas yet"
                    emptyBody="Write one above."
                  />
                </section>
              </>
            ) : null}

            {mode === "diverge" ? <DivergePanel /> : null}
            {mode === "walk" ? <WalkPanel /> : null}
            {mode === "scamper" ? <ScamperPanel /> : null}
            {mode === "converge" ? <ConvergePanel /> : null}
          </main>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <ProtocolChecklist onGo={setMode} />
            <ActivityGraph />
          </aside>
        </div>
      </div>
    </AuthGate>
  );
}

function TurbineIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className={className}
    >
      <path d="M12 12c.5-1.5.8-3 .8-4.5 0-.8-.3-1.6-.8-2.3-.5.7-1 .7-1 1.5 0 1.5.3 3 .8 4.5Z" />
      <path d="M12 12c1.3-.8 2.6-1.5 3.8-2 .7-.3 1.3-.2 1.9.2-.5-.4-1.2-.4-1.8-.1-1.2.5-2.5 1.2-3.9 1.9Z" />
      <path d="M12 12c1.5-.5 3-.8 4.5-.8.8 0 1.6.3 2.3.8-.8-.5-1.6-.5-2.3-.5-1.5 0-3 .3-4.5.8Z" />
      <path d="M12 12c.8 1.3 1.5 2.6 2 3.8.3.7.2 1.3-.2 1.9.4-.5.4-1.2.1-1.8-.5-1.2-1.2-2.5-1.9-3.9Z" />
      <path d="M12 12c-.5 1.5-.8 3-.8 4.5 0 .8.3 1.6.8 2.3.5-.7 1-.7 1-1.5 0-1.5-.3-3-.8-4.5Z" />
      <path d="M12 12c-1.3.8-2.6 1.5-3.8 2-.7.3-1.3.2-1.9-.2.5.4 1.2.4 1.8-.1 1.2-.5 2.5-1.2 3.9-1.9Z" />
      <path d="M12 12c-1.5.5-3 .8-4.5.8-.8 0-1.6-.3-2.3-.8.8.5 1.6.5 2.3.5 1.5 0 3-.3 4.5-.8Z" />
      <path d="M12 12c-.8-1.3-1.5-2.6-2-3.8-.3-.7-.2-1.3.2-1.9-.4.5-.4 1.2-.1 1.8.5 1.2 1.2 2.5 1.9 3.9Z" />
    </svg>
  );
}
