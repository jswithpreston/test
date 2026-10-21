import type { CollectionConfig } from 'payload'
import { slugify } from '../lib/slugify'
import { isAdmin, isAdminOrEditor, publishedOrLoggedIn } from '../lib/access'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status'],
    description: 'Semi-static pages such as About, History of the Lango, Contact, and Governance.',
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
  access: {
    read: publishedOrLoggedIn,
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
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL path segment, e.g. "about", "history", "contact".',
      },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      admin: {
        description: 'SEO meta description — keep under 160 characters.',
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
  ],
}
