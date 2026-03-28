import type { CollectionConfig } from 'payload'
import { slugify } from '../lib/slugify.ts'
import { isAdmin, isAdminOrEditor } from '../lib/access.ts'

export const Programmes: CollectionConfig = {
  slug: 'programmes',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status'],
    description: 'Ongoing LCI programmes — education, environment, health, peace, women empowerment, and more.',
  },
  access: {
    read: () => true,
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
    },
    {
      name: 'summary',
      type: 'textarea',
      admin: {
        description: 'One-paragraph overview shown on programme listing pages.',
      },
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Education & Scholarships', value: 'education' },
        { label: 'Environmental Conservation', value: 'environment' },
        { label: 'Health & Family Planning', value: 'health' },
        { label: 'Peace & Reconciliation', value: 'peace' },
        { label: 'Women Empowerment', value: 'women' },
        { label: 'Cultural Heritage', value: 'cultural' },
        { label: 'Youth Affairs', value: 'youth' },
        { label: 'Investment & Development', value: 'investment' },
      ],
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'highlights',
      type: 'array',
      admin: {
        description: 'Key achievements or bullet points, e.g. "500+ scholarships secured in 2024".',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Planned', value: 'planned' },
        { label: 'Completed', value: 'completed' },
      ],
    },
  ],
}
