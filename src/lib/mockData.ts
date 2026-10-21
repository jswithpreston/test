import type {
  Activity,
  Clan,
  GalleryAlbum,
  Leader,
  Post,
  Programme,
  SitePage,
  SiteSettings,
} from './types'

export const MOCK_SITE_SETTINGS: SiteSettings = {
  siteName: 'LANGO CULTURAL INSTITUTION',
  tagline: 'Preserving, documenting, and promoting the heritage of the Lango people of Uganda.',
  contactEmail: 'info@lci.or.ug',
  contactPhone: '+256 414 123 456',
  address: 'Lango Cultural Palace & Headquarters, Lira City, Lango Sub-region, Uganda',
  instagramUrl: 'https://www.instagram.com/langoinstitute',
  facebookUrl: 'https://www.facebook.com/LangoCommunityNA',
  logo: {
    id: 'lci-logo',
    url: '/images/logo.jpeg',
    alt: 'LANGO CULTURAL INSTITUTION Emblem',
    sizes: {
      thumbnail: { url: '/images/logo.jpeg', width: 120, height: 120 },
      card: { url: '/images/logo.jpeg', width: 364, height: 364 },
      hero: { url: '/images/logo.jpeg', width: 364, height: 364 },
    },
  },
}

export const MOCK_LEADERSHIP: Leader[] = [
  {
    id: 'won-nyaci',
    name: 'H.H. Eng. Dr. Michael Moses Odongo Okune',
    title: 'Won Nyaci me Lango (Paramount Chief)',
    category: 'paramount',
    order: 1,
    photo: {
      id: 'photo-won-nyaci',
      url: '/images/won-nyaci-portrait.jpg',
      alt: 'H.H. Eng. Dr. Michael Moses Odongo Okune — Won Nyaci me Lango',
      sizes: {
        card: { url: '/images/won-nyaci-portrait.jpg', width: 467, height: 655 },
        hero: { url: '/images/won-nyaci-portrait.jpg', width: 467, height: 655 },
      },
    },
    bio: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'His Highness Eng. Dr. Michael Moses Odongo Okune was elected as the Won Nyaci (Paramount Chief) of the Lango people on March 1, 2024, and officially sworn into office on February 5, 2025. A distinguished civil engineer holding a doctorate degree, he leads the LANGO CULTURAL INSTITUTION (Tekwaro Lango) in its sacred mission to unite, preserve, and economically uplift over 2.7 million Lango people across the nine districts of the sub-region and the global diaspora.',
                version: 1,
              },
            ],
            version: 1,
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Under his leadership, the LANGO CULTURAL INSTITUTION prioritizes clan harmony through the Council of Awitong (Clan Chiefs), educational scholarships for thousands of youth, the flagship Greening Lango environmental campaign, women and vulnerable persons empowerment, and the historic Won Nyaci Run.',
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
    createdAt: '2025-02-05T00:00:00.000Z',
    updatedAt: '2025-02-05T00:00:00.000Z',
  },
  {
    id: 'prime-minister',
    name: 'Eng. James Robert Ajal',
    title: 'Prime Minister',
    category: 'prime-minister',
    order: 2,
    photo: {
      id: 'photo-pm',
      url: '/images/cultural-leaders-gathering.jpg',
      alt: 'Eng. James Robert Ajal — Prime Minister',
      sizes: {
        card: { url: '/images/cultural-leaders-gathering.jpg', width: 588, height: 393 },
      },
    },
    bio: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Eng. James Robert Ajal serves as the Prime Minister of the LANGO CULTURAL INSTITUTION, steering executive administration, ministerial coordination across 11 ministries, and fostering collaboration with local government district administrations and national authorities.',
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
    createdAt: '2025-02-05T00:00:00.000Z',
    updatedAt: '2025-02-05T00:00:00.000Z',
  },
  {
    id: 'council-speaker',
    name: 'Council of Clan Chiefs (Awitong)',
    title: 'Speaker & High Council Directorate',
    category: 'council',
    order: 3,
    photo: {
      id: 'photo-council',
      url: '/images/lango-cultural-dignitary.jpg',
      alt: 'Council of Clan Chiefs Directorate',
      sizes: {
        card: { url: '/images/lango-cultural-dignitary.jpg', width: 452, height: 678 },
      },
    },
    bio: null,
    createdAt: '2025-02-05T00:00:00.000Z',
    updatedAt: '2025-02-05T00:00:00.000Z',
  },
  {
    id: 'royal-queen',
    name: 'The Queen & Women Affairs Directorate',
    title: 'Royal Patron & Cultural Envoy',
    category: 'minister',
    order: 4,
    photo: {
      id: 'photo-queen',
      url: '/images/won-nyaci-queen-royal-blue.jpg',
      alt: 'The Queen and Royal Delegation',
      sizes: {
        card: { url: '/images/won-nyaci-queen-royal-blue.jpg', width: 584, height: 524 },
      },
    },
    bio: null,
    createdAt: '2025-02-05T00:00:00.000Z',
    updatedAt: '2025-02-05T00:00:00.000Z',
  },
  {
    id: 'min-education',
    name: 'Ministry of Education, Heritage & Language',
    title: 'Minister of Education & Culture',
    category: 'minister',
    order: 10,
    bio: null,
    createdAt: '2025-02-05T00:00:00.000Z',
    updatedAt: '2025-02-05T00:00:00.000Z',
  },
  {
    id: 'min-environment',
    name: 'Ministry of Environmental Protection & Climate',
    title: 'Minister of Environmental Protection',
    category: 'minister',
    order: 11,
    bio: null,
    createdAt: '2025-02-05T00:00:00.000Z',
    updatedAt: '2025-02-05T00:00:00.000Z',
  },
  {
    id: 'min-health',
    name: 'Ministry of Health, Social Welfare & Sports',
    title: 'Minister of Health & Social Welfare',
    category: 'minister',
    order: 12,
    bio: null,
    createdAt: '2025-02-05T00:00:00.000Z',
    updatedAt: '2025-02-05T00:00:00.000Z',
  },
  {
    id: 'min-peace',
    name: 'Ministry of Peace, Unity & Reconciliation',
    title: 'Minister of Peace & Reconciliation',
    category: 'minister',
    order: 13,
    bio: null,
    createdAt: '2025-02-05T00:00:00.000Z',
    updatedAt: '2025-02-05T00:00:00.000Z',
  },
]

