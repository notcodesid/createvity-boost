"use client";

import { ArrowRight, Check, Compass, Sparkles } from "lucide-react";
import { useState } from "react";
import { useCreateIdea, useIdeas } from "@/hooks/use-ideas";
import { api } from "@/lib/api";

type ResetState = "blank" | "circling" | "choose";
type Step = "start" | "exercise" | "finish" | "complete";

const RESET_ROUTES: Array<{
  id: ResetState;
  title: string;
  description: string;
  question: string;
  helper: string;
  placeholder: string;
}> = [
  {
    id: "blank",
    title: "I’m blank",
    description: "I need a few rough directions.",
    question: "Give yourself three rough directions.",
    helper: "Fragments count. Separate them with line breaks. No judging yet.",
    placeholder: "A deliberately bad first direction…\nA different angle…\nThe smallest version I could try…",
  },
  {
    id: "circling",
    title: "I’m circling",
    description: "I have thoughts, but no way forward.",
    question: "Get the loop out of your head.",
    helper: "Write what has been repeating, then end with the part that still has energy.",
    placeholder: "I keep thinking about…\n\nThe part that still feels alive is…",
  },
  {
    id: "choose",
    title: "I need to choose",
    description: "I need to commit to one direction.",
    question: "Name the options, then the one you want to test.",
    helper: "You are not choosing forever. You are choosing the next honest experiment.",
    placeholder: "Option A…\nOption B…\n\nThe one I want to test first is…",
  },
];

