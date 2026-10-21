import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { SitePage, PayloadResponse } from '@/lib/types'
import { fetchAPI } from '@/lib/api'
import { MOCK_PAGES } from '@/lib/mockData'
import RichTextRenderer from '@/components/RichTextRenderer'

async function getPage(slug: string): Promise<SitePage | null> {
  const data = await fetchAPI<PayloadResponse<SitePage>>(
    `/api/pages?where[slug][equals]=${encodeURIComponent(slug)}&where[status][equals]=published&limit=1&depth=2`,
    { next: { revalidate: 300 } },
  )
  if (data?.docs && data.docs.length > 0) return data.docs[0]
  return MOCK_PAGES[slug] ?? null
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const page = await getPage(slug)
  if (!page) return { title: 'Page Not Found' }
  return {
    title: page.title,
    description: page.metaDescription ?? undefined,
    openGraph: page.heroImage ? { images: [{ url: page.heroImage.url }] } : undefined,
  }
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const page = await getPage(slug)
  if (!page) notFound()

  const heroUrl =
    page.heroImage?.sizes?.hero?.url ??
    page.heroImage?.url

  return (
    <div style={{ backgroundColor: 'var(--color-cream)', minHeight: '100dvh' }}>
      {/* Hero image */}
      {heroUrl && (
        <div
          className="relative w-full"
          style={{ height: 'clamp(260px, 40vw, 480px)', backgroundColor: 'var(--color-forest)' }}
        >
          <Image
            src={heroUrl}
            alt={page.heroImage?.alt ?? page.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>
      )}

      {/* Page header */}
      <div
        className="py-12 md:py-16"
        style={{ backgroundColor: 'var(--color-forest)' }}
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h1
            className="font-600 leading-tight"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-cream)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            }}
          >
            {page.title}
          </h1>
          {page.metaDescription && (
            <p
              className="mt-4 text-lg leading-relaxed max-w-2xl"
              style={{ color: 'rgba(245,239,224,0.7)', fontFamily: 'var(--font-body)' }}
            >
              {page.metaDescription}
            </p>
          )}
        </div>
      </div>

      {/* Page content */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-14 md:py-20">
        {slug === 'about' && (
          <div
            className="mb-10 p-6 rounded-md flex flex-col sm:flex-row items-center gap-6"
            style={{
              backgroundColor: 'white',
              border: '1.5px solid var(--color-ochre)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            }}
          >
            <div
              className="relative w-28 h-28 rounded-full overflow-hidden flex-shrink-0 shadow-md"
              style={{
                backgroundColor: 'var(--color-cream)',
                border: '2px solid var(--color-ochre)',
              }}
            >
              <Image
                src="/images/logo.jpeg"
                alt="LANGO CULTURAL INSTITUTION Emblem"
                fill
                className="object-contain p-1.5"
              />
            </div>
            <div>
              <span
                className="text-xs uppercase tracking-widest font-mono"
                style={{ color: 'var(--color-ochre-dark)' }}
              >
                Official Institutional Seal
              </span>
              <h3
                className="text-xl font-600 mt-0.5"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-forest)' }}
              >
                LANGO CULTURAL INSTITUTION (TEKWARO LANGO)
              </h3>
              <p className="text-sm mt-1" style={{ color: 'var(--color-stone)' }}>
                Motto: <strong style={{ color: 'var(--color-forest)' }}>“NOTE EN TEKOWA” (Unity is Strength)</strong>. The emblem represents the unyielding tenacity of the Lango people (Rhino), rising over ancestral hills under the dawn of new prosperity, united under the national tri-colors of Black, Red, and Yellow.
              </p>
            </div>
          </div>
        )}

        {page.content ? (
          <RichTextRenderer content={page.content} />
        ) : (
          <p style={{ color: 'var(--color-stone)' }}>Page content coming soon.</p>
        )}
      </div>
    </div>
  )
}
