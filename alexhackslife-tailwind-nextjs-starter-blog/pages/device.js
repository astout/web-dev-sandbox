import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import DeviceInfoTable from '@/components/DeviceInfoTable'

export default function Device() {
  return (
    <>
      <PageSEO title={`Device - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Device
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            This page is used for development to show what we can detect about your device for
            providing the best UI and User Experience.
          </p>
        </div>
        <DeviceInfoTable />
      </div>
    </>
  )
}
