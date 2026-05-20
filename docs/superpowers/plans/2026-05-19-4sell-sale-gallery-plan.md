# 4sell Sale Gallery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a for-sale property gallery site in `4sell/` that mirrors the rental reference UX, loads images from R2 `/property/`, and sends showing inquiries via SMTP.

**Architecture:** Copy the working `../rental` Next.js app into `4sell`, add `listing.ts` for sale metadata, run `sync-gallery.mjs` against `../rental/docs/manifest.json`, refactor `page.tsx` to use `<Gallery />` + sale copy, and update inquiry form/API for showing requests with dual contact.

**Tech Stack:** Next.js 16, React 19, Tailwind v4, shadcn/ui, Nodemailer, Cloudflare R2 public URLs

**Spec:** `docs/superpowers/specs/2026-05-19-4sell-sale-gallery-design.md`

---

## File map

| File | Responsibility |
|------|----------------|
| `src/config/listing.ts` | Address, price, MLS, contacts, external URLs |
| `src/config/gallery.ts` | Image groups, R2 URLs, sale stats |
| `scripts/sync-gallery.mjs` | Regenerate gallery file list from manifest |
| `src/components/gallery.tsx` | Filters, autoplay, filmstrip orchestration |
| `src/components/hero-viewer.tsx` | Large image + controls + image error fallback |
| `src/components/filmstrip.tsx` | Thumbnail carousel |
| `src/components/filter-bar.tsx` | Source filter buttons |
| `src/components/inquiry-form.tsx` | Sale showing request form |
| `src/components/contact-block.tsx` | Owner + agent dual contact |
| `src/app/page.tsx` | Hero copy, stats, map, form layout |
| `src/app/api/inquiry/route.ts` | Email sending |
| `.env.example` | Document env vars (no secrets) |

---

### Task 1: Bootstrap project from rental

**Files:**
- Copy from: `../rental/` → `4sell/` (exclude `.git`, `node_modules`, `.next`)
- Modify: `package.json` (name: `4sell-sale-gallery`)
- Create: `.env.example`

- [ ] **Step 1: Copy rental source tree**

```bash
cd /Users/william.jiang/my-apps/my-property/4sell
rsync -a --exclude node_modules --exclude .next --exclude .git \
  ../rental/ ./
```

- [ ] **Step 2: Update package name**

In `package.json`, set `"name": "4sell-sale-gallery"` and add script:

```json
"sync-gallery": "node scripts/sync-gallery.mjs"
```

- [ ] **Step 3: Create `.env.example`**

```bash
NEXT_PUBLIC_R2_PUBLIC_URL=https://pub-XXXXX.r2.dev/property
NEXT_PUBLIC_GOOGLE_API_KEY=
SMTP_EMAIL=
SMTP_PASSWORD=
```

- [ ] **Step 4: Fix `.env.local` R2 URL**

Append `/property` if missing:

```bash
NEXT_PUBLIC_R2_PUBLIC_URL=https://pub-e25240bce9a34492ba9a0e9fc642a76a.r2.dev/property
```

- [ ] **Step 5: Install and verify build**

```bash
npm install
npm run build
```

