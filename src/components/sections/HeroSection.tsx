import Image from 'next/image'
import Link from 'next/link'
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
          background: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(196,132,42,0.12) 0%, transparent 70%)',
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
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 py-20 md:py-24 text-center flex flex-col items-center gap-7">

        {/* Official Emblem & Motto Badge */}
        <div className="animate-fade-up flex flex-col items-center gap-3">
          <div
            className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden shadow-2xl p-1"
            style={{
              backgroundColor: 'var(--color-cream)',
              border: '2px solid var(--color-ochre)',
              boxShadow: '0 0 25px rgba(196,132,42,0.3)',
            }}
          >
            <Image
              src="/images/logo.jpeg"
              alt="LANGO CULTURAL INSTITUTION Official Emblem"
              fill
              className="object-contain p-1"
              priority
            />
          </div>
          <div className="flex items-center gap-3 mt-1">
            <div className="h-px w-8 md:w-14" style={{ backgroundColor: 'var(--color-ochre)' }} />
            <span
              className="text-[0.68rem] md:text-[0.72rem] tracking-[0.22em] uppercase font-500"
              style={{ color: 'var(--color-ochre-light)', fontFamily: 'var(--font-body)' }}
            >
              LANGO CULTURAL INSTITUTION · TEKWARO LANGO
            </span>
            <div className="h-px w-8 md:w-14" style={{ backgroundColor: 'var(--color-ochre)' }} />
          </div>
          <span
            className="text-[0.62rem] tracking-[0.16em] uppercase px-3 py-0.5 rounded-full"
            style={{
              color: 'var(--color-cream)',
              backgroundColor: 'rgba(196,132,42,0.25)',
              border: '1px solid rgba(196,132,42,0.4)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            Motto: Note En Tekowa (Unity is Strength)
          </span>
        </div>

        {/* Main heading */}
        <h1
          className="animate-fade-up-1 font-600 leading-[1.08] tracking-wide"
          style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--color-cream)',
            fontSize: 'clamp(2.75rem, 7.5vw, 6rem)',
          }}
        >
          Preserving the
          <br />
          <em
            className="not-italic"
            style={{ color: 'var(--color-ochre-light)' }}
          >
            Heritage &amp; Unity
          </em>{' '}
          of the
          <br />
          Lango People
        </h1>

        {/* Paramount Chief Badge Banner */}
        <Link
          href="/leadership"
          className="animate-fade-up-2 inline-flex items-center gap-3.5 px-4 py-2 rounded-full transition-transform hover:scale-105"
          style={{
            backgroundColor: 'rgba(24,54,29,0.7)',
            border: '1px solid rgba(196,132,42,0.35)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <div
            className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0"
            style={{ border: '1.5px solid var(--color-ochre)' }}
          >
            <Image
              src="/images/won-nyaci-portrait.jpg"
              alt="Won Nyaci Eng. Dr. Michael Moses Odongo Okune"
              fill
              className="object-cover"
            />
          </div>
          <div className="text-left leading-tight">
            <span
              className="block text-[0.58rem] tracking-[0.14em] uppercase"
              style={{ color: 'var(--color-ochre-light)' }}
            >
              Paramount Chief (Won Nyaci)
            </span>
            <span
              className="block text-xs md:text-sm font-500"
              style={{ color: 'var(--color-cream)' }}
            >
              H.H. Eng. Dr. Michael Moses Odongo Okune
            </span>
          </div>
          <span className="text-xs" style={{ color: 'var(--color-ochre-light)' }}>
            →
          </span>
        </Link>

        {/* Subtitle */}
        <p
          className="animate-fade-up-3 text-base md:text-lg leading-relaxed max-w-2xl"
          style={{ color: 'rgba(245,239,224,0.78)', fontFamily: 'var(--font-body)' }}
        >
          Official institutional authority serving ~2.7 million Lango people across nine districts of
          north-central Uganda. Fostering clan brotherhood, empowering youth, and documenting
          the culture of the 149 registered clans.
        </p>

        {/* CTAs */}
        <div className="animate-fade-up-4 flex flex-wrap items-center justify-center gap-3.5">
          <Button href="/about" variant="primary" size="lg">
            Explore Heritage &amp; About
          </Button>
          <Button href="/activities/won-nyaci-run-2026" variant="outline-light" size="lg">
            Won Nyaci Run 2026
          </Button>
          <Button href="/gallery" variant="ghost" size="lg" className="border border-[rgba(245,239,224,0.2)]">
            Photo Gallery
          </Button>
        </div>

        {/* Stats strip */}
        <div
          className="animate-fade-up-5 grid grid-cols-3 gap-6 md:gap-8 mt-2 pt-6 w-full max-w-lg"
          style={{ borderTop: '1px solid rgba(245,239,224,0.12)' }}
        >
          {[
            { value: '2.7M', label: 'Lango People' },
            { value: '149',  label: 'Registered Clans' },
            { value: '9',    label: 'Districts Served' },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span
                className="text-2xl md:text-3xl font-600"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ochre-light)' }}
              >
                {value}
              </span>
              <span
                className="text-[0.62rem] md:text-[0.65rem] tracking-[0.14em] uppercase text-center"
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
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-fade-up-5"
      >
        <span
          className="text-[0.58rem] tracking-[0.18em] uppercase"
          style={{ color: 'rgba(245,239,224,0.35)', fontFamily: 'var(--font-body)' }}
        >
          Scroll
        </span>
        <div
          className="w-px h-6"
          style={{ backgroundColor: 'rgba(196,132,42,0.4)' }}
        />
      </div>
    </section>
  )
}
