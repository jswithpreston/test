import Link from 'next/link'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'

const PROGRAMME_CATEGORIES = [
  {
    slug: 'education',
    label: 'Education',
    icon: '📚',
    description: 'Scholarships & academic support for Langi youth',
  },
  {
    slug: 'environment',
    label: 'Greening Lango',
    icon: '🌳',
    description: 'Planting 1 million trees across the sub-region',
  },
  {
    slug: 'health',
    label: 'Health',
    icon: '🏥',
    description: 'Sexual & reproductive health, community wellness',
  },
  {
    slug: 'peace',
    label: 'Peace',
    icon: '🕊',
    description: 'Reconciliation and conflict resolution programmes',
  },
  {
    slug: 'women',
    label: 'Women',
    icon: '🌸',
    description: 'Agong Foundation — women\'s empowerment & rights',
  },
  {
    slug: 'cultural',
    label: 'Cultural',
    icon: '🏛',
    description: 'Preserving language, arts, and Langi traditions',
  },
  {
    slug: 'youth',
    label: 'Youth',
    icon: '⚡',
    description: 'Leadership development for the next generation',
  },
  {
    slug: 'investment',
    label: 'Investment',
    icon: '📈',
    description: 'Economic development and community enterprise',
  },
]

export default function ProgrammesHighlight() {
  return (
    <section
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-forest)' }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 lango-pattern-light opacity-70" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <SectionHeader
            eyebrow="What We Do"
            title="Our Programmes"
            subtitle="Eight core programme areas driving the cultural, social, and economic development of the Lango sub-region."
            light
          />
          <Button href="/programmes" variant="outline-light" size="sm" className="self-start md:self-auto flex-shrink-0">
            All Programmes →
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {PROGRAMME_CATEGORIES.map(({ slug, label, icon, description }) => (
            <Link
              key={slug}
              href={`/programmes?category=${slug}`}
              className="group flex flex-col gap-3 p-5 programme-cat-card"
            >
              <span className="text-2xl">{icon}</span>
              <div className="flex flex-col gap-1">
                <h3
                  className="font-600 text-base"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-cream)' }}
                >
                  {label}
                </h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: 'rgba(245,239,224,0.55)' }}
                >
                  {description}
                </p>
              </div>
              <span
                className="text-[0.7rem] tracking-widest uppercase mt-auto transition-colors"
                style={{ color: 'var(--color-ochre-light)' }}
              >
                Explore →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
