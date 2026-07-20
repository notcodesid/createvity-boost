"use client";

import { useQueryClient } from "@tanstack/react-query";
import type { Idea } from "@createvity/shared";
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
import { InputDiet } from "./input-diet";
import { ProfileCard } from "./profile-card";
import { ProtocolChecklist } from "./protocol-checklist";
import { ReceiptsPanel } from "./receipts-panel";
import { ScamperPanel } from "./scamper-panel";
import { ShipModal } from "./ship-modal";
import { WalkPanel } from "./walk-panel";
import { WalletButton } from "./wallet-button";
import { ModeGuide } from "./mode-guide";
import { SHIP_RECEIPT_ADDRESS } from "@/lib/wagmi";
import { LOOP_STEPS, LOOP_STORY } from "@/lib/research-content";

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
  const [shipIdea, setShipIdea] = useState<Idea | null>(null);
  const qc = useQueryClient();

  return (
    <AuthGate>
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between border-b border-zinc-900 pb-4">
          <div className="flex items-center gap-2">
            <TurbineIcon className="h-6 w-6 text-white" />
            <span className="font-semibold text-white text-lg tracking-tight">Creativity</span>
          </div>
          <WalletButton />
        </header>
 
        <div className="py-2">
          <h1 className="text-2xl font-serif font-normal text-white">
            Think better. Create more.
          </h1>
          <p className="text-xs text-zinc-500 mt-1 max-w-xl leading-relaxed">
            Catch ideas, grow them (Generate · Walk · Prompt), then Decide and Ship.
          </p>
        </div>
 
        <nav
          className="flex flex-wrap gap-1 border-b border-zinc-900 pb-px"
          aria-label="Studio modes"
        >
          {MODES.map(({ id, label, icon: Icon }) => {
            const active = mode === id;
            const meta = LOOP_STEPS.find((s) => s.id === id);
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
                title={meta?.blurb}
                onClick={() => setMode(id)}
              >
                <Icon className="h-4 w-4" aria-hidden />
                {label}
              </button>
            );
          })}
        </nav>

        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          <main className="min-w-0 space-y-5">
            {mode === "capture" ? (
              <>
                <ModeGuide
                  title="Catch — save it before it’s gone"
                  science="Psychologist Robert Epstein: the bottleneck isn’t generation with age — it’s failure to record. Separate catching from judging."
                  how={[
                    "Dump fragments immediately — status starts raw.",
                    "Use a seed if the page feels too free.",
                    "Don’t drop or ship from this tab.",
                    "When stuck, switch to Generate, Walk, or Prompt.",
                  ]}
                />
                <CaptureBar />
                <section>
                  <div className="mb-2 flex items-baseline justify-between gap-2">
                    <h2 className="text-sm font-semibold text-ink">Your vault</h2>
                    <span className="text-xs text-muted">All statuses</span>
                  </div>
                  <IdeaList
                    filter="all"
                    mode="browse"
                    emptyTitle="No ideas yet — that’s the problem we fix"
                    emptyBody="Don’t wait for a ‘good’ idea. Catch a bad one. Volume first; judgment later in Decide."
                  />
                </section>
              </>
            ) : null}

            {mode === "diverge" ? <DivergePanel /> : null}

            {mode === "walk" ? <WalkPanel /> : null}

            {mode === "scamper" ? <ScamperPanel /> : null}

            {mode === "converge" ? (
              <ConvergePanel onShip={(idea) => setShipIdea(idea)} />
            ) : null}
          </main>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pr-3 scrollbar-none">
            <ProtocolChecklist onGo={(m) => setMode(m)} />
            <hr className="border-zinc-900" />
            <ActivityGraph />
            <hr className="border-zinc-900" />
            <ProfileCard />
            <hr className="border-zinc-900" />
            <ReceiptsPanel />
            <hr className="border-zinc-900" />
            <InputDiet />
            <hr className="border-zinc-900" />
            <div className="text-xs leading-relaxed text-zinc-500 space-y-2">
              <p className="font-semibold text-white">Onchain layer</p>
              <p>
                Ideas stay offchain. Only ships hit Monad as public receipts —
                accountability, not surveillance.
              </p>
              <p className="font-mono break-all text-[10px] text-zinc-400">
                {SHIP_RECEIPT_ADDRESS}
              </p>
              <a
                className="mt-1 inline-block text-zinc-300 hover:text-white underline underline-offset-4"
                href={`https://testnet.monadvision.com/address/${SHIP_RECEIPT_ADDRESS}`}
                target="_blank"
                rel="noreferrer"
              >
                View ShipReceipt on MonadVision
              </a>
            </div>
          </aside>
        </div>

        <footer className="border-t border-line pt-4 text-center text-xs text-muted">
          {LOOP_STORY}. Five tabs. Ship is how winners leave the studio.
        </footer>

        <ShipModal
          idea={shipIdea}
          open={!!shipIdea}
          onClose={() => setShipIdea(null)}
          onShipped={() => {
            void qc.invalidateQueries({ queryKey: ["ideas"] });
            void qc.invalidateQueries({ queryKey: ["receipts"] });
          }}
        />
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
