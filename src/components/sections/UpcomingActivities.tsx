import type { Activity, PayloadResponse } from '@/lib/types'
import { fetchAPI } from '@/lib/api'
import { MOCK_ACTIVITIES } from '@/lib/mockData'
import ActivityCard from '@/components/cards/ActivityCard'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'

async function getUpcomingActivities(): Promise<Activity[]> {
  const data = await fetchAPI<PayloadResponse<Activity>>(
    '/api/activities?where[status][equals]=upcoming&sort=startDate&limit=3',
    { next: { revalidate: 60 } },
  )
  const docs = data?.docs ?? []
  return docs.length > 0 ? docs : MOCK_ACTIVITIES.slice(0, 3)
}

export default async function UpcomingActivities() {
  const activities = await getUpcomingActivities()

  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: 'var(--color-mist)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <SectionHeader
            eyebrow="On the Calendar"
            title="Upcoming Activities"
            subtitle="Ceremonies, community events, and cultural gatherings across the Lango sub-region."
          />
          <Button href="/activities" variant="ghost" size="sm" className="self-start md:self-auto flex-shrink-0">
            All Activities →
          </Button>
        </div>

        {activities.length === 0 ? (
          <div
            className="text-center py-20"
            style={{ border: '1px solid var(--color-sand)', backgroundColor: 'white' }}
          >
            <p style={{ color: 'var(--color-stone)' }}>No upcoming activities at this time.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
