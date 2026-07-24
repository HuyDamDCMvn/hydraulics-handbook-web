"use client";

import clsx from "clsx";
import { useLocale } from "@/i18n/LocaleProvider";

export function LocaleToggle({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, t } = useLocale();

  return (
    <div
      role="group"
      aria-label={t.lang.switchTo}
      className={clsx(
        "inline-flex items-center rounded border border-line bg-white/55 p-0.5 text-xs font-semibold tracking-wide",
        compact && "text-[0.7rem]",
      )}
    >
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={clsx(
          "rounded px-2 py-1 transition-colors",
          locale === "en"
            ? "bg-accent text-[color:#f7f4ec]"
            : "text-ink-muted hover:text-ink",
        )}
        aria-pressed={locale === "en"}
      >
        {t.lang.eng}
      </button>
      <span className="px-0.5 text-line" aria-hidden>
        |
      </span>
      <button
        type="button"
        onClick={() => setLocale("vi")}
        className={clsx(
          "rounded px-2 py-1 transition-colors",
          locale === "vi"
            ? "bg-accent text-[color:#f7f4ec]"
            : "text-ink-muted hover:text-ink",
        )}
        aria-pressed={locale === "vi"}
      >
        {t.lang.vie}
      </button>
    </div>
  );
}
