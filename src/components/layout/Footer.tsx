import Link from 'next/link'
import type { NavItem, SiteSettings } from '@/lib/types'

// Fallback quick links used when the navigation global isn't available
const FALLBACK_FOOTER_NAV: NavItem[] = [
  { label: 'Home',           url: '/' },
  { label: 'About LCF',      url: '/about' },
  { label: 'News',           url: '/news' },
  { label: 'Activities',     url: '/activities' },
  { label: 'Programmes',     url: '/programmes' },
  { label: 'Leadership',     url: '/leadership' },
  { label: 'Gallery',        url: '/gallery' },
  { label: 'Clan Directory', url: '/clans' },
  { label: 'Governance',     url: '/governance' },
  { label: 'Contact',        url: '/contact' },
]

const DISTRICTS = [
  'Alebtong', 'Amolatar', 'Apac',
  'Dokolo', 'Kole', 'Kwania',
  'Lira', 'Otuke', 'Oyam',
]

interface FooterProps {
  footerNav?: NavItem[]
  siteSettings?: SiteSettings | null
}

export default function Footer({ footerNav, siteSettings }: FooterProps) {
  const links = footerNav && footerNav.length > 0 ? footerNav : FALLBACK_FOOTER_NAV

  const instagramUrl = siteSettings?.instagramUrl ?? 'https://www.instagram.com/langoinstitute'
  const facebookUrl  = siteSettings?.facebookUrl  ?? 'https://www.facebook.com/LangoCommunityNA'
  const siteName     = siteSettings?.siteName     ?? 'Lango Cultural Foundation'
  const tagline      = siteSettings?.tagline      ?? 'Preserving, documenting, and promoting the heritage of the Lango people of Uganda.'

  // Extract the Instagram handle for display (strip URL down to @handle)
  const igHandle = instagramUrl.replace(/.*instagram\.com\//, '@').replace(/\/$/, '')
  const fbHandle = facebookUrl.replace(/.*facebook\.com\//, '').replace(/\/$/, '')

  return (
    <footer style={{ backgroundColor: 'var(--color-earth)', color: 'var(--color-cream)' }}>
      {/* Ochre top stripe */}
      <div className="h-[3px]" style={{ backgroundColor: 'var(--color-ochre)' }} />

      {/* Pattern band */}
      <div
        className="h-10 lango-pattern-light opacity-60"
        style={{ backgroundColor: 'var(--color-forest-deep)' }}
      />

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">

          {/* Column 1 — Brand & About */}
          <div className="flex flex-col gap-5">
            <div>
              <h2
                className="text-2xl font-600 tracking-widest uppercase leading-tight"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-cream)' }}
              >
                {siteName.includes('Foundation')
                  ? siteName.replace('Foundation', '\nFoundation').split('\n').map((part, i) => (
                      <span key={i}>{part}{i === 0 && <br />}</span>
                    ))
                  : siteName}
              </h2>
              <div className="flex items-center gap-1.5 mt-2.5">
                <div className="h-px w-6" style={{ backgroundColor: 'var(--color-ochre)' }} />
                <div className="w-1 h-1 rotate-45" style={{ backgroundColor: 'var(--color-ochre)', flexShrink: 0 }} />
                <div className="h-px w-6" style={{ backgroundColor: 'var(--color-ochre)' }} />
              </div>
            </div>

            <p
              className="text-sm leading-relaxed"
              style={{ color: 'rgba(245,239,224,0.65)', fontFamily: 'var(--font-body)' }}
            >
              {tagline}
            </p>

            <p
              className="text-xs tracking-wide uppercase"
              style={{ color: 'var(--color-ochre-light)', fontFamily: 'var(--font-body)' }}
            >
              Won Nyaci: Eng. Dr. Michael Moses Odongo Okune
            </p>

            {/* Contact */}
            {(siteSettings?.contactEmail || siteSettings?.contactPhone) && (
              <div className="flex flex-col gap-1.5">
                {siteSettings.contactEmail && (
                  <a
                    href={`mailto:${siteSettings.contactEmail}`}
                    className="text-sm hover:underline"
                    style={{ color: 'rgba(245,239,224,0.55)' }}
                  >
                    {siteSettings.contactEmail}
                  </a>
                )}
                {siteSettings.contactPhone && (
                  <a
                    href={`tel:${siteSettings.contactPhone}`}
                    className="text-sm hover:underline"
                    style={{ color: 'rgba(245,239,224,0.55)' }}
                  >
                    {siteSettings.contactPhone}
                  </a>
                )}
              </div>
            )}

            {/* Social links */}
            <div className="flex flex-col gap-2 mt-1">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm group"
                style={{ color: 'rgba(245,239,224,0.65)' }}
              >
                <span
                  className="text-[0.65rem] tracking-widest uppercase border px-2 py-0.5"
                  style={{ borderColor: 'rgba(196,132,42,0.35)', color: 'var(--color-ochre-light)' }}
                >
                  IG
                </span>
                <span className="group-hover:underline">{igHandle}</span>
              </a>
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm group"
                style={{ color: 'rgba(245,239,224,0.65)' }}
              >
                <span
                  className="text-[0.65rem] tracking-widest uppercase border px-2 py-0.5"
                  style={{ borderColor: 'rgba(196,132,42,0.35)', color: 'var(--color-ochre-light)' }}
                >
                  FB
                </span>
                <span className="group-hover:underline">{fbHandle}</span>
              </a>
            </div>
          </div>

          {/* Column 2 — Quick Links (dynamic from footerNav global) */}
          <div>
            <h3
              className="text-[0.65rem] tracking-[0.18em] uppercase mb-5"
              style={{ color: 'var(--color-ochre)', fontFamily: 'var(--font-body)' }}
            >
              Quick Links
            </h3>
            <ul className="flex flex-col gap-0">
              {links.map(({ label, url }) => (
                <li key={url + label}>
                  <Link
                    href={url}
                    className="flex items-center gap-2 py-2 text-sm border-b transition-colors group"
                    style={{
                      borderColor: 'rgba(245,239,224,0.06)',
                      color: 'rgba(245,239,224,0.65)',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    <span
                      className="text-[0.6rem] transition-transform group-hover:translate-x-0.5"
                      style={{ color: 'var(--color-ochre)' }}
                    >
                      ◆
                    </span>
                    <span className="group-hover:text-cream transition-colors">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Districts */}
          <div>
            <h3
              className="text-[0.65rem] tracking-[0.18em] uppercase mb-5"
              style={{ color: 'var(--color-ochre)', fontFamily: 'var(--font-body)' }}
            >
              Districts Served
            </h3>
            <p
              className="text-xs mb-4 leading-relaxed"
              style={{ color: 'rgba(245,239,224,0.5)' }}
            >
              Lango Cultural Foundation serves ~2.7 million people across nine districts of
              north-central Uganda.
            </p>
            <ul className="grid grid-cols-3 gap-x-2 gap-y-2">
              {DISTRICTS.map((district) => (
                <li
                  key={district}
                  className="text-xs py-1.5 px-2 text-center"
                  style={{
                    color: 'rgba(245,239,224,0.75)',
                    border: '1px solid rgba(196,132,42,0.15)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {district}
                </li>
              ))}
            </ul>

            {siteSettings?.address && (
              <p
                className="mt-6 text-xs leading-relaxed"
                style={{ color: 'rgba(245,239,224,0.4)' }}
              >
                {siteSettings.address}
              </p>
            )}

            <div className="mt-6 pt-5" style={{ borderTop: '1px solid rgba(245,239,224,0.08)' }}>
              <p
                className="text-xs leading-relaxed"
                style={{ color: 'rgba(245,239,224,0.35)' }}
              >
                Domains: lcf.or.ug · langoculturalfoundation.org
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div style={{ borderTop: '1px solid rgba(245,239,224,0.08)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="text-xs"
            style={{ color: 'rgba(245,239,224,0.38)', fontFamily: 'var(--font-body)' }}
          >
            © {new Date().getFullYear()} {siteName}. All rights reserved.
          </p>
          <p
            className="text-xs"
            style={{ color: 'rgba(245,239,224,0.22)', fontFamily: 'var(--font-body)' }}
          >
            Preserving Lango heritage since time immemorial.
          </p>
        </div>
      </div>
    </footer>
  )
}
