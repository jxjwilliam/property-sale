import type { Locale, Messages } from "./types";
import { en } from "./locales/en";
import { zhHans } from "./locales/zh-Hans";
import { zhHant } from "./locales/zh-Hant";

const byLocale: Record<Locale, Messages> = {
  en,
  "zh-Hans": zhHans,
  "zh-Hant": zhHant,
};

export function getMessages(locale: Locale): Messages {
  return byLocale[locale] ?? en;
}
