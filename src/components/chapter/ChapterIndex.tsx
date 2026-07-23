"use client";

import Link from "next/link";
import { useMemo, useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import autoAnimate from "@formkit/auto-animate";
import { chapters, searchChapters } from "@/content/chapters";
import { THEME_LABELS, type ThemeId } from "@/content/types";

const themes = Object.keys(THEME_LABELS) as ThemeId[];

export function ChapterIndex() {
  const searchParams = useSearchParams();
  const themeParam = searchParams.get("theme");
  const initialTheme =
    themeParam && themes.includes(themeParam as ThemeId)
      ? (themeParam as ThemeId)
      : "all";
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState<ThemeId | "all">(initialTheme);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setTheme(initialTheme);
  }, [initialTheme]);

  useEffect(() => {
    if (listRef.current) autoAnimate(listRef.current);
  }, []);

  const filtered = useMemo(() => {
    let list = searchChapters(query);
    if (theme !== "all") list = list.filter((c) => c.theme === theme);
    return list;
  }, [query, theme]);

  return (
    <div>
      <div className="flex flex-col gap-3 md:flex-row md:items-end">
        <label className="flex-1 text-sm">
          <span className="mb-1 block text-ink-muted">Search title, keyword, or equation id</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Darcy, NPSH, 23.1"
            className="w-full rounded border border-line bg-white/70 px-3 py-2"
          />
        </label>
        <label className="text-sm md:w-64">
          <span className="mb-1 block text-ink-muted">Theme</span>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as ThemeId | "all")}
            className="w-full rounded border border-line bg-white/70 px-3 py-2"
          >
            <option value="all">All themes</option>
            {themes.map((t) => (
              <option key={t} value={t}>
                {THEME_LABELS[t]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="mt-4 text-sm text-ink-muted">
        Showing {filtered.length} of {chapters.length} chapters
      </p>

      <ul ref={listRef} className="mt-4 divide-y divide-line border-y border-line">
        {filtered.map((c) => (
          <li key={c.id} className="py-4">
            <Link href={`/chapters/${c.id}`} className="group block no-underline">
              <span className="font-mono text-sm text-accent">Ch. {c.id}</span>
              <span className="mt-1 block font-display text-xl text-ink group-hover:underline">
                {c.title}
              </span>
              <span className="mt-1 block text-sm text-ink-muted">
                {THEME_LABELS[c.theme]} · {c.equations.length} equations · {c.examples.length}{" "}
                examples
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
