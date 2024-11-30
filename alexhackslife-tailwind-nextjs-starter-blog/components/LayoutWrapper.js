import siteMetadata from '@/data/siteMetadata'
import { useState, useEffect } from 'react'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from './Logo'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import _ from 'lodash'
import useDevice from '@/lib/useDevice'
import { useRoute } from '@/lib/useQuery'

function isDev(env) {
  return env === 'development'
}

const LayoutWrapper = ({ children }) => {
  const [showInstallLink, setShowInstallLink] = useState(false)
  const [isInstallPage, setIsInstallPage] = useState(false)
  const [env, setEnv] = useState()
  const route = useRoute()
  const device = useDevice()

  useEffect(() => {
    setShowInstallLink(device.isIos && !device.isPwa && !isInstallPage)
  }, [isInstallPage, device])

  useEffect(() => {
    setIsInstallPage(route === '/install')
  }, [route])

  useEffect(() => {
    setEnv(process.env.NODE_ENV)
  }, [])

  return (
    <SectionContainer>
      <div className="flex flex-col justify-between h-screen">
        <header className="flex items-center justify-between py-10">
          <div>
            <Link href="/" aria-label="Alex-Stout">
              <div className="flex items-center justify-between">
                <div className="mr-3">
                  <Logo width={75} />
                </div>
                {typeof siteMetadata.headerTitle === 'string' ? (
                  <div className="hidden h-6 text-2xl font-semibold sm:block">
                    {siteMetadata.headerTitle}
                  </div>
                ) : (
                  siteMetadata.headerTitle
                )}
              </div>
            </Link>
          </div>
          <div className="flex items-center text-base leading-5">
            <div className="hidden lg:block">
              {headerNavLinks
                .filter((link) => {
                  if (link.mobileOnly === true && !showInstallLink) {
                    return false
                  }
                  if (!isDev(env) && link.devOnly) {
                    return false
                  }
                  return true
                })
                .map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="p-1 font-medium text-gray-900 sm:p-4 dark:text-gray-100"
                  >
                    {link.title}
                  </Link>
                ))}
            </div>
            <ThemeSwitch />
            <MobileNav />
          </div>
        </header>
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
