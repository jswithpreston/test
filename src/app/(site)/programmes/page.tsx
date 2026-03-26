import type { Metadata } from 'next'
import Link from 'next/link'
import type { Programme, PayloadResponse } from '@/lib/types'
import { PROGRAMME_CATEGORY_LABELS } from '@/lib/types'
import { fetchAPI } from '@/lib/api'
import ProgrammeCard from '@/components/cards/ProgrammeCard'
import SectionHeader from '@/components/ui/SectionHeader'

export const metadata: Metadata = {
  title: 'Programmes',
  description:
    'The Lango Cultural Foundation\'s ongoing programmes in education, environment, health, peace, women\'s empowerment, and more.',
}

async function getProgrammes(category: string): Promise<PayloadResponse<Programme>> {
  const params = new URLSearchParams({ limit: '24', sort: 'title' })
  if (category) params.set('where[category][equals]', category)

  const data = await fetchAPI<PayloadResponse<Programme>>(
    `/api/programmes?${params}`,
    { next: { revalidate: 60 } },
  )
  return data ?? { docs: [], totalDocs: 0, limit: 24, page: 1, totalPages: 0, hasNextPage: false, hasPrevPage: false, pagingCounter: 1, prevPage: null, nextPage: null }
}

const CATEGORY_ICONS: Record<string, string> = {
  education: '📚', environment: '🌳', health: '🏥', peace: '🕊',
  women: '🌸', cultural: '🏛', youth: '⚡', investment: '📈',
}

export default async function ProgrammesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category = '' } = await searchParams
  const data = await getProgrammes(category)
  const { docs: programmes, totalDocs } = data

  const categoryEntries = Object.entries(PROGRAMME_CATEGORY_LABELS)

  return (
    <div style={{ backgroundColor: 'var(--color-cream)', minHeight: '100dvh' }}>
      {/* Header */}
      <div
        className="py-16 md:py-20 relative overflow-hidden"
        style={{ backgroundColor: 'var(--color-forest)' }}
      >
        <div className="absolute inset-0 lango-pattern-light" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader
            eyebrow="What We Do"
            title="Our Programmes"
            subtitle={`${totalDocs} programmes across eight areas of community development.`}
            light
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          <Link
            href="/programmes"
            className="flex items-center gap-2 px-4 py-2 text-[0.75rem] tracking-[0.08em] uppercase transition-all"
            style={{
              fontFamily: 'var(--font-body)',
              backgroundColor: !category ? 'var(--color-forest)' : 'white',
              color: !category ? 'var(--color-cream)' : 'var(--color-stone)',
              border: `1px solid ${!category ? 'var(--color-forest)' : 'var(--color-sand)'}`,
            }}
          >
            All
          </Link>
          {categoryEntries.map(([value, label]) => {
            const isActive = category === value
            return (
              <a
                key={value}
                href={`/programmes?category=${value}`}
                className="flex items-center gap-2 px-4 py-2 text-[0.75rem] tracking-[0.08em] uppercase transition-all"
                style={{
                  fontFamily: 'var(--font-body)',
                  backgroundColor: isActive ? 'var(--color-forest)' : 'white',
                  color: isActive ? 'var(--color-cream)' : 'var(--color-stone)',
                  border: `1px solid ${isActive ? 'var(--color-forest)' : 'var(--color-sand)'}`,
                }}
              >
                <span>{CATEGORY_ICONS[value]}</span>
                {label}
              </a>
            )
          })}
        </div>

        {/* Grid */}
        {programmes.length === 0 ? (
          <div className="text-center py-24" style={{ border: '1px solid var(--color-sand)' }}>
            <p style={{ color: 'var(--color-stone)' }}>No programmes found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programmes.map((p) => (
              <ProgrammeCard key={p.id} programme={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
