import Image from 'next/image'
import Link from 'next/link'
import type { Programme } from '@/lib/types'
import Badge from '@/components/ui/Badge'

const CATEGORY_ICONS: Record<string, string> = {
  education:   '📚',
  environment: '🌳',
  health:      '🏥',
  peace:       '🕊',
  women:       '👩',
  cultural:    '🏛',
  youth:       '⚡',
  investment:  '📈',
}

interface ProgrammeCardProps {
  programme: Programme
}

export default function ProgrammeCard({ programme }: ProgrammeCardProps) {
  const imageUrl =
    programme.featuredImage?.sizes?.card?.url ??
    programme.featuredImage?.url

  const icon = CATEGORY_ICONS[programme.category] ?? '◆'

  return (
    <Link
      href={`/programmes/${programme.slug}`}
      className="group flex flex-col bg-white card-lift overflow-hidden"
      style={{ border: '1px solid var(--color-sand)' }}
    >
      {/* Image / Icon header */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: '16/9', backgroundColor: 'var(--color-mist)' }}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={programme.featuredImage?.alt ?? programme.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div
            className="w-full h-full lango-pattern-subtle flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-forest)', opacity: 0.85 }}
          >
            <span className="text-5xl">{icon}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex items-center justify-between">
          <Badge programme={programme.category} />
          {programme.status === 'active' && (
            <span
              className="text-[0.65rem] tracking-widest uppercase"
              style={{ color: 'var(--color-forest-muted)' }}
            >
              Active
            </span>
          )}
        </div>

        <h3
          className="text-xl font-600 leading-snug group-hover:text-ochre transition-colors"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-forest)' }}
        >
          {programme.title}
        </h3>

        {programme.summary && (
          <p
            className="text-sm leading-relaxed line-clamp-3"
            style={{ color: 'var(--color-stone)' }}
          >
            {programme.summary}
          </p>
        )}

        {/* Highlights preview */}
        {programme.highlights && programme.highlights.length > 0 && (
          <ul className="flex flex-col gap-1 mt-1">
            {programme.highlights.slice(0, 2).map((h, i) => (
              <li
                key={i}
                className="flex items-start gap-1.5 text-xs leading-snug"
                style={{ color: 'var(--color-bark-light)' }}
              >
                <span style={{ color: 'var(--color-ochre)', flexShrink: 0, marginTop: '1px' }}>◆</span>
                <span className="line-clamp-1">{h.text}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-3" style={{ borderTop: '1px solid var(--color-mist)' }}>
          <span
            className="text-xs tracking-widest uppercase group-hover:text-ochre transition-colors"
            style={{ color: 'var(--color-bark-light)' }}
          >
            Learn More →
          </span>
        </div>
      </div>
    </Link>
  )
}