export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: 'won-nyaci-run-2026',
    title: 'Won Nyaci Run 2026 — 1st Edition Community Run',
    slug: 'won-nyaci-run-2026',
    status: 'upcoming',
    startDate: '2026-10-24T06:00:00.000Z',
    endDate: '2026-10-24T14:00:00.000Z',
    location: 'Community Grounds, Lira & Kampala',
    district: 'lira',
    featuredImage: {
      id: 'img-run-2026',
      url: '/images/won-nyaci-run-2026.jpg',
      alt: 'Won Nyaci Run 2026 1st Edition Community Run Poster',
      sizes: {
        card: { url: '/images/won-nyaci-run-2026.jpg', width: 452, height: 678 },
        hero: { url: '/images/won-nyaci-run-2026.jpg', width: 452, height: 678 },
      },
    },
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: '“Let us run together for a more inclusive Lango.” The 1st Edition of the Won Nyaci Run brings together thousands of runners, youth, elders, and community champions across Uganda. Featuring 5KM, 10KM, and 21KM race routes starting at 6:00 AM (Registration at 5:00 AM) at Community Grounds.',
                version: 1,
              },
            ],
            version: 1,
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'By participating in Won Nyaci Run 2026, every runner not only promotes health and celebrates rich Lango culture, but also directly supports mobility, dignity, and independence for persons with disabilities across all nine districts of Lango.',
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
    createdAt: '2026-03-01T00:00:00.000Z',
    updatedAt: '2026-03-01T00:00:00.000Z',
  },
  {
    id: 'lango-cultural-festival-2026',
    title: 'Annual Lango Cultural Festival & Clan Assembly',
    slug: 'lango-cultural-festival-2026',
    status: 'upcoming',
    startDate: '2026-06-15T09:00:00.000Z',
    endDate: '2026-06-17T18:00:00.000Z',
    location: 'Lira City Cultural Grounds, Lira',
    district: 'lira',
    featuredImage: {
      id: 'img-fest-2026',
      url: '/images/cultural-blessing-ceremony.jpg',
      alt: 'Annual Lango Cultural Festival & Clan Assembly',
      sizes: {
        card: { url: '/images/cultural-blessing-ceremony.jpg', width: 588, height: 390 },
        hero: { url: '/images/cultural-blessing-ceremony.jpg', width: 588, height: 390 },
      },
    },
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'The flagship cultural summit of the Lango people uniting all 149 registered clans. Features royal blessing ceremonies by His Highness Won Nyaci, traditional dance competitions, traditional culinary exhibitions, storytelling, and cultural attire showcases.',
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
    createdAt: '2026-01-15T00:00:00.000Z',
    updatedAt: '2026-01-15T00:00:00.000Z',
  },
  {
    id: 'greening-lango-2026',
    title: 'Greening Lango 1 Million Tree-Planting Drive',
    slug: 'tree-planting-oyam-2026',
    status: 'upcoming',
    startDate: '2026-05-22T08:00:00.000Z',
    endDate: '2026-05-25T17:00:00.000Z',
    location: 'Oyam & Otuke District Centres',
    district: 'oyam',
    featuredImage: {
      id: 'img-greening',
      url: '/images/won-nyaci-community-address.jpg',
      alt: 'Greening Lango Tree-Planting Drive',
      sizes: {
        card: { url: '/images/won-nyaci-community-address.jpg', width: 554, height: 554 },
        hero: { url: '/images/won-nyaci-community-address.jpg', width: 554, height: 554 },
      },
    },
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Initiative launched by Won Nyaci Eng. Dr. Michael Moses Odongo Okune to plant one million indigenous trees across nine districts, restoring water catchments, combating deforestation, and protecting agricultural soils.',
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
    createdAt: '2026-02-10T00:00:00.000Z',
    updatedAt: '2026-02-10T00:00:00.000Z',
  },
]

