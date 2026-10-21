import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor } from '../lib/access'

export const Leadership: CollectionConfig = {
  slug: 'leadership',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'title', 'category', 'order'],
    description: 'LCI leadership — Won Nyaci, Prime Minister, Ministers, Council, and Clan Leaders.',
  },
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description:
          'Full title, e.g. "Won Nyaci (Paramount Chief)", "Prime Minister", "Minister of Education & Culture".',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Paramount Chief (Won Nyaci)', value: 'paramount' },
        { label: 'Prime Minister', value: 'prime-minister' },
        { label: 'Minister', value: 'minister' },
        { label: 'Council Member', value: 'council' },
        { label: 'Clan Leader (Awitong)', value: 'clan-leader' },
      ],
    },
    {
      name: 'bio',
      type: 'richText',
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 99,
      admin: {
        description: 'Display order — lower numbers appear first. Won Nyaci should be 1.',
      },
    },
  ],
}
