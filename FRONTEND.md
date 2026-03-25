# LCI Frontend Developer Guide

## Your workspace

All public-facing frontend work lives in:

```
src/
├── app/(site)/          ← your pages (Next.js App Router)
├── components/          ← your UI components (create this dir)
└── app/globals.css      ← global styles (Tailwind v4)
```

Do **not** edit anything inside `src/app/(payload)/` — that's the CMS.

---

## API

Payload CMS auto-generates a full REST API. Base path: `/api`

All public collections support unauthenticated `GET`. Write operations require auth.

### Endpoints

| Collection | Endpoint | Notes |
|---|---|---|
| Posts (news) | `GET /api/posts` | Only `status: published` returned publicly |
| Activities | `GET /api/activities` | Events, ceremonies |
| Programmes | `GET /api/programmes` | Ongoing programmes |
| Gallery | `GET /api/gallery` | Photo/video albums |
| Leadership | `GET /api/leadership` | Won Nyaci, ministers, etc. |
| Pages | `GET /api/pages` | About, History, Contact, etc. |
| Clans | `GET /api/clans` | 149 Lango clan directory |
| Media | `GET /api/media` | Uploaded files |

Single document: `GET /api/posts/:id` or query by slug (see below).

### Globals

Globals are site-wide singletons — one record each, no pagination.

```
GET /api/globals/site-settings    ← site name, tagline, contact, social links, logo
GET /api/globals/navigation       ← mainNav and footerNav arrays
```

Example nav item shape:
```json
{
  "mainNav": [
    { "label": "Home", "url": "/" },
    { "label": "News", "url": "/news" },
    {
      "label": "Programmes", "url": "/programmes",
      "children": [
        { "label": "Education", "url": "/programmes/education-scholarships" }
      ]
    }
  ],
  "footerNav": [...]
}
```

### Query parameters

```
# Pagination
/api/posts?limit=10&page=2

# Sort (prefix - for descending)
/api/posts?sort=-publishedAt

# Filter
/api/posts?where[status][equals]=published
/api/posts?where[category][equals]=announcement
/api/activities?where[status][equals]=upcoming

# Get a page by slug
/api/pages?where[slug][equals]=about&limit=1

# Depth — how many levels of relationships to populate (default 1)
/api/posts?depth=2

# Select specific fields
/api/posts?select[title]=true&select[slug]=true&select[excerpt]=true
```

### Example response shape

```json
{
  "docs": [
    {
      "id": "abc123",
      "title": "Won Nyaci Launches Greening Lango Initiative",
      "slug": "won-nyaci-greening-lango-2025",
      "excerpt": "The Paramount Chief announced a target of 1 million trees...",
      "category": "announcement",
      "status": "published",
      "publishedAt": "2025-03-15T10:00:00.000Z",
      "featuredImage": {
        "id": "img001",
        "url": "/media/greening-lango.jpg",
        "alt": "Won Nyaci planting a tree",
        "width": 1920,
        "height": 1080,
        "sizes": {
          "thumbnail": { "url": "/media/greening-lango-400x300.jpg", "width": 400, "height": 300 },
          "card":      { "url": "/media/greening-lango-768x512.jpg", "width": 768, "height": 512 },
          "hero":      { "url": "/media/greening-lango-1920x1080.jpg", "width": 1920, "height": 1080 }
        }
      },
      "content": { /* Lexical rich text — see below */ }
    }
  ],
  "totalDocs": 42,
  "limit": 10,
  "page": 1,
  "totalPages": 5,
  "hasNextPage": true,
  "hasPrevPage": false
}
```

---

## Media / Images

Images are served from `/media/`. Three sizes are generated automatically:

| Size name | Dimensions | Use for |
|---|---|---|
| `thumbnail` | 400×300 | Cards, previews, admin |
| `card` | 768×512 | Article cards, grid listings |
| `hero` | 1920×1080 | Full-width banners |

Access via the `sizes` object on any media field (see example above).

In development, images are served from `localhost:3000/media/...`.
In production, configure Cloudinary — the backend dev will update this; URLs will then be absolute Cloudinary CDN URLs.

---

## Rich Text (Lexical)

The `content` field on Posts, Programmes, and Pages is **Lexical JSON**, not HTML.
You need to render it with `@payloadcms/richtext-lexical`'s React renderer.

Install and use:

```tsx
import { RichText } from '@payloadcms/richtext-lexical/react'

// In your component:
<RichText data={post.content} />
```

Or use any third-party Lexical renderer. Do not try to render the raw JSON as HTML — it won't work.

---

## Fetching data (recommended pattern)

Use Next.js **Server Components** and fetch directly from the API:

```tsx
// src/app/(site)/news/page.tsx
async function getPosts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts?sort=-publishedAt&limit=12`,
    { next: { revalidate: 60 } } // ISR: revalidate every 60s
  )
  return res.json()
}

export default async function NewsPage() {
  const { docs: posts } = await getPosts()
  // ...
}
```

For a single page by slug:
```tsx
const res = await fetch(
  `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pages?where[slug][equals]=${slug}&limit=1&depth=2`
)
const { docs } = await res.json()
const page = docs[0]
```

---

## Environment variable you need

```bash
NEXT_PUBLIC_SERVER_URL=http://localhost:3000   # dev
# Set to the production URL in Vercel dashboard
```

---

## Collection field reference

### Posts
`title` · `slug` · `excerpt` · `content` (richtext) · `featuredImage` (media) · `category` · `publishedAt` · `status` · `author`

Categories: `announcement` · `event-report` · `programme-update` · `press-release` · `cultural-heritage` · `community`

### Activities
`title` · `slug` · `description` (richtext) · `startDate` · `endDate` · `location` · `district` · `featuredImage` · `gallery` (array of media) · `status`

Districts: `alebtong` · `amolatar` · `apac` · `dokolo` · `kole` · `kwania` · `lira` · `otuke` · `oyam` · `multiple`

Statuses: `upcoming` · `ongoing` · `completed` · `cancelled`

### Programmes
`title` · `slug` · `summary` · `description` (richtext) · `category` · `featuredImage` · `highlights` (array of `{ text }`) · `status`

Categories: `education` · `environment` · `health` · `peace` · `women` · `cultural` · `youth` · `investment`

### Gallery
`title` · `album` · `date` · `description` · `coverImage` (media) · `images` (array of `{ image, caption }`) · `relatedActivity`

### Leadership
`name` · `title` · `category` · `bio` (richtext) · `photo` (media) · `order`

Categories: `paramount` · `prime-minister` · `minister` · `council` · `clan-leader`

Display order: sort by `order` ascending. Won Nyaci = order 1.

### Pages
`title` · `slug` · `heroImage` (media) · `content` (richtext) · `metaDescription` · `status`

Suggested slugs: `about` · `history` · `contact` · `governance` · `programmes`

### Clans
`name` · `symbol` · `origin` · `description` (richtext) · `district` · `clanLeader`

There are 149 registered clans total.

---

## Deployment

- Frontend deploys to **Vercel** automatically on push to `main`
- Set `NEXT_PUBLIC_SERVER_URL` to the production domain in Vercel dashboard
- The `/admin` route is for LCI staff only — you don't need to style it