export const MOCK_POSTS: Post[] = [
  {
    id: 'post-museveni-visit',
    title: 'President Museveni Welcomes Won Nyaci Eng. Dr. Michael Moses Odongo Okune at State House',
    slug: 'won-nyaci-meets-president-museveni',
    category: 'press-release',
    status: 'published',
    publishedAt: '2026-03-10T10:00:00.000Z',
    featuredImage: {
      id: 'img-museveni',
      url: '/images/won-nyaci-museveni.jpg',
      alt: 'President Museveni with Won Nyaci Eng Dr Michael Moses Odongo Okune',
      sizes: {
        card: { url: '/images/won-nyaci-museveni.jpg', width: 588, height: 390 },
        hero: { url: '/images/won-nyaci-museveni.jpg', width: 588, height: 390 },
      },
    },
    excerpt:
      'President Yoweri Kaguta Museveni warmly received His Highness Eng. Dr. Michael Moses Odongo Okune, Won Nyaci me Lango, to discuss key regional priorities, education scholarships, infrastructure development, and cultural preservation across the Lango sub-region.',
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'In a productive meeting at State House, President Yoweri Kaguta Museveni congratulated His Highness Eng. Dr. Michael Moses Odongo Okune on his election and swearing-in as the Paramount Chief (Won Nyaci) of the Lango people.',
                version: 1,
              },
            ],
            version: 1,
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'The discussions focused on strengthening cultural heritage preservation, promoting regional peace and unity, expanding youth education scholarships, and supporting the Greening Lango environmental restoration drive.',
                version: 1,
              },
            ],
            version: 1,
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'His Highness reaffirmed the commitment of the LANGO CULTURAL INSTITUTION to work collaboratively with government leadership and development partners to advance the socio-economic welfare of over 2.7 million people across the nine districts of Lango.',
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
    createdAt: '2026-03-10T10:00:00.000Z',
    updatedAt: '2026-03-10T10:00:00.000Z',
  },
  {
    id: 'post-coronation',
    title: 'Historic Cultural Investiture: Won Nyaci Eng. Dr. Odongo Okune Sworn In in Leopard Regalia',
    slug: 'won-nyaci-coronation-investiture',
    category: 'cultural-heritage',
    status: 'published',
    publishedAt: '2026-02-05T09:00:00.000Z',
    featuredImage: {
      id: 'img-coronation',
      url: '/images/coronation-leopard-regalia.jpg',
      alt: 'Won Nyaci Coronation in Leopard Regalia',
      sizes: {
        card: { url: '/images/coronation-leopard-regalia.jpg', width: 588, height: 465 },
        hero: { url: '/images/coronation-leopard-regalia.jpg', width: 588, height: 465 },
      },
    },
    excerpt:
      'In a colorful ceremony steeped in ancestral traditions, His Highness Eng. Dr. Michael Moses Odongo Okune was formally invested as Won Nyaci me Lango, pledging to lead the LANGO CULTURAL INSTITUTION with unity, dignity, and economic empowerment.',
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Tens of thousands of Lango people gathered alongside national dignitaries, traditional rulers, and clan elders to witness the historic cultural swearing-in of Won Nyaci Eng. Dr. Michael Moses Odongo Okune.',
                version: 1,
              },
            ],
            version: 1,
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Adorned in ancestral leopard regalia and holding the ceremonial flywhisk, His Highness took the oath of office, dedicating his tenure to unity under the motto Note En Tekowa (Unity is Strength).',
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
    createdAt: '2026-02-05T09:00:00.000Z',
    updatedAt: '2026-02-05T09:00:00.000Z',
  },
  {
    id: 'post-run-announcement',
    title: 'LANGO CULTURAL INSTITUTION Unveils Won Nyaci Run 2026 for Community Health & Inclusion',
    slug: 'launch-of-won-nyaci-run-2026',
    category: 'announcement',
    status: 'published',
    publishedAt: '2026-03-20T08:30:00.000Z',
    featuredImage: {
      id: 'img-run-post',
      url: '/images/won-nyaci-run-2026.jpg',
      alt: 'Won Nyaci Run 2026 Announcement Poster',
      sizes: {
        card: { url: '/images/won-nyaci-run-2026.jpg', width: 452, height: 678 },
        hero: { url: '/images/won-nyaci-run-2026.jpg', width: 452, height: 678 },
      },
    },
    excerpt:
      'The LANGO CULTURAL INSTITUTION has officially launched preparations for the inaugural Won Nyaci Run on 24th October 2026, mobilizing resources to empower persons with disabilities and celebrate cultural togetherness.',
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'The Won Nyaci Run 2026 is slated for Saturday, 24th October 2026, featuring 5km, 10km, and 21km runs. Registration kits are now open for individuals, corporate partners, and clan teams.',
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
    createdAt: '2026-03-20T08:30:00.000Z',
    updatedAt: '2026-03-20T08:30:00.000Z',
  },
  {
    id: 'post-royal-celebrations',
    title: 'Won Nyaci and Queen Lead Grand Cultural Celebrations Across the Nine Districts',
    slug: 'won-nyaci-leads-royal-cultural-celebrations',
    category: 'event-report',
    status: 'published',
    publishedAt: '2026-03-01T12:00:00.000Z',
    featuredImage: {
      id: 'img-queen-post',
      url: '/images/won-nyaci-queen-royal-blue.jpg',
      alt: 'Won Nyaci and Queen in Royal Blue Regalia',
      sizes: {
        card: { url: '/images/won-nyaci-queen-royal-blue.jpg', width: 584, height: 524 },
        hero: { url: '/images/won-nyaci-queen-royal-blue.jpg', width: 584, height: 524 },
      },
    },
    excerpt:
      'Dressed in magnificent royal blue and gold robes, His Highness Won Nyaci Eng. Dr. Michael Moses Odongo Okune and the Queen addressed thousands of jubilant citizens, championing peace, education, and women empowerment.',
    createdAt: '2026-03-01T12:00:00.000Z',
    updatedAt: '2026-03-01T12:00:00.000Z',
  },
]

