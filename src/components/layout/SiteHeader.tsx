"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import clsx from "clsx";

const links = [
  { href: "/", label: "Home" },
  { href: "/guide", label: "Guide" },
  { href: "/chapters", label: "Chapters" },
  { href: "/examples", label: "Examples" },
  { href: "/tools/calculators", label: "Calculators" },
  { href: "/tools/conversions", label: "Conversions" },
  { href: "/tools/checklist", label: "Checklist" },
  { href: "/references", label: "References" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const drawer = useSpring({
    transform: open ? "translateX(0%)" : "translateX(100%)",
    opacity: open ? 1 : 0,
    config: { tension: 280, friction: 28 },
  });

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-[color-mix(in_srgb,var(--paper)_88%,white)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="font-display text-lg text-ink no-underline hover:no-underline">
          Hydraulics Formula Handbook
        </Link>
        <nav className="hidden items-center gap-4 text-sm lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={clsx(
                "no-underline hover:underline",
                pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href))
                  ? "font-semibold text-accent"
                  : "text-ink-muted",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="rounded border border-line px-3 py-1.5 text-sm lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button>
      </div>
      <animated.div
        id="mobile-nav"
        style={drawer}
        className="fixed inset-y-0 right-0 z-50 w-[min(88vw,320px)] border-l border-line bg-paper p-5 shadow-xl lg:hidden"
        aria-hidden={!open}
      >
        <div className="mb-4 flex items-center justify-between">
          <span className="font-display">Navigate</span>
          <button type="button" className="text-sm" onClick={() => setOpen(false)}>
            Close
          </button>
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
          className="fixed inset-0 z-40 bg-ink/30 lg:hidden"
          aria-label="Close menu overlay"
          onClick={() => setOpen(false)}
        />
      ) : null}
    </header>
  );
}
