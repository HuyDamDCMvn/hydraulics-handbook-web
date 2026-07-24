"use client";

import { CalculatorsPanel } from "@/components/tools/CalculatorsPanel";
import { useT } from "@/i18n/LocaleProvider";

export default function CalculatorsPage() {
  const t = useT();
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:py-10">
      <h1 className="font-display text-3xl text-ink md:text-4xl">{t.calculators.title}</h1>
      <p className="mt-2 max-w-2xl text-ink-muted">{t.calculators.lede}</p>
      <div className="mt-6">
        <CalculatorsPanel />
      </div>
    </div>
  );
}
