import Image from 'next/image'
import Link from 'next/link'
import type { Activity } from '@/lib/types'
import Badge from '@/components/ui/Badge'
import { DISTRICT_LABELS } from '@/lib/types'

function formatDate(dateString?: string) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-UG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

interface ActivityCardProps {
  activity: Activity
}

export default function ActivityCard({ activity }: ActivityCardProps) {
  const imageUrl =
    activity.featuredImage?.sizes?.card?.url ??
    activity.featuredImage?.url

  const districtLabel = activity.district
    ? DISTRICT_LABELS[activity.district] ?? activity.district
    : null

  return (
    <Link
      href={`/activities/${activity.slug}`}
      className="group flex flex-col bg-white card-lift overflow-hidden"
      style={{ border: '1px solid var(--color-sand)' }}
    >
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden" style={{ backgroundColor: 'var(--color-mist)' }}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={activity.featuredImage?.alt ?? activity.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div
            className="w-full h-full lango-pattern-subtle flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-mist)' }}
          >
            <span className="text-3xl opacity-20" style={{ color: 'var(--color-ochre)' }}>◆</span>
          </div>
        )}

        {/* Status overlay badge */}
        <div className="absolute top-3 left-3">
          <Badge status={activity.status} />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3
          className="text-xl font-600 leading-snug group-hover:text-ochre transition-colors"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-forest)' }}
        >
          {activity.title}
        </h3>

        {/* Date row */}
        <div className="flex items-center gap-1.5">
          <span style={{ color: 'var(--color-ochre)', fontSize: '0.7rem' }}>▸</span>
          <span
            className="text-[0.8125rem]"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-charcoal)' }}
          >
            {formatDate(activity.startDate)}
            {activity.endDate && activity.endDate !== activity.startDate && (
              <> &ndash; {formatDate(activity.endDate)}</>
            )}
          </span>
        </div>

        {/* Location + District */}
        {(activity.location || districtLabel) && (
          <div className="flex items-start gap-1.5">
            <span style={{ color: 'var(--color-ochre)', fontSize: '0.7rem', marginTop: '2px' }}>◈</span>
            <span
              className="text-sm"
              style={{ color: 'var(--color-stone)' }}
            >
              {[activity.location, districtLabel].filter(Boolean).join(' · ')}
            </span>
          </div>
        )}
      </div>
    </Link>
  )
}
