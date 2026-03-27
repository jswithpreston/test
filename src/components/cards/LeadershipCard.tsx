import Image from 'next/image'
import type { Leader } from '@/lib/types'
import { LEADER_CATEGORY_LABELS } from '@/lib/types'

interface LeadershipCardProps {
  leader: Leader
  featured?: boolean
}

export default function LeadershipCard({ leader, featured = false }: LeadershipCardProps) {
  const photoUrl =
    leader.photo?.sizes?.card?.url ??
    leader.photo?.url

  if (featured) {
    return (
      <div
        className="flex flex-col sm:flex-row items-center gap-8 p-8"
        style={{
          background: 'linear-gradient(135deg, var(--color-forest) 0%, var(--color-forest-deep) 100%)',
          border: '1px solid rgba(196,132,42,0.3)',
        }}
      >
        {/* Photo */}
        <div
          className="relative flex-shrink-0"
          style={{ width: 160, height: 160 }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{ border: '2px solid var(--color-ochre)', transform: 'translate(4px, 4px)' }}
          />
          <div
            className="relative overflow-hidden rounded-full"
            style={{ width: 160, height: 160, backgroundColor: 'var(--color-forest-light)' }}
          >
            {photoUrl ? (
              <Image
                src={photoUrl}
                alt={leader.photo?.alt ?? leader.name}
                fill
                className="object-cover"
                sizes="160px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center lango-pattern-light">
                <span className="text-5xl font-display text-cream opacity-40">
                  {leader.name.charAt(0)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-2 text-center sm:text-left">
          <span
            className="text-[0.65rem] tracking-[0.18em] uppercase"
            style={{ color: 'var(--color-ochre-light)' }}
          >
            {LEADER_CATEGORY_LABELS[leader.category]}
          </span>
          <h3
            className="text-3xl font-600"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-cream)' }}
          >
            {leader.name}
          </h3>
          <p
            className="text-base italic"
            style={{ fontFamily: 'var(--font-display)', color: 'rgba(245,239,224,0.75)' }}
          >
            {leader.title}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="flex flex-col items-center gap-4 p-6 bg-white text-center"
      style={{ border: '1px solid var(--color-sand)' }}
    >
      {/* Circular photo */}
      <div className="relative" style={{ width: 96, height: 96 }}>
        <div
          className="absolute inset-0 rounded-full"
          style={{ border: '1.5px solid var(--color-ochre)', transform: 'translate(2px, 2px)' }}
        />
        <div
          className="relative overflow-hidden rounded-full"
          style={{ width: 96, height: 96, backgroundColor: 'var(--color-mist)' }}
        >
          {photoUrl ? (
            <Image
              src={photoUrl}
              alt={leader.photo?.alt ?? leader.name}
              fill
              className="object-cover"
              sizes="96px"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-forest)' }}
            >
              <span
                className="text-2xl font-600"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-cream)' }}
              >
                {leader.name.charAt(0)}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <h3
          className="text-lg font-600 leading-snug"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-forest)' }}
        >
          {leader.name}
        </h3>
        <p
          className="text-sm italic"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-bark)' }}
        >
          {leader.title}
        </p>
        <span
          className="text-[0.65rem] tracking-[0.12em] uppercase mt-1"
          style={{ color: 'var(--color-ochre-dark)' }}
        >
          {LEADER_CATEGORY_LABELS[leader.category]}
        </span>
      </div>
    </div>
  )
}
