"use client";

import { Suspense } from "react";
import { ChapterIndex } from "@/components/chapter/ChapterIndex";
import { useT } from "@/i18n/LocaleProvider";

export default function ChaptersPage() {
  const t = useT();
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:py-10">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="font-display text-3xl text-ink md:text-4xl">{t.chaptersPage.title}</h1>
          <p className="mt-1.5 max-w-2xl text-sm text-ink-muted md:text-base">
            {t.chaptersPage.lede}
          </p>
        </div>
      </div>
      <div className="mt-6">
        <Suspense fallback={<p className="text-ink-muted">{t.chaptersPage.loading}</p>}>
          <ChapterIndex />
        </Suspense>
      </div>
    </div>
  );
}
