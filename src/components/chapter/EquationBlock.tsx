import type { Equation } from "@/content/types";
import { Katex } from "./Katex";

export function EquationBlock({ equation }: { equation: Equation }) {
  const anchor = `eq-${equation.id.replace(".", "-")}`;
  return (
    <div id={anchor} className="eq-block scroll-mt-28">
      <div className="mb-1 flex items-baseline justify-between gap-3 text-sm text-ink-muted">
        <span>{equation.label}</span>
        <a href={`#${anchor}`} className="font-mono text-accent no-underline">
          ({equation.id})
        </a>
      </div>
      <Katex latex={equation.latex} display className="block overflow-x-auto" />
    </div>
  );
}
