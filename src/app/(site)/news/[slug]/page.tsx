import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Post, PayloadResponse } from '@/lib/types'
import { POST_CATEGORY_LABELS } from '@/lib/types'
import { fetchAPI } from '@/lib/api'
import { MOCK_POSTS } from '@/lib/mockData'
import Badge from '@/components/ui/Badge'
import RichTextRenderer from '@/components/RichTextRenderer'
import PostCard from '@/components/cards/PostCard'

function formatDate(dateString?: string) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-UG', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

async function getPost(slug: string): Promise<Post | null> {
  const data = await fetchAPI<PayloadResponse<Post>>(
    `/api/posts?where[slug][equals]=${encodeURIComponent(slug)}&limit=1&depth=2`,
    { next: { revalidate: 60 } },
  )
  if (data?.docs && data.docs.length > 0) return data.docs[0]
  return MOCK_POSTS.find((p) => p.slug === slug) ?? null
}

async function getRelatedPosts(category?: string, excludeId?: string): Promise<Post[]> {
  try {
    const params = new URLSearchParams({
      sort: '-publishedAt',
      limit: '3',
      'where[status][equals]': 'published',
    })
    if (category) params.set('where[category][equals]', category)

    const data = await fetchAPI<PayloadResponse<Post>>(
      `/api/posts?${params}`,
      { next: { revalidate: 60 } },
    )
    const docs = data?.docs.filter((p) => p.id !== excludeId).slice(0, 3) ?? []
    if (docs.length > 0) return docs
    return MOCK_POSTS.filter((p) => p.id !== excludeId).slice(0, 3)
  } catch {
    return MOCK_POSTS.filter((p) => p.id !== excludeId).slice(0, 3)
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: 'Post Not Found' }
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: post.featuredImage
      ? { images: [{ url: post.featuredImage.url }] }
      : undefined,
  }
}

export default async function NewsPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const related = await getRelatedPosts(post.category, post.id)

  const heroImageUrl =
    post.featuredImage?.sizes?.hero?.url ??
    post.featuredImage?.url

  return (
    <article style={{ backgroundColor: 'var(--color-cream)', minHeight: '100dvh' }}>
      {/* Hero image */}
      {heroImageUrl && (
        <div
          className="relative w-full"
          style={{ height: 'clamp(300px, 50vw, 560px)', backgroundColor: 'var(--color-forest)' }}
        >
          <Image
            src={heroImageUrl}
            alt={post.featuredImage?.alt ?? post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>
      )}

      {/* Article header */}
      <div
        className="py-12 md:py-16 relative"
        style={{
          backgroundColor: heroImageUrl ? 'var(--color-forest)' : 'var(--color-forest)',
          marginTop: heroImageUrl ? '-80px' : 0,
        }}
      >
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-6">
            <Link
              href="/news"
              className="text-xs tracking-widest uppercase transition-opacity hover:opacity-100 opacity-60"
              style={{ color: 'var(--color-ochre-light)', fontFamily: 'var(--font-body)' }}
            >
              ← News
            </Link>
          </nav>

          {post.category && (
            <div className="mb-4">
              <Badge category={post.category} />
            </div>
          )}

          <h1
            className="font-600 leading-tight mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-cream)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            }}
          >
            {post.title}
          </h1>

          {post.excerpt && (
            <p
              className="text-lg leading-relaxed mb-6 max-w-2xl"
              style={{ color: 'rgba(245,239,224,0.75)', fontFamily: 'var(--font-body)' }}
            >
              {post.excerpt}
            </p>
          )}

          <div className="flex items-center gap-4">
            {post.publishedAt && (
              <span
                className="text-sm"
                style={{ color: 'var(--color-ochre-light)', fontFamily: 'var(--font-mono)' }}
              >
                {formatDate(post.publishedAt)}
              </span>
            )}
            {post.author && (
              <>
                <span style={{ color: 'rgba(245,239,224,0.3)' }}>·</span>
                <span
                  className="text-sm"
                  style={{ color: 'rgba(245,239,224,0.6)', fontFamily: 'var(--font-body)' }}
                >
                  {post.author.name}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Article body */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12 md:py-16">
        {post.content ? (
          <RichTextRenderer content={post.content} />
        ) : (
          <p style={{ color: 'var(--color-stone)' }}>Content not available.</p>
        )}
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <div
          className="py-16"
          style={{ borderTop: '1px solid var(--color-sand)' }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2
              className="text-2xl font-600 mb-8"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-forest)' }}
            >
              More{post.category ? ` ${POST_CATEGORY_LABELS[post.category]}` : ''} News
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  )
}
