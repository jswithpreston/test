import type { Leader, PayloadResponse } from '@/lib/types'
import { fetchAPI } from '@/lib/api'
import LeadershipCard from '@/components/cards/LeadershipCard'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'

async function getLeadership(): Promise<Leader[]> {
  const data = await fetchAPI<PayloadResponse<Leader>>(
    '/api/leadership?sort=order&limit=6',
    { next: { revalidate: 300 } },
  )
  return data?.docs ?? []
}

export default async function LeadershipHighlight() {
  const leaders = await getLeadership()

  const wonNyaci = leaders.find((l) => l.category === 'paramount')
  const others = leaders.filter((l) => l.category !== 'paramount').slice(0, 4)

  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: 'var(--color-cream)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <SectionHeader
            eyebrow="Leadership"
            title="Our Leadership"
            subtitle="The Won Nyaci and the leadership of the Lango Cultural Foundation guiding the Langi people."
          />
          <Button href="/leadership" variant="ghost" size="sm" className="self-start md:self-auto flex-shrink-0">
            Full Leadership →
          </Button>
        </div>

        {leaders.length === 0 ? (
          <p style={{ color: 'var(--color-stone)' }}>Leadership information coming soon.</p>
        ) : (
          <div className="flex flex-col gap-8">
            {wonNyaci && (
              <div className="w-full">
                <LeadershipCard leader={wonNyaci} featured />
              </div>
            )}
            {others.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                {others.map((leader) => (
                  <LeadershipCard key={leader.id} leader={leader} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
