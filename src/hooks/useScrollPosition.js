import { useState, useEffect } from 'react'

/**
 * Custom hook to track window scroll position.
 */
export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrollY
}

/**
 * Returns true when the page has scrolled past a threshold.
 */
export function useScrolled(threshold = 60) {
  const scrollY = useScrollPosition()
  return scrollY > threshold
}

