import type { Metadata } from 'next'
import type { Post, PayloadResponse } from '@/lib/types'
import { fetchAPI } from '@/lib/api'
import { MOCK_POSTS } from '@/lib/mockData'
import PostCard from '@/components/cards/PostCard'
import SectionHeader from '@/components/ui/SectionHeader'

export const metadata: Metadata = {
  title: 'News & Announcements',
  description:
    'Latest news, announcements, event reports, and press releases from the LANGO CULTURAL INSTITUTION.',
}

const CATEGORIES = [
  { value: '',                 label: 'All' },
  { value: 'announcement',    label: 'Announcements' },
  { value: 'event-report',    label: 'Event Reports' },
  { value: 'programme-update',label: 'Programme Updates' },
  { value: 'press-release',   label: 'Press Releases' },
  { value: 'cultural-heritage',label: 'Cultural Heritage' },
  { value: 'community',       label: 'Community' },
]

async function getPosts(page: number, category: string): Promise<PayloadResponse<Post>> {
  const params = new URLSearchParams({
    sort: '-publishedAt',
    limit: '12',
    page: String(page),
    'where[status][equals]': 'published',
  })
  if (category) params.set('where[category][equals]', category)

  const data = await fetchAPI<PayloadResponse<Post>>(
    `/api/posts?${params}`,
    { next: { revalidate: 60 } },
  )

  if (data && data.docs && data.docs.length > 0) {
    return data
  }

  let filtered = MOCK_POSTS
  if (category) {
    filtered = filtered.filter((p) => p.category === category)
  }

  return {
    docs: filtered,
    totalDocs: filtered.length,
    limit: 12,
    page: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
    pagingCounter: 1,
    prevPage: null,
    nextPage: null,
  }
}

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>
}) {
  const { page: pageParam, category = '' } = await searchParams
  const page = Math.max(1, parseInt(pageParam ?? '1', 10))

  const data = await getPosts(page, category)
  const { docs: posts, totalDocs, totalPages } = data

  return (
    <div style={{ backgroundColor: 'var(--color-cream)', minHeight: '100dvh' }}>
      {/* Page header */}
      <div
        className="py-16 md:py-20 relative overflow-hidden"
        style={{ backgroundColor: 'var(--color-forest)' }}
      >
        <div className="absolute inset-0 lango-pattern-light" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader
            eyebrow="Stay Informed"
            title="News &amp; Announcements"
            subtitle={`${totalDocs} published articles from the LANGO CULTURAL INSTITUTION.`}
            light
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map(({ value, label }) => {
            const isActive = category === value
            return (
              <a
                key={value}
                href={value ? `/news?category=${value}` : '/news'}
                className="px-4 py-2 text-[0.75rem] tracking-[0.08em] uppercase transition-all duration-150"
                style={{
                  fontFamily: 'var(--font-body)',
                  backgroundColor: isActive ? 'var(--color-forest)' : 'white',
                  color: isActive ? 'var(--color-cream)' : 'var(--color-stone)',
                  border: `1px solid ${isActive ? 'var(--color-forest)' : 'var(--color-sand)'}`,
                }}
              >
                {label}
              </a>
            )
          })}
        </div>

        {/* Grid */}
        {posts.length === 0 ? (
          <div
            className="text-center py-24"
            style={{ border: '1px solid var(--color-sand)' }}
          >
            <p style={{ color: 'var(--color-stone)' }}>No posts found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            {page > 1 && (
              <a
                href={`/news?page=${page - 1}${category ? `&category=${category}` : ''}`}
                className="px-4 py-2 text-sm border transition-colors"
                style={{
                  borderColor: 'var(--color-sand)',
                  color: 'var(--color-forest)',
                  backgroundColor: 'white',
                }}
              >
                ← Previous
              </a>
            )}

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => Math.abs(p - page) <= 2)
              .map((p) => (
                <a
                  key={p}
                  href={`/news?page=${p}${category ? `&category=${category}` : ''}`}
                  className="w-10 h-10 flex items-center justify-center text-sm border transition-colors"
                  style={{
                    borderColor: p === page ? 'var(--color-forest)' : 'var(--color-sand)',
                    backgroundColor: p === page ? 'var(--color-forest)' : 'white',
                    color: p === page ? 'var(--color-cream)' : 'var(--color-charcoal)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {p}
                </a>
              ))}

            {page < totalPages && (
              <a
                href={`/news?page=${page + 1}${category ? `&category=${category}` : ''}`}
                className="px-4 py-2 text-sm border transition-colors"
                style={{
                  borderColor: 'var(--color-sand)',
                  color: 'var(--color-forest)',
                  backgroundColor: 'white',
                }}
              >
                Next →
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
