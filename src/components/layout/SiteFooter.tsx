"use client";

import Link from "next/link";
import { useT } from "@/i18n/LocaleProvider";

export function SiteFooter() {
  const t = useT();
  return (
    <footer className="mt-16 border-t border-line bg-[color-mix(in_srgb,var(--paper-deep)_70%,white)]">
      <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-ink-muted">
        <p className="max-w-3xl">
          <strong className="text-ink">{t.footer.disclaimerStrong}</strong>
          {t.footer.disclaimer}
        </p>
        <p className="mt-3">
          {t.footer.academicEdition} ·{" "}
          <Link href="/guide" className="text-accent">
            {t.footer.howToUse}
          </Link>{" "}
          ·{" "}
          <Link href="/references" className="text-accent">
            {t.footer.references}
          </Link>
        </p>
      </div>
    </footer>
  );
}
