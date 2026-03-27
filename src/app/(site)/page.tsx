import { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import HeroSection from '@/components/sections/HeroSection'
import LatestNews from '@/components/sections/LatestNews'
import UpcomingActivities from '@/components/sections/UpcomingActivities'
import ProgrammesHighlight from '@/components/sections/ProgrammesHighlight'
import LeadershipHighlight from '@/components/sections/LeadershipHighlight'
import DistrictsMap from '@/components/sections/DistrictsMap'

export const metadata: Metadata = {
  title: 'Lango Cultural Foundation — Official Website',
  description:
    'The official website of the Lango Cultural Foundation — preserving, documenting, and promoting the heritage of the Lango people of Uganda.',
}

/** Thin placeholder shown while an async section is loading */
function SectionFallback({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className="py-20 md:py-28"
      style={{ backgroundColor: dark ? 'var(--color-forest)' : 'var(--color-cream)' }}
    />
  )
}

export default function HomePage() {
  return (
    <>
      {/* Static — no data fetch */}
      <HeroSection />

      {/* Async sections — each wrapped in Suspense so they render independently */}
      <Suspense fallback={<SectionFallback />}>
        <LatestNews />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <UpcomingActivities />
      </Suspense>

      {/* Static — no data fetch */}
      <ProgrammesHighlight />

      <Suspense fallback={<SectionFallback dark />}>
        <LeadershipHighlight />
      </Suspense>

      {/* Static — no data fetch */}
      <DistrictsMap />

      {/* Clans CTA */}
      <section className="py-20 md:py-28" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center gap-7">
          <div className="flex items-center gap-2">
            <div className="h-px w-12" style={{ backgroundColor: 'var(--color-sand)' }} />
            <div className="w-2 h-2 rotate-45" style={{ backgroundColor: 'var(--color-ochre)' }} />
            <div className="h-px w-12" style={{ backgroundColor: 'var(--color-sand)' }} />
          </div>

          <h2
            className="font-600 leading-tight"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-forest)',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            }}
          >
            Explore the 149 Registered
            <br />
            <span style={{ color: 'var(--color-ochre-dark)' }}>Lango Clans</span>
          </h2>

          <p
            className="text-lg leading-relaxed max-w-2xl"
            style={{ color: 'var(--color-stone)', fontFamily: 'var(--font-body)' }}
          >
            Each of the 149 registered Lango clans has its own Awitong (Supreme Clan Chief),
            unique symbol (totem), origin story, and district. Browse the full clan directory.
          </p>

          <Link
            href="/clans"
            className="clans-cta-btn inline-flex items-center gap-3 px-8 py-4 text-sm font-500 tracking-[0.08em] uppercase"
            style={{ color: 'var(--color-cream)', fontFamily: 'var(--font-body)' }}
          >
            Browse Clan Directory
            <span style={{ color: 'var(--color-ochre-light)' }}>→</span>
          </Link>
        </div>
      </section>
    </>
  )
}
