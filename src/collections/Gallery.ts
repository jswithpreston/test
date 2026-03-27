import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor } from '../lib/access.ts'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'album', 'date'],
    description: 'Photo and video albums from LCI events and activities.',
  },
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'album',
      type: 'text',
      admin: {
        description: 'Group related galleries, e.g. "Won Nyaci Swearing-In Ceremony 2025".',
      },
    },
    {
      name: 'date',
      type: 'date',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },
    {
      name: 'relatedActivity',
      type: 'relationship',
      relationTo: 'activities',
      admin: {
        description: 'Link this gallery to an activity record (optional).',
      },
    },
  ],
}
