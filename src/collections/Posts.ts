import type { CollectionConfig } from 'payload'
import { slugify } from '../lib/slugify'
import { isAdmin, isAdminOrEditor, publishedOrLoggedIn } from '../lib/access'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'publishedAt'],
    description: 'News, announcements, event reports, and press releases from LCI.',
  },
  access: {
    read: publishedOrLoggedIn,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create' && data.title && !data.slug) {
          data.slug = slugify(data.title)
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier, e.g. "won-nyaci-swearing-in-ceremony-2025".',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      admin: {
        description: 'Short summary shown in news listings (1–2 sentences).',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Announcement', value: 'announcement' },
        { label: 'Event Report', value: 'event-report' },
        { label: 'Programme Update', value: 'programme-update' },
        { label: 'Press Release', value: 'press-release' },
        { label: 'Cultural Heritage', value: 'cultural-heritage' },
        { label: 'Community', value: 'community' },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
        description: 'Leave blank to use the current date on publish.',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
    },
  ],
}
