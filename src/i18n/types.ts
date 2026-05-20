export const LOCALES = ["en", "zh-Hans", "zh-Hant"] as const;

export type Locale = (typeof LOCALES)[number];

export const LOCALE_COOKIE = "4sell_locale";

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  "zh-Hans": "简体中文",
  "zh-Hant": "繁體中文",
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

export type Messages = {
  meta: { title: string; description: string };
  salePill: string;
  kicker: string;
  h1: string;
  contact: {
    listingAgent: string;
    team: string;
    ariaLabel: string;
  };
  promos: {
    showingTitle: string;
    showingDesc: string;
    virtualTourTitle: string;
    virtualTourDesc: string;
    statusLine: string;
  };
  stats: {
    askingPrice: string;
    bedsBaths: string;
    interior: string;
    listingId: string;
  };
  inquiry: {
    sectionKicker: string;
    sectionTitle: string;
    name: string;
    email: string;
    phone: string;
    showingDate: string;
    preferredTime: string;
    message: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    selectDate: string;
    messagePlaceholder: string;
    timeAny: string;
    timeMorning: string;
    timeAfternoon: string;
    timeEvening: string;
    submit: string;
    submitting: string;
    success: string;
    error: string;
  };
  map: {
    listings: string;
    realtorCa: string;
    sellVanHomes: string;
  };
  gallery: {
    slideCounter: string;
    tapToJump: string;
    carouselTitle: string;
    carouselHint: string;
    photosComingSoon: string;
    noImages: string;
    photoUnavailable: string;
  };
  language: {
    ariaLabel: string;
  };
};

export type ListingCopy = {
  lede: readonly string[];
  highlights: readonly string[];
};
