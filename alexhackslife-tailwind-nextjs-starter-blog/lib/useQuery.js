import { useRouter } from 'next/router'

// Resolves query or returns null
function useQuery() {
  const router = useRouter()
  const hasQueryParams = /\[.+\]/.test(router.route) || /\?./.test(router.asPath)
  const ready = !hasQueryParams || Object.keys(router.query).length > 0
  if (!ready) return null
  return router.query
}

function useRoute() {
  const router = useRouter()
  if (router.route.startsWith('/')) {
    return router.route
  }
  if (router.asPath.startsWith('/')) {
    return router.asPath
  }
}

export { useQuery, useRoute }
