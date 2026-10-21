import type { Navigation, SiteSettings } from '@/lib/types'
import { fetchAPI } from '@/lib/api'
import { MOCK_SITE_SETTINGS } from '@/lib/mockData'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

async function getGlobals(): Promise<{
  navigation: Navigation | null
  siteSettings: SiteSettings | null
}> {
  const [navigation, siteSettings] = await Promise.all([
    fetchAPI<Navigation>('/api/globals/navigation', { next: { revalidate: 3600 } }),
    fetchAPI<SiteSettings>('/api/globals/site-settings', { next: { revalidate: 3600 } }),
  ])
  return {
    navigation,
    siteSettings: siteSettings ?? MOCK_SITE_SETTINGS,
  }
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const { navigation, siteSettings } = await getGlobals()

  return (
    <>
      <Navbar navItems={navigation?.mainNav} />
      <main>{children}</main>
      <Footer footerNav={navigation?.footerNav} siteSettings={siteSettings} />
    </>
  )
}
