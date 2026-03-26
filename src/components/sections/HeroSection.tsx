import Button from '@/components/ui/Button'

export default function HeroSection() {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        minHeight: '100dvh',
        backgroundColor: 'var(--color-forest-deep)',
      }}
    >
      {/* Lango diamond pattern background */}
      <div className="absolute inset-0 lango-pattern-light" />

      {/* Radial gradient — warm centre glow */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(196,132,42,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, var(--color-forest-deep))',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 py-24 text-center flex flex-col items-center gap-8">

        {/* Eyebrow */}
        <div className="animate-fade-up flex items-center gap-3">
          <div className="h-px w-12" style={{ backgroundColor: 'var(--color-ochre)' }} />
          <span
            className="text-[0.7rem] tracking-[0.22em] uppercase"
            style={{ color: 'var(--color-ochre-light)', fontFamily: 'var(--font-body)' }}
          >
            Official Website of the Lango Cultural Foundation
          </span>
          <div className="h-px w-12" style={{ backgroundColor: 'var(--color-ochre)' }} />
        </div>

        {/* Main heading */}
        <h1
          className="animate-fade-up-1 font-600 leading-[1.08] tracking-wide"
          style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--color-cream)',
            fontSize: 'clamp(3rem, 8vw, 6.5rem)',
          }}
        >
          Preserving the
          <br />
          <em
            className="not-italic"
            style={{ color: 'var(--color-ochre-light)' }}
          >
            Heritage
          </em>{' '}
          of the
          <br />
          Langi People
        </h1>

        {/* Ornament */}
        <div className="animate-fade-up-2 flex items-center gap-2">
          <div className="h-px w-16" style={{ backgroundColor: 'rgba(196,132,42,0.4)' }} />
          <div className="w-2 h-2 rotate-45" style={{ backgroundColor: 'var(--color-ochre)' }} />
          <div className="h-px w-16" style={{ backgroundColor: 'rgba(196,132,42,0.4)' }} />
        </div>

        {/* Subtitle */}
        <p
          className="animate-fade-up-3 text-lg md:text-xl leading-relaxed max-w-2xl"
          style={{ color: 'rgba(245,239,224,0.72)', fontFamily: 'var(--font-body)' }}
        >
          Serving ~2.7 million Langi people across nine districts of north-central Uganda.
          Documenting culture, empowering communities, and honouring the 149 clans.
        </p>

        {/* CTAs */}
        <div className="animate-fade-up-4 flex flex-wrap items-center justify-center gap-4">
          <Button href="/about" variant="primary" size="lg">
            Explore Our Heritage
          </Button>
          <Button href="/news" variant="outline-light" size="lg">
            Latest News
          </Button>
        </div>

        {/* Stats strip */}
        <div
          className="animate-fade-up-5 grid grid-cols-3 gap-8 mt-4 pt-8 w-full max-w-lg"
          style={{ borderTop: '1px solid rgba(245,239,224,0.1)' }}
        >
          {[
            { value: '2.7M', label: 'Langi People' },
            { value: '149',  label: 'Registered Clans' },
            { value: '9',    label: 'Districts Served' },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span
                className="text-3xl md:text-4xl font-600"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ochre-light)' }}
              >
                {value}
              </span>
              <span
                className="text-[0.65rem] tracking-[0.14em] uppercase text-center"
                style={{ color: 'rgba(245,239,224,0.5)', fontFamily: 'var(--font-body)' }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-up-5"
      >
        <span
          className="text-[0.6rem] tracking-[0.18em] uppercase"
          style={{ color: 'rgba(245,239,224,0.35)', fontFamily: 'var(--font-body)' }}
        >
          Scroll
        </span>
        <div
          className="w-px h-8"
          style={{ backgroundColor: 'rgba(196,132,42,0.4)' }}
        />
      </div>
    </section>
  )
}
