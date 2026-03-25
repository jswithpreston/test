import type { GlobalConfig } from 'payload'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigation',
  admin: {
    description: 'Main site navigation menu. Changes here update the header across all pages.',
    group: 'Settings',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'mainNav',
      label: 'Main Navigation',
      type: 'array',
      admin: {
        description: 'Top-level menu items shown in the site header.',
        initCollapsed: false,
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          admin: {
            description: 'Use relative paths for internal pages, e.g. /about or /news.',
          },
        },
        {
          name: 'openInNewTab',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'children',
          label: 'Dropdown Items',
          type: 'array',
          admin: {
            description: 'Optional sub-menu items under this link.',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
      defaultValue: [
        { label: 'Home', url: '/' },
        { label: 'About', url: '/about' },
        { label: 'Leadership', url: '/leadership' },
        { label: 'News', url: '/news' },
        { label: 'Activities', url: '/activities' },
        { label: 'Programmes', url: '/programmes' },
        { label: 'Gallery', url: '/gallery' },
        { label: 'Clans', url: '/clans' },
        { label: 'Contact', url: '/contact' },
      ],
    },
    {
      name: 'footerNav',
      label: 'Footer Navigation',
      type: 'array',
      admin: {
        description: 'Links shown in the site footer.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
      defaultValue: [
        { label: 'About LCF', url: '/about' },
        { label: 'History', url: '/history' },
        { label: 'Governance', url: '/governance' },
        { label: 'Programmes', url: '/programmes' },
        { label: 'Clan Directory', url: '/clans' },
        { label: 'Contact', url: '/contact' },
      ],
    },
  ],
}