export function CreativeReset() {
  const { data, isLoading } = useIdeas("all");
  const createIdea = useCreateIdea();
  const [step, setStep] = useState<Step>("start");
  const [topic, setTopic] = useState("");
  const [state, setState] = useState<ResetState>("blank");
  const [response, setResponse] = useState("");
  const [nextAction, setNextAction] = useState("");
  const [savedAction, setSavedAction] = useState("");
  const [error, setError] = useState<string | null>(null);

  const route = RESET_ROUTES.find((item) => item.id === state) ?? RESET_ROUTES[0];
  const activeIdea = (data?.ideas ?? []).find(
    (idea) => idea.status === "keep" && idea.nextAction?.trim(),
  );

  function beginReset(e: React.FormEvent) {
    e.preventDefault();
    if (!topic.trim()) return;
    setError(null);
    setStep("exercise");
  }

  function continueToCommitment(e: React.FormEvent) {
    e.preventDefault();
    if (!response.trim()) return;
    setError(null);
    setStep("finish");
  }

  async function saveReset(e: React.FormEvent) {
    e.preventDefault();
    const cleanTopic = topic.trim();
    const cleanResponse = response.trim();
    const cleanNextAction = nextAction.trim();
    if (!cleanTopic || !cleanResponse || !cleanNextAction || createIdea.isPending) return;

    setError(null);
    try {
      const { idea } = await createIdea.mutateAsync({
        title: cleanTopic,
        body: [
          `Reset state: ${route.title}`,
          `What I’m moving forward: ${cleanTopic}`,
          "",
          route.question,
          cleanResponse,
        ].join("\n"),
        status: "keep",
        tags: ["reset", state],
        nextAction: cleanNextAction,
      });

      try {
        const { session } = await api.createSession({
          type: "reset",
          ideaId: idea.id,
          notes: cleanNextAction,
          meta: { state, topic: cleanTopic },
        });
        await api.updateSession(session.id, { endedAt: Date.now() });
      } catch {
        // The committed idea is the essential outcome; session analytics can retry later.
      }

      setSavedAction(cleanNextAction);
      setStep("complete");
    } catch (err) {
      setError((err as Error).message);
    }
  }

  function startAnother() {
    setStep("start");
    setTopic("");
    setState("blank");
    setResponse("");
    setNextAction("");
    setSavedAction("");
    setError(null);
  }

  if (isLoading) {
    return <div className="h-96 animate-pulse border border-line bg-cream" />;
  }

  return (
    <section className="border border-line bg-cream p-5 sm:p-7">
      {step === "start" ? (
        <form onSubmit={beginReset} className="space-y-7">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-muted">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Creative reset
            </div>
            <h1 className="font-serif text-3xl leading-tight text-ink sm:text-4xl">
              What are you trying to move forward?
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
              Start with the work that matters. You will leave with one next move you chose yourself.
            </p>
          </div>

          {activeIdea ? (
            <div className="border-l-2 border-sage bg-sage/5 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-sage">
                Your current next move
              </p>
              <p className="mt-2 font-medium text-ink">{activeIdea.nextAction}</p>
              <p className="mt-1 text-sm text-muted">For: {activeIdea.title}</p>
            </div>
          ) : null}

          <div>
            <label className="label" htmlFor="reset-topic">
              The project, problem, or question
            </label>
            <textarea
              id="reset-topic"
              className="input min-h-28 resize-y text-base"
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              placeholder="I’m trying to move forward…"
              maxLength={500}
              autoFocus
              required
            />
          </div>

          <fieldset>
            <legend className="label mb-3">What is true right now?</legend>
            <div className="grid gap-3 md:grid-cols-3">
              {RESET_ROUTES.map((item) => {
                const selected = state === item.id;
                return (
                  <label
                    key={item.id}
                    className={`cursor-pointer border p-4 transition-colors ${
                      selected
                        ? "border-ink bg-paper-muted"
                        : "border-line bg-cream hover:border-ink-soft"
                    }`}
                  >
                    <input
                      className="sr-only"
                      type="radio"
                      name="reset-state"
                      value={item.id}
                      checked={selected}
                      onChange={() => setState(item.id)}
                    />
                    <span className="block font-medium text-ink">{item.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted">
                      {item.description}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <button type="submit" className="btn-accent" disabled={!topic.trim()}>
            Start this reset
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        </form>
      ) : null}

      {step === "exercise" ? (
        <form onSubmit={continueToCommitment} className="space-y-6">
          <StepLabel current={2} />
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
              {route.title}
            </p>
            <h1 className="mt-2 font-serif text-3xl leading-tight text-ink sm:text-4xl">
              {route.question}
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">{route.helper}</p>
          </div>
          <textarea
            className="input min-h-56 resize-y text-base"
            value={response}
            onChange={(event) => setResponse(event.target.value)}
            placeholder={route.placeholder}
            autoFocus
            maxLength={5000}
            required
          />
          <div className="flex flex-wrap gap-3">
            <button type="button" className="btn-ghost" onClick={() => setStep("start")}>
              Back
            </button>
            <button type="submit" className="btn-accent" disabled={!response.trim()}>
              Choose a next move
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </form>
      ) : null}

      {step === "finish" ? (
        <form onSubmit={(event) => void saveReset(event)} className="space-y-6">
          <StepLabel current={3} />
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
              Commit to a move
            </p>
            <h1 className="mt-2 font-serif text-3xl leading-tight text-ink sm:text-4xl">
              What is the smallest thing you will make or do next?
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
              Make it specific enough to begin without another planning session.
            </p>
          </div>
          <textarea
            id="reset-next-action"
            className="input min-h-28 resize-y text-base"
            value={nextAction}
            onChange={(event) => setNextAction(event.target.value)}
            placeholder="Draft the opening paragraph before lunch."
            autoFocus
            maxLength={1000}
            required
          />
          <div className="flex flex-wrap gap-3">
            <button type="button" className="btn-ghost" onClick={() => setStep("exercise")}>
              Back
            </button>
            <button
              type="submit"
              className="btn-accent"
              disabled={createIdea.isPending || !nextAction.trim()}
            >
              {createIdea.isPending ? "Saving your next move…" : "Save next move"}
              <Check className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </form>
      ) : null}

      {step === "complete" ? (
        <div className="max-w-2xl py-4">
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-sage/15 text-sage">
            <Check className="h-5 w-5" aria-hidden />
          </div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-sage">Reset complete</p>
          <h1 className="mt-2 font-serif text-3xl leading-tight text-ink sm:text-4xl">
            You have a next move.
          </h1>
          <div className="mt-6 border-l-2 border-sage bg-sage/5 p-5">
            <p className="text-sm text-muted">Do this next</p>
            <p className="mt-2 text-lg font-medium text-ink">{savedAction}</p>
          </div>
          <button type="button" className="btn-ghost mt-6" onClick={startAnother}>
            Start another reset
          </button>
        </div>
      ) : null}

      {error ? (
        <p className="mt-5 text-sm text-coral" role="alert">
          {error}
        </p>
      ) : null}
    </section>
  );
}

function StepLabel({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-muted">
      <Compass className="h-3.5 w-3.5" aria-hidden />
      Reset {current}/3
    </div>
  );
}
