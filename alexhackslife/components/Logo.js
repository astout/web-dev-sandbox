import Image from './Image'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

const Logo = (props) => {
  const [mounted, setMounted] = useState(false)
  const { theme, resolvedTheme } = useTheme()
  useEffect(() => setMounted(true), [])
  const src =
    mounted && (theme === 'light' || resolvedTheme === 'light')
      ? '/static/images/logo-light.png'
      : '/static/images/logo.png'
  return <Image src={src} alt="Thumbs Up Logo" {...props} />
}

export default Logo
