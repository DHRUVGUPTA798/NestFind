import { mockProperties } from '../data/mock/properties'

// Browser localStorage adapter for the demo-only property and wishlist services.
const PROPERTY_KEY = 'nextfind.demo.properties.v1'
const WISHLIST_KEY = 'nextfind.demo.wishlist.v1'

function readJson(key, fallback) {
  try {
    const value = window.localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

export const demoPersistence = {
  readProperties() {
    const saved = typeof window === 'undefined' ? null : readJson(PROPERTY_KEY, null)
    return Array.isArray(saved) ? saved : [...mockProperties]
  },
  writeProperties(properties) {
    if (typeof window === 'undefined') throw new Error('Demo persistence is unavailable.')
    window.localStorage.setItem(PROPERTY_KEY, JSON.stringify(properties))
  },
  readWishlist() {
    const saved = typeof window === 'undefined' ? null : readJson(WISHLIST_KEY, [])
    return Array.isArray(saved) ? [...new Set(saved.map(String))] : []
  },
  writeWishlist(ids) {
    if (typeof window === 'undefined') throw new Error('Demo persistence is unavailable.')
    window.localStorage.setItem(WISHLIST_KEY, JSON.stringify([...new Set(ids.map(String))]))
  },
}
