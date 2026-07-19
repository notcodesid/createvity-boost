"use client";

import { useState } from "react";
import { useCreateIdea } from "@/hooks/use-ideas";
import { CAPTURE_SEEDS } from "@/lib/research-content";

type Props = {
  /** Extra default body tag line */
  contextNote?: string;
  seeds?: string[];
};

export function CaptureBar({ contextNote, seeds = CAPTURE_SEEDS }: Props) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const create = useCreateIdea();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const t = title.trim();
    if (!t || create.isPending) return;
    const notes = [body.trim(), contextNote].filter(Boolean).join("\n\n");
    await create.mutateAsync({ title: t, body: notes });
    setTitle("");
    setBody("");
  }

  function applySeed(seed: string) {
    setTitle(seed);
  }

  return (
    <form onSubmit={onSubmit} className="rounded-xl border border-line bg-cream p-4 sm:p-5">
      <div className="mb-3">
        <h2 className="font-semibold text-ink">Capture now — judge later</h2>
        <p className="mt-1 text-sm text-muted">
          Epstein: people don&apos;t generate fewer ideas as they age — they fail
          to record them. Dump the fragment. Evaluation is a different mode.
        </p>
      </div>

      <label className="label" htmlFor="idea-title">
        Idea (messy is fine)
      </label>
      <input
        id="idea-title"
        className="input mb-3"
        placeholder="What just showed up?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoComplete="off"
        maxLength={500}
        required
      />
      <label className="label" htmlFor="idea-body">
        Notes / fragments
      </label>
      <textarea
        id="idea-body"
        className="input mb-3 min-h-24 resize-y"
        placeholder="Half-sentences, metaphors, who it’s for — no polish"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        maxLength={5000}
      />

      <div className="mb-4">
        <p className="label">Spark seeds (click to fill)</p>
        <div className="flex flex-wrap gap-2">
          {seeds.slice(0, 6).map((seed) => (
            <button
              key={seed}
              type="button"
              className="rounded-full border border-line bg-paper-muted/50 px-3 py-1.5 text-left text-xs text-ink hover:border-amber hover:bg-amber/10 focus-ring"
              onClick={() => applySeed(seed)}
            >
              {seed}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-muted">Inner critic stays off. Status starts as raw.</p>
        <button
          type="submit"
          className="btn-accent"
          disabled={!title.trim() || create.isPending}
        >
          {create.isPending ? "Saving…" : "Capture to vault"}
        </button>
      </div>
      {create.isError ? (
        <p className="mt-3 text-sm text-coral" role="alert">
          {(create.error as Error).message}
        </p>
      ) : null}
    </form>
  );
}
