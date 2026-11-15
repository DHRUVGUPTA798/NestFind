import { mockProperties } from '../data/mock/properties'

// Browser localStorage adapter for the demo-only property and wishlist services.
const PROPERTY_KEY = 'nextfind.demo.properties.v1'
const WISHLIST_KEY = 'nextfind.demo.wishlist.v1'
const WISHLIST_MIGRATION_KEY = 'nextfind.demo.wishlist.migrated.v1'

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
    if (!Array.isArray(saved)) return [...mockProperties]

    const byId = new Map(mockProperties.map((property) => [String(property.id), property]))
    const seenSaved = new Set()
    const malformed = []
    for (const property of saved) {
      if (!property || property.id == null || typeof property.title !== 'string' || typeof property.location?.city !== 'string' || !property.location.city.trim()) {
        malformed.push(property)
        continue
      }
      const id = String(property.id)
      if (seenSaved.has(id)) {
        malformed.push({ ...property, _reason: 'duplicate id' })
        continue
      }
      seenSaved.add(id)
      // Persisted records win on ID collision; existing user data is never overwritten.
      byId.set(id, property)
    }
    if (malformed.length && import.meta.env?.DEV) {
      console.warn('NextFind demo catalog contains malformed records; they remain in localStorage for recovery.', malformed)
    }
    return [...byId.values()]
  },
  writeProperties(properties) {
    if (typeof window === 'undefined') throw new Error('Demo persistence is unavailable.')
    window.localStorage.setItem(PROPERTY_KEY, JSON.stringify(properties))
  },
  readWishlist(userId = null) {
    const key = userId ? `${WISHLIST_KEY}:${String(userId)}` : WISHLIST_KEY
    const saved = typeof window === 'undefined' ? null : readJson(key, userId ? null : [])
    if (userId && !Array.isArray(saved) && typeof window !== 'undefined') {
      try {
        const legacy = readJson(WISHLIST_KEY, [])
        const migratedFor = window.localStorage.getItem(WISHLIST_MIGRATION_KEY)
        if (!migratedFor && Array.isArray(legacy) && legacy.length) {
          const preserved = [...new Set(legacy.map(String))]
          window.localStorage.setItem(key, JSON.stringify(preserved))
          window.localStorage.setItem(WISHLIST_MIGRATION_KEY, String(userId))
          return preserved
        }
      } catch {
        // Keep the wishlist usable in memory if browser storage is unavailable.
      }
    }
    return Array.isArray(saved) ? [...new Set(saved.map(String))] : []
  },
  writeWishlist(ids, userId = null) {
    if (typeof window === 'undefined') throw new Error('Demo persistence is unavailable.')
    const key = userId ? `${WISHLIST_KEY}:${String(userId)}` : WISHLIST_KEY
    window.localStorage.setItem(key, JSON.stringify([...new Set(ids.map(String))]))
  },
}
