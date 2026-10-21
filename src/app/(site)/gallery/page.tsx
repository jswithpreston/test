import type { Metadata } from 'next'
import type { GalleryAlbum, PayloadResponse } from '@/lib/types'
import { fetchAPI } from '@/lib/api'
import { MOCK_GALLERY_ALBUMS } from '@/lib/mockData'
import GalleryAlbumCard from '@/components/cards/GalleryAlbumCard'
import SectionHeader from '@/components/ui/SectionHeader'

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Photo galleries and albums from events, ceremonies, and activities of the LANGO CULTURAL INSTITUTION.',
}

async function getAlbums(): Promise<PayloadResponse<GalleryAlbum>> {
  const data = await fetchAPI<PayloadResponse<GalleryAlbum>>(
    `/api/gallery?sort=-date&limit=24&depth=1`,
    { next: { revalidate: 120 } },
  )
  if (data?.docs && data.docs.length > 0) return data
  return {
    docs: MOCK_GALLERY_ALBUMS,
    totalDocs: MOCK_GALLERY_ALBUMS.length,
    limit: 24,
    page: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
    pagingCounter: 1,
    prevPage: null,
    nextPage: null,
  }
}

export default async function GalleryPage() {
  const data = await getAlbums()
  const { docs: albums, totalDocs } = data

  return (
    <div style={{ backgroundColor: 'var(--color-earth)', minHeight: '100dvh' }}>
      {/* Header */}
      <div
        className="py-16 md:py-20 relative overflow-hidden"
        style={{ backgroundColor: 'var(--color-forest-deep)' }}
      >
        <div className="absolute inset-0 lango-pattern-light" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader
            eyebrow="Photos & Albums"
            title="Gallery"
            subtitle={`${totalDocs} albums documenting the life, events, and culture of the Lango people.`}
            light
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {albums.length === 0 ? (
          <div
            className="text-center py-24"
            style={{ border: '1px solid rgba(245,239,224,0.1)' }}
          >
            <p style={{ color: 'rgba(245,239,224,0.4)' }}>No albums published yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {albums.map((album) => (
              <GalleryAlbumCard key={album.id} album={album} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
