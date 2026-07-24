"use client";

import Link from "next/link";
import { useMemo, useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import autoAnimate from "@formkit/auto-animate";
import { chapters, searchChapters } from "@/content/chapters";
import type { ThemeId } from "@/content/types";
import { useLocale } from "@/i18n/LocaleProvider";
import { localizeChapters } from "@/i18n/localize-chapter";
import { formatTemplate } from "@/i18n/ui";

const themeIds = [
  "statics",
  "flow",
  "pipe",
  "momentum",
  "channel",
  "unsteady",
] as ThemeId[];

export function ChapterIndex() {
  const searchParams = useSearchParams();
  const { locale, t } = useLocale();
  const themeParam = searchParams.get("theme");
  const initialTheme =
    themeParam && themeIds.includes(themeParam as ThemeId)
      ? (themeParam as ThemeId)
      : "all";
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState<ThemeId | "all">(initialTheme);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setTheme(initialTheme);
  }, [initialTheme]);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    // AutoAnimate + CSS grid FLIP is janky — only enable on single-column (<sm)
    const mq = window.matchMedia("(max-width: 639px)");
    const controller = autoAnimate(el);
    controller.disable();

    const sync = () => {
      if (mq.matches) controller.enable();
      else controller.disable();
    };

    sync();
    mq.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      controller.disable();
    };
  }, []);

  const filtered = useMemo(() => {
    let list = searchChapters(query);
    if (theme !== "all") list = list.filter((c) => c.theme === theme);
    return localizeChapters(list, locale);
  }, [query, theme, locale]);

  // Also allow searching Vietnamese titles when locale is vi
  const filteredWithViSearch = useMemo(() => {
    if (locale !== "vi" || !query.trim()) return filtered;
    const q = query.trim().toLowerCase();
    const fromVi = localizeChapters(chapters, "vi").filter((c) => {
      if (theme !== "all" && c.theme !== theme) return false;
      const hay = [
        c.title,
        c.scope,
        ...c.equations.map((e) => `${e.id} ${e.label}`),
        ...c.nomenclature.map((n) => `${n.symbol} ${n.meaning}`),
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q) || c.equations.some((e) => e.id.includes(q));
    });
    // Prefer VI-aware list when searching
    return fromVi.length ? fromVi : filtered;
  }, [filtered, locale, query, theme]);

  const list = locale === "vi" && query.trim() ? filteredWithViSearch : filtered;

  return (
    <div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.chaptersPage.searchPlaceholder}
          aria-label={t.chaptersPage.searchPlaceholder}
          className="min-w-0 flex-1 rounded border border-line bg-white/70 px-3 py-2 text-sm"
        />
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value as ThemeId | "all")}
          aria-label={t.chaptersPage.allThemes}
          className="rounded border border-line bg-white/70 px-3 py-2 text-sm sm:w-52"
        >
          <option value="all">{t.chaptersPage.allThemes}</option>
          {themeIds.map((id) => (
            <option key={id} value={id}>
              {t.themes[id]}
            </option>
          ))}
        </select>
      </div>

      <p className="mt-3 text-sm text-ink-muted">
        {formatTemplate(t.chaptersPage.showing, {
          n: list.length,
          total: chapters.length,
        })}
      </p>

      <ul
        ref={listRef}
        className="mt-3 divide-y divide-line border-y border-line sm:grid sm:grid-cols-2 sm:gap-x-8 sm:divide-y-0 sm:border-0 lg:grid-cols-3"
      >
        {list.length === 0 ? (
          <li className="empty-state col-span-full py-8 text-center text-sm text-ink-muted sm:col-span-2 lg:col-span-3">
            {t.chaptersPage.emptyFilter}
          </li>
        ) : (
          list.map((c) => (
            <li key={c.id} className="border-b border-line py-3 sm:border-b">
              <Link href={`/chapters/${c.id}`} className="group block no-underline">
                <span className="font-mono text-xs text-accent">
                  {t.chapter.chapter} {c.id}
                </span>
                <span className="mt-0.5 block font-display text-lg leading-snug text-ink group-hover:underline">
                  {c.title}
                </span>
                <span className="mt-0.5 block text-xs text-ink-muted">
                  {t.themes[c.theme]} · {c.equations.length} {t.chaptersPage.eq} ·{" "}
                  {c.examples.length} {t.chaptersPage.ex}
                </span>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
