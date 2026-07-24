"use client";

import Link from "next/link";
import { useMemo, useState, useEffect, useRef } from "react";
import autoAnimate from "@formkit/auto-animate";
import { allExamples, chapters } from "@/content/chapters";
import { useLocale } from "@/i18n/LocaleProvider";
import { localizeChapter } from "@/i18n/localize-chapter";
import { formatTemplate } from "@/i18n/ui";

export default function ExamplesPage() {
  const { locale, t } = useLocale();
  const [chapterId, setChapterId] = useState<string>("all");
  const [query, setQuery] = useState("");
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (listRef.current) autoAnimate(listRef.current);
  }, []);

  const localizedChapters = useMemo(
    () => chapters.map((c) => localizeChapter(c, locale)),
    [locale],
  );

  const examples = useMemo(() => {
    let list = allExamples().map((ex) => {
      const ch = localizeChapter(
        chapters.find((c) => c.id === ex.chapterId)!,
        locale,
      );
      const vx = ch.examples.find((e) => e.id === ex.id);
      return {
        ...ex,
        prompt: vx?.prompt ?? ex.prompt,
        chapterTitle: ch.title,
      };
    });
    if (chapterId !== "all") {
      list = list.filter((e) => e.chapterId === Number(chapterId));
    }
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (e) =>
          e.id.includes(q) ||
          e.prompt.toLowerCase().includes(q) ||
          e.chapterTitle.toLowerCase().includes(q),
      );
    }
    return list;
  }, [chapterId, query, locale]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-display text-4xl text-ink">{t.examplesPage.title}</h1>
      <p className="mt-2 text-ink-muted">{t.examplesPage.lede}</p>

      <div className="mt-6 flex flex-col gap-3 md:flex-row">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.examplesPage.searchPlaceholder}
          className="flex-1 rounded border border-line bg-white/70 px-3 py-2"
        />
        <select
          value={chapterId}
          onChange={(e) => setChapterId(e.target.value)}
          className="rounded border border-line bg-white/70 px-3 py-2 md:w-72"
        >
          <option value="all">{t.examplesPage.allChapters}</option>
          {localizedChapters.map((c) => (
            <option key={c.id} value={c.id}>
              {t.chapter.chapter} {c.id} — {c.title}
            </option>
          ))}
        </select>
      </div>

      <ul ref={listRef} className="mt-6 divide-y divide-line border-y border-line">
        {examples.map((ex) => (
          <li key={`${ex.chapterId}-${ex.id}`} className="py-4">
            <Link href={`/chapters/${ex.chapterId}#examples`} className="block no-underline">
              <span className="font-mono text-sm text-accent">
                {t.examplesPage.example} {ex.id}
              </span>
              <span className="mt-1 block font-medium text-ink">{ex.prompt}</span>
              <span className="mt-1 block text-sm text-ink-muted">
                {formatTemplate(t.examplesPage.chapterOf, {
                  id: ex.chapterId,
                  title: ex.chapterTitle,
                })}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
