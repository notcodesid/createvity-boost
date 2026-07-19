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
import { IdeaList } from "./idea-list";
import { ProfileCard } from "./profile-card";
import { ReceiptsPanel } from "./receipts-panel";
import { ScamperPanel } from "./scamper-panel";
import { ShipModal } from "./ship-modal";
import { WalkPanel } from "./walk-panel";
import { WalletButton } from "./wallet-button";
import { SHIP_RECEIPT_ADDRESS } from "@/lib/wagmi";

const MODES = [
  { id: "capture", label: "Capture", icon: Lightbulb },
  { id: "diverge", label: "Diverge", icon: Layers },
  { id: "walk", label: "Walk", icon: Footprints },
  { id: "scamper", label: "SCAMPER", icon: Shuffle },
  { id: "converge", label: "Converge", icon: Scale },
] as const;

type Mode = (typeof MODES)[number]["id"];

export function StudioApp() {
  const [mode, setMode] = useState<Mode>("capture");
  const [shipIdea, setShipIdea] = useState<Idea | null>(null);
  const qc = useQueryClient();

  return (
    <AuthGate>
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <TurbineIcon className="h-6 w-6 text-white" />
            <p className="text-xs text-muted">
              Think better. Create more.
            </p>
          </div>
          <WalletButton />
        </header>

        <nav
          className="flex flex-wrap gap-1 border-b border-line pb-px"
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

        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          <main className="min-w-0 space-y-5">
            {mode === "capture" ? (
              <>
                <CaptureBar />
                <section>
                  <h2 className="mb-2 text-sm font-medium text-muted">Ideas</h2>
                  <IdeaList filter="all" mode="browse" />
                </section>
              </>
            ) : null}

            {mode === "diverge" ? (
              <>
                <p className="text-sm text-muted">
                  Capture only. Keep / kill / ship later in Converge.
                </p>
                <CaptureBar />
                <IdeaList filter="raw" mode="browse" />
              </>
            ) : null}

            {mode === "walk" ? <WalkPanel /> : null}

            {mode === "scamper" ? <ScamperPanel /> : null}

            {mode === "converge" ? (
              <>
                <p className="text-sm text-muted">
                  Keep, kill, or ship. Wallet needed only to ship.
                </p>
                <IdeaList
                  filter="all"
                  mode="converge"
                  onShip={(idea) => setShipIdea(idea)}
                />
              </>
            ) : null}
          </main>

          <aside className="space-y-5">
            <ActivityGraph />
            <ProfileCard />
            <ReceiptsPanel />
            <div className="rounded-lg border border-line bg-cream p-4 text-xs leading-relaxed text-muted">
              <p className="mb-1 font-medium text-ink">ShipReceipt</p>
              <p className="font-mono break-all text-[11px]">{SHIP_RECEIPT_ADDRESS}</p>
              <a
                className="mt-2 inline-block text-amber-deep underline-offset-2 hover:underline focus-ring rounded"
                href={`https://testnet.monadvision.com/address/${SHIP_RECEIPT_ADDRESS}`}
                target="_blank"
                rel="noreferrer"
              >
                MonadVision
              </a>
            </div>
          </aside>
        </div>

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
