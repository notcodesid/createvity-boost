"use client";

import type { Idea, IdeaStatus } from "@createvity/shared";
import { ExternalLink, Rocket, Trash2 } from "lucide-react";
import { useDeleteIdea, useIdeas, useUpdateIdea } from "@/hooks/use-ideas";

const STATUS_STYLE: Record<IdeaStatus, string> = {
  raw: "bg-paper-muted text-muted",
  keep: "bg-sage/15 text-sage",
  kill: "bg-ink/10 text-muted line-through",
  shipped: "bg-amber/20 text-amber-deep",
};

const STATUS_HELP: Record<IdeaStatus, string> = {
  raw: "Unjudged. Still in generation land.",
  keep: "Worth another pass or SCAMPER.",
  kill: "Released. Space for better ideas.",
  shipped: "In the world. Proof on Monad.",
};

type Props = {
  filter?: IdeaStatus | "all";
  mode?: "browse" | "converge";
  selectedId?: string | null;
  onSelect?: (idea: Idea) => void;
  onShip?: (idea: Idea) => void;
  emptyTitle?: string;
  emptyBody?: string;
};

export function IdeaList({
  filter = "all",
  mode = "browse",
  selectedId,
  onSelect,
  onShip,
  emptyTitle = "Vault is empty",
  emptyBody = "Capture something messy above. Total freedom is often the enemy — a seed prompt helps.",
}: Props) {
  const { data, isLoading, isError, error, refetch, isFetching } = useIdeas(filter);
  const update = useUpdateIdea();
  const del = useDeleteIdea();

  if (isLoading) {
    return (
      <div className="space-y-3" aria-busy="true" aria-label="Loading ideas">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-24 animate-pulse rounded-xl border border-line bg-paper-muted/60"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-line bg-cream p-6 text-center">
        <p className="mb-1 font-medium text-ink">Couldn&apos;t load ideas</p>
        <p className="mb-3 text-sm text-coral">{(error as Error).message}</p>
        <button type="button" className="btn-ghost" onClick={() => void refetch()}>
          Retry
        </button>
      </div>
    );
  }

  const ideas = data?.ideas ?? [];

  if (ideas.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-line bg-cream/80 p-8 text-center">
        <p className="font-semibold text-ink">{emptyTitle}</p>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
          {emptyBody}
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-3" aria-busy={isFetching}>
      {ideas.map((idea) => {
        const selected = selectedId === idea.id;
        return (
          <li key={idea.id}>
            <article
              className={`rounded-xl border border-line bg-cream p-4 transition-colors ${
                selected ? "border-amber ring-2 ring-amber/30" : ""
              } ${onSelect ? "cursor-pointer hover:border-amber/50" : ""}`}
              onClick={() => onSelect?.(idea)}
              onKeyDown={(e) => {
                if (onSelect && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  onSelect(idea);
                }
              }}
              tabIndex={onSelect ? 0 : undefined}
              role={onSelect ? "button" : undefined}
            >
              <div className="mb-1 flex flex-wrap items-start justify-between gap-2">
                <h3 className="text-base font-semibold leading-snug text-ink">
                  {idea.title}
                </h3>
                <span
                  className={`badge ${STATUS_STYLE[idea.status]}`}
                  title={STATUS_HELP[idea.status]}
                >
                  {idea.status}
                </span>
              </div>
              {idea.body ? (
                <p className="mb-2 line-clamp-3 text-sm text-muted">{idea.body}</p>
              ) : null}
              {idea.tags && idea.tags.length > 0 ? (
                <p className="mb-2 text-[11px] text-muted">
                  {idea.tags.map((t) => `#${t}`).join(" ")}
                </p>
              ) : null}

              {mode === "converge" && idea.status !== "shipped" ? (
                <div
                  className="mt-3 flex flex-wrap gap-2 border-t border-line pt-3"
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    className="btn-ghost text-xs"
                    disabled={update.isPending}
                    onClick={() => update.mutate({ id: idea.id, body: { status: "keep" } })}
                    title="Still curious — refine later"
                  >
                    Keep
                  </button>
                  <button
                    type="button"
                    className="btn-ghost text-xs"
                    disabled={update.isPending}
                    onClick={() => update.mutate({ id: idea.id, body: { status: "kill" } })}
                    title="Ego, not energy — release it"
                  >
                    Kill
                  </button>
                  <button
                    type="button"
                    className="btn-accent text-xs"
                    onClick={() => onShip?.(idea)}
                    title="Put a public version into the world"
                  >
                    <Rocket className="h-3.5 w-3.5" aria-hidden />
                    Ship on Monad
                  </button>
                  <button
                    type="button"
                    className="btn-danger text-xs"
                    disabled={del.isPending}
                    onClick={() => {
                      if (confirm("Delete this idea forever?")) del.mutate(idea.id);
                    }}
                    aria-label={`Delete ${idea.title}`}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : null}

              {idea.status === "shipped" && idea.shipTxHash ? (
                <a
                  href={`https://testnet.monadvision.com/tx/${idea.shipTxHash}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-amber-deep underline-offset-2 hover:underline focus-ring rounded"
                  onClick={(e) => e.stopPropagation()}
                >
                  Onchain ship receipt
                  <ExternalLink className="h-3 w-3" aria-hidden />
                </a>
              ) : null}
            </article>
          </li>
        );
      })}
    </ul>
  );
}
