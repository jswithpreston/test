import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | LANGO CULTURAL INSTITUTION',
    default: 'LANGO CULTURAL INSTITUTION',
  },
  description:
    'The official website of the LANGO CULTURAL INSTITUTION — preserving, documenting, and promoting the heritage of the Lango people of Uganda.',
  keywords: ['Lango', 'Tekwaro Lango', 'LANGO CULTURAL INSTITUTION', 'Uganda', 'cultural institution', 'Won Nyaci', 'Lira', 'LCI'],
  icons: {
    icon: '/images/logo.jpeg',
    shortcut: '/images/logo.jpeg',
    apple: '/images/logo.jpeg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  )
}
