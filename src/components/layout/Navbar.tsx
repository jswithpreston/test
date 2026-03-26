'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import type { NavItem } from '@/lib/types'

// Fallback nav used when the navigation global isn't available yet
const FALLBACK_NAV: NavItem[] = [
  { label: 'Home',        url: '/' },
  { label: 'About',       url: '/about' },
  { label: 'News',        url: '/news' },
  { label: 'Activities',  url: '/activities' },
  { label: 'Programmes',  url: '/programmes' },
  { label: 'Leadership',  url: '/leadership' },
  { label: 'Gallery',     url: '/gallery' },
  { label: 'Clans',       url: '/clans' },
]

interface NavbarProps {
  navItems?: NavItem[]
}

export default function Navbar({ navItems }: NavbarProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const items = navItems && navItems.length > 0 ? navItems : FALLBACK_NAV

  const isActive = (url: string) =>
    url === '/' ? pathname === '/' : pathname.startsWith(url)

  const toggleDropdown = (label: string) =>
    setOpenDropdown((prev) => (prev === label ? null : label))

  return (
    <header className="sticky top-0 z-50" style={{ backgroundColor: 'var(--color-forest-deep)' }}>
      {/* Ochre accent stripe */}
      <div className="h-[3px]" style={{ backgroundColor: 'var(--color-ochre)' }} />

      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-[4.5rem]">

          {/* Brand */}
          <Link
            href="/"
            className="flex flex-col leading-none group"
            onClick={() => { setMobileOpen(false); setOpenDropdown(null) }}
          >
            <span
              className="text-lg md:text-xl font-600 tracking-wider uppercase group-hover:opacity-90 transition-opacity"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--color-cream)',
                letterSpacing: '0.08em',
              }}
            >
              Lango Cultural
            </span>
            <span
              className="text-[0.6rem] tracking-[0.22em] uppercase"
              style={{ color: 'var(--color-ochre-light)', fontFamily: 'var(--font-body)' }}
            >
              Foundation · Uganda
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-7">
            {items.map((item) => {
              const hasChildren = item.children && item.children.length > 0
              const active = isActive(item.url)

              return (
                <li key={item.label} className="relative group">
                  <div className="flex items-center gap-0.5">
                    <Link
                      href={item.url}
                      className={`nav-link text-[0.72rem] tracking-[0.1em] uppercase font-500`}
                      style={{
                        color: active ? 'var(--color-cream)' : 'rgba(245,239,224,0.72)',
                        fontFamily: 'var(--font-body)',
                      }}
                      aria-current={active ? 'page' : undefined}
                    >
                      {item.label}
                    </Link>
                    {hasChildren && (
                      <span
                        className="text-[0.55rem] ml-0.5 transition-transform duration-200 group-hover:rotate-180"
                        style={{ color: 'var(--color-ochre)', display: 'inline-block' }}
                      >
                        ▾
                      </span>
                    )}
                  </div>

                  {/* Dropdown */}
                  {hasChildren && (
                    <ul
                      className="absolute top-full left-0 min-w-[200px] py-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50"
                      style={{
                        backgroundColor: 'var(--color-forest)',
                        border: '1px solid rgba(196,132,42,0.2)',
                        marginTop: '2px',
                        boxShadow: '0 8px 24px rgba(16,36,19,0.35)',
                      }}
                    >
                      {item.children!.map((child) => (
                        <li key={child.label}>
                          <Link
                            href={child.url}
                            className="flex items-center gap-2 px-4 py-2.5 text-[0.72rem] tracking-wide transition-colors"
                            style={{
                              color: 'rgba(245,239,224,0.75)',
                              fontFamily: 'var(--font-body)',
                              borderBottom: '1px solid rgba(245,239,224,0.05)',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = 'var(--color-cream)'
                              e.currentTarget.style.backgroundColor = 'rgba(196,132,42,0.1)'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = 'rgba(245,239,224,0.75)'
                              e.currentTarget.style.backgroundColor = 'transparent'
                            }}
                          >
                            <span style={{ color: 'var(--color-ochre)', fontSize: '0.5rem' }}>◆</span>
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 cursor-pointer"
          >
            <span
              className="block h-px w-full transition-all duration-300"
              style={{
                backgroundColor: 'var(--color-cream)',
                transform: mobileOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none',
              }}
            />
            <span
              className="block h-px w-full transition-all duration-300"
              style={{
                backgroundColor: 'var(--color-cream)',
                opacity: mobileOpen ? 0 : 1,
              }}
            />
            <span
              className="block h-px w-full transition-all duration-300"
              style={{
                backgroundColor: 'var(--color-cream)',
                transform: mobileOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden animate-slide-down border-t"
          style={{
            backgroundColor: 'var(--color-forest)',
            borderColor: 'rgba(196,132,42,0.2)',
          }}
        >
          <ul className="max-w-7xl mx-auto px-6 py-3 flex flex-col">
            {items.map((item) => {
              const hasChildren = item.children && item.children.length > 0
              const isDropOpen = openDropdown === item.label

              return (
                <li key={item.label}>
                  <div
                    className="flex items-center justify-between py-3.5 border-b"
                    style={{ borderColor: 'rgba(245,239,224,0.07)' }}
                  >
                    <Link
                      href={item.url}
                      onClick={() => setMobileOpen(false)}
                      style={{
                        color: isActive(item.url) ? 'var(--color-ochre-light)' : 'var(--color-cream)',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9375rem',
                        fontWeight: 500,
                        flex: 1,
                      }}
                    >
                      {item.label}
                    </Link>
                    {hasChildren ? (
                      <button
                        onClick={() => toggleDropdown(item.label)}
                        className="px-2 py-1 text-xs"
                        style={{
                          color: 'var(--color-ochre)',
                          transform: isDropOpen ? 'rotate(180deg)' : 'none',
                          transition: 'transform 0.2s',
                        }}
                      >
                        ▾
                      </button>
                    ) : (
                      <span style={{ color: 'var(--color-ochre)', opacity: 0.6, fontSize: '0.8rem' }}>→</span>
                    )}
                  </div>

                  {/* Mobile sub-items */}
                  {hasChildren && isDropOpen && (
                    <ul className="pl-4 py-1" style={{ backgroundColor: 'rgba(16,36,19,0.3)' }}>
                      {item.children!.map((child) => (
                        <li key={child.label}>
                          <Link
                            href={child.url}
                            onClick={() => { setMobileOpen(false); setOpenDropdown(null) }}
                            className="flex items-center gap-2 py-2.5 text-sm border-b"
                            style={{
                              color: 'rgba(245,239,224,0.7)',
                              borderColor: 'rgba(245,239,224,0.05)',
                              fontFamily: 'var(--font-body)',
                            }}
                          >
                            <span style={{ color: 'var(--color-ochre)', fontSize: '0.5rem' }}>◆</span>
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </header>
  )
}