Expected: build succeeds (still rental copy at this point).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: bootstrap 4sell from rental gallery codebase"
```

---

### Task 2: Sale listing config

**Files:**
- Create: `src/config/listing.ts`
- Modify: `src/app/layout.tsx` (metadata)

- [ ] **Step 1: Create `src/config/listing.ts`**

```typescript
export const listing = {
  unit: "808",
  address: "808 – 13573 98A Ave, Surrey, BC V3T 0X1",
  addressShort: "13573 98A Ave, Surrey, BC",
  building: "Holland Park by Century City",
  price: "$649,900",
  priceRaw: 649900,
  mls: "R3109998",
  beds: 2,
  baths: 2,
  sqft: 829,
  yearBuilt: 2025,
  parking: "1 covered garage stall",
  lede:
    "Brand-new corner unit with floor-to-ceiling windows, mountain and park views, in-suite laundry, and one secure underground parking stall. Steps to King George SkyTrain, Surrey City Centre Mall, T&T Supermarket, Holland Park, SFU Surrey, and KPU.",
  matterportUrl: "https://my.matterport.com/show/?m=6Wyg31LF3a2",
  realtorCaUrl:
    "https://www.realtor.ca/real-estate/29590014/808-13573-98a-avenue-surrey",
  sellVanHomesUrl:
    "https://www.sellvanhomes.ca/listing/r3109998-13573-98a-avenue-808-surrey-bc-v3t-4a4/",
  owner: {
    label: "Property owner",
    phone: "236-992-3846",
    phoneTel: "+12369923846",
  },
  agents: [
    {
      name: "Frederick Trudeau",
      brokerage: "Heller Murch Realty",
      phone: "(778) 877-8807",
      phoneTel: "+17788778807",
    },
    {
      name: "Carter Lozinski",
      brokerage: "Heller Murch Realty",
      phone: "(604) 209-3826",
      phoneTel: "+16042093826",
    },
  ],
} as const;
```

- [ ] **Step 2: Update `src/app/layout.tsx` metadata**

```typescript
import type { Metadata } from "next";
import { listing } from "@/config/listing";
import "./globals.css";

export const metadata: Metadata = {
  title: `808-13573 98A Ave, Surrey — ${listing.price} | MLS ${listing.mls}`,
  description: `${listing.beds} bed, ${listing.baths} bath, ${listing.sqft} sq ft corner condo for sale in ${listing.building}.`,
  icons: { icon: "/favicon.svg" },
};
```

- [ ] **Step 3: Verify**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/config/listing.ts src/app/layout.tsx
git commit -m "feat: add sale listing config and metadata"
```

---

### Task 3: Gallery sync script + sale stats

**Files:**
- Create: `scripts/sync-gallery.mjs`
- Modify: `src/config/gallery.ts`

- [ ] **Step 1: Create `scripts/sync-gallery.mjs`**

Reads `../rental/docs/manifest.json`, groups files by prefix (`phone__`, `scraped-media__matterport__`, etc.), rewrites `statsData` and `galleryGroups` in `src/config/gallery.ts`.

Core grouping logic:

```javascript
function groupKey(fileName) {
  if (fileName.startsWith("phone__")) return "phone";
  if (fileName.includes("__matterport__")) return "matterport";
  if (fileName.includes("__realtor-ca__")) return "realtor";
  if (fileName.includes("__rew-ca__")) return "rew";
  if (fileName.includes("__craigslist__")) return "craigslist";
  if (fileName.includes("__linkedin__")) return "linkedin";
  return "other";
}
```

Preserve existing `buildItems`, `getFilteredItems`, `imageUrl` exports; only regenerate `galleryGroups` file arrays and keep header imports/types.

- [ ] **Step 2: Run sync**

```bash
npm run sync-gallery
```

Expected: `src/config/gallery.ts` updated with all manifest paths.

- [ ] **Step 3: Replace `statsData` manually (sale)**

```typescript
export const statsData: GalleryStat[] = [
  { value: "$649,900", label: "Asking price" },
  { value: "2 + 2", label: "Beds · baths" },
  { value: "829 sq ft", label: "Interior" },
  { value: "MLS® R3109998", label: "Listing ID" },
];
```

Import from `listing.ts` if preferred to avoid duplication:

```typescript
import { listing } from "./listing";
export const statsData = [
  { value: listing.price, label: "Asking price" },
  // ...
];
```

- [ ] **Step 4: Warn on bad R2 base**

At top of `gallery.ts`:

```typescript
const R2_BASE = process.env.NEXT_PUBLIC_R2_PUBLIC_URL ?? "";
if (typeof window === "undefined" && R2_BASE && !R2_BASE.endsWith("/property")) {
  console.warn("NEXT_PUBLIC_R2_PUBLIC_URL should end with /property");
}
```

- [ ] **Step 5: Verify**

```bash
npm run build
```

- [ ] **Step 6: Commit**

```bash
git add scripts/sync-gallery.mjs src/config/gallery.ts package.json
git commit -m "feat: add gallery sync script and sale stats"
```

---

### Task 4: Hero viewer image error fallback

