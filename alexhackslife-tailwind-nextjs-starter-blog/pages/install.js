import React, { useEffect, useState } from 'react'
import Link from '@/components/Link'
import Image from '@/components/Image'
import InstallAppIos from '@/components/InstallAppIos'
import useDevice from '@/lib/useDevice'

function desktopInstallPage() {
  return (
    <div>
      <p align="center">
        <Image
          src="/static/images/404.gif"
          alt="What are you doing here?"
          style={{ width: '25em' }}
        />
      </p>
      <p align="center" style={{ marginTop: '1em' }}>
        Open this page on your mobile device to install the app.
      </p>
      <div className="flex flex-col items-center">
        <Link href="/">
          <button className="m-4 px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-green-600 border border-transparent rounded-lg shadow focus:outline-none focus:shadow-outline-green hover:bg-green-700 dark:hover:bg-green-500">
            Back to homepage
          </button>
        </Link>
      </div>
    </div>
  )
}

const InstallPage = () => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const device = useDevice()

  if (mounted && device.isIos) {
    return <InstallAppIos popupMode={false} />
  } else {
    return desktopInstallPage()
  }
}

export default InstallPage
