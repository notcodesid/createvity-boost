"use client";

type Props = {
  title: string;
  science: string;
  how: string[];
  accent?: "amber" | "sage" | "ink";
};

export function ModeGuide({ title, science, how, accent = "amber" }: Props) {
  const border =
    accent === "sage"
      ? "border-sage/25 bg-sage/5"
      : accent === "ink"
        ? "border-ink/10 bg-ink/[0.03]"
        : "border-amber/30 bg-amber/5";

  return (
    <section className={`rounded-xl border p-4 sm:p-5 ${border}`}>
      <h2 className="text-base font-semibold text-ink">{title}</h2>
      <p className="mt-1 text-sm leading-relaxed text-muted">{science}</p>
      <ol className="mt-3 space-y-1.5 text-sm text-ink">
        {how.map((step, i) => (
          <li key={step} className="flex gap-2">
            <span className="font-mono text-xs text-muted tabular-nums pt-0.5">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
