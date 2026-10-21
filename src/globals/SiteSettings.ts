import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    description: 'Global site information — name, tagline, contact details, and social links.',
    group: 'Settings',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      defaultValue: 'LANGO CULTURAL INSTITUTION',
      required: true,
    },
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'Preserving and Promoting the Heritage of the Lango People',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue:
        'The LANGO CULTURAL INSTITUTION is the official cultural institution of the Lango people of Uganda, serving over 2.7 million people across nine districts in the Lango sub-region.',
      admin: {
        description: 'Used as the default meta description across the site.',
      },
    },
    {
      label: 'Contact',
      type: 'collapsible',
      fields: [
        {
          name: 'email',
          type: 'email',
          defaultValue: 'info@lci.or.ug',
        },
        {
          name: 'phone',
          type: 'text',
        },
        {
          name: 'address',
          type: 'textarea',
          defaultValue: 'Lira City, Lango Sub-region, Uganda',
        },
      ],
    },
    {
      label: 'Social Media',
      type: 'collapsible',
      fields: [
        {
          name: 'instagram',
          type: 'text',
          defaultValue: 'https://instagram.com/langoinstitute',
        },
        {
          name: 'facebook',
          type: 'text',
          defaultValue: 'https://facebook.com/LangoCommunityNA',
        },
        {
          name: 'twitter',
          type: 'text',
        },
        {
          name: 'youtube',
          type: 'text',
        },
      ],
    },
    {
      label: 'Branding',
      type: 'collapsible',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'favicon',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
