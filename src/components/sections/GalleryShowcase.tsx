'use client'

import { useState } from 'react'
import Image from 'next/image'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'

interface ShowcaseItem {
  id: string
  title: string
  category: 'Royal' | 'Ceremony' | 'State' | 'Sports'
  imageUrl: string
  caption: string
  aspect?: 'wide' | 'tall' | 'square'
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: '1',
    title: 'Coronation & Leopard Regalia',
    category: 'Royal',
    imageUrl: '/images/coronation-leopard-regalia.jpg',
    caption: 'Won Nyaci Eng. Dr. Michael Moses Odongo Okune & Queen in ancestral regalia',
    aspect: 'wide',
  },
  {
    id: '2',
    title: 'Won Nyaci Run 2026',
    category: 'Sports',
    imageUrl: '/images/won-nyaci-run-2026.jpg',
    caption: '1st Edition Community Run — 24th October 2026',
    aspect: 'tall',
  },
  {
    id: '3',
    title: 'Royal Throne & Rhino Emblem',
    category: 'Royal',
    imageUrl: '/images/won-nyaci-throne.jpg',
    caption: 'His Highness seated on the carved royal throne with sacred rhino emblem',
    aspect: 'square',
  },
  {
    id: '4',
    title: 'State Dialogue with President Museveni',
    category: 'State',
    imageUrl: '/images/won-nyaci-museveni.jpg',
    caption: 'President Yoweri Kaguta Museveni receiving Won Nyaci at State House',
    aspect: 'wide',
  },
  {
    id: '5',
    title: 'Royal Blue & Gold Regalia',
    category: 'Royal',
    imageUrl: '/images/won-nyaci-queen-royal-blue.jpg',
    caption: 'Won Nyaci and Queen greeting jubilant crowds during public festivities',
    aspect: 'square',
  },
  {
    id: '6',
    title: 'Sacred Flywhisk Blessing Ceremony',
    category: 'Ceremony',
    imageUrl: '/images/cultural-blessing-ceremony.jpg',
    caption: 'Won Nyaci conferring traditional blessings at cultural assembly',
    aspect: 'wide',
  },
  {
    id: '7',
    title: 'Council of Clan Leaders (Awitong)',
    category: 'State',
    imageUrl: '/images/cultural-leaders-gathering.jpg',
    caption: 'Clan chiefs and cultural ministers in consultation',
    aspect: 'wide',
  },
  {
    id: '8',
    title: 'Community Address on Unity',
    category: 'Ceremony',
    imageUrl: '/images/won-nyaci-community-address.jpg',
    caption: 'Won Nyaci addressing community members on peace and development',
    aspect: 'square',
  },
]

const CATEGORIES = ['All', 'Royal', 'Ceremony', 'State', 'Sports'] as const

export default function GalleryShowcase() {
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const filteredItems =
    activeCategory === 'All'
      ? SHOWCASE_ITEMS
      : SHOWCASE_ITEMS.filter((item) => item.category === activeCategory)

  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: 'var(--color-earth)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <SectionHeader
            eyebrow="Visual Heritage"
            title="Moments &amp; Royal History"
            subtitle="Photographic documentation of the Won Nyaci, ceremonial traditions, and landmark state events."
            light
          />
          <div className="flex items-center gap-3">
            <Button href="/gallery" variant="outline-light" size="sm">
              View All 4 Albums →
            </Button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-1.5 text-xs font-500 tracking-wider uppercase transition-all rounded-full"
                style={{
                  backgroundColor: isActive ? 'var(--color-ochre)' : 'rgba(245,239,224,0.08)',
                  color: isActive ? 'var(--color-forest-deep)' : 'rgba(245,239,224,0.7)',
                  border: isActive ? '1px solid var(--color-ochre)' : '1px solid rgba(245,239,224,0.15)',
                }}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col overflow-hidden rounded-sm card-lift"
              style={{
                backgroundColor: 'var(--color-forest)',
                border: '1px solid rgba(196,132,42,0.25)',
              }}
            >
              {/* Image Frame */}
              <div
                className="relative overflow-hidden w-full"
                style={{ height: 260 }}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <span
                    className="text-[0.62rem] tracking-wider uppercase px-2.5 py-0.5 rounded-full font-mono font-600"
                    style={{
                      backgroundColor: 'rgba(16,36,19,0.85)',
                      color: 'var(--color-ochre-light)',
                      border: '1px solid rgba(196,132,42,0.4)',
                    }}
                  >
                    {item.category}
                  </span>
                </div>

                {/* Dark overlay on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(to top, rgba(16,36,19,0.85) 0%, transparent 60%)',
                  }}
                />
              </div>

              {/* Caption Content */}
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <h3
                    className="text-base font-600 leading-snug mb-1"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--color-cream)' }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: 'rgba(245,239,224,0.65)', fontFamily: 'var(--font-body)' }}
                  >
                    {item.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Banner with emblem and Won Nyaci Run link */}
        <div
          className="mt-12 p-6 md:p-8 rounded-sm flex flex-col md:flex-row items-center justify-between gap-6"
          style={{
            backgroundColor: 'var(--color-forest)',
            border: '1px solid var(--color-ochre)',
          }}
        >
          <div className="flex items-center gap-5">
            <div
              className="relative w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden flex-shrink-0 shadow-md"
              style={{
                backgroundColor: 'var(--color-cream)',
                border: '2px solid var(--color-ochre)',
              }}
            >
              <Image
                src="/images/logo.jpeg"
                alt="LANGO CULTURAL INSTITUTION"
                fill
                className="object-contain p-1"
              />
            </div>
            <div>
              <span
                className="text-[0.65rem] tracking-[0.2em] uppercase font-mono"
                style={{ color: 'var(--color-ochre-light)' }}
              >
                Official 2026 Initiative
              </span>
              <h4
                className="text-lg md:text-xl font-600 text-cream"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Won Nyaci Run 2026 — 24th October 2026
              </h4>
              <p
                className="text-xs md:text-sm mt-0.5"
                style={{ color: 'rgba(245,239,224,0.7)' }}
              >
                “Let us run together for a more inclusive Lango.” Join thousands running for health and disability support.
              </p>
            </div>
          </div>
          <Button href="/activities/won-nyaci-run-2026" variant="primary" size="md" className="flex-shrink-0">
            View Run Details &amp; Kit →
          </Button>
        </div>
      </div>
    </section>
  )
}
