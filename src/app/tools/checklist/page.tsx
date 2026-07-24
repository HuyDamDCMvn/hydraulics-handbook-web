"use client";

import { useT } from "@/i18n/LocaleProvider";

export default function ChecklistPage() {
  const t = useT();
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-4xl text-ink">{t.checklist.title}</h1>
      <ol className="mt-6 list-decimal space-y-3 pl-5 text-ink">
        {t.checklist.steps.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
    </div>
  );
}
