import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | Lango Cultural Institution',
    default: 'Lango Cultural Institution',
  },
  description:
    'The official website of the Lango Cultural Foundation — preserving, documenting, and promoting the heritage of the Langi people of Uganda.',
  keywords: ['Lango', 'Langi', 'Uganda', 'cultural institution', 'Won Nyaci', 'Lira', 'LCF'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