export const MOCK_GALLERY_ALBUMS: GalleryAlbum[] = [
  {
    id: 'royal-investiture-coronation',
    title: 'Royal Investiture & Coronation of Won Nyaci me Lango',
    album: 'Royal Ceremonies',
    date: '2025-02-05',
    description:
      'Historic photographic record of the investiture of His Highness Eng. Dr. Michael Moses Odongo Okune as Won Nyaci me Lango, depicting sacred coronation rites, royal leopard regalia, and community celebrations.',
    coverImage: {
      id: 'gal-cover-1',
      url: '/images/coronation-leopard-regalia.jpg',
      alt: 'Won Nyaci coronation in leopard regalia',
      sizes: {
        card: { url: '/images/coronation-leopard-regalia.jpg', width: 588, height: 465 },
        hero: { url: '/images/coronation-leopard-regalia.jpg', width: 588, height: 465 },
      },
    },
    images: [
      {
        id: 'img-g1-1',
        image: {
          id: 'g1-1',
          url: '/images/coronation-leopard-regalia.jpg',
          alt: 'Traditional coronation ceremony in leopard skin regalia',
        },
        caption: 'His Highness Won Nyaci Eng. Dr. Michael Moses Odongo Okune seated with the Queen during traditional coronation rites',
      },
      {
        id: 'img-g1-2',
        image: {
          id: 'g1-2',
          url: '/images/won-nyaci-throne.jpg',
          alt: 'Won Nyaci seated on royal carved throne',
        },
        caption: 'His Highness seated on the carved royal throne with flywhisk and the sacred rhino emblem',
      },
      {
        id: 'img-g1-3',
        image: {
          id: 'g1-3',
          url: '/images/won-nyaci-portrait.jpg',
          alt: 'Official Portrait of His Highness Won Nyaci me Lango',
        },
        caption: 'Official institutional portrait: H.H. Eng Dr Michael Moses Odongo Okune, Won Nyaci me Lango',
      },
      {
        id: 'img-g1-4',
        image: {
          id: 'g1-4',
          url: '/images/won-nyaci-public-event.jpg',
          alt: 'Won Nyaci at official public gathering',
        },
        caption: 'His Highness in formal attire attending cultural assemblies across the sub-region',
      },
    ],
    createdAt: '2025-02-05T00:00:00.000Z',
    updatedAt: '2025-02-05T00:00:00.000Z',
  },
  {
    id: 'royal-blue-celebrations',
    title: 'Cultural Regalia & Public Royal Processions',
    album: 'Cultural Heritage',
    date: '2025-03-12',
    description:
      'Celebratory processions led by Won Nyaci and the Queen in magnificent royal blue and gold embroidered vestments, blessing community members and gathering with clan delegations.',
    coverImage: {
      id: 'gal-cover-2',
      url: '/images/won-nyaci-queen-royal-blue.jpg',
      alt: 'Won Nyaci and Queen in royal blue regalia',
      sizes: {
        card: { url: '/images/won-nyaci-queen-royal-blue.jpg', width: 584, height: 524 },
        hero: { url: '/images/won-nyaci-queen-royal-blue.jpg', width: 584, height: 524 },
      },
    },
    images: [
      {
        id: 'img-g2-1',
        image: {
          id: 'g2-1',
          url: '/images/won-nyaci-queen-royal-blue.jpg',
          alt: 'Won Nyaci and Queen in royal blue regalia',
        },
        caption: 'Won Nyaci and Queen waving the royal flywhisk to greeting crowds',
      },
      {
        id: 'img-g2-2',
        image: {
          id: 'g2-2',
          url: '/images/cultural-blessing-ceremony.jpg',
          alt: 'Won Nyaci blessing community elder with flywhisk',
        },
        caption: 'Won Nyaci conferring traditional blessings with the ceremonial flywhisk at cultural gathering',
      },
      {
        id: 'img-g2-3',
        image: {
          id: 'g2-3',
          url: '/images/won-nyaci-community-address.jpg',
          alt: 'Won Nyaci addressing the community',
        },
        caption: 'Won Nyaci in white kanzu and leopard cap addressing community members on peace and unity',
      },
    ],
    createdAt: '2025-03-12T00:00:00.000Z',
    updatedAt: '2025-03-12T00:00:00.000Z',
  },
  {
    id: 'state-engagements-diplomacy',
    title: 'State Engagements & High Council Assemblies',
    album: 'State & Leadership',
    date: '2025-03-25',
    description:
      'High-level diplomatic meetings with head of state, council assemblies of the 149 Awitong clan heads, and institution leadership summits.',
    coverImage: {
      id: 'gal-cover-3',
      url: '/images/won-nyaci-museveni.jpg',
      alt: 'State House meeting with President Museveni',
      sizes: {
        card: { url: '/images/won-nyaci-museveni.jpg', width: 588, height: 390 },
        hero: { url: '/images/won-nyaci-museveni.jpg', width: 588, height: 390 },
      },
    },
    images: [
      {
        id: 'img-g3-1',
        image: {
          id: 'g3-1',
          url: '/images/won-nyaci-museveni.jpg',
          alt: 'President Yoweri Museveni with Won Nyaci Eng. Dr. Michael Moses Odongo Okune',
        },
        caption: 'President Yoweri Kaguta Museveni receiving Won Nyaci at State House for bilateral development talks',
      },
      {
        id: 'img-g3-2',
        image: {
          id: 'g3-2',
          url: '/images/lango-cultural-dignitary.jpg',
          alt: 'Dignitary in official Won Nyaci Me Lango regalia',
        },
        caption: 'Cultural leader in formal robe adorned with the Won Nyaci Me Lango emblem and rhino badge',
      },
      {
        id: 'img-g3-3',
        image: {
          id: 'g3-3',
          url: '/images/cultural-leaders-gathering.jpg',
          alt: 'Elders and clan leaders in traditional regalia',
        },
        caption: 'Council of Clan Chiefs (Awitong) and cultural leaders in joyous consultation',
      },
    ],
    createdAt: '2025-03-25T00:00:00.000Z',
    updatedAt: '2025-03-25T00:00:00.000Z',
  },
  {
    id: 'won-nyaci-run-sports',
    title: 'Won Nyaci Run 2026 & Sports Mobilization',
    album: 'Community & Sports',
    date: '2026-03-20',
    description:
      'Promotional launch and community sports campaign for the 1st Edition of Won Nyaci Run on 24th October 2026.',
    coverImage: {
      id: 'gal-cover-4',
      url: '/images/won-nyaci-run-2026.jpg',
      alt: 'Won Nyaci Run 2026 Poster',
      sizes: {
        card: { url: '/images/won-nyaci-run-2026.jpg', width: 452, height: 678 },
        hero: { url: '/images/won-nyaci-run-2026.jpg', width: 452, height: 678 },
      },
    },
    images: [
      {
        id: 'img-g4-1',
        image: {
          id: 'g4-1',
          url: '/images/won-nyaci-run-2026.jpg',
          alt: 'Won Nyaci Run 2026 1st Edition Poster',
        },
        caption: 'Official poster for the Won Nyaci Run 2026 — 5KM / 10KM / 21KM community run on 24th October 2026',
      },
    ],
    createdAt: '2026-03-20T00:00:00.000Z',
    updatedAt: '2026-03-20T00:00:00.000Z',
  },
]

