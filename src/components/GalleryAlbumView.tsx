'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

function Lightbox({
  images,
  startIndex,
  onClose,
}: {
  images: { url: string; alt: string; caption?: string }[]
  startIndex: number
  onClose: () => void
}) {
  const [current, setCurrent] = useState(startIndex)

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length)
  const next = () => setCurrent((c) => (c + 1) % images.length)

  const img = images[current]

  // Close on backdrop click
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(16,36,19,0.97)' }}
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full mx-4 flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-xs tracking-[0.18em] uppercase"
          style={{ color: 'rgba(245,239,224,0.55)', fontFamily: 'var(--font-body)' }}
        >
          Close ✕
        </button>

        {/* Image */}
        <div
          className="relative w-full"
          style={{ maxHeight: '72vh', aspectRatio: '16/9' }}
        >
          <Image
            src={img.url}
            alt={img.alt}
            fill
            className="object-contain"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between w-full px-2">
          <button
            onClick={prev}
            className="text-xs tracking-[0.12em] uppercase px-4 py-2.5 border transition-colors"
            style={{
              color: 'var(--color-cream)',
              borderColor: 'rgba(245,239,224,0.2)',
              fontFamily: 'var(--font-body)',
            }}
          >
            ← Prev
          </button>

          <div className="flex flex-col items-center gap-1">
            {img.caption && (
              <p
                className="text-sm text-center max-w-sm"
                style={{ color: 'rgba(245,239,224,0.65)', fontFamily: 'var(--font-body)' }}
              >
                {img.caption}
              </p>
            )}
            <span
              className="text-xs"
              style={{ color: 'rgba(245,239,224,0.3)', fontFamily: 'var(--font-mono)' }}
            >
              {current + 1} / {images.length}
            </span>
          </div>

          <button
            onClick={next}
            className="text-xs tracking-[0.12em] uppercase px-4 py-2.5 border transition-colors"
            style={{
              color: 'var(--color-cream)',
              borderColor: 'rgba(245,239,224,0.2)',
              fontFamily: 'var(--font-body)',
            }}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}

export interface AlbumImage {
  url: string
  alt: string
  caption?: string
}

interface GalleryAlbumViewProps {
  title: string
  albumLabel?: string
  date?: string
  description?: string
  images: AlbumImage[]
}

export default function GalleryAlbumView({
  title,
  albumLabel,
  date,
  description,
  images,
}: GalleryAlbumViewProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <div style={{ backgroundColor: 'var(--color-earth)', minHeight: '100dvh' }}>
      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}

      {/* Page header */}
      <div
        className="py-12 relative overflow-hidden"
        style={{ backgroundColor: 'var(--color-forest-deep)' }}
      >
        <div className="absolute inset-0 lango-pattern-light" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <Link
            href="/gallery"
            className="text-xs tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity mb-5 inline-block"
            style={{ color: 'var(--color-ochre-light)', fontFamily: 'var(--font-body)' }}
          >
            ← Gallery
          </Link>
          <h1
            className="font-600 leading-tight mb-2"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-cream)',
              fontSize: 'clamp(1.75rem, 4vw, 3rem)',
            }}
          >
            {title}
          </h1>
          {(albumLabel || date) && (
            <p
              className="text-sm"
              style={{ color: 'var(--color-ochre-light)', fontFamily: 'var(--font-mono)' }}
            >
              {[
                albumLabel,
                date
                  ? new Date(date).toLocaleDateString('en-UG', {
                      month: 'long',
                      year: 'numeric',
                    })
                  : '',
              ]
                .filter(Boolean)
                .join(' · ')}
            </p>
          )}
          {description && (
            <p
              className="mt-3 text-sm leading-relaxed max-w-2xl"
              style={{ color: 'rgba(245,239,224,0.62)', fontFamily: 'var(--font-body)' }}
            >
              {description}
            </p>
          )}
          <p
            className="mt-2 text-xs"
            style={{ color: 'rgba(245,239,224,0.3)', fontFamily: 'var(--font-mono)' }}
          >
            {images.length} photo{images.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Image grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        {images.length === 0 ? (
          <p className="text-center py-16" style={{ color: 'rgba(245,239,224,0.3)' }}>
            No images in this album.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setLightboxIndex(i)}
                className="relative overflow-hidden group cursor-zoom-in"
                style={{ aspectRatio: '1 / 1', backgroundColor: 'var(--color-forest)' }}
              >
                <Image
                  src={img.url}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(16,36,19,0.5)' }}
                >
                  <span className="text-xl" style={{ color: 'var(--color-ochre-light)' }}>⊕</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
