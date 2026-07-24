"use client";

import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { LOCALE_STORAGE_KEY, type Locale } from "@/i18n/chapter-locale";
import { ui } from "@/i18n/ui";

type Ui = (typeof ui)["en"];

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Ui;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const raw = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  return raw === "vi" ? "vi" : "en";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const initial = readStoredLocale();
    setLocaleState(initial);
    document.documentElement.lang = initial;
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
    document.documentElement.lang = next;
  }, []);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: ui[locale],
    }),
    [locale, setLocale],
  );

  return createElement(LocaleContext.Provider, { value }, children);
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}

export function useT() {
  return useLocale().t;
}
