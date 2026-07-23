import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-line bg-[color-mix(in_srgb,var(--paper-deep)_70%,white)]">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-ink-muted">
        <p className="max-w-3xl">
          <strong className="text-ink">Academic learning reference.</strong> Real designs must
          follow applicable standards, manufacturer data, and discipline-specific engineering
          review.
        </p>
        <p className="mt-3">
          Academic Edition · SI units ·{" "}
          <Link href="/guide" className="text-accent">
            How to use
          </Link>{" "}
          ·{" "}
          <Link href="/references" className="text-accent">
            References
          </Link>
        </p>
      </div>
    </footer>
  );
}
