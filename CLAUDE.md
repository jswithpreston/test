# Lango Cultural Institution (LCI) — Project Guide

## Project Overview

Official website for the **Lango Cultural Foundation (LCF)**, the cultural institution of the
Lango people of Uganda. The site serves ~2.7 million people across nine districts in the Lango
sub-region of north-central Uganda: Alebtong, Amolatar, Apac, Dokolo, Kole, Kwania, Lira,
Otuke, and Oyam.

**Purpose:** Institutional presence + dynamic content management (news, activities, programmes,
gallery, leadership, and the 149-clan directory).

**Current Paramount Chief (Won Nyaci):** Eng. Dr. Michael Moses Odongo Okune (sworn Feb 2025)

**Domains:** `lcf.or.ug` / `langoculturalfoundation.org`

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router, TypeScript) — full-stack |
| CMS / Admin | Payload CMS v3 — embedded in Next.js, admin at `/admin` |
| Database | PostgreSQL via `@payloadcms/db-postgres` |
| Hosting (app) | Vercel (free hobby tier → upgrade as needed) |
| Hosting (db) | Supabase PostgreSQL (free tier — 500 MB) |
| Media | Local upload initially; migrate to Cloudinary later |
| Styling | Tailwind CSS v4 |
| Language | TypeScript throughout |

**Why Payload CMS:** It embeds directly into Next.js, provides a fully-featured admin panel for
non-technical LCI staff to manage content, and requires no separate hosting.

**Why Vercel + Supabase (not Namecheap/shared hosting):** Shared hosting cannot run Next.js
with API routes, SSR, or Server Actions — only static exports. Vercel + Supabase costs $0 for
a low-traffic institutional site and is the correct deployment target for this stack.

---

## Repository Structure

This is a **monorepo**. One developer owns the backend (collections, API, server logic); a
separate developer owns the frontend (pages, components, styling).

```
lci/
├── src/
│   ├── app/
│   │   ├── (payload)/              ← Payload CMS routes (DO NOT EDIT manually)
│   │   │   ├── admin/
│   │   │   │   ├── [[...segments]]/
│   │   │   │   │   ├── page.tsx    ← Admin UI entry
│   │   │   │   │   └── not-found.tsx
│   │   │   │   └── importMap.ts    ← Auto-generated; run `npm run generate:importmap`
│   │   │   └── api/
│   │   │       └── [...slug]/
│   │   │           └── route.ts    ← Payload REST API handler
│   │   ├── (site)/                 ← Public-facing pages (FRONTEND DEV)
│   │   │   └── page.tsx            ← Homepage placeholder
│   │   ├── layout.tsx              ← Root layout
│   │   └── globals.css
│   ├── collections/                ← Payload content models (BACKEND DEV)
│   │   ├── Users.ts
│   │   ├── Media.ts
│   │   ├── Posts.ts
│   │   ├── Activities.ts
│   │   ├── Programmes.ts
│   │   ├── Gallery.ts
│   │   ├── Leadership.ts
│   │   ├── Pages.ts
│   │   └── Clans.ts
│   └── components/                 ← Shared UI components (FRONTEND DEV)
├── payload.config.ts               ← Payload CMS configuration (BACKEND DEV)
├── payload-types.ts                ← Auto-generated; run `npm run generate:types`
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── .env.example
└── CLAUDE.md
```

---

## Content Collections

All collections are defined in `src/collections/`. Payload auto-generates REST API endpoints
for each at `/api/{collection-slug}`.

| Collection | Slug | Description |
|---|---|---|
| `Users` | `users` | Admin/editor accounts for CMS access |
| `Media` | `media` | Upload collection — images, videos, PDFs |
| `Posts` | `posts` | News, announcements, press releases |
| `Activities` | `activities` | Events, ceremonies, public activities |
| `Programmes` | `programmes` | Ongoing programmes (education, environment, health, peace…) |
| `Gallery` | `gallery` | Photo/video albums |
| `Leadership` | `leadership` | Won Nyaci, ministers, council, clan leaders |
| `Pages` | `pages` | Semi-static pages (About, History, Contact) |
| `Clans` | `clans` | Directory of the 149 registered Lango clans |

