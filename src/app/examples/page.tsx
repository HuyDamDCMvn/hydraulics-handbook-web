"use client";

import Link from "next/link";
import { useMemo, useState, useEffect, useRef } from "react";
import autoAnimate from "@formkit/auto-animate";
import { allExamples, chapters } from "@/content/chapters";

export default function ExamplesPage() {
  const [chapterId, setChapterId] = useState<string>("all");
  const [query, setQuery] = useState("");
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (listRef.current) autoAnimate(listRef.current);
  }, []);

  const examples = useMemo(() => {
    let list = allExamples();
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
  }, [chapterId, query]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-display text-4xl text-ink">Worked examples</h1>
      <p className="mt-2 text-ink-muted">48 SI worked examples across all chapters.</p>

      <div className="mt-6 flex flex-col gap-3 md:flex-row">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search examples"
          className="flex-1 rounded border border-line bg-white/70 px-3 py-2"
        />
        <select
          value={chapterId}
          onChange={(e) => setChapterId(e.target.value)}
          className="rounded border border-line bg-white/70 px-3 py-2 md:w-72"
        >
          <option value="all">All chapters</option>
          {chapters.map((c) => (
            <option key={c.id} value={c.id}>
              Ch. {c.id} — {c.title}
            </option>
          ))}
        </select>
      </div>

      <ul ref={listRef} className="mt-6 divide-y divide-line border-y border-line">
        {examples.map((ex) => (
          <li key={`${ex.chapterId}-${ex.id}`} className="py-4">
            <Link
              href={`/chapters/${ex.chapterId}#examples`}
              className="block no-underline"
            >
              <span className="font-mono text-sm text-accent">Example {ex.id}</span>
              <span className="mt-1 block font-medium text-ink">{ex.prompt}</span>
              <span className="mt-1 block text-sm text-ink-muted">
                Chapter {ex.chapterId}: {ex.chapterTitle}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
