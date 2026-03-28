/**
 * Seed script — populates the database with placeholder content for development.
 *
 * Usage:
 *   npx payload run src/seed.ts
 *
 * Safe to re-run: checks for existing records before inserting.
 */

import type { Payload } from 'payload'
import { getPayload } from 'payload'
import config from '../payload.config.ts'

async function seed(payload: Payload) {
  console.log('🌱 Seeding LCI placeholder content...\n')

  // ─── Leadership ────────────────────────────────────────────────────────────
  console.log('👑 Seeding leadership...')

  const leadership = [
    {
      name: 'Eng. Dr. Michael Moses Odongo Okune',
      title: 'Won Nyaci (Paramount Chief)',
      category: 'paramount' as const,
      order: 1,
      bio: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Eng. Dr. Michael Moses Odongo Okune was elected as the Won Nyaci (Paramount Chief) of the Lango people on March 1, 2024, and was officially sworn in on February 5, 2025. He is an engineer and holds a doctorate degree. He leads the Lango Cultural Foundation in its mission to preserve and promote Lango heritage across the nine districts of the Lango sub-region.',
                  version: 1,
                },
              ],
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
    {
      name: 'Eng. James Robert Ajal',
      title: 'Prime Minister',
      category: 'prime-minister' as const,
      order: 2,
      bio: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Eng. James Robert Ajal serves as the Prime Minister of the Lango Cultural Foundation, supporting the Won Nyaci in the administration of the institution and coordination of its 11 ministries.',
                  version: 1,
                },
              ],
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
    {
      name: 'Minister of Education & Culture',
      title: 'Minister of Education & Culture',
      category: 'minister' as const,
      order: 10,
      bio: null,
    },
    {
      name: 'Minister of Environmental Protection',
      title: 'Minister of Environmental Protection',
      category: 'minister' as const,
      order: 11,
      bio: null,
    },
    {
      name: 'Minister of Health & Family Planning',
      title: 'Minister of Health & Family Planning',
      category: 'minister' as const,
      order: 12,
      bio: null,
    },
    {
      name: 'Minister of Peace & Reconciliation',
      title: 'Minister of Peace & Reconciliation',
      category: 'minister' as const,
      order: 13,
      bio: null,
    },
    {
      name: 'Minister of Women Empowerment',
      title: 'Minister of Women Empowerment',
      category: 'minister' as const,
      order: 14,
      bio: null,
    },
  ]

  for (const member of leadership) {
    const existing = await payload.find({
      collection: 'leadership',
      where: { name: { equals: member.name } },
      limit: 1,
    })
    if (existing.totalDocs === 0) {
      await payload.create({ collection: 'leadership', data: member as any })
      console.log(`  ✓ ${member.name}`)
    } else {
      console.log(`  – ${member.name} (already exists)`)
    }
  }

  // ─── Programmes ────────────────────────────────────────────────────────────
  console.log('\n📋 Seeding programmes...')

  const programmes = [
    {
      title: 'Education & Scholarships',
      slug: 'education-scholarships',
      category: 'education' as const,
      status: 'active' as const,
      summary:
        'LCF secures scholarships and educational opportunities for young Lango across Uganda and beyond.',
      highlights: [
        { text: '500+ scholarships secured in 2024' },
        { text: 'Over 2,000 scholarships in 2025' },
        { text: 'Partnership with Livingstone International University for half-tuition awards' },
        { text: 'Educational workshops on Lango history and culture in schools' },
      ],
    },
    {
      title: 'Greening Lango — Environmental Conservation',
      slug: 'greening-lango',
      category: 'environment' as const,
      status: 'active' as const,
      summary:
        'A flagship programme targeting the planting of 1 million trees across the Lango sub-region to combat deforestation and climate change.',
      highlights: [
        { text: 'Target: 1 million trees planted across the Lango sub-region' },
        { text: 'Distribution of thousands of tree seedlings to communities' },
        { text: 'Advocacy against wetland encroachment and degradation' },
        { text: 'Climate change mitigation and adaptation education' },
      ],
    },
    {
      title: 'Peace & Reconciliation',
      slug: 'peace-reconciliation',
      category: 'peace' as const,
      status: 'active' as const,
      summary:
        'LCF convenes community dialogues and reconciliation meetings to heal divisions and promote unity across the Lango sub-region.',
      highlights: [
        { text: 'Post-election healing and conflict resolution initiatives' },
        { text: 'Community dialogue forums across all nine districts' },
        { text: 'Five-year development planning for peace and stability' },
        { text: 'Mediation of land disputes and inter-clan conflicts' },
      ],
    },
    {
      title: 'Women Empowerment — Agong Foundation',
      slug: 'women-empowerment',
      category: 'women' as const,
      status: 'active' as const,
      summary:
        'The Agong Foundation works to empower women and girls in the Lango sub-region through education, economic opportunities, and protection from harmful practices.',
      highlights: [
        { text: 'Advocacy against gender-based violence' },
        { text: "Support for girls' education and retention in schools" },
        { text: 'Sexual and reproductive health education' },
        { text: 'Economic empowerment and skills training for women' },
      ],
    },
    {
      title: 'Cultural Heritage Preservation',
      slug: 'cultural-heritage',
      category: 'cultural' as const,
      status: 'active' as const,
      summary:
        'Documentation, preservation, and celebration of Lango oral traditions, historical artifacts, and the 149-clan directory.',
      highlights: [
        { text: '149 registered clans documented in the official directory' },
        { text: 'Digital archiving of oral histories and folk stories' },
        { text: 'Annual cultural festivals and traditional dance showcases' },
        { text: 'Tourism promotion for Lango heritage sites' },
      ],
    },
  ]

  for (const programme of programmes) {
    const existing = await payload.find({
      collection: 'programmes',
      where: { slug: { equals: programme.slug } },
      limit: 1,
    })
    if (existing.totalDocs === 0) {
      await payload.create({ collection: 'programmes', data: programme as any })
      console.log(`  ✓ ${programme.title}`)
    } else {
      console.log(`  – ${programme.title} (already exists)`)
    }
  }

  // ─── Posts ─────────────────────────────────────────────────────────────────
  console.log('\n📰 Seeding posts...')

  const posts = [
    {
      title: 'Won Nyaci Officially Sworn In as Paramount Chief of Lango',
      slug: 'won-nyaci-sworn-in-2025',
      status: 'published' as const,
      category: 'announcement',
      publishedAt: '2025-02-05T10:00:00.000Z',
      excerpt:
        'Eng. Dr. Michael Moses Odongo Okune was officially sworn in as the Won Nyaci (Paramount Chief) of the Lango people on February 5, 2025, in a ceremony attended by government officials and thousands of Lango from across the sub-region.',
    },
    {
      title: 'Lango Cultural Foundation Launches Greening Lango Initiative',
      slug: 'greening-lango-launch-2025',
      status: 'published' as const,
      category: 'programme-update',
      publishedAt: '2025-03-15T10:00:00.000Z',
      excerpt:
        'The Won Nyaci announced the official launch of the Greening Lango programme, with a bold target of planting one million trees across the nine districts of the Lango sub-region to combat deforestation and climate change.',
    },
    {
      title: 'LCF Secures Over 2,000 Scholarships for Lango Students in 2025',
      slug: 'scholarships-2025',
      status: 'published' as const,
      category: 'programme-update',
      publishedAt: '2025-04-01T10:00:00.000Z',
      excerpt:
        'The Lango Cultural Foundation has secured over 2,000 scholarships for students from the Lango sub-region in 2025, building on the 500+ scholarships achieved in 2024. Partnerships with universities across Uganda have been key to this achievement.',
    },
    {
      title: 'LCF Convenes Peace and Development Meeting to Heal Post-Election Divisions',
      slug: 'peace-meeting-2026',
      status: 'published' as const,
      category: 'community',
      publishedAt: '2026-02-28T10:00:00.000Z',
      excerpt:
        'The Lango Cultural Foundation brought together leaders, elders, and community representatives from across the sub-region to address post-election tensions and chart a path towards unity and development.',
    },
  ]

  for (const post of posts) {
    const existing = await payload.find({
      collection: 'posts',
      where: { slug: { equals: post.slug } },
      limit: 1,
    })
    if (existing.totalDocs === 0) {
      await payload.create({ collection: 'posts', data: post as any })
      console.log(`  ✓ ${post.title}`)
    } else {
      console.log(`  – ${post.title} (already exists)`)
    }
  }

  // ─── Activities ────────────────────────────────────────────────────────────
  console.log('\n📅 Seeding activities...')

  const activities = [
    {
      title: 'Annual Lango Cultural Festival 2026',
      slug: 'lango-cultural-festival-2026',
      status: 'upcoming' as const,
      startDate: '2026-06-15T09:00:00.000Z',
      endDate: '2026-06-17T18:00:00.000Z',
      location: 'Lira City Arena, Lira',
      district: 'lira',
    },
    {
      title: 'Greening Lango Tree-Planting Drive — Oyam District',
      slug: 'tree-planting-oyam-2026',
      status: 'upcoming' as const,
      startDate: '2026-04-22T08:00:00.000Z',
      location: 'Oyam District Headquarters',
      district: 'oyam',
    },
    {
      title: "Won Nyaci's Easter Message to the Lango People",
      slug: 'easter-message-2026',
      status: 'completed' as const,
      startDate: '2026-04-05T00:00:00.000Z',
      location: 'Lira City',
      district: 'lira',
    },
  ]

  for (const activity of activities) {
    const existing = await payload.find({
      collection: 'activities',
      where: { slug: { equals: activity.slug } },
      limit: 1,
    })
    if (existing.totalDocs === 0) {
      await payload.create({ collection: 'activities', data: activity as any })
      console.log(`  ✓ ${activity.title}`)
    } else {
      console.log(`  – ${activity.title} (already exists)`)
    }
  }

  // ─── Clans ─────────────────────────────────────────────────────────────────
  console.log('\n🏛️  Seeding clans (sample — 10 of 149)...')

  const clans = [
    { name: 'Okarowok', slug: 'okarowok', symbol: 'Elephant', district: 'lira' },
    { name: 'Okulokulum', slug: 'okulokulum', symbol: 'Leopard', district: 'apac' },
    { name: 'Otek', slug: 'otek', symbol: 'Rhino', district: 'oyam' },
    { name: 'Barwiny', slug: 'barwiny', symbol: 'Buffalo', district: 'kole' },
    { name: 'Arak', slug: 'arak', symbol: 'Eland', district: 'alebtong' },
    { name: 'Ogang', slug: 'ogang', symbol: 'Giraffe', district: 'dokolo' },
    { name: 'Omia', slug: 'omia', symbol: 'Hippo', district: 'amolatar' },
    { name: 'Owiny', slug: 'owiny', symbol: 'Lion', district: 'otuke' },
    { name: 'Ogwal', slug: 'ogwal', symbol: 'Crocodile', district: 'kwania' },
    { name: 'Abwoc', slug: 'abwoc', symbol: 'Monkey', district: 'apac' },
  ]

  for (const clan of clans) {
    const existing = await payload.find({
      collection: 'clans',
      where: { slug: { equals: clan.slug } },
      limit: 1,
    })
    if (existing.totalDocs === 0) {
      await payload.create({ collection: 'clans', data: clan as any })
      console.log(`  ✓ ${clan.name}`)
    } else {
      console.log(`  – ${clan.name} (already exists)`)
    }
  }

  console.log('\n✅ Seeding complete!')
}

// Entry point
const main = async () => {
  const payload = await getPayload({ config })
  try {
    await seed(payload)
  } catch (err) {
    console.error('❌ Seed failed:', err)
    process.exit(1)
  }
  process.exit(0)
}

await main()
