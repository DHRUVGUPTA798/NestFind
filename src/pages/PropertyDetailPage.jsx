import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  MapPin, Star, Bed, Bath, Square, Shield, CheckCircle2,
  Heart, Share2, Calendar, MessageSquare, Phone,
  ArrowLeft, Check, Sparkles, Building2, UserCheck, Clock,
  Wifi, Wind, Car, Shirt, Dumbbell, Zap, Trees, ChevronRight
} from 'lucide-react'
import { mockProperties } from '../data/mock/properties'
import { useWishlist } from '../context/WishlistContext'
import { PropertyDetailSkeleton } from '../components/ui/Skeleton'
import PropertyCard, { formatRupee } from '../components/property/PropertyCard'
import Button from '../components/ui/Button'
import { cn } from '../utils/cn'

const AMENITY_ICON_MAP = {
  wifi: Wifi,
  ac: Wind,
  parking: Car,
  laundry: Shirt,
  gym: Dumbbell,
  security: Shield,
  powerbackup: Zap,
  garden: Trees,
  lift: Building2,
  cctv: Shield,
}

export default function PropertyDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toggle, isWishlisted } = useWishlist()

  const [property, setProperty] = useState(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [inquiryDate, setInquiryDate] = useState('')
  const [inquiryMessage, setInquiryMessage] = useState('')
  const [visitBooked, setVisitBooked] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)

  // Find Property
  useEffect(() => {
    const found = mockProperties.find(p => p.id === id)
    if (found) {
      setProperty(found)
      setActiveImageIndex(0)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [id])

  if (!property) {
    return (
      <div className="container-xl py-12">
        <PropertyDetailSkeleton />
      </div>
    )
  }

  const wishlisted = isWishlisted(property.id)

  // Similar properties from same or other cities
  const similarProperties = mockProperties
    .filter(p => p.id !== property.id && (p.type === property.type || p.location.city === property.location.city))
    .slice(0, 3)

  const handleScheduleVisit = (e) => {
    e.preventDefault()
    if (!inquiryDate) return
    setVisitBooked(true)
    setTimeout(() => {
      setVisitBooked(false)
      setInquiryDate('')
      setInquiryMessage('')
    }, 4000)
  }

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2500)
  }

  return (
    <div className="bg-[#f8f9fb] min-h-screen py-6 sm:py-10 page-enter">
      <div className="container-xl">

        {/* Back Link & Quick Actions */}
        <div className="flex items-center justify-between gap-4 mb-5">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-stone-600 hover:text-brand-700 transition-colors"
          >
            <ArrowLeft size={16} /> Back to search
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 bg-white text-xs font-bold text-stone-700 hover:bg-stone-50 transition-colors"
            >
              <Share2 size={13} />
              {copiedLink ? 'Link Copied!' : 'Share'}
            </button>
            <button
              onClick={() => toggle(property.id)}
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-colors',
                wishlisted
                  ? 'border-rose-200 bg-rose-50 text-rose-600'
                  : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
              )}
            >
              <Heart size={13} className={wishlisted ? 'fill-current' : ''} />
              {wishlisted ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>

        {/* Property Headline */}
        <div className="mb-5">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-md bg-stone-900 text-white text-[10px] font-bold uppercase tracking-wider">
              {property.propertyTypeName || property.type}
            </span>
            {property.isVerified && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                <CheckCircle2 size={12} className="text-emerald-600" /> Verified Property
              </span>
            )}
            <span className="text-xs font-bold text-stone-500">
              Listed {property.postedAt}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-stone-900 tracking-tight mb-2">
            {property.title}
          </h1>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-semibold text-stone-600">
            <span className="flex items-center gap-1">
              <MapPin size={14} className="text-stone-400 shrink-0" />
              {property.location.address}
            </span>
            <span className="text-stone-300">•</span>
            <span className="flex items-center gap-1">
              <Star size={13} className="text-amber-500 fill-amber-500" />
              <strong className="text-stone-900">{property.rating}</strong> ({property.reviewCount || 24} tenant reviews)
            </span>
          </div>
        </div>

        {/* ── PHOTO GALLERY MOSAIC ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-8">
          {/* Large Main Feature Photo */}
          <div className="lg:col-span-8 rounded-2xl overflow-hidden aspect-[16/10] bg-stone-200 border border-stone-200 shadow-xs">
            <img
              src={property.images[activeImageIndex] || property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover transition-all duration-300"
            />
          </div>

          {/* Side Thumbnail Strip */}
          <div className="lg:col-span-4 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible">
            {property.images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={cn(
                  'rounded-xl overflow-hidden aspect-[16/10] lg:h-full border-2 transition-all shrink-0 w-28 sm:w-36 lg:w-full',
                  activeImageIndex === idx
                    ? 'border-brand-700 shadow-md ring-2 ring-brand-700/20'
                    : 'border-transparent opacity-75 hover:opacity-100'
                )}
              >
                <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* ── MAIN DETAIL BODY + STICKY BOOKING CARD ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Specifications, Amenities, Landlord */}
          <div className="lg:col-span-8 space-y-8">

            {/* Key Specifications Grid */}
            <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-3 bg-stone-50 rounded-xl">
                <Bed size={20} className="mx-auto text-brand-700 mb-1" />
                <span className="block text-xs text-stone-500 font-semibold">Bedrooms</span>
                <span className="block text-sm font-extrabold text-stone-900">{property.bedrooms} Beds</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl">
                <Bath size={20} className="mx-auto text-brand-700 mb-1" />
                <span className="block text-xs text-stone-500 font-semibold">Bathrooms</span>
                <span className="block text-sm font-extrabold text-stone-900">{property.bathrooms} Baths</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl">
                <Square size={20} className="mx-auto text-brand-700 mb-1" />
                <span className="block text-xs text-stone-500 font-semibold">Super Area</span>
                <span className="block text-sm font-extrabold text-stone-900">{property.area} sqft</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl">
                <Building2 size={20} className="mx-auto text-brand-700 mb-1" />
                <span className="block text-xs text-stone-500 font-semibold">Furnishing</span>
                <span className="block text-sm font-extrabold text-stone-900 capitalize">
                  {property.furnishedLabel || property.furnished.replace('-', ' ')}
                </span>
              </div>
            </div>

            {/* Overview / Description */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs">
              <h2 className="text-base font-extrabold text-stone-900 mb-3">
                About this rental property
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Amenities Included */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs">
              <h2 className="text-base font-extrabold text-stone-900 mb-4">
                Amenities & Features
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                {property.amenities.map(item => {
                  const Icon = AMENITY_ICON_MAP[item] || CheckCircle2
                  return (
                    <div
                      key={item}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 text-xs font-bold text-stone-800"
                    >
                      <div className="size-6 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-emerald-700">
                        <Icon size={13} />
                      </div>
                      <span className="capitalize">{item.replace('-', ' ')}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Landlord Profile & Trust */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <img
                  src={property.owner.avatar}
                  alt={property.owner.name}
                  className="size-14 rounded-full object-cover border-2 border-brand-200"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-extrabold text-stone-900">{property.owner.name}</h3>
                    <span className="px-2 py-0.2 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                      Verified Landlord
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Response rate: <strong className="text-stone-800">{property.owner.responseRate}%</strong> · Typically replies within 1 hour
                  </p>
                </div>
              </div>

              <Link
                to="/chat"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition-colors"
              >
                <MessageSquare size={14} /> Message Owner
              </Link>
            </div>
          </div>

          {/* Right Column: Sticky Rent Breakdown & Tour Scheduler */}
          <div className="lg:col-span-4 sticky top-[150px]">
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-md">

              {/* Price Header */}
              <div className="flex items-baseline justify-between pb-4 border-b border-stone-100 mb-4">
                <div>
                  <span className="text-2xl font-extrabold text-stone-900">
                    {formatRupee(property.price)}
                  </span>
                  <span className="text-xs text-stone-500 font-semibold ml-1">/ month</span>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md">
                  No Brokerage
                </span>
              </div>

              {/* Financial Breakup */}
              <div className="space-y-2 text-xs font-semibold text-stone-600 mb-6 bg-stone-50 p-3.5 rounded-xl border border-stone-200/60">
                <div className="flex justify-between">
                  <span>Monthly Rent:</span>
                  <strong className="text-stone-900">{formatRupee(property.price)}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Security Deposit:</span>
                  <strong className="text-stone-900">{formatRupee(property.deposit || property.price * 2)}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Maintenance:</span>
                  <span className="text-emerald-700 font-bold">Included</span>
                </div>
              </div>

              {/* Visit Schedule Form */}
              <form onSubmit={handleScheduleVisit} className="space-y-3.5">
                <label className="text-xs font-bold text-stone-700 block">
                  Schedule an In-Person or Virtual Visit
                </label>
                <div className="relative">
                  <Calendar size={15} className="absolute left-3 top-3 text-stone-400" />
                  <input
                    type="date"
                    required
                    value={inquiryDate}
                    onChange={(e) => setInquiryDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full pl-9 pr-3 py-2 text-xs font-semibold rounded-xl bg-stone-50 border border-stone-200 outline-none focus:border-brand-700"
                  />
                </div>

                <textarea
                  rows="2"
                  value={inquiryMessage}
                  onChange={(e) => setInquiryMessage(e.target.value)}
                  placeholder="Introduce yourself or ask about move-in availability..."
                  className="w-full p-3 text-xs font-semibold rounded-xl bg-stone-50 border border-stone-200 outline-none focus:border-brand-700 placeholder:text-stone-400 resize-none"
                />

                {visitBooked ? (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs font-bold text-emerald-800">
                    ✓ Visit request sent to {property.owner.name}! Check your messages.
                  </div>
                ) : (
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full"
                    type="submit"
                  >
                    Request Property Visit
                  </Button>
                )}
              </form>

              <div className="mt-4 text-center">
                <p className="text-[11px] text-stone-400 font-medium">
                  Direct lease with owner · Safe and encrypted communication
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── SIMILAR PROPERTIES SECTION ── */}
        {similarProperties.length > 0 && (
          <div className="mt-14 pt-10 border-t border-stone-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg sm:text-xl font-extrabold text-stone-900">
                Similar properties you might like
              </h2>
              <Link
                to={`/explore?city=${property.location.city}`}
                className="text-xs font-bold text-brand-700 hover:underline flex items-center gap-1"
              >
                More in {property.location.city} <ChevronRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProperties.map(sim => (
                <PropertyCard key={sim.id} property={sim} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

