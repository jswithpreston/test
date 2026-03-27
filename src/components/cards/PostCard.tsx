import Image from 'next/image'
import Link from 'next/link'
import type { Post } from '@/lib/types'
import Badge from '@/components/ui/Badge'

function formatDate(dateString?: string) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-UG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const imageUrl =
    post.featuredImage?.sizes?.card?.url ??
    post.featuredImage?.url

  return (
    <Link
      href={`/news/${post.slug}`}
      className="group flex flex-col bg-white card-lift overflow-hidden"
      style={{ border: '1px solid var(--color-sand)' }}
    >
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-mist">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={post.featuredImage?.alt ?? post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div
            className="w-full h-full lango-pattern-subtle flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-mist)' }}
          >
            <span
              className="text-3xl opacity-20"
              style={{ color: 'var(--color-ochre)' }}
            >
              ◆
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {post.category && (
          <Badge category={post.category} />
        )}

        <h3
          className="text-xl font-600 leading-snug group-hover:text-ochre transition-colors"
          style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--color-forest)',
          }}
        >
          {post.title}
        </h3>

        {post.excerpt && (
          <p
            className="text-sm leading-relaxed line-clamp-3"
            style={{ color: 'var(--color-stone)' }}
          >
            {post.excerpt}
          </p>
        )}

        {/* Footer row */}
        <div className="flex items-center justify-between mt-auto pt-3"
          style={{ borderTop: '1px solid var(--color-mist)' }}
        >
          {post.publishedAt && (
            <span
              className="text-[0.75rem] tracking-wide"
              style={{
                color: 'var(--color-stone)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {formatDate(post.publishedAt)}
            </span>
          )}
          <span
            className="text-xs tracking-widest uppercase transition-colors group-hover:text-ochre ml-auto"
            style={{ color: 'var(--color-bark-light)' }}
          >
            Read →
          </span>
        </div>
      </div>
    </Link>
  )
}
