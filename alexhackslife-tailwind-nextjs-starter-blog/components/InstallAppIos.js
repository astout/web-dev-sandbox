import { useState, useEffect } from 'react'
import Image from '@/components/Image'

const renderCard = (onDismiss, popupMode) => (
  <div className={'install-pwa-ios-card w-full' + (popupMode ? ' fixed bottom-0 pr-8' : '')}>
    <div className="w-full bg-gray-700 rounded-lg shadow-lg p-6 flex flex-col">
      <div className={popupMode ? '' : 'invisible'}>
        <span
          className="h-6 w-6 float-right"
          onClick={() => {
            onDismiss()
          }}
          role="button"
          tabIndex={0}
          onKeyDown={() => {
            onDismiss()
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </span>
      </div>
      <div className="mb-8 flex flex-col items-center">
        <p className="text-xl text-white font-bold mb-4">Install the App!</p>
        <Image
          className="object-center h-28 w-28"
          src="/static/favicons/apple-touch-icon.png"
          alt="AlexHacks.Life App Icon"
        />
      </div>
      <div className="text-center flex flex-col items-center">
        <p className="text-l text-white mb-2">
          Tap the Safari share{' '}
          <Image
            className="w-4 inline mb-1 mx-2"
            src="/static/icons/ios-share-icon.png"
            alt="iOS Share Icon"
          />{' '}
          button
        </p>
        <p className="text-l text-white mb-2">Then tap "Add to Home Screen"</p>
        <Image
          className="w-full m-2"
          src="/static/icons/ios-add-to-home-screen-bar.png"
          alt="iOS Add to Home Screen"
        />
      </div>
    </div>
  </div>
)

const InstallAppIos = (props) => {
  const { showLimit = 1, popupMode = true } = props
  const [mounted, setMounted] = useState(false)
  const [showCount, setShowCount] = useState(0)
  useEffect(() => setMounted(true), [])
  const onDismiss = () => setShowCount(showCount + 1)

  if (mounted && showCount < showLimit) {
    return renderCard(onDismiss, popupMode)
  }
  return <></>
}

export default InstallAppIos