**Files:**
- Modify: `src/components/hero-viewer.tsx`

- [ ] **Step 1: Add placeholder on image error**

```typescript
const [broken, setBroken] = useState(false);
useEffect(() => setBroken(false), [currentIndex, items]);

// on <img>:
onError={() => setBroken(true)}

// when broken:
{broken ? (
  <div className="hero-placeholder">Photo unavailable</div>
) : (
  <img ... />
)}
```

- [ ] **Step 2: Verify dev server loads hero**

```bash
npm run dev
# Open http://localhost:3000 — confirm hero renders (or placeholder if R2 404)
```

- [ ] **Step 3: Commit**

```bash
git add src/components/hero-viewer.tsx
git commit -m "fix: add hero image error fallback"
```

---

### Task 5: Sale inquiry form + API

**Files:**
- Modify: `src/components/inquiry-form.tsx`
- Modify: `src/app/api/inquiry/route.ts`

- [ ] **Step 1: Replace form fields in `inquiry-form.tsx`**

```typescript
interface FormFields {
  name: string;
  email: string;
  phone: string;
  showingDate: Date | undefined;
  preferredTime: string;
  message: string;
}
```

Remove `checkInDate`, `checkOutDate`, `guests`. Add `<select>` for preferred time: `"" | "Morning" | "Afternoon" | "Evening"`. Single date picker labeled "Preferred showing date" (required).

Payload:

```typescript
const payload = {
  name: form.name,
  email: form.email,
  phone: form.phone,
  showingDate: form.showingDate ? format(form.showingDate, "yyyy-MM-dd") : "",
  preferredTime: form.preferredTime,
  message: form.message,
};
```

- [ ] **Step 2: Update API route**

```typescript
import { listing } from "@/config/listing";

const { name, email, phone, showingDate, preferredTime, message } = body;

if (!name?.trim() || !email?.trim()) {
  return NextResponse.json({ error: "Name and email required" }, { status: 400 });
}

const subject = `Showing request — 808-13573 98A Ave (MLS ${listing.mls})`;
// HTML table rows: Name, Email, Phone, Showing date, Preferred time, Message
```

On SMTP failure: `return NextResponse.json({ error: "Send failed" }, { status: 500 });`

- [ ] **Step 3: Test inquiry locally**

```bash
npm run dev
# Submit form with valid data — check SMTP inbox or server log
```

- [ ] **Step 4: Commit**

```bash
git add src/components/inquiry-form.tsx src/app/api/inquiry/route.ts
git commit -m "feat: sale showing inquiry form and API"
```

---

### Task 6: Contact block component

**Files:**
- Create: `src/components/contact-block.tsx`

- [ ] **Step 1: Create component**

```typescript
import { listing } from "@/config/listing";

export function ContactBlock() {
  return (
    <div className="mt-8 border-t border-line pt-6 space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] font-bold text-primary">Owner</p>
        <p className="text-sm text-muted-foreground">{listing.owner.label}</p>
        <a href={`tel:${listing.owner.phoneTel}`} className="text-sm font-medium text-primary">
          {listing.owner.phone}
        </a>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.24em] font-bold text-accent-2">Listed with</p>
        {listing.agents.map((agent) => (
          <div key={agent.phone} className="mt-3">
            <p className="text-sm text-foreground">{agent.name}</p>
            <p className="text-sm text-muted-foreground">{agent.brokerage}</p>
            <a href={`tel:${agent.phoneTel}`} className="text-sm font-medium text-primary">
              {agent.phone}
            </a>
          </div>
        ))}
        <div className="mt-4 flex flex-col gap-2 text-sm">
          <a href={listing.realtorCaUrl} target="_blank" rel="noopener noreferrer" className="text-primary">
            View on Realtor.ca
          </a>
          <a href={listing.sellVanHomesUrl} target="_blank" rel="noopener noreferrer" className="text-primary">
            View on SellVanHomes
          </a>
        </div>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.24em] font-bold text-primary">Location</p>
        <p className="text-sm text-muted-foreground">{listing.address}</p>
      </div>
    </div>
  );
}
```


