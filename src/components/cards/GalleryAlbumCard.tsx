import Image from 'next/image'
import Link from 'next/link'
import type { GalleryAlbum } from '@/lib/types'

function formatDate(dateString?: string) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-UG', {
    month: 'long',
    year: 'numeric',
  })
}

interface GalleryAlbumCardProps {
  album: GalleryAlbum
}

export default function GalleryAlbumCard({ album }: GalleryAlbumCardProps) {
  const imageUrl =
    album.coverImage?.sizes?.card?.url ??
    album.coverImage?.url

  const imageCount = album.images?.length ?? 0

  return (
    <Link
      href={`/gallery/${album.id}`}
      className="group relative flex flex-col overflow-hidden card-lift"
    >
      {/* Cover image — square crop */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: '1 / 1', backgroundColor: 'var(--color-forest)' }}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={album.coverImage?.alt ?? album.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full lango-pattern-light flex items-center justify-center">
            <span className="text-6xl opacity-20" style={{ color: 'var(--color-cream)' }}>◆</span>
          </div>
        )}

        {/* Dark overlay on hover */}
        <div
          className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{ background: 'rgba(16,36,19,0.45)' }}
        />

        {/* Image count badge */}
        {imageCount > 0 && (
          <div
            className="absolute top-3 right-3 px-2.5 py-1 text-xs"
            style={{
              backgroundColor: 'rgba(16,36,19,0.8)',
              color: 'var(--color-ochre-light)',
              fontFamily: 'var(--font-mono)',
              backdropFilter: 'blur(4px)',
            }}
          >
            {imageCount} photos
          </div>
        )}

        {/* View overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <span
            className="text-sm tracking-widest uppercase px-4 py-2"
            style={{
              color: 'var(--color-cream)',
              border: '1px solid rgba(245,239,224,0.5)',
              fontFamily: 'var(--font-body)',
            }}
          >
            View Album
          </span>
        </div>
      </div>

      {/* Info */}
      <div
        className="p-4 flex flex-col gap-1"
        style={{ backgroundColor: 'var(--color-earth)', borderTop: '2px solid var(--color-ochre)' }}
      >
        <h3
          className="text-base font-600 leading-snug"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-cream)' }}
        >
          {album.title}
        </h3>
        {(album.album || album.date) && (
          <p
            className="text-xs"
            style={{ color: 'rgba(245,239,224,0.5)', fontFamily: 'var(--font-mono)' }}
          >
            {[album.album, formatDate(album.date)].filter(Boolean).join(' · ')}
          </p>
        )}
      </div>
    </Link>
  )
}
