import '@/css/tailwind.css'
import '@/css/prism.css'
import '@/css/global.css'
// import '@/css/video-js.min.css'
import '@/css/videojs-alexhacks.css'
import '@/css/index-nav.css'
import 'video.js/dist/video-js.css'

import { useState, useEffect } from 'react'
import { useRoute } from '@/lib/useQuery'

import { ThemeProvider } from 'next-themes'
import Head from 'next/head'

import Analytics from '@/components/analytics'
import LayoutWrapper from '@/components/LayoutWrapper'
import { ClientReload } from '@/components/ClientReload'
import { CircleLoader } from 'react-spinners'

const isDevelopment = process.env.NODE_ENV === 'development'

export default function App({ Component, pageProps }) {
  const route = useRoute()
  const [useLayout, setUseLayout] = useState(true)

  useEffect(() => {
    setUseLayout(!['/', '/index.html'].includes(route))
  }, [route])

  return (
    <ThemeProvider attribute="class">
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </Head>
      {isDevelopment && <ClientReload />}
      <Analytics />
      {/* <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper> */}
      {useLayout ? (
        <LayoutWrapper>
          <CircleLoader />
          <Component {...pageProps} />
        </LayoutWrapper>
      ) : (
        <Component {...pageProps} />
      )}
    </ThemeProvider>
  )
}
