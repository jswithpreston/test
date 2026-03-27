import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Programme, PayloadResponse } from '@/lib/types'
import { fetchAPI } from '@/lib/api'
import Badge from '@/components/ui/Badge'
import RichTextRenderer from '@/components/RichTextRenderer'

async function getProgramme(slug: string): Promise<Programme | null> {
  const data = await fetchAPI<PayloadResponse<Programme>>(
    `/api/programmes?where[slug][equals]=${encodeURIComponent(slug)}&limit=1&depth=2`,
    { next: { revalidate: 60 } },
  )
  return data?.docs[0] ?? null
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const p = await getProgramme(slug)
  if (!p) return { title: 'Programme Not Found' }
  return { title: p.title, description: p.summary ?? undefined }
}

export default async function ProgrammePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const programme = await getProgramme(slug)
  if (!programme) notFound()

  const heroUrl =
    programme.featuredImage?.sizes?.hero?.url ??
    programme.featuredImage?.url

  return (
    <div style={{ backgroundColor: 'var(--color-cream)', minHeight: '100dvh' }}>
      {/* Hero image */}
      {heroUrl && (
        <div
          className="relative w-full"
          style={{ height: 'clamp(260px, 40vw, 480px)', backgroundColor: 'var(--color-forest)' }}
        >
          <Image src={heroUrl} alt={programme.featuredImage?.alt ?? programme.title} fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 hero-overlay" />
        </div>
      )}

      {/* Header */}
      <div className="py-12 md:py-14" style={{ backgroundColor: 'var(--color-forest)' }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Link href="/programmes" className="text-xs tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity mb-5 inline-block"
            style={{ color: 'var(--color-ochre-light)', fontFamily: 'var(--font-body)' }}>
            ← Programmes
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <Badge programme={programme.category} />
            <span
              className="text-xs tracking-widest uppercase"
              style={{ color: programme.status === 'active' ? 'var(--color-ochre-light)' : 'rgba(245,239,224,0.5)' }}
            >
              {programme.status}
            </span>
          </div>

          <h1
            className="font-600 leading-tight mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-cream)',
              fontSize: 'clamp(1.75rem, 4vw, 3rem)',
            }}
          >
            {programme.title}
          </h1>

          {programme.summary && (
            <p className="text-lg leading-relaxed max-w-2xl"
              style={{ color: 'rgba(245,239,224,0.7)', fontFamily: 'var(--font-body)' }}>
              {programme.summary}
            </p>
          )}
        </div>
      </div>

      {/* Two-column layout */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            {programme.description ? (
              <RichTextRenderer content={programme.description} />
            ) : (
              <p style={{ color: 'var(--color-stone)' }}>Programme details coming soon.</p>
            )}
          </div>

          {/* Sidebar — highlights */}
          {programme.highlights && programme.highlights.length > 0 && (
            <aside>
              <div
                className="p-6 sticky top-24"
                style={{ border: '1px solid var(--color-sand)', backgroundColor: 'white' }}
              >
                <h3
                  className="text-lg font-600 mb-5"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-forest)' }}
                >
                  Key Highlights
                </h3>
                <ul className="flex flex-col gap-3">
                  {programme.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="text-xs mt-1 flex-shrink-0"
                        style={{ color: 'var(--color-ochre)' }}
                      >
                        ◆
                      </span>
                      <span className="text-sm leading-snug" style={{ color: 'var(--color-charcoal)' }}>
                        {h.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  )
}
