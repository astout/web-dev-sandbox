/* eslint-disable jsx-a11y/media-has-caption */
import { useState, useEffect } from 'react'
import _ from 'lodash'
import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import SectionContainer from '@/components/SectionContainer'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/components/Logo'
import Footer from '@/components/Footer'
import VideoBackground from '@/components/VideoBackground'
import useDevice from '@/lib/useDevice'
import { remoteVideosRoot } from '@/data/siteMetadata'

const VideoFilePrefix = 'alexhacks-homepage-bg-video'

function isDev(env) {
  return env === 'development'
}

export default function Home() {
  const [showInstallLink, setShowInstallLink] = useState(false)
  const device = useDevice()
  const [bgVideoFile, setBgVideoFile] = useState(VideoFilePrefix)
  const [env, setEnv] = useState()

  useEffect(() => {
    if (device.isMobile || device.isIos) {
      setBgVideoFile(`${VideoFilePrefix}-mobile`)
    }
    setShowInstallLink(device.isIos && !device.isPwa)
  }, [device])

  useEffect(() => {
    setEnv(process.env.NODE_ENV)
  }, [])

  // const onVideoPlay = (event) => {
  //   console.log('play')
  // }

  // const onVideoPause = (event) => {
  //   console.log('pause')
  // }

  return (
    <div onTouchMove={() => {}}>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <VideoBackground
        mp4Url={`${remoteVideosRoot}/${bgVideoFile}.mp4`}
        webmUrl={`${remoteVideosRoot}/${bgVideoFile}.webm`}
        // onPlay={onVideoPlay}
        // onPause={onVideoPause}
      />
      <SectionContainer>
        <div className="flex flex-col justify-between h-screen">
          <div className="grid place-items-center h-screen">
            <div className="flex grid grid-cols-1 content-center h-auto md:w-9/12 sm:w-full">
              <header className={`flex h-full py-10`}>
                <Link href="/" aria-label={siteMetadata.headerTitle} className="m-auto h-full">
                  <div className="flex items-center">
                    <div className="mr-4 mt-5">
                      <Logo width={95} />
                    </div>
                    {typeof siteMetadata.headerTitle === 'string' ? (
                      <div className="h-6 text-5xl text-gray-200 font-semibold">
                        {siteMetadata.headerTitle}
                      </div>
                    ) : (
                      siteMetadata.headerTitle
                    )}
                  </div>
                </Link>
              </header>
              <div
                id="index-nav"
                className="flex items-center content-center text-base w-full grid grid-cols-1"
              >
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
                  .map((link, i) => (
                    <Link
                      id={`index-nav-tab-${i}`}
                      key={link.title}
                      href={link.href}
                      className="index-nav-tab p-1 font-medium text-gray-900 sm:p-4 dark:text-gray-100"
                    >
                      {link.title}
                    </Link>
                  ))}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </SectionContainer>
    </div>
  )
}
