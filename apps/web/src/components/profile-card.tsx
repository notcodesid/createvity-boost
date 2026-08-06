"use client";

import { useEffect, useState } from "react";
import { Target } from "lucide-react";
import { api } from "@/lib/api";
import { useProfile } from "@/hooks/use-ideas";
import { useQueryClient } from "@tanstack/react-query";
import { DREAM_EXAMPLES, SUCCESS_EXAMPLES } from "@/lib/research-content";

export function ProfileCard() {
  const { data, isLoading } = useProfile();
  const qc = useQueryClient();
  const [success, setSuccess] = useState("");
  const [dream, setDream] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    if (data?.profile) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSuccess(data.profile.successDefinition ?? "");
      setDream(data.profile.tenYearDream ?? "");
    }
  }, [data]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    try {
      await api.updateProfile({
        successDefinition: success,
        tenYearDream: dream,
      });
      await qc.invalidateQueries({ queryKey: ["profile"] });
      setMsg("Saved");
    } catch (err) {
      setMsg((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  if (isLoading) {
    return <div className="h-48 animate-pulse border border-zinc-900 bg-zinc-950/40" />;
  }

  return (
    <form onSubmit={(e) => void save(e)} className="space-y-4 py-1">
      <div className="mb-2 flex items-center gap-2">
        <Target className="h-4 w-4 text-amber-deep" aria-hidden />
        <h2 className="font-semibold text-ink">Success on your terms</h2>
      </div>
      <p className="mb-3 text-xs leading-relaxed text-muted">
        Klein: know what you want — attention, craft, joy, shipping — then methodically
        close the distance. Revise monthly.
      </p>

      <label className="label" htmlFor="success-def">
        Success means…
      </label>
      <input
        id="success-def"
        className="input mb-2"
        value={success}
        onChange={(e) => setSuccess(e.target.value)}
        placeholder="e.g. Finish one real thing every week"
        maxLength={2000}
      />
      <div className="mb-3 flex flex-wrap gap-1.5">
        {SUCCESS_EXAMPLES.map((ex) => (
          <button
            key={ex}
            type="button"
            className="rounded-full border border-line px-2 py-0.5 text-[11px] text-muted hover:border-amber hover:text-ink focus-ring"
            onClick={() => setSuccess(ex)}
          >
            {ex}
          </button>
        ))}
      </div>

      <label className="label" htmlFor="ten-year">
        10-year dream (revisable)
      </label>
      <textarea
        id="ten-year"
        className="input mb-2 min-h-20"
        value={dream}
        onChange={(e) => setDream(e.target.value)}
        placeholder="Bigger dream → clearer focus"
        maxLength={5000}
      />
      <div className="mb-3 flex flex-wrap gap-1.5">
        {DREAM_EXAMPLES.map((ex) => (
          <button
            key={ex}
            type="button"
            className="rounded-full border border-line px-2 py-0.5 text-[11px] text-muted hover:border-amber hover:text-ink focus-ring"
            onClick={() => setDream(ex)}
          >
            {ex}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button type="submit" className="btn-ghost" disabled={saving}>
          {saving ? "Saving…" : "Save direction"}
        </button>
        {msg ? <span className="text-xs text-muted">{msg}</span> : null}
      </div>
    </form>
  );
}
