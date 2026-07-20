"use client";

import { useEffect, useRef, useState } from "react";
import { Footprints } from "lucide-react";
import { api } from "@/lib/api";
import { useCreateIdea } from "@/hooks/use-ideas";
import { ModeGuide } from "./mode-guide";
import { WALK_RULES } from "@/lib/research-content";

const DEFAULT_MINUTES = 10;

export function WalkPanel() {
  const [minutes, setMinutes] = useState(DEFAULT_MINUTES);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [capture, setCapture] = useState("");
  const [detail, setDetail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const tick = useRef<ReturnType<typeof setInterval> | null>(null);
  const create = useCreateIdea();

  useEffect(() => {
    return () => {
      if (tick.current) clearInterval(tick.current);
    };
  }, []);

  async function startWalk() {
    setError(null);
    setDone(false);
    setCapture("");
    setDetail("");
    try {
      const { session } = await api.createSession({
        type: "walk",
        meta: { minutes, protocol: "phone-free" },
      });
      setSessionId(session.id);
      setSecondsLeft(minutes * 60);
      if (tick.current) clearInterval(tick.current);
      tick.current = setInterval(() => {
        setSecondsLeft((s) => {
          if (s === null) return s;
          if (s <= 1) {
            if (tick.current) clearInterval(tick.current);
            setDone(true);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    } catch (e) {
      setError((e as Error).message);
    }
  }

  async function finishEarly() {
    if (tick.current) clearInterval(tick.current);
    setSecondsLeft(0);
    setDone(true);
  }

  async function saveCapture(e: React.FormEvent) {
    e.preventDefault();
    const t = capture.trim();
    if (!t) return;
    const body = [
      detail.trim(),
      "Captured after phone-free walk (Stanford divergent boost protocol).",
    ]
      .filter(Boolean)
      .join("\n\n");
    await create.mutateAsync({
      title: t,
      body,
      tags: ["walk", "post-walk"],
    });
    if (sessionId) {
      await api.updateSession(sessionId, {
        endedAt: Date.now(),
        notes: t,
      });
    }
    setCapture("");
    setDetail("");
    setDone(false);
    setSessionId(null);
    setSecondsLeft(null);
  }

  const mm = secondsLeft !== null ? Math.floor(secondsLeft / 60) : minutes;
  const ss = secondsLeft !== null ? secondsLeft % 60 : 0;
  const running = secondsLeft !== null && secondsLeft > 0 && !done;

  return (
    <div className="space-y-5">
      <ModeGuide
        title="Walk — step away, then catch"
        science="Stanford (Oppezzo & Schwartz): walking boosts creative output ~60% vs sitting. Effect lingers briefly after you sit. Does not help ‘one right answer’ tasks."
        how={[
          "Leave the desk when you’re stuck making more ideas.",
          "Walk without scrolling — let your mind wander.",
          "Return and catch ideas before email / chat.",
          "Then — only later — evaluate in Decide.",
        ]}
      />

      <div className="rounded-xl border border-line bg-cream p-5">
        <div className="mb-4 flex items-start gap-3">
          <Footprints className="mt-0.5 h-5 w-5 shrink-0 text-amber-deep" aria-hidden />
          <div>
            <h2 className="font-semibold text-ink">Walk timer</h2>
            <p className="text-sm text-muted">
              Biggest single lever in our research stack. Honor system on the phone.
            </p>
          </div>
        </div>

        <ul className="mb-5 space-y-2 rounded-lg border border-line bg-paper-muted/40 p-3 text-sm text-ink">
          {WALK_RULES.map((rule) => (
            <li key={rule} className="flex gap-2">
              <span className="text-amber-deep" aria-hidden>
                ·
              </span>
              {rule}
            </li>
          ))}
        </ul>

        {!running && !done ? (
          <div className="flex flex-wrap items-end gap-3">
            <div>
              <label className="label" htmlFor="walk-min">
                Minutes
              </label>
              <input
                id="walk-min"
                type="number"
                min={5}
                max={45}
                className="input w-28"
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value) || 10)}
              />
            </div>
            <button type="button" className="btn-primary" onClick={() => void startWalk()}>
              Start phone-free walk
            </button>
          </div>
        ) : null}

        {running ? (
          <div className="text-center">
            <p className="font-mono text-5xl font-semibold tracking-tight text-ink tabular-nums">
              {String(mm).padStart(2, "0")}:{String(ss).padStart(2, "0")}
            </p>
            <p className="mt-3 text-sm text-muted">
              Walking. No evaluating. Ideas can wait in the fog.
            </p>
            <button type="button" className="btn-ghost mt-4" onClick={() => void finishEarly()}>
              I&apos;m back early — catch now
            </button>
          </div>
        ) : null}

        {done ? (
          <form onSubmit={(e) => void saveCapture(e)} className="space-y-3">
            <div className="rounded-lg border border-sage/30 bg-sage/10 p-3 text-sm text-ink">
              Welcome back. Catch it <strong>before</strong> you open anything else.
              Residual creative boost is short.
            </div>
            <label className="label" htmlFor="walk-capture">
              What showed up?
            </label>
            <input
              id="walk-capture"
              className="input"
              value={capture}
              onChange={(e) => setCapture(e.target.value)}
              placeholder="One idea, fragment, or question"
              autoFocus
              required
            />
            <label className="label" htmlFor="walk-detail">
              More (optional)
            </label>
            <textarea
              id="walk-detail"
              className="input min-h-20"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              placeholder="Context, next experiment, who it’s for…"
            />
            <button
              type="submit"
              className="btn-accent"
              disabled={create.isPending || !capture.trim()}
            >
              {create.isPending ? "Saving…" : "Save walk idea to vault"}
            </button>
          </form>
        ) : null}

        {error ? (
          <p className="mt-3 text-sm text-coral" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    </div>
  );
}
