"use client";

import { INPUT_DIET } from "@/lib/research-content";

export function InputDiet() {
  return (
    <section className="space-y-3 py-1">
      <h2 className="font-semibold text-ink">Feed the network</h2>
      <p className="mt-1 mb-3 text-xs text-muted">
        Creativity is recombination. Protect input + boredom.
      </p>
      <ul className="space-y-3">
        {INPUT_DIET.map((item) => (
          <li key={item.label} className="border-t border-zinc-900 pt-3 first:border-0 first:pt-0">
            <p className="text-sm font-medium text-ink">{item.label}</p>
            <p className="text-xs leading-relaxed text-muted">{item.why}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
