import type { CollectionConfig } from 'payload'
import { slugify } from '../lib/slugify.ts'
import { isAdmin, isAdminOrEditor } from '../lib/access.ts'

export const Clans: CollectionConfig = {
  slug: 'clans',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'symbol', 'district'],
    description: 'Directory of the 149 registered Lango clans. Each has an Awitong (Supreme Clan Chief).',
  },
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create' && data.name && !data.slug) {
          data.slug = slugify(data.name)
        }
        return data
      },
    ],
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
      name: 'slug',
      type: 'text',
      unique: true,
      admin: {
        description: 'Auto-generated from clan name. Used in API queries.',
      },
    },
    {
      name: 'symbol',
      type: 'text',
      admin: {
        description: 'Clan totem or symbol (e.g. "elephant", "rhino").',
      },
    },
    {
      name: 'origin',
      type: 'textarea',
      admin: {
        description: 'Brief history or migration origin of the clan.',
      },
    },
    {
      name: 'description',
      type: 'richText',
      admin: {
        description: 'Full clan profile — traditions, notable members, cultural practices.',
      },
    },
    {
      name: 'district',
      type: 'select',
      admin: {
        description: 'Primary district in the Lango sub-region.',
      },
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
      ],
    },
    {
      name: 'clanLeader',
      type: 'text',
      admin: {
        description: 'Current Awitong (Supreme Clan Chief) name.',
      },
    },
  ],
}
