"use client";

import { useIdeas, useProfile } from "@/hooks/use-ideas";
import { FIRST_RUN } from "@/lib/research-content";
import { CheckCircle2, Circle } from "lucide-react";

type Mode = "capture" | "diverge" | "walk" | "scamper" | "converge";

type Props = {
  onGo: (mode: Mode) => void;
};

export function ProtocolChecklist({ onGo }: Props) {
  const { data: ideasData } = useIdeas("all");
  const { data: profileData } = useProfile();

  const ideas = ideasData?.ideas ?? [];
  const rawCount = ideas.filter((i) => i.status === "raw").length;
  const hasSuccess = Boolean(profileData?.profile?.successDefinition?.trim());
  const hasWalk = ideas.some((i) => i.tags?.includes("walk"));
  const hasScamper = ideas.some(
    (i) => i.tags?.includes("scamper") || i.title.startsWith("SCAMPER:"),
  );
  const hasKept = ideas.some((i) => i.status === "keep");
  const captureCount = ideas.length;

  const done = [
    hasSuccess,
    captureCount >= 3,
    hasWalk,
    hasScamper,
    hasKept,
  ];

  const completed = done.filter(Boolean).length;

  return (
    <section className="space-y-3 py-1">
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <h2 className="font-semibold text-ink">First creative loop</h2>
        <span className="font-mono text-xs text-muted">
          {completed}/{FIRST_RUN.length}
        </span>
      </div>
      <p className="mb-4 text-sm text-muted">
        Catch → Generate · Walk · Prompt → Decide. Run it once end-to-end.
      </p>
      <ul className="space-y-2">
        {FIRST_RUN.map((step, i) => {
          const isDone = done[i];
          return (
            <li key={step.id}>
              <button
                type="button"
                onClick={() => onGo(step.mode)}
                className="focus-ring flex w-full items-start gap-3 border border-transparent px-2 py-2 text-left hover:border-zinc-800 hover:bg-zinc-950/40"
              >
                {isDone ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sage" aria-hidden />
                ) : (
                  <Circle className="mt-0.5 h-4 w-4 shrink-0 text-muted" aria-hidden />
                )}
                <span className={`text-sm ${isDone ? "text-muted line-through" : "text-ink"}`}>
                  {step.text}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      {rawCount > 0 && completed < FIRST_RUN.length ? (
        <p className="mt-3 text-xs text-muted">
          You have {rawCount} raw idea{rawCount === 1 ? "" : "s"} waiting in Decide.
        </p>
      ) : null}
    </section>
  );
}
