# Chinese i18n + Gallery Simplification — Design Spec

**Date:** 2026-05-19  
**Status:** Approved (brainstorming)  
**Project:** 4sell — Surrey condo sale gallery (Unit 808, MLS® R3109998)

## Overview

Add **English**, **Simplified Chinese** (`zh-Hans`), and **Traditional Chinese** (`zh-Hant`) to the sale gallery using an **in-page language dropdown** (no locale URL paths). Remove the gallery source filter row. Keep **Carter Lozinski** as the primary listing contact per `../assets/scrape.json`. Inquiry notification emails use the **visitor’s selected site language** end-to-end.

## Goals

- Language switcher: compact dropdown **top-left**, beside the existing **For sale** pill.
- Persist choice via cookie (`4sell_locale`, 1 year) + `localStorage` mirror for fast client reads.
- Translate marketing UI + inquiry flow; **FAQ remains English** in all locales.
- Inquiry emails: subject, field labels, and headings in the submitter’s locale.
- Gallery: always show **all** images; remove filter buttons (`All`, `Phone`, `Matterport`, etc.).
- Contact UI: Carter primary, Frederick as team; owner contact not displayed.

## Non-goals

- URL-based locales (`/zh-Hans`, etc.) or SEO hreflang pages
- Translating FAQ content
- Translating listing facts (price, MLS®, phone numbers, agent names, external URLs)
- CMS or machine-translation pipeline at runtime
- Re-adding gallery source filters

## Decisions (locked)

| Topic | Choice |
|-------|--------|
| Locale switching | In-page dropdown (option B) |
| Persistence | Cookie + localStorage |
| Translated scope | Hero, promos, stats labels, inquiry form, map panel, contact labels, gallery chrome, client metadata |
| FAQ | English only |
| Inquiry email | Full template in visitor’s language (option C) |
| Gallery filters | Remove UI; `filterKey` always `all` |
| Primary contact | Carter Lozinski — (604) 209-3826, carter@sellvanhomes.ca, Heller Murch Realty |
| i18n approach | Lightweight custom dictionaries + React context (not `next-intl`) |

## Listing / assets verification

Verified against `../assets/scrape.json` (2026-05-19):

| Field | Site value | Assets consensus | Notes |
|-------|------------|------------------|-------|
| Price | $649,900 | Yes | |
| MLS® | R3109998 | Yes | |
| Beds / baths / sqft | 2 / 2 / 829 | Yes | |
| Street | 13573 98A Ave | Realtor.ca, SellVanHomes | Craigslist/LinkedIn typo **13575** — site correct |
| Carter Lozinski | (604) 209-3826 | Craigslist, LinkedIn, SellVanHomes | Primary agent |
| Frederick Trudeau | (778) 877-8807 | HomeSpotter, SellVanHomes | Team |
| Postal code | V3T 0X1 on site | Many scrapes V3T 4A4 | Confirm on title before changing |

## Architecture

### Locale model

```ts
type Locale = "en" | "zh-Hans" | "zh-Hant";
```

- **Default:** `en` on first visit.
- **Cookie:** `4sell_locale`, `Path=/`, `Max-Age=31536000`, `SameSite=Lax`.
- **localStorage:** same key for synchronous read before hydration.
- **`<html lang>`:** updated on locale change (`en`, `zh-Hans`, `zh-Hant`).

### File layout

```
src/i18n/
  types.ts              # Locale, message key types
  provider.tsx          # LocaleProvider, useLocale, useTranslations
  locales/
    en.ts
    zh-Hans.ts
    zh-Hant.ts
  listing-copy.ts         # lede + highlights per locale (or nested in locale files)
  inquiry-email.ts      # Server-safe email templates per locale

src/components/
  language-switcher.tsx # Dropdown beside HeroSalePill
  locale-bar.tsx        # Optional wrapper: switcher + sale pill row
```

### Data flow

1. User selects language → context updates → cookie + localStorage written → `document.documentElement.lang` set.
2. Components call `t("key")` or read locale-specific listing copy for lede/highlights.
3. Inquiry `POST` includes `locale`; API selects `getInquiryEmailTemplate(locale, payload)`.
4. Gallery omits `FilterBar`; `getFilteredItems("all")` only.

### Rejected alternatives

| Approach | Why rejected |
|----------|----------------|
| `next-intl` without routes | Extra dependency; partial FAQ exclusion awkward for one page |
| Per-locale duplicate config files | Drift risk; poor fit for short UI strings |
| URL path locales | User chose in-page switcher |

## UI: language switcher

- **Placement:** New flex row at top of `.title-block`, before kicker: `[ Language ▼ ] [ For sale pill ]`.
- **Control:** shadcn `Select` or styled native `<select>` matching dark theme.
- **Options:**
  - `English` → `en`
  - `简体中文` → `zh-Hans`
  - `繁體中文` → `zh-Hant`
- **A11y:** `aria-label="Language"`; keyboard operable.
- **Behavior:** No full page reload; instant re-render of translated strings.

## Translated vs fixed content

