import type { CollectionConfig } from 'payload'
import { slugify } from '../lib/slugify'
import { isAdmin, isAdminOrEditor } from '../lib/access'

export const Activities: CollectionConfig = {
  slug: 'activities',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'startDate', 'district', 'status'],
    description: 'Events, ceremonies, peace meetings, and public activities organised by LCI.',
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
      name: 'description',
      type: 'richText',
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'location',
      type: 'text',
      admin: {
        description: 'Venue name or address.',
      },
    },
    {
      name: 'district',
      type: 'select',
      options: [
        { label: 'Alebtong', value: 'alebtong' },
        { label: 'Amolatar', value: 'amolatar' },
        { label: 'Apac', value: 'apac' },
        { label: 'Dokolo', value: 'dokolo' },
        { label: 'Kole', value: 'kole' },
        { label: 'Kwania', value: 'kwania' },
        { label: 'Lira', value: 'lira' },
        { label: 'Otuke', value: 'otuke' },
        { label: 'Oyam', value: 'oyam' },
        { label: 'Multiple / Region-wide', value: 'multiple' },
      ],
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'upcoming',
      options: [
        { label: 'Upcoming', value: 'upcoming' },
        { label: 'Ongoing', value: 'ongoing' },
        { label: 'Completed', value: 'completed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
    },
  ],
}
