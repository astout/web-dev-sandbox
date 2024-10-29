import Link from '@/components/Link'
import Router from 'next/router'
import { useEffect, useState } from 'react'

function render404() {
  return (
    <div className="flex flex-col items-start justify-start md:justify-center md:items-center md:flex-row md:space-x-6 md:mt-24">
      <div className="pt-6 pb-8 space-x-2 md:space-y-5">
        <h1 className="text-6xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 md:text-8xl md:leading-14 md:border-r-2 md:px-6">
          404
        </h1>
      </div>
      <div className="max-w-md">
        <p className="mb-4 text-xl font-bold leading-normal md:text-2xl">
          Sorry we couldn't find this page.
        </p>
        <p className="mb-8">But dont worry, you can find plenty of other things on our homepage.</p>
        <Link href="/">
          <button className="inline px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-green-600 border border-transparent rounded-lg shadow focus:outline-none focus:shadow-outline-green hover:bg-green-700 dark:hover:bg-green-500">
            Back to homepage
          </button>
        </Link>
      </div>
    </div>
  )
}

export default function Custom404() {
  const [isNotFound, setIsNotFound] = useState(false)

  useEffect(() => {
    // we are only deploying this site as client-side static generated
    // if there is a request for some subroute that doesn't have the .html
    // the nextjs router won't be run, so we can just feed the .html page
    if (!window.location.pathname.endsWith('.html')) {
      Router.replace(`${window.location.pathname}.html`) // show the html render
    } else {
      setIsNotFound(true) // if ultimately the page doesn't exist, we'll show the 404 rendering
    }
  }, [])

  if (isNotFound) {
    return render404()
  }

  return null
}
