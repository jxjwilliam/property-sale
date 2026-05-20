# 4sell — Surrey Condo Sale Gallery

For-sale listing site for **Unit 808, 13573 98A Ave, Surrey, BC** (MLS® **R3109998**, **$649,900**). Cinematic photo gallery, showing-request form, map, and dual contact (owner + listing agents).

**Live stack:** Next.js 16 · React 19 · Tailwind v4 · shadcn/ui · [tweakcn Elegant Luxury (dark)](https://tweakcn.com/editor/theme) · Cloudflare R2 · Vercel

## Features

- Hero viewer with autoplay, keyboard navigation, and source filters (All, Phone, Matterport, Realtor.ca, REW.ca, …)
- **76** listing photos from Cloudflare R2
- Sale-focused copy, stats (price, beds/baths, sq ft, MLS)
- Showing request form (email via Gmail SMTP)
- Owner + Heller Murch agent contacts with Realtor.ca / SellVanHomes links
- Matterport virtual tour link
- Google Maps embed

## Quick start

```bash
npm install
cp .env.example .env.local
# Edit .env.local — see Environment below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_R2_PUBLIC_URL` | Yes | Public R2 dev URL, e.g. `https://pub-XXXX.r2.dev` — **no** trailing `/property` path |
| `SMTP_EMAIL` | Prod | Gmail address used to send inquiry emails |
| `SMTP_PASSWORD` | Prod | Gmail app password |
| `NEXT_PUBLIC_GOOGLE_API_KEY` | No | Enables Maps Embed API; falls back to basic embed without it |

**R2 note:** The Cloudflare bucket is named `property`, but objects are served at the **bucket root** of the public URL (`/filename.jpg`), not `…/property/filename.jpg`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Run production build locally |
| `npm run lint` | ESLint |
| `npm run sync-gallery` | Regenerate `src/config/gallery.ts` from `../rental/docs/manifest.json` |

After adding or renaming images in R2, update the manifest (rental pipeline) and run `npm run sync-gallery`.

## Project layout

```
src/
├── app/              # layout, page, globals.css, inquiry API
├── components/       # gallery, hero, filmstrip, inquiry form, contact block
└── config/
    ├── listing.ts    # Price, MLS, contacts, external URLs
    └── gallery.ts    # Image groups + R2 URLs (generated)
scripts/
└── sync-gallery.mjs
docs/superpowers/     # Design spec + implementation plan
```

## Related folders

| Path | Role |
|------|------|
| `../rental/` | Original rental gallery (UI reference) |
| `../assets/` | Scraped listings (`scrape.json`) and image pipeline |
| `../rental/docs/manifest.json` | Source list for `sync-gallery` |

## Deploy (Vercel)

1. Import this repo and set root directory to `4sell` (if monorepo) or deploy repo root.
2. Add environment variables from `.env.example` (Production + Preview).
3. Build command: `npm run build` (default).
4. Confirm R2 images load on the preview URL.

## Troubleshooting

**Hydration warning on `<body>`** — Often caused by browser extensions (e.g. Grammarly) injecting attributes before React loads. The root layout uses `suppressHydrationWarning` on `<html>` and `<body>` for that case. Test in a private window if unsure.

**Images 404** — Check `NEXT_PUBLIC_R2_PUBLIC_URL` matches the public dev URL in Cloudflare R2 → bucket `property` → Settings. Test one file:

```bash
curl -sI "https://pub-XXXX.r2.dev/phone__Weixin%20Image_20260518190536_13_1.jpg" | head -1
```

Expected: `HTTP/1.1 200 OK`.

**Inquiry email not sent** — Verify `SMTP_EMAIL` / `SMTP_PASSWORD` on Vercel. Without SMTP, the API logs the payload and still returns success (dev only).
