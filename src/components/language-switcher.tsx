"use client";

import { useLocale } from "@/i18n/provider";
import { LOCALE_LABELS, LOCALES, type Locale } from "@/i18n/types";

export function LanguageSwitcher() {
  const { locale, setLocale, messages } = useLocale();

  return (
    <label className="language-switcher">
      <span className="sr-only">{messages.language.ariaLabel}</span>
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as Locale)}
        aria-label={messages.language.ariaLabel}
        className="language-switcher-select"
      >
        {LOCALES.map((loc) => (
          <option key={loc} value={loc}>
            {LOCALE_LABELS[loc]}
          </option>
        ))}
      </select>
    </label>
  );
}
