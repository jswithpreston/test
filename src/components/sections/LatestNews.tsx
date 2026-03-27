import type { Post, PayloadResponse } from '@/lib/types'
import { fetchAPI } from '@/lib/api'
import PostCard from '@/components/cards/PostCard'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'

async function getLatestPosts(): Promise<Post[]> {
  const data = await fetchAPI<PayloadResponse<Post>>(
    '/api/posts?sort=-publishedAt&limit=3&where[status][equals]=published',
    { next: { revalidate: 60 } },
  )
  return data?.docs ?? []
}

export default async function LatestNews() {
  const posts = await getLatestPosts()

  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: 'var(--color-cream)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <SectionHeader
            eyebrow="Stay Informed"
            title="News &amp; Announcements"
            subtitle="The latest from the Lango Cultural Foundation — events, programmes, and community updates."
          />
          <Button href="/news" variant="ghost" size="sm" className="self-start md:self-auto flex-shrink-0">
            All News →
          </Button>
        </div>

        {posts.length === 0 ? (
          <div
            className="text-center py-20 lango-pattern-subtle"
            style={{ border: '1px solid var(--color-sand)' }}
          >
            <p style={{ color: 'var(--color-stone)' }}>No news published yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
