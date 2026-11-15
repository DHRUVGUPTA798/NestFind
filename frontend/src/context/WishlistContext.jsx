import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { demoPersistence } from '../services/demoPersistence'

const WishlistContext = createContext(null)

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => demoPersistence.readWishlist())

  useEffect(() => {
    const syncWishlist = (event) => {
      if (event.key === 'nextfind.demo.wishlist.v1') setWishlist(demoPersistence.readWishlist())
    }
    window.addEventListener('storage', syncWishlist)
    return () => window.removeEventListener('storage', syncWishlist)
  }, [])

  const toggle = useCallback((propertyId) => {
    const id = String(propertyId)
    const next = wishlist.includes(id)
      ? wishlist.filter((savedId) => savedId !== id)
      : [...wishlist, id]
    try {
      demoPersistence.writeWishlist(next)
      setWishlist(next)
      return true
    } catch {
      return false
    }
  }, [wishlist])

  const isWishlisted = useCallback(
    (propertyId) => wishlist.includes(propertyId),
    [wishlist]
  )

  return (
    <WishlistContext.Provider value={{ wishlist, toggle, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used inside WishlistProvider')
  return ctx
}

