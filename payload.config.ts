import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'

import { SiteSettings } from './src/globals/SiteSettings.ts'
import { Navigation } from './src/globals/Navigation.ts'
import { Users } from './src/collections/Users.ts'
import { Media } from './src/collections/Media.ts'
import { Posts } from './src/collections/Posts.ts'
import { Activities } from './src/collections/Activities.ts'
import { Programmes } from './src/collections/Programmes.ts'
import { Gallery } from './src/collections/Gallery.ts'
import { Leadership } from './src/collections/Leadership.ts'
import { Pages } from './src/collections/Pages.ts'
import { Clans } from './src/collections/Clans.ts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— LCI Admin',
      description: 'Lango Cultural Institution Content Management System',
    },
  },
  collections: [
    Users,
    Media,
    Posts,
    Activities,
    Programmes,
    Gallery,
    Leadership,
    Pages,
    Clans,
  ],
  globals: [
    SiteSettings,
    Navigation,
  ],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  editor: lexicalEditor({}),
  sharp,
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
})
