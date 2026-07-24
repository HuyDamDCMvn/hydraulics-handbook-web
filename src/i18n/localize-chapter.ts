import type { Chapter } from "@/content/types";
import type { ChapterLocaleOverlay, Locale } from "@/i18n/chapter-locale";
import { part1Vi } from "@/content/chapters/vi/part1";
import { part2Vi } from "@/content/chapters/vi/part2";

const overlays: Record<number, ChapterLocaleOverlay> = {
  ...part1Vi,
  ...part2Vi,
};

export function localizeChapter(chapter: Chapter, locale: Locale): Chapter {
  if (locale === "en") return chapter;
  const vi = overlays[chapter.id];
  if (!vi) return chapter;

  return {
    ...chapter,
    title: vi.title,
    scope: vi.scope,
    assumptions: vi.assumptions,
    engineeringNote: vi.engineeringNote,
    equations: chapter.equations.map((eq) => ({
      ...eq,
      label: vi.equations[eq.id] ?? eq.label,
    })),
    nomenclature: chapter.nomenclature.map((row) => ({
      ...row,
      meaning: vi.nomenclature[row.symbol] ?? row.meaning,
    })),
    schematic: {
      ...chapter.schematic,
      caption: vi.schematicCaption,
    },
    examples: chapter.examples.map((ex) => {
      const vx = vi.examples[ex.id];
      if (!vx) return ex;
      return {
        ...ex,
        prompt: vx.prompt,
        physicalModel: vx.physicalModel,
        result: vx.result,
        interpretation: vx.interpretation,
      };
    }),
  };
}

export function localizeChapters(list: Chapter[], locale: Locale): Chapter[] {
  return list.map((c) => localizeChapter(c, locale));
}
