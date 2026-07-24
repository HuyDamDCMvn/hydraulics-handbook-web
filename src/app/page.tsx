"use client";

import Link from "next/link";
import { LandingHero } from "@/components/motion/LandingHero";
import { chapters } from "@/content/chapters";
import type { ThemeId } from "@/content/types";
import { useT } from "@/i18n/LocaleProvider";

export default function HomePage() {
  const t = useT();
  const themes = Object.keys(t.themes) as ThemeId[];
  const byTheme = themes.map((theme) => ({
    theme,
    label: t.themes[theme],
    count: chapters.filter((c) => c.theme === theme).length,
  }));

  return (
    <>
      <LandingHero />
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-8 md:min-h-[calc(100svh-11rem)] md:pb-20 md:pt-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl text-ink md:text-3xl">
              {t.landing.browseTheme}
            </h2>
            <p className="mt-1.5 max-w-2xl text-sm text-ink-muted md:text-base">
              {t.landing.browseThemeLede}
            </p>
          </div>
          <Link href="/chapters" className="text-sm font-semibold no-underline hover:underline">
            {t.landing.allChapters}
          </Link>
        </div>
        <div className="mt-6 grid gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
          {byTheme.map((item) => (
            <Link
              key={item.theme}
              href={`/chapters?theme=${item.theme}`}
              className="group flex items-baseline justify-between gap-3 border-b border-line py-3.5 text-ink no-underline transition-colors hover:border-accent hover:no-underline"
            >
              <span className="font-display text-lg leading-snug group-hover:text-accent md:text-xl">
                {item.label}
              </span>
              <span className="shrink-0 font-mono text-xs text-ink-muted">{item.count}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-[color-mix(in_srgb,white_55%,var(--paper))]">
        <div className="mx-auto grid max-w-7xl grid-cols-3 gap-4 px-4 py-6 md:gap-8 md:py-7">
          <div>
            <p className="font-display text-2xl text-accent md:text-3xl">24</p>
            <p className="mt-0.5 text-xs text-ink-muted md:text-sm">{t.landing.statsChapters}</p>
          </div>
          <div>
            <p className="font-display text-2xl text-accent md:text-3xl">59</p>
            <p className="mt-0.5 text-xs text-ink-muted md:text-sm">{t.landing.statsEquations}</p>
          </div>
          <div>
            <p className="font-display text-2xl text-accent md:text-3xl">48</p>
            <p className="mt-0.5 text-xs text-ink-muted md:text-sm">{t.landing.statsExamples}</p>
          </div>
        </div>
      </section>
    </>
  );
}
