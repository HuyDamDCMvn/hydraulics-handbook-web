"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function LandingHero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rootEl = root.current;
    if (reduced || !rootEl) return;

    gsap.registerPlugin(ScrollTrigger);
    const band = rootEl.querySelector<HTMLElement>("[data-band]");
    if (!band) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        band,
        { y: 12, autoAlpha: 0.85 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.55,
          ease: "power2.out",
          scrollTrigger: {
            trigger: band,
            start: "top 92%",
            once: true,
          },
        },
      );
    }, rootEl);

    return () => {
      ctx.revert();
      band.style.opacity = "1";
      band.style.visibility = "visible";
      band.style.transform = "none";
    };
  }, []);

  return (
    <section ref={root}>
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-14 md:pt-20">
        <p className="text-sm uppercase tracking-[0.16em] text-ink-muted">
          Academic technical reference
        </p>
        <h1 className="mt-4 max-w-4xl font-display text-4xl leading-tight text-ink md:text-6xl">
          Hydraulics Formula Handbook
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-ink-muted">
          Fundamental relations, physical interpretation, and worked examples — 24 chapters in SI
          units for engineering education and preliminary analysis.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/chapters"
            className="rounded bg-accent px-5 py-2.5 text-sm font-semibold text-white no-underline hover:opacity-90 hover:no-underline"
          >
            Start chapters
          </Link>
          <Link
            href="/guide"
            className="rounded border border-line bg-white/50 px-5 py-2.5 text-sm font-semibold text-ink no-underline hover:bg-white hover:no-underline"
          >
            How to use
          </Link>
        </div>
      </div>

      <div
        data-band
        className="border-y border-line bg-[color-mix(in_srgb,white_55%,var(--paper))]"
      >
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-3">
          <div>
            <p className="font-display text-3xl text-accent">24</p>
            <p className="mt-1 text-sm text-ink-muted">Thematic chapters</p>
          </div>
          <div>
            <p className="font-display text-3xl text-accent">59</p>
            <p className="mt-1 text-sm text-ink-muted">Governing equations</p>
          </div>
          <div>
            <p className="font-display text-3xl text-accent">48</p>
            <p className="mt-1 text-sm text-ink-muted">Worked SI examples</p>
          </div>
        </div>
      </div>
    </section>
  );
}