### Translated (via message dictionaries)

- Kicker, H1 pattern, lede paragraphs, hero highlights
- For sale pill label
- Promo cards (titles, descriptions)
- Stats bar labels (values like price stay as configured)
- Inquiry section headings, form labels, placeholders, buttons, success/error messages
- Map panel labels and link text where applicable
- Contact block labels (`Listing agent`, `Team`)
- Gallery section headings, slide counter hints, “tap to jump” badge
- Client-updated `document.title` and meta description

### Not translated

- `src/config/faq.ts` — entire FAQ section
- `listing.price`, `listing.mls`, addresses, phone numbers, emails, URLs
- Agent personal names and brokerage names
- Image filenames and R2 URLs
- Gallery filter group names (UI removed)

### Listing narrative copy

Move `listing.lede` and `listing.highlights` English text into locale files (or `listing-copy.ts` keyed by locale). Keep numeric/factual fields in `listing.ts`.

## Typography

- Add **Noto Sans SC** via `next/font/google` (covers Simplified and Traditional).
- **English:** keep Libre Baskerville for H1 where appropriate.
- **Chinese locales:** use Noto Sans SC for headings and body to avoid missing glyphs in Poppins/Libre Baskerville.

## Calendar

- Pass `date-fns` locale to existing `Calendar`: `enUS`, `zhCN`, `zhTW` based on active locale.

## Gallery filter removal

**Changes in `gallery.tsx`:**

- Remove `FilterBar` import and `.filter-bar` wrapper.
- Remove `filterKey` state or hardcode `"all"`.
- Remove status badge showing `getGroup(filterKey).label` (e.g. “Phone frames”).
- Keep: hero viewer, autoplay, filmstrip, keyboard nav, slide counter.

**Cleanup:**

- Delete `filter-bar.tsx` if unused.
- Remove filter-bar-related CSS if orphaned.

`src/config/gallery.ts` group structure unchanged (manifest/sync script unaffected).

## Contact block

- **Primary cell:** Carter Lozinski — translated “Listing agent” label.
- **Secondary cell:** Frederick Trudeau — translated “Team” label.
- **Do not show** owner phone/email in UI (remains in config only if needed elsewhere).
- FAQ “who represents” text stays English per scope.

## Inquiry API

**Request body:**

```json
{
  "name": "...",
  "email": "...",
  "phone": "...",
  "showingDate": "yyyy-MM-dd",
  "preferredTime": "...",
  "message": "...",
  "locale": "en" | "zh-Hans" | "zh-Hant"
}
```

**Server:**

- Validate `locale`; default to `en` if missing/invalid.
- `getInquiryEmailTemplate(locale, fields)` returns `{ subject, html }` in that language.
- Field **values** (name, message) remain as submitted; **labels** and email chrome are localized.
- `replyTo`: visitor email; `to`: `SMTP_EMAIL`.
- Validation errors: prefer localized strings when locale known; fallback English.

**Example subjects:**

| Locale | Subject pattern |
|--------|-----------------|
| en | Showing request — 808-13573 98A Ave (MLS R3109998) |
| zh-Hans | 看房预约 — 808-13573 98A Ave（MLS R3109998） |
| zh-Hant | 看房預約 — 808-13573 98A Ave（MLS R3109998） |

## Metadata

- `layout.tsx` exports English metadata for SSR baseline.
- Client effect on locale change updates `document.title` and `<meta name="description">`.

## Error handling

| Area | Behavior |
|------|----------|
| Unknown locale in API | Treat as `en` |
| Missing translation key | Fallback to English key in dev console warn; show English string |
| SMTP failure | Localized user-facing error on form |
| Empty gallery | Existing empty state; strings translated |

## Implementation approach

**Chosen:** Lightweight custom i18n (Approach 1).

**Steps (high level):**

1. Add `src/i18n/*` with three locale files and provider.
2. Wrap app/page in `LocaleProvider` (client boundary in `page.tsx` or small wrapper).
3. Add `LanguageSwitcher` + refactor `HeroSalePill` row.
4. Wire `t()` through hero, promos, stats, inquiry, map, contact, gallery chrome.
5. Move lede/highlights to locale copy.
6. Add Noto Sans SC + calendar locales.
7. Extend inquiry API with localized templates; form sends `locale`.
8. Remove gallery filter UI.
9. Verify Carter contact unchanged; build + manual locale smoke test.

## Testing

- [ ] Dropdown switches all three locales without reload
- [ ] Choice persists after refresh (cookie)
- [ ] FAQ stays English in zh-Hans and zh-Hant
- [ ] No filter row; all images in carousel
- [ ] Chinese typography readable on mobile
- [ ] Inquiry email subject/body match submitted locale (staging/log)
- [ ] `npm run build` and `npm run lint` pass

## Deployment

No new environment variables. Existing Vercel deploy; no routing changes.

## Related specs

- `docs/superpowers/specs/2026-05-19-4sell-sale-gallery-design.md` — original sale gallery
- `../assets/scrape.json` — listing source of truth for agent/facts
