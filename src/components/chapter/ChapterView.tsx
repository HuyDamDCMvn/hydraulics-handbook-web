import type { Chapter } from "@/content/types";
import { EquationBlock } from "./EquationBlock";
import { NomenclatureTable, WorkedExample } from "./ChapterBlocks";
import { ChapterToc } from "./ChapterToc";
import { SchematicMedia } from "@/components/media/SchematicMedia";

export function ChapterView({ chapter }: { chapter: Chapter }) {
  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[220px_minmax(0,1fr)]">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <ChapterToc chapter={chapter} />
      </aside>
      <article className="prose-measure min-w-0">
        <p className="text-sm uppercase tracking-[0.14em] text-ink-muted">
          Chapter {chapter.id}
        </p>
        <h1 className="mt-2 font-display text-3xl text-ink md:text-4xl">
          {chapter.title}
        </h1>

        <section id="equations" className="mt-8 scroll-mt-28">
          <h2 className="font-display text-2xl">Governing equations</h2>
          <div className="mt-3 space-y-2">
            {chapter.equations.map((eq) => (
              <EquationBlock key={eq.id} equation={eq} />
            ))}
          </div>
        </section>

        <section id="scope" className="mt-8 scroll-mt-28">
          <h2 className="font-display text-2xl">Scope of application</h2>
          <p className="mt-3 text-ink">{chapter.scope}</p>
        </section>

        <section id="assumptions" className="mt-8 scroll-mt-28">
          <h2 className="font-display text-2xl">Assumptions and limitations</h2>
          <p className="mt-3 text-ink">{chapter.assumptions}</p>
        </section>

        <section id="nomenclature" className="mt-8 scroll-mt-28">
          <h2 className="font-display text-2xl">
            Table {chapter.id}.1. Nomenclature
          </h2>
          <div className="mt-3">
            <NomenclatureTable rows={chapter.nomenclature} />
          </div>
        </section>

        <section id="schematic" className="mt-8 scroll-mt-28">
          <h2 className="font-display text-2xl">
            Figure {chapter.id}.1. Formula concept diagram
          </h2>
          <div className="mt-3">
            <SchematicMedia chapter={chapter} />
          </div>
          <p className="mt-2 text-sm text-ink-muted">{chapter.schematic.caption}</p>
        </section>

        <section id="note" className="mt-8 scroll-mt-28">
          <h2 className="font-display text-2xl">Engineering note</h2>
          <div className="callout-note mt-3">{chapter.engineeringNote}</div>
        </section>

        <section id="examples" className="mt-8 scroll-mt-28">
          <h2 className="font-display text-2xl">
            {chapter.id}.1 Worked examples
          </h2>
          {chapter.examples.map((ex) => (
            <WorkedExample key={ex.id} example={ex} />
          ))}
        </section>

        <p className="mt-10 border-t border-line pt-4 text-sm text-ink-muted">
          Learning reference only. Verify designs against standards and project data.
        </p>
      </article>
    </div>
  );
}
