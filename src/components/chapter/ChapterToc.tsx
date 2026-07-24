"use client";

import type { Chapter } from "@/content/types";
import { animated, useSpring } from "@react-spring/web";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useT } from "@/i18n/LocaleProvider";

const SCROLLSPY_IDS = [
  "equations",
  "scope",
  "assumptions",
  "nomenclature",
  "note",
  "examples",
] as const;

/** Sticky schematic (xl column) stays in view — exclude from spy so reading-column wins */
type SectionId = (typeof SCROLLSPY_IDS)[number] | "schematic";

export function ChapterToc({ chapter }: { chapter: Chapter }) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("equations");
  const visibleRef = useRef(new Map<string, boolean>());

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const visibility = visibleRef.current;
    visibility.clear();
    setActiveSection("equations");

    const sectionEls = SCROLLSPY_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (!sectionEls.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibility.set(entry.target.id, entry.isIntersecting);
        });
        let current: SectionId | null = null;
        for (const id of SCROLLSPY_IDS) {
          if (visibility.get(id)) current = id;
        }
        if (current) setActiveSection(current);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: 0 },
    );

    sectionEls.forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      visibility.clear();
    };
  }, [chapter.id]);

  const drawer = useSpring({
    transform: open ? "translateY(0%)" : "translateY(110%)",
    immediate: reduced,
    config: { tension: 260, friction: 26 },
  });

  const sections = [
    { id: "equations" as const, label: t.chapter.equationsNav },
    { id: "scope" as const, label: t.chapter.scope },
    { id: "assumptions" as const, label: t.chapter.assumptions },
    { id: "nomenclature" as const, label: t.chapter.nomenclature },
    { id: "schematic" as const, label: t.chapter.schematic },
    { id: "note" as const, label: t.chapter.note },
    { id: "examples" as const, label: t.chapter.examples },
  ];

  const links = (
    <nav className="flex flex-col gap-2 text-sm">
      <p className="font-semibold text-ink">{t.chapter.onThisPage}</p>
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={clsx(
            "no-underline hover:text-accent",
            activeSection === s.id ? "font-semibold text-accent" : "text-ink-muted",
          )}
          aria-current={activeSection === s.id ? "true" : undefined}
          onClick={() => {
            setActiveSection(s.id);
            setOpen(false);
          }}
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
