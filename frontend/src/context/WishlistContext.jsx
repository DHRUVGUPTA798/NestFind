import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { demoPersistence } from '../services/demoPersistence'
import { useAuth } from './AuthContext'

const WishlistContext = createContext(null)

export function WishlistProvider({ children }) {
  const { user } = useAuth()
  const accountId = user?.id || null
  const accountKey = accountId || 'guest'
  const [wishlistByAccount, setWishlistByAccount] = useState(() => ({ [accountKey]: demoPersistence.readWishlist(accountId) }))
  const wishlist = wishlistByAccount[accountKey] ?? demoPersistence.readWishlist(accountId)

  useEffect(() => {
    const syncWishlist = (event) => {
      if (event.key?.startsWith('nextfind.demo.wishlist.v1')) {
        setWishlistByAccount((saved) => ({ ...saved, [accountKey]: demoPersistence.readWishlist(accountId) }))
      }
    }
    window.addEventListener('storage', syncWishlist)
    return () => window.removeEventListener('storage', syncWishlist)
  }, [accountId, accountKey])

  const toggle = useCallback((propertyId) => {
    const id = String(propertyId)
    const next = wishlist.includes(id)
      ? wishlist.filter((savedId) => savedId !== id)
      : [...wishlist, id]
    try {
      demoPersistence.writeWishlist(next, accountId)
      setWishlistByAccount((saved) => ({ ...saved, [accountKey]: next }))
      return true
    } catch {
      return false
    }
  }, [wishlist, accountId, accountKey])

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

