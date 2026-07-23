import Link from "next/link";
import { LandingHero } from "@/components/motion/LandingHero";
import { THEME_LABELS } from "@/content/types";
import { chapters } from "@/content/chapters";

export default function HomePage() {
  const byTheme = Object.keys(THEME_LABELS).map((theme) => ({
    theme,
    label: THEME_LABELS[theme as keyof typeof THEME_LABELS],
    count: chapters.filter((c) => c.theme === theme).length,
  }));

  return (
    <>
      <LandingHero />
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="font-display text-3xl text-ink">Browse by theme</h2>
        <p className="mt-2 max-w-2xl text-ink-muted">
          From fluid statics through pipe flow, pumps, open channels, water hammer, and seepage.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {byTheme.map((t) => (
            <Link
              key={t.theme}
              href={`/chapters?theme=${t.theme}`}
              className="block border-b border-line py-4 text-ink no-underline hover:text-accent"
            >
              <span className="font-display text-xl">{t.label}</span>
              <span className="mt-1 block text-sm text-ink-muted">{t.count} chapters</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
