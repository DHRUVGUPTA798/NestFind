import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Star, MapPin, Bed, Bath, Square, Heart, CheckCircle2 } from 'lucide-react'
import { useWishlist } from '../../context/WishlistContext'
import { cn } from '../../utils/cn'

export function formatRupee(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export default function PropertyCard({ property }) {
  const { toggle, isWishlisted } = useWishlist()
  const wishlisted = isWishlisted(property.id)
  const navigate = useNavigate()

  return (
    <article
      onClick={() => navigate(`/property/${property.id}`)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          navigate(`/property/${property.id}`)
        }
      }}
      role="link"
      tabIndex={0}
      aria-label={`View ${property.title}`}
      className="property-card group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between cursor-pointer"
    >
      {/* Visual Media Header */}
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
        <img
          src={property.images[0]}
          alt={property.title}
          className="card-image w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/30 pointer-events-none" />

        {/* Verification & Type Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
          {property.isVerified && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/95 text-[11px] font-bold text-emerald-700 shadow-xs backdrop-blur-xs">
              <CheckCircle2 size={12} className="text-emerald-600" /> Verified
            </span>
          )}
          <span className="inline-flex items-center px-2 py-1 rounded-md bg-stone-900/80 text-[10px] font-semibold text-white backdrop-blur-xs">
            {property.propertyTypeName || property.type}
          </span>
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            toggle(property.id)
          }}
          className={cn(
            'absolute top-3 right-3 z-10 size-8 rounded-full flex items-center justify-center transition-all duration-150 backdrop-blur-xs',
            wishlisted
              ? 'bg-rose-600 text-white shadow-md scale-105'
              : 'bg-white/90 text-stone-500 hover:text-rose-600 hover:bg-white shadow-xs'
          )}
          aria-label={wishlisted ? 'Remove from saved' : 'Save to wishlist'}
        >
          <Heart size={14} className={wishlisted ? 'fill-current' : ''} />
        </button>

        {/* Price Tag Overlay */}
        <div className="absolute bottom-3 left-3 z-10">
          <div className="inline-flex items-baseline px-2.5 py-1 rounded-lg bg-brand-700/95 text-white shadow-sm backdrop-blur-xs">
            <span className="text-sm font-extrabold tracking-tight">
              {formatRupee(property.price)}
            </span>
            <span className="text-[10px] font-medium text-stone-200 ml-1">/ month</span>
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Title and Rating */}
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="text-[15px] font-bold text-stone-900 leading-snug line-clamp-2 group-hover:text-brand-700 transition-colors">
              <Link to={`/property/${property.id}`} className="focus-ring rounded-sm">
                {property.title}
              </Link>
            </h3>
            {property.rating && (
              <div className="flex items-center gap-1 shrink-0 px-1.5 py-0.5 rounded bg-amber-50 border border-amber-200/60">
                <Star size={11} className="text-amber-500 fill-amber-500" />
                <span className="text-[11px] font-bold text-amber-900">{property.rating}</span>
              </div>
            )}
          </div>

          {/* Location Area */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-3">
            <MapPin size={12} className="text-stone-400 shrink-0" />
            <span className="truncate">{property.location.area}, {property.location.city}</span>
          </div>
        </div>

        {/* Structural Metrics Footer */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] font-semibold text-stone-600">
          <span className="flex items-center gap-1">
            <Bed size={13} className="text-stone-400" />
            {property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}
          </span>
          <span className="text-stone-300">•</span>
          <span className="flex items-center gap-1">
            <Bath size={13} className="text-stone-400" />
            {property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}
          </span>
          <span className="text-stone-300">•</span>
          <span className="flex items-center gap-1">
            <Square size={13} className="text-stone-400" />
            {property.area} sqft
          </span>
        </div>
      </div>
    </article>
  )
}