export const MOCK_CLANS: Clan[] = [
  { id: '1', name: 'Okarowok', symbol: 'Elephant', district: 'lira', clanLeader: 'Awitong Okarowok', createdAt: '', updatedAt: '' },
  { id: '2', name: 'Okulokulum', symbol: 'Leopard', district: 'apac', clanLeader: 'Awitong Okulokulum', createdAt: '', updatedAt: '' },
  { id: '3', name: 'Otek', symbol: 'Rhino (Amuka)', district: 'oyam', clanLeader: 'Awitong Otek', createdAt: '', updatedAt: '' },
  { id: '4', name: 'Barwiny', symbol: 'Buffalo', district: 'kole', clanLeader: 'Awitong Barwiny', createdAt: '', updatedAt: '' },
  { id: '5', name: 'Arak', symbol: 'Eland', district: 'alebtong', clanLeader: 'Awitong Arak', createdAt: '', updatedAt: '' },
  { id: '6', name: 'Ogang', symbol: 'Giraffe', district: 'dokolo', clanLeader: 'Awitong Ogang', createdAt: '', updatedAt: '' },
  { id: '7', name: 'Omia', symbol: 'Hippo', district: 'amolatar', clanLeader: 'Awitong Omia', createdAt: '', updatedAt: '' },
  { id: '8', name: 'Owiny', symbol: 'Lion', district: 'otuke', clanLeader: 'Awitong Owiny', createdAt: '', updatedAt: '' },
  { id: '9', name: 'Ogwal', symbol: 'Crocodile', district: 'kwania', clanLeader: 'Awitong Ogwal', createdAt: '', updatedAt: '' },
  { id: '10', name: 'Abwoc', symbol: 'Monkey', district: 'apac', clanLeader: 'Awitong Abwoc', createdAt: '', updatedAt: '' },
  { id: '11', name: 'Banya', symbol: 'Antelope', district: 'lira', clanLeader: 'Awitong Banya', createdAt: '', updatedAt: '' },
  { id: '12', name: 'Inomo', symbol: 'Eagle', district: 'kwania', clanLeader: 'Awitong Inomo', createdAt: '', updatedAt: '' },
]

