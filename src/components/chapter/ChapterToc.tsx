"use client";

import type { Chapter } from "@/content/types";
import { animated, useSpring } from "@react-spring/web";
import { useState } from "react";
import { useT } from "@/i18n/LocaleProvider";

export function ChapterToc({ chapter }: { chapter: Chapter }) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const drawer = useSpring({
    transform: open ? "translateY(0%)" : "translateY(110%)",
    config: { tension: 260, friction: 26 },
  });

  const sections = [
    { id: "equations", label: t.chapter.equationsNav },
    { id: "scope", label: t.chapter.scope },
    { id: "assumptions", label: t.chapter.assumptions },
    { id: "nomenclature", label: t.chapter.nomenclature },
    { id: "schematic", label: t.chapter.schematic },
    { id: "note", label: t.chapter.note },
    { id: "examples", label: t.chapter.examples },
  ];

  const links = (
    <nav className="flex flex-col gap-2 text-sm">
      <p className="font-semibold text-ink">{t.chapter.onThisPage}</p>
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className="text-ink-muted no-underline hover:text-accent"
          onClick={() => setOpen(false)}
        >
          {s.label}
        </a>
      ))}
      <p className="mt-3 font-semibold text-ink">{t.chapter.equationsNav}</p>
      {chapter.equations.map((eq) => (
        <a
          key={eq.id}
          href={`#eq-${eq.id.replace(".", "-")}`}
          className="font-mono text-ink-muted no-underline hover:text-accent"
          onClick={() => setOpen(false)}
        >
          ({eq.id})
        </a>
      ))}
    </nav>
  );

  return (
    <>
      <div className="hidden lg:block">{links}</div>
      <div className="lg:hidden">
        <button
          type="button"
          className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-30 rounded border border-line bg-paper px-4 py-2 text-sm shadow"
          onClick={() => setOpen(true)}
        >
          {t.chapter.onThisPage}
        </button>
        {open ? (
          <button
            type="button"
            className="fixed inset-0 z-40 bg-ink/35"
            aria-label={t.close}
            onClick={() => setOpen(false)}
          />
        ) : null}
        <animated.div
          style={drawer}
          className="fixed inset-x-0 bottom-0 z-50 max-h-[70vh] overflow-auto rounded-t-xl border border-line bg-paper p-5 shadow-2xl"
          aria-hidden={!open}
        >
          <div className="mb-3 flex justify-between">
            <span className="font-display">
              {t.chapter.chapter} {chapter.id}
            </span>
            <button type="button" onClick={() => setOpen(false)}>
              {t.close}
            </button>
          </div>
          {links}
        </animated.div>
      </div>
    </>
  );
}
