import type { Metadata } from 'next'
import type { Leader, PayloadResponse } from '@/lib/types'
import { LEADER_CATEGORY_LABELS } from '@/lib/types'
import { fetchAPI } from '@/lib/api'
import LeadershipCard from '@/components/cards/LeadershipCard'
import SectionHeader from '@/components/ui/SectionHeader'

export const metadata: Metadata = {
  title: 'Leadership',
  description:
    'The Won Nyaci, ministers, and leadership of the Lango Cultural Foundation.',
}

async function getLeaders(): Promise<Leader[]> {
  const data = await fetchAPI<PayloadResponse<Leader>>(
    `/api/leadership?sort=order&limit=100`,
    { next: { revalidate: 300 } },
  )
  return data?.docs ?? []
}

const CATEGORY_ORDER: Leader['category'][] = [
  'paramount',
  'prime-minister',
  'minister',
  'council',
  'clan-leader',
]

export default async function LeadershipPage() {
  const leaders = await getLeaders()

  // Group by category
  const grouped = CATEGORY_ORDER.reduce<Record<string, Leader[]>>((acc, cat) => {
    const members = leaders.filter((l) => l.category === cat)
    if (members.length > 0) acc[cat] = members
    return acc
  }, {})

  const wonNyaci = leaders.find((l) => l.category === 'paramount')

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
            eyebrow="The Won Nyaci &amp; His Council"
            title="Our Leadership"
            subtitle="The governance structure of the Lango Cultural Foundation — from the Paramount Chief to the Council."
            light
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-16 flex flex-col gap-16">
        {/* Paramount Chief feature */}
        {wonNyaci && (
          <section>
            <div className="mb-6">
              <span
                className="text-[0.65rem] tracking-[0.18em] uppercase"
                style={{ color: 'var(--color-ochre-dark)', fontFamily: 'var(--font-body)' }}
              >
                {LEADER_CATEGORY_LABELS['paramount']}
              </span>
            </div>
            <LeadershipCard leader={wonNyaci} featured />
          </section>
        )}

        {/* Other categories */}
        {CATEGORY_ORDER.filter((c) => c !== 'paramount' && grouped[c]).map((category) => (
          <section key={category}>
            {/* Category heading */}
            <div className="flex items-center gap-4 mb-8">
              <h2
                className="text-2xl font-600"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-forest)' }}
              >
                {LEADER_CATEGORY_LABELS[category]}
              </h2>
              <div className="flex-1 h-px" style={{ backgroundColor: 'var(--color-sand)' }} />
              <span
                className="text-xs font-mono"
                style={{ color: 'var(--color-stone)', fontFamily: 'var(--font-mono)' }}
              >
                {grouped[category].length}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {grouped[category].map((leader) => (
                <LeadershipCard key={leader.id} leader={leader} />
              ))}
            </div>
          </section>
        ))}

        {leaders.length === 0 && (
          <p style={{ color: 'var(--color-stone)' }}>Leadership directory coming soon.</p>
        )}
      </div>
    </div>
  )
}
