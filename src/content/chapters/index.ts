import type { Chapter } from "@/content/types";
import { part1Chapters } from "./part1";
import { part2Chapters } from "./part2";

export const chapters: Chapter[] = [...part1Chapters, ...part2Chapters].sort(
  (a, b) => a.id - b.id,
);

export function getChapter(id: number): Chapter | undefined {
  return chapters.find((c) => c.id === id);
}

export function getChapterBySlug(slug: string): Chapter | undefined {
  return chapters.find((c) => c.slug === slug);
}

export function searchChapters(query: string): Chapter[] {
  const q = query.trim().toLowerCase();
  if (!q) return chapters;
  return chapters.filter((c) => {
    const hay = [
      c.title,
      c.slug,
      String(c.id),
      c.scope,
      ...c.equations.map((e) => `${e.id} ${e.label}`),
      ...c.nomenclature.map((n) => `${n.symbol} ${n.meaning}`),
    ]
      .join(" ")
      .toLowerCase();
    return hay.includes(q) || c.equations.some((e) => e.id.includes(q));
  });
}

export function allExamples() {
  return chapters.flatMap((c) =>
    c.examples.map((ex) => ({
      ...ex,
      chapterId: c.id,
      chapterTitle: c.title,
      chapterSlug: c.slug,
    })),
  );
}
