"use client";

import type { Chapter } from "@/content/types";
import { EquationBlock } from "./EquationBlock";
import { NomenclatureTable, WorkedExample } from "./ChapterBlocks";
import { ChapterToc } from "./ChapterToc";
import { SchematicMedia } from "@/components/media/SchematicMedia";
import { useLocale } from "@/i18n/LocaleProvider";
import { localizeChapter } from "@/i18n/localize-chapter";
import { formatTemplate } from "@/i18n/ui";

export function ChapterView({ chapter }: { chapter: Chapter }) {
  const { locale, t } = useLocale();
  const c = localizeChapter(chapter, locale);

  return (
    <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-6 px-4 pb-24 pt-7 lg:grid-cols-[200px_minmax(0,1fr)] lg:pb-10 xl:grid-cols-[180px_minmax(0,1fr)_minmax(300px,400px)]">
      <aside className="order-1 lg:sticky lg:top-24 lg:row-span-3 lg:self-start">
        <ChapterToc chapter={c} />
      </aside>

      <header className="order-2 min-w-0 max-w-[72ch]">
        <p className="text-sm uppercase tracking-[0.14em] text-ink-muted">
          {t.chapter.chapter} {c.id}
        </p>
        <h1 className="mt-2 font-display text-3xl text-ink md:text-4xl">{c.title}</h1>

        <section id="equations" className="mt-7 scroll-mt-28">
          <h2 className="font-display text-2xl">{t.chapter.equations}</h2>
          <div className="mt-2 space-y-1">
            {c.equations.map((eq) => (
              <EquationBlock key={eq.id} equation={eq} />
            ))}
          </div>
        </section>
      </header>

      <figure className="order-3 m-0 xl:sticky xl:top-24 xl:col-start-3 xl:row-start-1 xl:row-span-3 xl:self-start">
        <section id="schematic" className="scroll-mt-28">
          <h2 className="font-display text-xl md:text-2xl">
            {formatTemplate(t.chapter.figureSchematic, { id: c.id })}
          </h2>
          <div className="mt-3">
            <SchematicMedia chapter={c} />
          </div>
          <figcaption className="mt-2 text-sm text-ink-muted">{c.schematic.caption}</figcaption>
        </section>
      </figure>

      <article className="order-4 min-w-0 max-w-[72ch] xl:col-start-2">
        <section id="scope" className="scroll-mt-28">
          <h2 className="font-display text-2xl">{t.chapter.scope}</h2>
          <p className="mt-3 text-ink">{c.scope}</p>
        </section>

        <section id="assumptions" className="mt-8 scroll-mt-28">
          <h2 className="font-display text-2xl">{t.chapter.assumptions}</h2>
          <p className="mt-3 text-ink">{c.assumptions}</p>
        </section>

        <section id="nomenclature" className="mt-8 scroll-mt-28">
          <h2 className="font-display text-2xl">
            {formatTemplate(t.chapter.tableNomenclature, { id: c.id })}
          </h2>
          <div className="mt-3">
            <NomenclatureTable rows={c.nomenclature} />
          </div>
        </section>

        <section id="note" className="mt-8 scroll-mt-28">
          <h2 className="font-display text-2xl">{t.chapter.note}</h2>
          <div className="callout-note mt-3">{c.engineeringNote}</div>
        </section>

        <section id="examples" className="mt-8 scroll-mt-28">
          <h2 className="font-display text-2xl">
            {formatTemplate(t.chapter.workedExamples, { id: c.id })}
          </h2>
          {c.examples.map((ex) => (
            <WorkedExample key={ex.id} example={ex} />
          ))}
        </section>

        <p className="mt-10 border-t border-line pt-4 text-sm text-ink-muted">
          {t.chapter.learningOnly}
        </p>
      </article>
    </div>
  );
}