export const MOCK_PROGRAMMES: Programme[] = [
  {
    id: 'prog-1',
    title: 'Education & Academic Scholarships',
    slug: 'education-scholarships',
    category: 'education',
    status: 'active',
    summary:
      'The LANGO CULTURAL INSTITUTION secures over 2,000 university and vocational scholarships across Uganda and abroad for young Lango students.',
    highlights: [
      { text: 'Over 2,000 higher education scholarships secured in 2025' },
      { text: 'Partnerships established with 12 Ugandan universities and institutes' },
      { text: 'Vocational sponsorship programmes in technical and mechanical skills' },
    ],
    featuredImage: {
      id: 'img-prog-edu',
      url: '/images/won-nyaci-public-event.jpg',
      alt: 'Education & Scholarships Programme',
      sizes: {
        card: { url: '/images/won-nyaci-public-event.jpg', width: 480, height: 639 },
        hero: { url: '/images/won-nyaci-public-event.jpg', width: 480, height: 639 },
      },
    },
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 'prog-2',
    title: 'Greening Lango Environmental Restoration',
    slug: 'greening-lango',
    category: 'environment',
    status: 'active',
    summary:
      'A transformative conservation project targeting the planting of 1 million indigenous trees to reclaim wetlands and restore native biodiversity.',
    highlights: [
      { text: '1 million trees target across nine districts' },
      { text: 'Wetland demarcation and riverbank bamboo buffers' },
      { text: 'Community woodlots planted at clan cultural centres' },
    ],
    featuredImage: {
      id: 'img-prog-env',
      url: '/images/won-nyaci-community-address.jpg',
      alt: 'Greening Lango Environmental Restoration',
      sizes: {
        card: { url: '/images/won-nyaci-community-address.jpg', width: 554, height: 554 },
        hero: { url: '/images/won-nyaci-community-address.jpg', width: 554, height: 554 },
      },
    },
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 'prog-3',
    title: 'Peace, Clan Harmony & Reconciliation',
    slug: 'peace-reconciliation',
    category: 'peace',
    status: 'active',
    summary:
      'Strengthening peace dialogues, mediating border and land disputes, and fostering absolute unity among all 149 Lango clans.',
    highlights: [
      { text: 'Resolution of multi-district clan border mediation cases' },
      { text: 'Annual Awitong High Council Peace Conclave' },
      { text: 'Inter-ethnic cultural dialogues with neighboring Acholi, Teso, and Kumam' },
    ],
    featuredImage: {
      id: 'img-prog-peace',
      url: '/images/cultural-leaders-gathering.jpg',
      alt: 'Peace and Reconciliation Programme',
      sizes: {
        card: { url: '/images/cultural-leaders-gathering.jpg', width: 588, height: 393 },
        hero: { url: '/images/cultural-leaders-gathering.jpg', width: 588, height: 393 },
      },
    },
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 'prog-4',
    title: 'Women Empowerment & Cultural Dignity',
    slug: 'women-empowerment',
    category: 'women',
    status: 'active',
    summary:
      'Empowering women and girls through enterprise funding, literacy, and eliminating harmful traditional practices while honoring maternal leadership.',
    highlights: [
      { text: 'Community savings and financial literacy groups across all 9 districts' },
      { text: 'Maternal health and girl-child education protection initiatives' },
      { text: 'Protection of women inheritance rights within customary clan frameworks' },
    ],
    featuredImage: {
      id: 'img-prog-women',
      url: '/images/won-nyaci-queen-royal-blue.jpg',
      alt: 'Women Empowerment Initiative',
      sizes: {
        card: { url: '/images/won-nyaci-queen-royal-blue.jpg', width: 584, height: 524 },
        hero: { url: '/images/won-nyaci-queen-royal-blue.jpg', width: 584, height: 524 },
      },
    },
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 'prog-5',
    title: 'Community Health, Wellness & Inclusion (Won Nyaci Run)',
    slug: 'health-community-run',
    category: 'health',
    status: 'active',
    summary:
      'Promoting preventative healthcare, clean water access, and physical wellness through sports like the annual Won Nyaci Run.',
    highlights: [
      { text: 'Flagship Won Nyaci Run on 24th October 2026' },
      { text: 'Mobility support and assistive devices for persons with disabilities' },
      { text: 'Sub-region health camps offering screening and medical aid' },
    ],
    featuredImage: {
      id: 'img-prog-run',
      url: '/images/won-nyaci-run-2026.jpg',
      alt: 'Won Nyaci Run & Health Initiative',
      sizes: {
        card: { url: '/images/won-nyaci-run-2026.jpg', width: 452, height: 678 },
        hero: { url: '/images/won-nyaci-run-2026.jpg', width: 452, height: 678 },
      },
    },
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 'prog-6',
    title: 'Cultural Heritage Documentation & Language Preservation',
    slug: 'cultural-heritage-preservation',
    category: 'cultural',
    status: 'active',
    summary:
      'Digital archiving of Leb Lango language, oral histories, totems of the 149 clans, and customary laws for posterity.',
    highlights: [
      { text: 'Digital audio-visual repository of clan origins and sacred hymns' },
      { text: 'Standardization and publishing of modern Leb Lango curriculum books' },
      { text: 'Restoration of historic battlegrounds and sacred cultural heritage monuments' },
    ],
    featuredImage: {
      id: 'img-prog-heritage',
      url: '/images/coronation-leopard-regalia.jpg',
      alt: 'Cultural Heritage Preservation',
      sizes: {
        card: { url: '/images/coronation-leopard-regalia.jpg', width: 588, height: 465 },
        hero: { url: '/images/coronation-leopard-regalia.jpg', width: 588, height: 465 },
      },
    },
    createdAt: '',
    updatedAt: '',
  },
]

