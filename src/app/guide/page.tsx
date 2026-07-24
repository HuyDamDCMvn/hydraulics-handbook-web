"use client";

import { GuideScroll } from "@/components/motion/GuideScroll";
import { useT } from "@/i18n/LocaleProvider";

export default function GuidePage() {
  const t = useT();
  return (
    <GuideScroll>
      <div className="mx-auto max-w-7xl px-4 py-8 md:py-10">
        <div data-guide-reveal>
          <h1 className="font-display text-3xl text-ink md:text-4xl">{t.guide.title}</h1>
          <p className="mt-2 max-w-2xl text-ink-muted">{t.guide.lede}</p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <section data-guide-reveal>
            <h2 className="font-display text-2xl">{t.guide.sequenceTitle}</h2>
            <div className="callout-note mt-4">
              <strong>{t.guide.sequenceNoteStrong}</strong>
              {t.guide.sequenceNote}
            </div>
            <ol className="mt-5 list-decimal space-y-2.5 pl-5 text-ink">
              {t.guide.sequenceItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>

          <section data-guide-reveal>
            <h2 className="font-display text-2xl">{t.guide.notationTitle}</h2>
            <ul className="mt-4 list-disc space-y-2.5 pl-5 text-ink">
              {t.guide.notationItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </GuideScroll>
  );
}
