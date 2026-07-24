"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useT } from "@/i18n/LocaleProvider";

export function LandingHero() {
  const root = useRef<HTMLElement>(null);
  const t = useT();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rootEl = root.current;
    if (reduced || !rootEl) return;

    gsap.registerPlugin(ScrollTrigger);
    const actions = rootEl.querySelector<HTMLElement>("[data-hero-actions]");
    if (!actions) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        actions,
        { y: 8, autoAlpha: 0.92 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.45,
          ease: "power2.out",
        },
      );
    }, rootEl);

    return () => {
      ctx.revert();
      actions.style.opacity = "1";
      actions.style.visibility = "visible";
      actions.style.transform = "none";
    };
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden border-b border-line/70">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 12% 18%, color-mix(in srgb, var(--accent-soft) 80%, transparent), transparent 60%), radial-gradient(ellipse 55% 45% at 88% 8%, #efe6d2 0%, transparent 55%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-10 md:pb-12 md:pt-14">
        <p className="text-xs uppercase tracking-[0.18em] text-ink-muted md:text-sm">
          {t.landing.eyebrow}
        </p>
        <h1 className="mt-3 max-w-4xl font-display text-[2.35rem] leading-[1.12] text-ink md:text-6xl">
          {t.landing.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base text-ink-muted md:text-lg">{t.landing.lede}</p>
        <div data-hero-actions className="mt-6 flex flex-wrap gap-3">
          <Link href="/chapters" className="btn-primary">
            {t.landing.startChapters}
          </Link>
          <Link href="/guide" className="btn-secondary">
            {t.landing.howToUse}
          </Link>
        </div>
      </div>
    </section>
  );
}
