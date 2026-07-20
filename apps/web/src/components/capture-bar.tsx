"use client";

import { useState } from "react";
import { useCreateIdea } from "@/hooks/use-ideas";

type Props = {
  contextNote?: string;
  heading?: string;
};

export function CaptureBar({
  contextNote,
  heading = "Catch an idea",
}: Props) {
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

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl border border-line bg-cream p-4 sm:p-5"
    >
      <h2 className="mb-3 font-semibold text-ink">{heading}</h2>

      <label className="label" htmlFor="idea-title">
        Idea
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
        Notes (optional)
      </label>
      <textarea
        id="idea-body"
        className="input mb-4 min-h-20 resize-y"
        placeholder="Any extra detail…"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        maxLength={5000}
      />

      <div className="flex justify-end">
        <button
          type="submit"
          className="btn-accent"
          disabled={!title.trim() || create.isPending}
        >
          {create.isPending ? "Saving…" : "Save idea"}
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