export const MOCK_PAGES: Record<string, SitePage> = {
  about: {
    id: 'page-about',
    title: 'About the LANGO CULTURAL INSTITUTION (Tekwaro Lango)',
    slug: 'about',
    metaDescription:
      'The official cultural institution representing 2.7 million Lango people across nine districts of north-central Uganda.',
    heroImage: {
      id: 'hero-about',
      url: '/images/coronation-leopard-regalia.jpg',
      alt: 'LANGO CULTURAL INSTITUTION Heritage',
      sizes: {
        hero: { url: '/images/coronation-leopard-regalia.jpg', width: 1200, height: 600 },
      },
    },
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'The LANGO CULTURAL INSTITUTION (Tekwaro Lango) is the constitutional cultural body governing and representing the approximately 2.7 million people of the Lango nation in Uganda and the international diaspora.',
                version: 1,
              },
            ],
            version: 1,
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'The Lango people occupy nine districts in north-central Uganda: Alebtong, Amolatar, Apac, Dokolo, Kole, Kwania, Lira, Otuke, and Oyam. The institution is headed by His Highness Eng. Dr. Michael Moses Odongo Okune, who was elected on March 1, 2024, and officially sworn into office on February 5, 2025 as the Won Nyaci me Lango.',
                version: 1,
              },
            ],
            version: 1,
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [
              {
                type: 'text',
                text: 'The Institutional Emblem & Motto',
                version: 1,
              },
            ],
            version: 1,
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'The official emblem of the LANGO CULTURAL INSTITUTION features the sacred Rhino (Amuka) against the backdrop of the rising sun and rolling hills, symbolizing untamed strength, tenacity, resilience, and a bright dawn for the Lango people.',
                version: 1,
              },
            ],
            version: 1,
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Beneath the emblem lies the sacred national motto: “NOTE EN TEKOWA” (Unity is Our Strength). The tri-color banner represents the national colors of Lango: Black representing the people, Red honoring the sacred lineage, sacrifice, and ancestral heritage, and Yellow symbolizing sunshine, agricultural abundance, and enduring prosperity.',
                version: 1,
              },
            ],
            version: 1,
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [
              {
                type: 'text',
                text: 'The 149 Registered Clans & Council of Awitong',
                version: 1,
              },
            ],
            version: 1,
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Lango society is structured around 149 registered clans. Each clan is headed by an Awitong (Supreme Clan Chief) and possesses a unique animal or natural totem, origin oral history, and traditional territory. The Council of Awitong serves as the supreme legislative and consultative assembly of the LANGO CULTURAL INSTITUTION.',
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
    status: 'published',
    createdAt: '',
    updatedAt: '',
  },
  governance: {
    id: 'page-governance',
    title: 'Governance Structure — LANGO CULTURAL INSTITUTION',
    slug: 'governance',
    metaDescription:
      'The administrative and cultural governance framework of the LANGO CULTURAL INSTITUTION.',
    heroImage: {
      id: 'hero-gov',
      url: '/images/won-nyaci-throne.jpg',
      alt: 'LCI Royal Governance',
      sizes: {
        hero: { url: '/images/won-nyaci-throne.jpg', width: 1200, height: 600 },
      },
    },
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'The governance of the LANGO CULTURAL INSTITUTION is structured to harmonize traditional authority with modern administrative accountability.',
                version: 1,
              },
            ],
            version: 1,
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: '1. The Won Nyaci (Paramount Chief): The titular head and spiritual father of the Lango nation.\n2. The Prime Minister: Heads the Cabinet and executive operations.\n3. The High Council of Awitong: Comprises the clan chiefs of all 149 clans.\n4. The 11 Executive Ministries: Education, Health, Environment, Culture, Peace, Women, Youth, Investment, Works, Information, and Finance.',
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
    status: 'published',
    createdAt: '',
    updatedAt: '',
  },
  contact: {
    id: 'page-contact',
    title: 'Contact LANGO CULTURAL INSTITUTION',
    slug: 'contact',
    metaDescription:
      'Connect with the headquarters and secretariats of the LANGO CULTURAL INSTITUTION in Lira City.',
    heroImage: {
      id: 'hero-contact',
      url: '/images/won-nyaci-community-address.jpg',
      alt: 'Contact LCI',
      sizes: {
        hero: { url: '/images/won-nyaci-community-address.jpg', width: 1200, height: 600 },
      },
    },
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Institutional Headquarters:\nLango Cultural Palace & Administrative Complex\nLira City, Lango Sub-Region, Uganda\n\nEmail: info@lci.or.ug\nPhone: +256 414 123 456\nHours: Monday – Friday, 8:30 AM – 5:00 PM EAT',
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
    status: 'published',
    createdAt: '',
    updatedAt: '',
  },
}
