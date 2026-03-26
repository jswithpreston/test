import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Activity, PayloadResponse } from '@/lib/types'
import { DISTRICT_LABELS } from '@/lib/types'
import { fetchAPI } from '@/lib/api'
import Badge from '@/components/ui/Badge'
import RichTextRenderer from '@/components/RichTextRenderer'

function formatDate(dateString?: string) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-UG', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

async function getActivity(slug: string): Promise<Activity | null> {
  const data = await fetchAPI<PayloadResponse<Activity>>(
    `/api/activities?where[slug][equals]=${encodeURIComponent(slug)}&limit=1&depth=2`,
    { next: { revalidate: 60 } },
  )
  return data?.docs[0] ?? null
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const activity = await getActivity(slug)
  if (!activity) return { title: 'Activity Not Found' }
  return { title: activity.title }
}

export default async function ActivityPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const activity = await getActivity(slug)
  if (!activity) notFound()

  const heroUrl =
    activity.featuredImage?.sizes?.hero?.url ??
    activity.featuredImage?.url

  const districtLabel = activity.district
    ? DISTRICT_LABELS[activity.district] ?? activity.district
    : null

  return (
    <div style={{ backgroundColor: 'var(--color-cream)', minHeight: '100dvh' }}>
      {/* Hero */}
      {heroUrl && (
        <div
          className="relative w-full"
          style={{ height: 'clamp(280px, 45vw, 500px)', backgroundColor: 'var(--color-forest)' }}
        >
          <Image src={heroUrl} alt={activity.featuredImage?.alt ?? activity.title} fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 hero-overlay" />
        </div>
      )}

      {/* Header block */}
      <div
        className="py-12 md:py-14"
        style={{ backgroundColor: 'var(--color-forest)' }}
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Link href="/activities" className="text-xs tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity mb-5 inline-block"
            style={{ color: 'var(--color-ochre-light)', fontFamily: 'var(--font-body)' }}>
            ← Activities
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge status={activity.status} />
            {districtLabel && (
              <Badge label={districtLabel} className="bg-ochre/10 text-ochre-light border-ochre/25" />
            )}
          </div>

          <h1
            className="font-600 leading-tight mb-5"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-cream)',
              fontSize: 'clamp(1.75rem, 4vw, 3rem)',
            }}
          >
            {activity.title}
          </h1>

          {/* Date & location meta */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span style={{ color: 'var(--color-ochre)', fontSize: '0.7rem' }}>▸</span>
              <span className="text-sm" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-ochre-light)' }}>
                {formatDate(activity.startDate)}
                {activity.endDate && activity.endDate !== activity.startDate && (
                  <> &ndash; {formatDate(activity.endDate)}</>
                )}
              </span>
            </div>
            {activity.location && (
              <div className="flex items-center gap-2">
                <span style={{ color: 'var(--color-ochre)', fontSize: '0.7rem' }}>◈</span>
                <span className="text-sm" style={{ color: 'rgba(245,239,224,0.7)' }}>{activity.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12 md:py-16">
        {activity.description ? (
          <RichTextRenderer content={activity.description} />
        ) : (
          <p style={{ color: 'var(--color-stone)' }}>Details coming soon.</p>
        )}
      </div>

      {/* Gallery */}
      {activity.gallery && activity.gallery.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-16">
          <h2
            className="text-2xl font-600 mb-6"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-forest)' }}
          >
            Photos
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {activity.gallery.map((item, i) => (
              <div key={i} className="relative aspect-square overflow-hidden" style={{ backgroundColor: 'var(--color-mist)' }}>
                <Image
                  src={item.image.url}
                  alt={item.image.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
