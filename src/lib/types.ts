// Shared TypeScript types for Payload CMS API responses
// These match the collection schemas defined in src/collections/

export interface MediaSize {
  url: string
  width: number
  height: number
  mimeType?: string
  filesize?: number
}

export interface Media {
  id: string
  url: string
  alt: string
  caption?: string
  width?: number
  height?: number
  mimeType?: string
  filesize?: number
  sizes?: {
    thumbnail?: MediaSize
    card?: MediaSize
    hero?: MediaSize
  }
}

export type PostCategory =
  | 'announcement'
  | 'event-report'
  | 'programme-update'
  | 'press-release'
  | 'cultural-heritage'
  | 'community'

export interface Post {
  id: string
  title: string
  slug: string
  excerpt?: string
  content?: unknown
  featuredImage?: Media
  category?: PostCategory
  publishedAt?: string
  status: 'draft' | 'published'
  author?: { id: string; name: string }
  createdAt: string
  updatedAt: string
}

export type District =
  | 'alebtong'
  | 'amolatar'
  | 'apac'
  | 'dokolo'
  | 'kole'
  | 'kwania'
  | 'lira'
  | 'otuke'
  | 'oyam'
  | 'multiple'

export type ActivityStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled'

export interface Activity {
  id: string
  title: string
  slug: string
  description?: unknown
  startDate: string
  endDate?: string
  location?: string
  district?: District
  featuredImage?: Media
  gallery?: { image: Media }[]
  status: ActivityStatus
  createdAt: string
  updatedAt: string
}

export type ProgrammeCategory =
  | 'education'
  | 'environment'
  | 'health'
  | 'peace'
  | 'women'
  | 'cultural'
  | 'youth'
  | 'investment'

export interface Programme {
  id: string
  title: string
  slug: string
  summary?: string
  description?: unknown
  category: ProgrammeCategory
  featuredImage?: Media
  highlights?: { id?: string; text: string }[]
  status: 'active' | 'planned' | 'completed'
  createdAt: string
  updatedAt: string
}

export interface GalleryAlbum {
  id: string
  title: string
  album?: string
  date?: string
  description?: string
  coverImage: Media
  images?: { id?: string; image: Media; caption?: string }[]
  relatedActivity?: Activity
  createdAt: string
  updatedAt: string
}

export type LeaderCategory =
  | 'paramount'
  | 'prime-minister'
  | 'minister'
  | 'council'
  | 'clan-leader'

export interface Leader {
  id: string
  name: string
  title: string
  category: LeaderCategory
  bio?: unknown
  photo?: Media
  order?: number
  createdAt: string
  updatedAt: string
}

export interface SitePage {
  id: string
  title: string
  slug: string
  heroImage?: Media
  content?: unknown
  metaDescription?: string
  status: 'draft' | 'published'
  createdAt: string
  updatedAt: string
}

export interface Clan {
  id: string
  name: string
  symbol?: string
  origin?: string
  description?: unknown
  district?: District
  clanLeader?: string
  createdAt: string
  updatedAt: string
}

// ─── Globals ───────────────────────────────────────────────────────

export interface NavItem {
  label: string
  url: string
  children?: NavItem[]
}

export interface Navigation {
  mainNav: NavItem[]
  footerNav: NavItem[]
}

export interface SiteSettings {
  siteName?: string
  tagline?: string
  contactEmail?: string
  contactPhone?: string
  address?: string
  instagramUrl?: string
  facebookUrl?: string
  twitterUrl?: string
  logo?: Media
}

// Generic paginated response from Payload REST API
export interface PayloadResponse<T> {
  docs: T[]
  totalDocs: number
  limit: number
  page: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
  pagingCounter: number
  prevPage: number | null
  nextPage: number | null
}

// ─── Label helpers ─────────────────────────────────────────────────

export const DISTRICT_LABELS: Record<District, string> = {
  alebtong: 'Alebtong',
  amolatar: 'Amolatar',
  apac: 'Apac',
  dokolo: 'Dokolo',
  kole: 'Kole',
  kwania: 'Kwania',
  lira: 'Lira',
  otuke: 'Otuke',
  oyam: 'Oyam',
  multiple: 'Multiple Districts',
}

export const POST_CATEGORY_LABELS: Record<PostCategory, string> = {
  announcement: 'Announcement',
  'event-report': 'Event Report',
  'programme-update': 'Programme Update',
  'press-release': 'Press Release',
  'cultural-heritage': 'Cultural Heritage',
  community: 'Community',
}

export const PROGRAMME_CATEGORY_LABELS: Record<ProgrammeCategory, string> = {
  education: 'Education',
  environment: 'Environment',
  health: 'Health',
  peace: 'Peace',
  women: 'Women',
  cultural: 'Cultural',
  youth: 'Youth',
  investment: 'Investment',
}

export const ACTIVITY_STATUS_LABELS: Record<ActivityStatus, string> = {
  upcoming: 'Upcoming',
  ongoing: 'Ongoing',
  completed: 'Completed',
  cancelled: 'Cancelled',
}

export const LEADER_CATEGORY_LABELS: Record<LeaderCategory, string> = {
  paramount: 'Paramount Chief',
  'prime-minister': 'Prime Minister',
  minister: 'Minister',
  council: 'Council',
  'clan-leader': 'Clan Leader',
}