- [ ] **Step 2: Commit**

```bash
git add src/components/contact-block.tsx
git commit -m "feat: dual contact block for owner and agents"
```

---

### Task 7: Sale hero page with Gallery orchestrator

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Refactor `page.tsx` to server + client split**

Option A (simplest): Keep `"use client"` at top but import `listing` and `Gallery`.

Replace rental hero with:

```typescript
import { listing } from "@/config/listing";
import { galleryGroups, statsData } from "@/config/gallery";
import { Gallery } from "@/components/gallery";
import { InquiryForm } from "@/components/inquiry-form";
import { ContactBlock } from "@/components/contact-block";

// Kicker: Surrey City Centre · For sale
// H1: Holland Park corner condo — Unit 808
// Lede: listing.lede
// Promo cards: Request a showing | $649,900 | Virtual tour (external link)
// Stats: statsData
// Right column: <Gallery groups={galleryGroups} />
```

Remove inline gallery state from `page.tsx` (delete duplicate HeroViewer/Filmstrip logic — `Gallery` owns it).

Structure:

```tsx
<main className="shell">
  <section className="hero">
    <div className="title-block">{/* sale copy + stats */}</div>
    <Gallery groups={galleryGroups} />
  </section>
  <div className="footer-note">Images are loaded from Cloudflare R2...</div>
  <section>{/* map + inquiry + ContactBlock */}</section>
</main>
```

Form section heading: **Request a showing** / **Send a showing request**.

- [ ] **Step 2: Add subtle "For sale" pill in CSS or inline**

```tsx
<span className="badge">For sale</span>
```

- [ ] **Step 3: Verify full page**

```bash
npm run dev
```

Checklist:
- [ ] Filters switch image sets
- [ ] Autoplay + keyboard work
- [ ] Matterport link opens new tab
- [ ] Map embed loads
- [ ] Contact phones are clickable

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: sale hero page with gallery orchestrator"
```

---

### Task 8: README + polish pass

**Files:**
- Create: `README.md`
- Modify: `src/app/globals.css` (minor sale tweaks if needed)

- [ ] **Step 1: Write `README.md`**

Document: purpose (for-sale gallery), env vars, `npm run sync-gallery`, `npm run dev`, Vercel deploy, R2 `/property` prefix.

- [ ] **Step 2: Frontend polish**

- Ensure mobile filmstrip scrolls (`overflow-x: auto`)
- Confirm form grid collapses on small screens
- Price stat uses `text-primary` emphasis
- Kicker uses `text-accent-2`

- [ ] **Step 3: Production build**

```bash
npm run build
npm start
```

- [ ] **Step 4: Commit**

```bash
git add README.md src/app/globals.css
git commit -m "docs: add README and sale UI polish"
```

---

### Task 9: Final verification

- [ ] **Step 1: R2 image spot-check**

```bash
curl -sI "https://pub-e25240bce9a34492ba9a0e9fc642a76a.r2.dev/property/phone__Weixin%20Image_20260518190536_13_1.jpg" | head -3
```

Expected: `HTTP/1.1 200` (if 404, fix R2 public access or filename encoding before deploy).

- [ ] **Step 2: Lint**

```bash
npm run lint
```

- [ ] **Step 3: Manual smoke test** (browser)

| Check | Pass |
|-------|------|
| Hero shows sale copy + $649,900 | |
| 70+ images in All filter | |
| Inquiry email received | |
| Owner + agent phones work | |

---

## Spec coverage checklist

| Spec requirement | Task |
|------------------|------|
| Sale copy / stats | Task 2, 7 |
| R2 manifest images | Task 3 |
| Filter bar + gallery UX | Task 7 (Gallery from rental) |
| Dual contact | Task 6 |
| Showing inquiry form | Task 5 |
| Matterport + listing links | Task 2, 6, 7 |
| Error handling (images, API) | Task 4, 5 |
| Env `/property` suffix | Task 1 |
| Metadata SEO | Task 2 |
| README / deploy docs | Task 8 |

## Out of scope (do not implement)

- R2 ListObjects API
- Automated Playwright tests (unless requested later)
- Image upload pipeline
