import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | Lango Cultural Foundation',
    default: 'Lango Cultural Foundation',
  },
  description:
    'The official website of the Lango Cultural Foundation — preserving, documenting, and promoting the heritage of the Langi people of Uganda.',
  keywords: ['Lango', 'Langi', 'Uganda', 'cultural institution', 'Won Nyaci', 'Lira', 'LCF'],
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
