"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import clsx from "clsx";
import { LocaleToggle } from "@/components/layout/LocaleToggle";
import { useT } from "@/i18n/LocaleProvider";

export function SiteHeader() {
  const pathname = usePathname();
  const t = useT();
  const [open, setOpen] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const drawer = useSpring({
    transform: open ? "translateX(0%)" : "translateX(100%)",
    opacity: open ? 1 : 0,
    immediate: reduced,
    config: { tension: 280, friction: 28 },
  });

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/guide", label: t.nav.guide },
    { href: "/chapters", label: t.nav.chapters },
    { href: "/examples", label: t.nav.examples },
    { href: "/tools/calculators", label: t.nav.calculators },
    { href: "/tools/conversions", label: t.nav.conversions },
    { href: "/tools/checklist", label: t.nav.checklist },
    { href: "/references", label: t.nav.references },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-[color-mix(in_srgb,var(--paper)_88%,white)] backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
        <Link
          href="/"
          className="min-w-0 truncate font-display text-base text-ink no-underline hover:no-underline md:text-lg"
        >
          {t.brand}
        </Link>
        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-3 text-sm xl:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={clsx(
                  "nav-link no-underline hover:underline",
                  pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href))
                    ? "font-semibold text-accent"
                    : "text-ink-muted",
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <LocaleToggle />
          <button
            type="button"
            className="rounded border border-line px-3 py-1.5 text-sm xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {t.menu}
          </button>
        </div>
      </div>
      <animated.div
        id="mobile-nav"
        style={drawer}
        className="fixed inset-y-0 right-0 z-50 w-[min(88vw,320px)] border-l border-line bg-paper p-5 shadow-xl xl:hidden"
        aria-hidden={!open}
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="font-display">{t.navigate}</span>
          <button type="button" className="text-sm" onClick={() => setOpen(false)}>
            {t.close}
          </button>
        </div>
        <div className="mb-4">
          <LocaleToggle />
        </div>
        <nav className="flex flex-col gap-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-ink no-underline"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </animated.div>
      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-ink/30 xl:hidden"
          aria-label={t.close}
          onClick={() => setOpen(false)}
        />
      ) : null}
    </header>
  );
}
