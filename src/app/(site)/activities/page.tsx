import type { Metadata } from 'next'
import type { Activity, PayloadResponse } from '@/lib/types'
import { DISTRICT_LABELS } from '@/lib/types'
import { fetchAPI } from '@/lib/api'
import { MOCK_ACTIVITIES } from '@/lib/mockData'
import ActivityCard from '@/components/cards/ActivityCard'
import SectionHeader from '@/components/ui/SectionHeader'

export const metadata: Metadata = {
  title: 'Activities',
  description:
    'Upcoming and past events, ceremonies, and community activities of the LANGO CULTURAL INSTITUTION.',
}

const STATUS_TABS = [
  { value: '',           label: 'All' },
  { value: 'upcoming',   label: 'Upcoming' },
  { value: 'ongoing',    label: 'Ongoing' },
  { value: 'completed',  label: 'Completed' },
]

async function getActivities(status: string, district: string): Promise<PayloadResponse<Activity>> {
  const params = new URLSearchParams({ sort: '-startDate', limit: '12' })
  if (status)   params.set('where[status][equals]', status)
  if (district) params.set('where[district][equals]', district)

  const data = await fetchAPI<PayloadResponse<Activity>>(
    `/api/activities?${params}`,
    { next: { revalidate: 60 } },
  )

  if (data && data.docs && data.docs.length > 0) {
    return data
  }

  let filtered = MOCK_ACTIVITIES
  if (status) {
    filtered = filtered.filter((a) => a.status === status)
  }
  if (district) {
    filtered = filtered.filter((a) => a.district === district)
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

export default async function ActivitiesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; district?: string }>
}) {
  const { status = '', district = '' } = await searchParams
  const data = await getActivities(status, district)
  const { docs: activities, totalDocs } = data

  const districtEntries = Object.entries(DISTRICT_LABELS)

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
            eyebrow="Events & Ceremonies"
            title="Activities"
            subtitle={`${totalDocs} activities across the Lango sub-region.`}
            light
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="flex flex-col gap-4 mb-10">
          {/* Status tabs */}
          <div className="flex flex-wrap gap-2">
            {STATUS_TABS.map(({ value, label }) => {
              const isActive = status === value
              const href = value
                ? `/activities?status=${value}${district ? `&district=${district}` : ''}`
                : `/activities${district ? `?district=${district}` : ''}`
              return (
                <a
                  key={value}
                  href={href}
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

          {/* District filter */}
          <div className="flex flex-wrap gap-1.5">
            <a
              href={`/activities${status ? `?status=${status}` : ''}`}
              className="px-3 py-1.5 text-[0.7rem] tracking-wide uppercase transition-all"
              style={{
                fontFamily: 'var(--font-body)',
                backgroundColor: !district ? 'var(--color-ochre)' : 'transparent',
                color: !district ? 'var(--color-cream)' : 'var(--color-stone)',
                border: `1px solid ${!district ? 'var(--color-ochre)' : 'var(--color-sand)'}`,
              }}
            >
              All Districts
            </a>
            {districtEntries.map(([value, label]) => {
              const isActive = district === value
              return (
                <a
                  key={value}
                  href={`/activities?district=${value}${status ? `&status=${status}` : ''}`}
                  className="px-3 py-1.5 text-[0.7rem] tracking-wide uppercase transition-all"
                  style={{
                    fontFamily: 'var(--font-body)',
                    backgroundColor: isActive ? 'var(--color-ochre)' : 'transparent',
                    color: isActive ? 'var(--color-cream)' : 'var(--color-stone)',
                    border: `1px solid ${isActive ? 'var(--color-ochre)' : 'var(--color-sand)'}`,
                  }}
                >
                  {label}
                </a>
              )
            })}
          </div>
        </div>

        {/* Grid */}
        {activities.length === 0 ? (
          <div
            className="text-center py-24"
            style={{ border: '1px solid var(--color-sand)' }}
          >
            <p style={{ color: 'var(--color-stone)' }}>No activities found for this filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
