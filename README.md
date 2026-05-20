# 4sell — Surrey Condo Sale Gallery

For-sale listing site for **Unit 808, 13573 98A Ave, Surrey, BC** (MLS® **R3109998**, **$649,900**). Cinematic photo gallery, showing-request form, map with listing links, buyer FAQ, and listing-agent contacts.

**Live stack:** Next.js 16 · React 19 · Tailwind v4 · shadcn/ui · [tweakcn Elegant Luxury (dark)](https://tweakcn.com/editor/theme) · Cloudflare R2 · Vercel

## Features

- Hero viewer with autoplay, keyboard navigation, and source filters (**All**, **Phone**, **Matterport**, **Realtor.ca**, **REW.ca**)
- **73** listing photos from Cloudflare R2 (manifest has 76; three files are not on R2 yet — see [Gallery sync](#gallery-sync))
- Sale-focused copy, stats (price, beds/baths, sq ft, MLS)
- Showing request form (email via Gmail SMTP)
- Heller Murch listing agents + team contacts
- Map panel with address and Realtor.ca / SellVanHomes links
- Buyer FAQ (BC sale context)
- Matterport virtual tour link
- Google Maps embed
- Mobile layout (stacked promos, scrollable filters, shorter map, hero `object-fit: contain`)

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
| `npm run sync-gallery` | Regenerate `src/config/gallery.ts` from manifest, skipping files missing on R2 |

## Gallery sync

`npm run sync-gallery` reads `../rental/docs/manifest.json`, **HEAD-checks each file** against `NEXT_PUBLIC_R2_PUBLIC_URL` (from `.env.local` or the environment), and rewrites `galleryGroups` in `src/config/gallery.ts`. Files that return 404 are omitted and listed in the console.

After adding images to R2:

1. Update the rental manifest if filenames changed.
2. Run `npm run sync-gallery`.
3. Commit `src/config/gallery.ts` if the gallery changed.

**Currently skipped on R2** (in manifest but not uploaded):

- `scraped-media__linkedin__image-001.jpg`
- `scraped-media__realtor-ca__image-026.jpg`
- `scraped-media__rew-ca__image-013.jpeg`

Upload those to the bucket root with the same names, then run `sync-gallery` again to restore them (and the LinkedIn filter if applicable).

## Project layout

```
src/
├── app/              # layout, page, globals.css, inquiry API
├── components/       # gallery, hero, filmstrip, inquiry, FAQ, map, contacts
└── config/
    ├── listing.ts    # Price, MLS, contacts, external URLs
    ├── gallery.ts    # Image groups + R2 URLs (generated)
    └── faq.ts        # Buyer FAQ entries
scripts/
└── sync-gallery.mjs  # Manifest → gallery.ts (with R2 verification)
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

**Broken thumbnails in the gallery** — Usually a manifest entry with no object on R2. Run `npm run sync-gallery` to drop missing files, or upload the file to R2 and sync again.

**Hero looks black on mobile** — Fixed by stabilizing hero image transition deps; ensure you are on a build that includes the `hero-viewer` update.

**Inquiry email not sent** — Verify `SMTP_EMAIL` / `SMTP_PASSWORD` on Vercel. Without SMTP, the API logs the payload and still returns success (dev only).
