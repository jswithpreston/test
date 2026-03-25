import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { SiteSettings } from './src/globals/SiteSettings'
import { Navigation } from './src/globals/Navigation'
import { Users } from './src/collections/Users'
import { Media } from './src/collections/Media'
import { Posts } from './src/collections/Posts'
import { Activities } from './src/collections/Activities'
import { Programmes } from './src/collections/Programmes'
import { Gallery } from './src/collections/Gallery'
import { Leadership } from './src/collections/Leadership'
import { Pages } from './src/collections/Pages'
import { Clans } from './src/collections/Clans'

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
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
})
