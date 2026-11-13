import React, { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Heart, ArrowRight, Search } from 'lucide-react'
import { mockProperties } from '../data/mock/properties'
import { useWishlist } from '../context/WishlistContext'
import PropertyCard from '../components/property/PropertyCard'
import Button from '../components/ui/Button'

export default function WishlistPage() {
  const navigate = useNavigate()
  const { wishlist } = useWishlist()

  // Match saved IDs against properties
  const savedProperties = useMemo(() => {
    return mockProperties.filter(p => wishlist.includes(p.id))
  }, [wishlist])

  return (
    <div className="bg-[#f8f9fb] min-h-[calc(100vh-72px)] py-8 sm:py-12 page-enter">
      <div className="container-xl">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="size-7 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
                <Heart size={14} className="fill-current" />
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
                Saved Properties
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-stone-500">
              Shortlisted houses and rooms you've marked for future visits
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/explore"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-stone-200 text-xs font-bold text-stone-700 hover:border-brand-700 hover:text-brand-700 shadow-xs transition-colors"
            >
              <Search size={14} /> Explore More Homes
            </Link>
          </div>
        </div>

        {/* Content Grid or Empty State */}
        {savedProperties.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-stone-500">
                You have {savedProperties.length} saved {savedProperties.length === 1 ? 'home' : 'homes'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedProperties.map(property => (
                <div key={property.id} className="relative group">
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center max-w-lg mx-auto shadow-xs">
            <div className="size-16 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 mx-auto mb-4">
              <Heart size={30} />
            </div>
            <h2 className="text-base sm:text-lg font-extrabold text-stone-900 mb-2">
              Your Wishlist is Empty
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 leading-relaxed mb-6">
              Tap the heart icon on any property card while browsing to save flats, rooms, or houses you wish to review later.
            </p>
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/explore')}
            >
              Start Exploring Properties <ArrowRight size={15} className="ml-1" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
