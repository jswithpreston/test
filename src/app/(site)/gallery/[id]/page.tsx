import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { GalleryAlbum } from '@/lib/types'
import { fetchAPI } from '@/lib/api'
import { MOCK_GALLERY_ALBUMS } from '@/lib/mockData'
import GalleryAlbumView, { type AlbumImage } from '@/components/GalleryAlbumView'

async function getAlbum(id: string): Promise<GalleryAlbum | null> {
  const data = await fetchAPI<GalleryAlbum>(
    `/api/gallery/${encodeURIComponent(id)}?depth=2`,
    { next: { revalidate: 120 } },
  )
  if (data) return data
  return MOCK_GALLERY_ALBUMS.find((a) => a.id === id) ?? null
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const album = await getAlbum(id)
  if (!album) return { title: 'Album Not Found' }
  return {
    title: album.title,
    description: album.description ?? undefined,
    openGraph: album.coverImage ? { images: [{ url: album.coverImage.url }] } : undefined,
  }
}

export default async function GalleryAlbumPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const album = await getAlbum(id)
  if (!album) notFound()

  // Build flat image list: cover first, then album images, deduplicating
  const rawImages: AlbumImage[] = [
    {
      url: album.coverImage?.sizes?.hero?.url ?? album.coverImage?.url ?? '',
      alt: album.coverImage?.alt ?? album.title,
    },
    ...(album.images ?? []).map((item) => ({
      url: item.image?.sizes?.hero?.url ?? item.image?.url ?? '',
      alt: item.image?.alt ?? album.title,
      caption: item.caption,
    })),
  ]

  const seenUrls = new Set<string>()
  const images: AlbumImage[] = []
  for (const img of rawImages) {
    if (img.url && !seenUrls.has(img.url)) {
      seenUrls.add(img.url)
      images.push(img)
    }
  }

  return (
    <GalleryAlbumView
      title={album.title}
      albumLabel={album.album}
      date={album.date}
      description={album.description}
      images={images}
    />
  )
}
