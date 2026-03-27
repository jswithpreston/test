import type { Metadata } from 'next'
import Link from 'next/link'
import type { Clan, PayloadResponse } from '@/lib/types'
import { DISTRICT_LABELS } from '@/lib/types'
import { fetchAPI } from '@/lib/api'
import ClanCard from '@/components/cards/ClanCard'
import SectionHeader from '@/components/ui/SectionHeader'

export const metadata: Metadata = {
  title: 'Clan Directory',
  description:
    'The directory of 149 registered Lango clans — each with its Awitong (Supreme Clan Chief), symbol, and district.',
}

async function getClans(district: string, page: number): Promise<PayloadResponse<Clan>> {
  const params = new URLSearchParams({ sort: 'name', limit: '24', page: String(page) })
  if (district) params.set('where[district][equals]', district)

  const data = await fetchAPI<PayloadResponse<Clan>>(
    `/api/clans?${params}`,
    { next: { revalidate: 300 } },
  )
  return data ?? { docs: [], totalDocs: 0, limit: 24, page: 1, totalPages: 0, hasNextPage: false, hasPrevPage: false, pagingCounter: 1, prevPage: null, nextPage: null }
}

export default async function ClansPage({
  searchParams,
}: {
  searchParams: Promise<{ district?: string; page?: string }>
}) {
  const { district = '', page: pageParam } = await searchParams
  const page = Math.max(1, parseInt(pageParam ?? '1', 10))

  const data = await getClans(district, page)
  const { docs: clans, totalDocs, totalPages } = data

  const districtEntries = Object.entries(DISTRICT_LABELS).filter(([k]) => k !== 'multiple')

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
            eyebrow="The 149 Registered Clans"
            title="Clan Directory"
            subtitle={`${totalDocs} clans${district ? ` in ${DISTRICT_LABELS[district as keyof typeof DISTRICT_LABELS] ?? district}` : ''} — each with an Awitong (Supreme Clan Chief), symbol, origin, and district.`}
            light
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* District filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          <Link
            href="/clans"
            className="px-4 py-2 text-[0.75rem] tracking-[0.08em] uppercase transition-all"
            style={{
              fontFamily: 'var(--font-body)',
              backgroundColor: !district ? 'var(--color-forest)' : 'white',
              color: !district ? 'var(--color-cream)' : 'var(--color-stone)',
              border: `1px solid ${!district ? 'var(--color-forest)' : 'var(--color-sand)'}`,
            }}
          >
            All Districts
          </Link>
          {districtEntries.map(([value, label]) => {
            const isActive = district === value
            return (
              <a
                key={value}
                href={`/clans?district=${value}`}
                className="px-4 py-2 text-[0.75rem] tracking-[0.08em] uppercase transition-all"
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

        {/* Info bar */}
        <div
          className="flex items-center justify-between mb-6 pb-4"
          style={{ borderBottom: '1px solid var(--color-sand)' }}
        >
          <p className="text-sm" style={{ color: 'var(--color-stone)', fontFamily: 'var(--font-body)' }}>
            Showing {clans.length} of {totalDocs} clans
          </p>
          {totalPages > 1 && (
            <span className="text-xs" style={{ color: 'var(--color-stone)', fontFamily: 'var(--font-mono)' }}>
              Page {page} of {totalPages}
            </span>
          )}
        </div>

        {/* Grid */}
        {clans.length === 0 ? (
          <div className="text-center py-24" style={{ border: '1px solid var(--color-sand)' }}>
            <p style={{ color: 'var(--color-stone)' }}>No clans found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {clans.map((clan) => (
              <ClanCard key={clan.id} clan={clan} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            {page > 1 && (
              <a
                href={`/clans?page=${page - 1}${district ? `&district=${district}` : ''}`}
                className="px-4 py-2 text-sm border"
                style={{ borderColor: 'var(--color-sand)', color: 'var(--color-forest)', backgroundColor: 'white' }}
              >
                ← Previous
              </a>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => Math.abs(p - page) <= 2)
              .map((p) => (
                <a
                  key={p}
                  href={`/clans?page=${p}${district ? `&district=${district}` : ''}`}
                  className="w-10 h-10 flex items-center justify-center text-sm border"
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
                href={`/clans?page=${page + 1}${district ? `&district=${district}` : ''}`}
                className="px-4 py-2 text-sm border"
                style={{ borderColor: 'var(--color-sand)', color: 'var(--color-forest)', backgroundColor: 'white' }}
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
