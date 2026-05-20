# 4sell — Surrey Condo Sale Gallery

## Overview

Build a **for-sale** property media gallery for **Unit 808, 13573 98A Avenue, Surrey, BC**, cloned from the existing [property rental gallery](https://github.com/jxjwilliam/property) and deployed reference ([property-seven-hazel.vercel.app](https://property-seven-hazel.vercel.app/)). Images are served from Cloudflare R2 bucket `property` with public prefix `/property/`. Listing facts are sourced from `../assets/scrape.json` and aligned with MLS listing **R3109998**.

## Goals

- Match the reference site’s cinematic dark gallery UX (hero viewer, autoplay, filmstrip, filters).
- Replace all rental messaging with **for-sale** copy, stats, and inquiry flow.
- Load gallery images from `NEXT_PUBLIC_R2_PUBLIC_URL` using a manifest-driven file list (no public R2 directory listing).
- Show **dual contact**: property owner + listing agents/brokerage.
- Email showing requests via existing SMTP env vars.

## Non-goals

- R2 S3 ListObjects / dynamic bucket discovery
- CMS, authentication, analytics
- Scraping or uploading images (assumes R2 already populated like rental)

## Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| UI | shadcn/ui (dark theme) |
| Language | TypeScript |
| Images | Cloudflare R2 public bucket `property` |
| Email | Nodemailer + Gmail SMTP |
| Hosting | Vercel |

## Listing data (`src/config/listing.ts`)

| Field | Value |
|-------|--------|
| Unit | 808 |
| Address | 808 – 13573 98A Ave, Surrey, BC V3T 0X1 |
| Building | Holland Park by Century City |
| Asking price | $649,900 |
| MLS® | R3109998 |
| Beds / baths | 2 / 2 |
| Sq ft | 829 |
| Year built | 2025 |
| Parking | 1 covered garage stall |
| Matterport | https://my.matterport.com/show/?m=6Wyg31LF3a2 |
| Realtor.ca | https://www.realtor.ca/real-estate/29590014/808-13573-98a-avenue-surrey |
| SellVanHomes | https://www.sellvanhomes.ca/listing/r3109998-13573-98a-avenue-808-surrey-bc-v3t-4a4/ |

**Marketing lede** (from scrape.json, edited for sale): Brand-new corner unit with floor-to-ceiling windows, mountain and park views, in-suite laundry, one secure underground stall. Steps to King George SkyTrain, Surrey City Centre Mall, T&T, Holland Park, SFU Surrey, KPU.

**Note:** Some scraped sources typo **13575** vs **13573**; site uses **13573** per Realtor.ca / REW / SellVanHomes.

### Contact (dual — option C)

| Role | Name | Phone |
|------|------|-------|
| Owner | Property owner | 236-992-3846 |
| Agent | Frederick Trudeau, Heller Murch Realty | (778) 877-8807 |
| Agent | Carter Lozinski, Heller Murch Realty | (604) 209-3826 |

Inquiry emails go to `SMTP_EMAIL` via `/api/inquiry`.

## Architecture

```
4sell/
├── src/
│   ├── config/
│   │   ├── listing.ts          # Sale facts, contacts, external links
│   │   └── gallery.ts          # Image groups + R2 URL builder
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx            # Hero copy, map, contact, <Gallery />
│   │   ├── globals.css
│   │   └── api/inquiry/route.ts
│   └── components/
│       ├── gallery.tsx         # State, filters, autoplay
│       ├── hero-viewer.tsx
│       ├── filmstrip.tsx
│       ├── filter-bar.tsx
│       ├── inquiry-form.tsx    # Sale fields
│       └── ui/
├── scripts/
│   └── sync-gallery.mjs        # manifest → gallery.ts
├── docs/superpowers/specs/     # This file
├── .env.example
└── package.json
```

### Data flow

1. `scripts/sync-gallery.mjs` reads `../rental/docs/manifest.json` (or regenerates from `../assets/` pipeline) and updates `src/config/gallery.ts`.
2. `gallery.ts` builds image URLs: `${NEXT_PUBLIC_R2_PUBLIC_URL}/${encodeURIComponent(fileName)}`.
3. Client `Gallery` holds filter index, autoplay, keyboard; children render hero + filmstrip.
4. `POST /api/inquiry` sends showing request email.

### Environment

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_R2_PUBLIC_URL` | Yes | Must include `/property` suffix, e.g. `https://pub-….r2.dev/property` |
| `SMTP_EMAIL` | Yes (prod) | Gmail sender |
| `SMTP_PASSWORD` | Yes (prod) | Gmail app password |
| `NEXT_PUBLIC_GOOGLE_API_KEY` | Optional | Maps embed; fallback if missing |

## Page content & UX

### Hero

- **Kicker:** `Surrey City Centre · For sale`
- **H1:** `Holland Park corner condo — Unit 808`
- **Lede:** Sale-focused paragraph (see Listing data).
- **For sale pill** near H1 (subtle).

### Promo cards (3-up)

1. **Request a showing** → `#inquiry-form`
2. **$649,900** → `Listed active · MLS® R3109998`
3. **Virtual tour** → Matterport URL (new tab)

### Stats bar

| Value | Label |
|-------|--------|
| $649,900 | Asking price |
| 2 + 2 | Beds · baths |
| 829 sq ft | Interior |
| MLS® R3109998 | Listing ID |

### Gallery

- Filter groups: **All**, **Phone**, **Matterport**, **Realtor.ca**, **REW.ca** (extend if manifest includes Craigslist/LinkedIn files on R2).
- Autoplay 5s; pause on hover/focus and when tab hidden; Arrow keys + Space.
- Footer note about R2 env var (same as rental).

### Inquiry form

| Field | Required |
|-------|----------|
| Name | Yes |
| Email | Yes |
| Preferred showing date | Yes |
| Preferred time | No (Morning / Afternoon / Evening) |
| Phone | No |
| Message | No |

Removed: check-in, check-out, guests.

**Email subject:** `Showing request — 808-13573 98A Ave (MLS R3109998)`

### Layout below gallery

- **Left:** Google Maps embed for property address.
- **Right:** Inquiry form + dual contact block (owner + agents with `tel:` links and listing URLs).

### Metadata

- **Title:** `808-13573 98A Ave, Surrey — $649,900 | MLS R3109998`
- **Description:** 2 bed, 2 bath, 829 sq ft corner condo for sale in Holland Park, Century City.

## Visual theme

Reuse rental `globals.css` tokens:

- Background `#0b0d10`, radial amber/blue glows
- Primary `#f0b35a`, accent `#84d0ff`
- Serif H1, sans body

Sale tweaks: price in primary amber; kicker in accent blue; form heading “Request a showing”.

Implementation includes a **frontend-design** polish pass (spacing, mobile, hierarchy).

## Error handling

| Area | Behavior |
|------|----------|
| Broken image | Placeholder + optional dev filename |
| Empty manifest | Hero message “Photos coming soon”; contact remains |
| Inquiry validation | 400 if name/email invalid |
| SMTP missing | Log payload; 200 with note (dev-friendly) |
| SMTP failure | 500; user message to call owner |
| Maps key missing | Fallback embed URL (rental pattern) |
| R2 URL missing `/property` | Console/build warning |

## Implementation approach

**Approach 1 (chosen):** Copy/adapt `../rental` Next.js app into `4sell`, add `listing.ts`, sale inquiry form/API, restore full `Gallery` + `FilterBar`, add `sync-gallery.mjs`.

Rejected alternatives: greenfield scaffold (slower); dynamic R2 list API (overkill).

## Testing

- `npm run build` passes
- Images load from R2 with filters and autoplay
- Mobile filmstrip + form usable
- Inquiry POST delivers email with new fields
- Owner + agent `tel:` links work
- Matterport + Realtor.ca links open correctly

## Deployment

- Vercel project linked to `4sell` repo
- Set env vars (mirror `.env.local` without committing secrets)
- `npm run build` default

## Source references

- Rental codebase: `../rental/`
- Scraped listings: `../assets/scrape.json`
- Image manifest: `../rental/docs/manifest.json`
- R2 bucket: Cloudflare `property` (public `/property/` prefix)
