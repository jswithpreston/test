import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { GalleryAlbum } from '@/lib/types'
import { fetchAPI } from '@/lib/api'
import GalleryAlbumView, { type AlbumImage } from '@/components/GalleryAlbumView'

async function getAlbum(id: string): Promise<GalleryAlbum | null> {
  return fetchAPI<GalleryAlbum>(
    `/api/gallery/${encodeURIComponent(id)}?depth=2`,
    { next: { revalidate: 120 } },
  )
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

  // Build flat image list: cover first, then album images
  const images: AlbumImage[] = [
    {
      url: album.coverImage.sizes?.hero?.url ?? album.coverImage.url,
      alt: album.coverImage.alt,
    },
    ...(album.images ?? []).map((item) => ({
      url: item.image.sizes?.hero?.url ?? item.image.url,
      alt: item.image.alt,
      caption: item.caption,
    })),
  ]

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
