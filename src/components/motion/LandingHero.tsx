"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useT } from "@/i18n/LocaleProvider";

function revealHero(rootEl: HTMLElement) {
  const eyebrow = rootEl.querySelector<HTMLElement>("[data-hero-eyebrow]");
  const title = rootEl.querySelector<HTMLElement>("[data-hero-title]");
  const lede = rootEl.querySelector<HTMLElement>("[data-hero-lede]");
  const actions = rootEl.querySelector<HTMLElement>("[data-hero-actions]");
  if (!eyebrow || !title || !lede || !actions) return null;

  const targets = [eyebrow, title, lede, actions];
  const ctx = gsap.context(() => {
    // Start near-visible (0.92) — never hard-hide; prior FOUC left hero invisible
    gsap.fromTo(
      targets,
      { y: 8, autoAlpha: 0.92 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.05,
        clearProps: "transform,opacity,visibility",
      },
    );
  }, rootEl);

  return { ctx, targets };
}

export function LandingHero() {
  const root = useRef<HTMLElement>(null);
  const t = useT();

  useEffect(() => {
    const rootEl = root.current;
    if (!rootEl) return;

    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopMq = window.matchMedia("(min-width: 1024px)");
    let run: ReturnType<typeof revealHero> | null = null;

    const sync = () => {
      run?.ctx.revert();
      run?.targets.forEach((el) => {
        el.style.opacity = "1";
        el.style.visibility = "visible";
        el.style.transform = "none";
      });
      run = null;
      if (reduceMq.matches || !desktopMq.matches) return;
      run = revealHero(rootEl);
    };

    sync();
    reduceMq.addEventListener("change", sync);
    desktopMq.addEventListener("change", sync);

    return () => {
      reduceMq.removeEventListener("change", sync);
      desktopMq.removeEventListener("change", sync);
      run?.ctx.revert();
      run?.targets.forEach((el) => {
        el.style.opacity = "1";
        el.style.visibility = "visible";
        el.style.transform = "none";
      });
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
        <p
          data-hero-eyebrow
          className="text-xs uppercase tracking-[0.18em] text-ink-muted md:text-sm"
        >
          {t.landing.eyebrow}
        </p>
        <h1
          data-hero-title
          className="mt-3 max-w-4xl font-display text-[2.35rem] leading-[1.12] text-ink md:text-6xl"
        >
          {t.landing.title}
        </h1>
        <p data-hero-lede className="mt-4 max-w-2xl text-base text-ink-muted md:text-lg">
          {t.landing.lede}
        </p>
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
