import { Suspense } from "react";
import { ChapterIndex } from "@/components/chapter/ChapterIndex";

export const metadata = { title: "Chapters" };

export default function ChaptersPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-display text-4xl text-ink">Chapters</h1>
      <p className="mt-2 text-ink-muted">
        24 thematic chapters with governing equations, nomenclature, schematics, and worked
        examples.
      </p>
      <div className="mt-8">
        <Suspense fallback={<p className="text-ink-muted">Loading chapters…</p>}>
          <ChapterIndex />
        </Suspense>
      </div>
    </div>
  );
}
