import { useState, useEffect } from 'react'
import _ from 'lodash'

export const sizes = {
  tablet: 768,
  laptop: 992,
  desktop: 1170,
}

const getPlatform = () => {
  return _.get(window, 'navigator.platform', 'unknown')
}

const getUserAgent = () => {
  return _.get(window, 'navigator.userAgent', 'unknown')
}

// NOTE: Only use these methods when the dom is loaded!
const isIos = () => {
  let userAgent = getUserAgent()
  userAgent = userAgent.toLowerCase()
  return /iphone|ipad|ipod/.test(userAgent)
}

const isPWA = () => _.get(window, 'navigator.standalone', false)

const isTouchDevice = () => {
  let hasTouchScreen = false
  if ('maxTouchPoints' in navigator) {
    hasTouchScreen = navigator.maxTouchPoints > 0
  } else if ('msMaxTouchPoints' in navigator) {
    hasTouchScreen = navigator.msMaxTouchPoints > 0
  } else {
    var mQ = window.matchMedia && matchMedia('(pointer:coarse)')
    if (mQ && mQ.media === '(pointer:coarse)') {
      hasTouchScreen = !!mQ.matches
    } else if ('orientation' in window) {
      hasTouchScreen = true // deprecated, but good fallback
    } else {
      // Only as a last resort, fall back to user agent sniffing
      const UA = navigator.userAgent
      hasTouchScreen =
        /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
        /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
    }
  }
  return hasTouchScreen
}

export default function useDevice(breakpoints = sizes) {
  const [device, setDevice] = useState({})

  useEffect(() => {
    const onResize = () => {
      const isMobile = window.innerWidth < breakpoints.tablet
      const isTablet = !isMobile && window.innerWidth < breakpoints.laptop
      const isLaptop =
        window.innerWidth >= breakpoints.laptop && window.innerWidth < breakpoints.desktop
      const isDesktop = window.innerWidth > breakpoints.laptop
      setDevice({
        isMobile: isMobile,
        isTablet: isTablet,
        isLaptop: isLaptop,
        isDesktop: isDesktop,
        isTouchDevice: isTouchDevice(),
        isPwa: isPWA(),
        isIos: isIos(),
        userAgent: getUserAgent(),
        platform: getPlatform(),
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    window.addEventListener('resize', onResize)
    onResize()
    return () => window.removeEventListener('resize', onResize)
  }, [breakpoints])

  return device || {}
}
