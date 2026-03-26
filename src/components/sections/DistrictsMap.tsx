import Button from '@/components/ui/Button'

const DISTRICTS = [
  { name: 'Alebtong', note: 'North' },
  { name: 'Amolatar', note: 'South' },
  { name: 'Apac',     note: 'Central' },
  { name: 'Dokolo',   note: 'Central' },
  { name: 'Kole',     note: 'Central' },
  { name: 'Kwania',   note: 'South' },
  { name: 'Lira',     note: 'HQ' },
  { name: 'Otuke',    note: 'North-East' },
  { name: 'Oyam',     note: 'South-West' },
]

export default function DistrictsMap() {
  return (
    <section
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-earth)' }}
    >
      {/* Subtle texture */}
      <div className="absolute inset-0 lango-pattern-light opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Text side */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="h-px w-10" style={{ backgroundColor: 'var(--color-ochre)' }} />
              <span
                className="text-[0.65rem] tracking-[0.2em] uppercase"
                style={{ color: 'var(--color-ochre-light)', fontFamily: 'var(--font-body)' }}
              >
                Geographic Reach
              </span>
            </div>

            <h2
              className="font-600 leading-tight"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--color-cream)',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              }}
            >
              Nine Districts.
              <br />
              <span style={{ color: 'var(--color-ochre-light)' }}>One Foundation.</span>
            </h2>

            <p
              className="text-base leading-relaxed max-w-md"
              style={{ color: 'rgba(245,239,224,0.65)', fontFamily: 'var(--font-body)' }}
            >
              The Lango Cultural Foundation serves all nine districts of the Lango sub-region
              in north-central Uganda, reaching approximately 2.7 million Langi people with
              cultural, educational, and development programmes.
            </p>

            <div className="flex flex-wrap gap-3 mt-2">
              <Button href="/about" variant="primary" size="sm">
                About LCF
              </Button>
              <Button href="/clans" variant="outline-light" size="sm">
                Explore 149 Clans
              </Button>
            </div>
          </div>

          {/* Districts grid */}
          <div className="grid grid-cols-3 gap-3">
            {DISTRICTS.map(({ name, note }) => (
              <div
                key={name}
                className="flex flex-col gap-1 p-4 transition-colors duration-200"
                style={{
                  backgroundColor: 'rgba(245,239,224,0.05)',
                  border: '1px solid rgba(196,132,42,0.18)',
                }}
              >
                <span
                  className="font-600 text-base"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-cream)' }}
                >
                  {name}
                </span>
                <span
                  className="text-[0.65rem] tracking-[0.1em] uppercase"
                  style={{ color: 'var(--color-ochre-light)', opacity: 0.7 }}
                >
                  {note}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
