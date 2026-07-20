"use client";

import { useState } from "react";
import type { Idea } from "@createvity/shared";
import { Wand2 } from "lucide-react";
import { useCreateIdea, useIdeas } from "@/hooks/use-ideas";
import { api } from "@/lib/api";
import { ModeGuide } from "./mode-guide";
import { SCAMPER_PROMPTS } from "@/lib/research-content";

export function ScamperPanel() {
  const { data, isLoading } = useIdeas("all");
  const create = useCreateIdea();
  const [ideaId, setIdeaId] = useState("");
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState("");
  const [notes, setNotes] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ideas = (data?.ideas ?? []).filter((i) => i.status !== "kill");
  const selected: Idea | undefined = ideas.find((i) => i.id === ideaId);
  const prompt = SCAMPER_PROMPTS[step];
  const finished = step >= SCAMPER_PROMPTS.length;

  async function saveStep(e: React.FormEvent) {
    e.preventDefault();
    if (!selected || !answer.trim()) return;
    setBusy(true);
    setError(null);
    try {
      if (notes.length === 0) {
        await api.createSession({
          type: "scamper",
          ideaId: selected.id,
          notes: `SCAMPER on: ${selected.title}`,
        });
      }
      const line = `${prompt.key} — ${prompt.label}: ${answer.trim()}`;
      const nextNotes = [...notes, line];
      setNotes(nextNotes);
      setAnswer("");
      if (step + 1 >= SCAMPER_PROMPTS.length) {
        await create.mutateAsync({
          title: `SCAMPER: ${selected.title}`,
          body: [
            `Base idea: ${selected.title}`,
            "",
            ...nextNotes,
            "",
            "Generated with constrained prompts — evaluate later in Decide.",
          ].join("\n"),
          tags: ["scamper", "constrained"],
        });
        setStep(SCAMPER_PROMPTS.length);
      } else {
        setStep((s) => s + 1);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  function reset() {
    setStep(0);
    setAnswer("");
    setNotes([]);
    setError(null);
  }

  return (
    <div className="space-y-5">
      <ModeGuide
        title="Prompt — a checklist when you’re stuck"
        science="SCAMPER (Osborn → Eberle). When the page is blank, total freedom freezes you — simple prompts force new angles."
        how={[
          "Pick one base idea from your vault.",
          "Answer each letter without self-editing.",
          "We save the full run as a new idea.",
          "Judge quality later in Decide — not mid-prompt.",
        ]}
      />

      <div className="rounded-xl border border-line bg-cream p-5">
        <div className="mb-4 flex items-center gap-2">
          <Wand2 className="h-5 w-5 text-amber-deep" aria-hidden />
          <div>
            <h2 className="font-semibold text-ink">Run prompts</h2>
            <p className="text-sm text-muted">Seven questions. One idea. No critic.</p>
          </div>
        </div>

        {isLoading ? (
          <div className="h-12 animate-pulse rounded-lg bg-paper-muted" />
        ) : ideas.length === 0 ? (
          <div className="rounded-lg border border-dashed border-line p-6 text-center">
            <p className="font-medium text-ink">Need a base idea first</p>
            <p className="mt-1 text-sm text-muted">
              Catch something raw, then come back here to force new combinations.
            </p>
          </div>
        ) : (
          <>
            <label className="label" htmlFor="scamper-idea">
              Base idea
            </label>
            <select
              id="scamper-idea"
              className="input mb-4"
              value={ideaId}
              onChange={(e) => {
                setIdeaId(e.target.value);
                reset();
              }}
              disabled={busy}
            >
              <option value="">Select an idea to stress-test…</option>
              {ideas.map((i) => (
                <option key={i.id} value={i.id}>
                  [{i.status}] {i.title}
                </option>
              ))}
            </select>

            {selected && !finished && prompt ? (
              <form onSubmit={(e) => void saveStep(e)} className="space-y-3">
                <div className="rounded-xl border border-amber/30 bg-amber/5 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold uppercase tracking-widest text-amber-deep">
                      {prompt.key} · step {step + 1}/{SCAMPER_PROMPTS.length}
                    </p>
                    <div className="flex gap-1" aria-hidden>
                      {SCAMPER_PROMPTS.map((p, i) => (
                        <span
                          key={p.key}
                          className={`h-1.5 w-3 rounded-full ${
                            i <= step ? "bg-amber" : "bg-line"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 text-xl font-semibold text-ink">{prompt.label}</p>
                  <p className="mt-1 text-sm text-ink">{prompt.q}</p>
                  <p className="mt-2 text-xs text-muted">{prompt.tip}</p>
                </div>
                <label className="label" htmlFor="scamper-answer">
                  Your riff (no wrong answers)
                </label>
                <textarea
                  id="scamper-answer"
                  className="input min-h-28"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Wild, practical, silly — all allowed"
                  required
                />
                <button
                  type="submit"
                  className="btn-accent"
                  disabled={busy || !answer.trim()}
                >
                  {step + 1 >= SCAMPER_PROMPTS.length
                    ? "Finish & save as new idea"
                    : "Next letter"}
                </button>
              </form>
            ) : null}

            {finished ? (
              <div className="rounded-xl border border-sage/30 bg-sage/10 p-4">
                <p className="font-medium text-sage">
                  Full prompt run saved to your vault as a new idea.
                </p>
                <p className="mt-1 text-sm text-muted">
                  Next: open Decide to keep, drop, or ship a public version.
                </p>
                <button type="button" className="btn-ghost mt-3" onClick={reset}>
                  Run prompts again
                </button>
              </div>
            ) : null}

            {notes.length > 0 && !finished ? (
              <div className="mt-4">
                <p className="label">So far</p>
                <ol className="list-decimal space-y-1 pl-5 text-sm text-muted">
                  {notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ol>
              </div>
            ) : null}
          </>
        )}

        {error ? (
          <p className="mt-3 text-sm text-coral" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    </div>
  );
}