### Auto-generated API endpoints (Payload REST)

```
GET    /api/posts
GET    /api/posts/:id
POST   /api/posts           (authenticated)
PATCH  /api/posts/:id       (authenticated)
DELETE /api/posts/:id       (authenticated)
# Same pattern for all collections
GET    /api/activities
GET    /api/programmes
GET    /api/gallery
GET    /api/leadership
GET    /api/pages
GET    /api/clans
GET    /api/media
```

Query parameters: `?where[status][equals]=published`, `?limit=10`, `?page=2`, `?sort=-publishedAt`

### Admin Panel

Access at `/admin`. Staff log in with their `Users` credentials (email + password).

---

## Development Setup

### Prerequisites
- Node.js >= 18.20
- A PostgreSQL database (local or Supabase)

### Steps

```bash
# 1. Install dependencies
npm install

# 2. Copy env and fill in values
cp .env.example .env

# 3. Generate Payload types (run after any collection changes)
npm run generate:types

# 4. Generate import map (run after adding custom admin components)
npm run generate:importmap

# 5. Start dev server
npm run dev
```

Admin panel: http://localhost:3000/admin
Public site: http://localhost:3000

On first run, Payload will prompt you to create the first admin user via the browser.

---

## Environment Variables

See `.env.example` for all variables. Required:

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `PAYLOAD_SECRET` | Random string (min 32 chars) for JWT signing |
| `NEXT_PUBLIC_SERVER_URL` | Full app URL (e.g. `https://lcf.or.ug`) |

---

## Developer Responsibilities

### Backend Developer (this codebase)
- `src/collections/` — content models, field definitions, access control
- `payload.config.ts` — CMS configuration, plugins, globals
- `src/app/(payload)/` — Payload route handlers (rarely needs editing)
- `src/lib/` — server utilities, DB helpers, auth logic
- Database migrations (Payload handles these automatically)
- API design and documentation

### Frontend Developer
- `src/app/(site)/` — all public-facing pages
- `src/components/` — UI components
- `src/app/globals.css` + Tailwind config — styling
- Client-side data fetching from Payload's REST API

---

## Payload CMS Notes

- After **any change to a collection**, run `npm run generate:types` to refresh `payload-types.ts`
- The `payload-types.ts` file is auto-generated — never edit it manually
- The `importMap.ts` file is auto-generated — run `npm run generate:importmap` after adding
  custom Payload admin components
- Access control: public collections use `read: () => true`; draft content uses
  `read: ({ req: { user } }) => user ? true : { status: { equals: 'published' } }`
- Payload handles its own migrations — schema changes are applied on next server start in dev

---

## Deployment (Vercel + Supabase)

1. Push to GitHub
2. Import repo on [vercel.com](https://vercel.com) — it detects Next.js automatically
3. Set environment variables in Vercel dashboard
4. Database: create project on [supabase.com](https://supabase.com), use the connection string
5. Set `NEXT_PUBLIC_SERVER_URL` to the production Vercel URL or custom domain
6. Point domain DNS to Vercel (add `lcf.or.ug` as custom domain in Vercel)

**Important:** On Vercel, set `PAYLOAD_SECRET` as a secret env var (not plain text).

---

## Key LCI Context

- **Language:** Lango (Western Nilotic / Luo family) — mutually intelligible with Acholi
- **Governance structure:** Won Nyaci (Paramount Chief) → Prime Minister → 11 Ministries
- **Districts (9):** Alebtong, Amolatar, Apac, Dokolo, Kole, Kwania, Lira, Otuke, Oyam
- **Clans:** 149 registered clans; each has an Awitong (Supreme Clan Chief)
- **Key programmes:** Education/scholarships, Greening Lango (1M trees), peace & reconciliation,
  women empowerment (Agong Foundation), sexual/reproductive health
- **Symbol:** The rhino
- **Notable:** Milton Obote (Uganda's first president, 1966–71) was of Lango descent
- **Social:** Instagram `@langoinstitute`, Facebook `LangoCommunityNA`
