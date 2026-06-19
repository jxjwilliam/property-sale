"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getFaqCopy, type FaqCopy } from "./faq-copy";
import { getListingCopy } from "./listing-copy";
import { getMessages } from "./messages";
import {
  isLocale,
  LOCALE_COOKIE,
  type ListingCopy,
  type Locale,
  type Messages,
} from "./types";

const STORAGE_KEY = LOCALE_COOKIE;

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  messages: Messages;
  listingCopy: ListingCopy;
  faqCopy: FaqCopy;
  format: (template: string, vars: Record<string, string | number>) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return "zh-Hans";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (isLocale(stored)) return stored;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${STORAGE_KEY}=`))
    ?.split("=")[1];
  return isLocale(match) ? match : "zh-Hans";
}

function persistLocale(locale: Locale) {
  localStorage.setItem(STORAGE_KEY, locale);
  document.cookie = `${STORAGE_KEY}=${locale}; path=/; max-age=31536000; samesite=lax`;
  document.documentElement.lang = locale;
}

function formatTemplate(
  template: string,
  vars: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    String(vars[key] ?? `{${key}}`),
  );
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const initial = readStoredLocale();
    // Hydrate locale from cookie/localStorage after SSR (defaults to en).
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only locale restore
    setLocaleState(initial);
    persistLocale(initial);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    persistLocale(next);
  }, []);

  const messages = useMemo(() => getMessages(locale), [locale]);
  const listingCopy = useMemo(() => getListingCopy(locale), [locale]);
  const faqCopy = useMemo(() => getFaqCopy(locale), [locale]);

  const format = useCallback(
    (template: string, vars: Record<string, string | number>) =>
      formatTemplate(template, vars),
    [],
  );

  const value = useMemo(
    () => ({ locale, setLocale, messages, listingCopy, faqCopy, format }),
    [locale, setLocale, messages, listingCopy, faqCopy, format],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}

export function DocumentMetaSync() {
  const { locale, messages } = useLocale();

  useEffect(() => {
    document.title = messages.meta.title;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", messages.meta.description);
    document.documentElement.lang = locale;
  }, [locale, messages]);

  return null;
}
