import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Search, MapPin, ChevronRight, Star, Shield,
  CheckCircle2, TrendingUp, Bed, Bath, Square,
  Heart, ArrowRight, Building2, Home, Users, Layers,
  Sparkles, SlidersHorizontal, Check, Clock, UserCheck
} from 'lucide-react'
import { mockProperties } from '../data/mock/properties'
import { useWishlist } from '../context/WishlistContext'
import { cn } from '../utils/cn'

/* ─────────────────────────────────────────────
   HERO PHOTOGRAPHY
   ─────────────────────────────────────────── */
const HERO_MAIN_PHOTO = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85&fit=crop'
const HERO_SUB_PHOTO_1 = 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&q=80&fit=crop'
const HERO_SUB_PHOTO_2 = 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=500&q=80&fit=crop'

/* ─────────────────────────────────────────────
   REAL CATEGORIES
   ─────────────────────────────────────────── */
const categories = [
  {
    type: 'room',
    label: 'Rooms',
    subtext: 'Single & shared furnished rooms',
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=600&q=85&fit=crop',
    tag: 'From ₹6,500/mo',
  },
  {
    type: 'flat',
    label: 'Apartments',
    subtext: '1BHK, 2BHK & 3BHK flats',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=85&fit=crop',
    tag: 'From ₹18,000/mo',
  },
  {
    type: 'house',
    label: 'Independent Houses',
    subtext: 'Stand-alone villas & houses',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=85&fit=crop',
    tag: 'From ₹35,000/mo',
  },
  {
    type: 'pg',
    label: 'PG / Hostels',
    subtext: 'Student & executive stays with food',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=85&fit=crop',
    tag: 'From ₹7,500/mo',
  },
]

/* ─────────────────────────────────────────────
   FILTER TABS FOR FEATURED PROPERTIES
   ─────────────────────────────────────────── */
const FILTER_TABS = [
  { label: 'All Homes', value: 'all' },
  { label: 'Apartments', value: 'flat' },
  { label: 'Rooms', value: 'room' },
  { label: 'Houses & Villas', value: 'house' },
  { label: 'PGs', value: 'pg' },
]

function formatRupee(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

/* ─────────────────────────────────────────────
   INDIVIDUAL PROPERTY CARD COMPONENT
   ─────────────────────────────────────────── */
function ListingCard({ property }) {
  const { toggle, isWishlisted } = useWishlist()
  const wishlisted = isWishlisted(property.id)
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/property/${property.id}`)}
      className="property-card group cursor-pointer"
    >
      {/* Visual Header */}
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
        <img
          src={property.images[0]}
          alt={property.title}
          className="card-image w-full h-full object-cover"
          loading="lazy"
        />

        {/* Gradient Scrim for Top Badges */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/30 pointer-events-none" />

        {/* Verification & Category Badges */}
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

        {/* Price Tag Overlay on Bottom of Image */}
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
      <div className="p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Title and Rating */}
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="text-[14px] font-bold text-stone-900 leading-snug line-clamp-1 group-hover:text-brand-700 transition-colors">
              {property.title}
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
    </div>
  )
}

/* ─────────────────────────────────────────────
   MAIN HOMEPAGE
   ─────────────────────────────────────────── */
export default function HomePage() {
  const navigate = useNavigate()

  // Search form states
  const [searchLocation, setSearchLocation] = useState('')
  const [searchType, setSearchType]         = useState('')
  const [searchBudget, setSearchBudget]     = useState('')

  // Featured grid filter
  const [activeFilter, setActiveFilter] = useState('all')

  const handleSearchSubmit = (e) => {
    e?.preventDefault()
    const query = new URLSearchParams()
    if (searchLocation.trim()) query.set('city', searchLocation.trim())
    if (searchType) query.set('type', searchType)
    if (searchBudget) query.set('maxPrice', searchBudget)
    navigate(`/explore?${query.toString()}`)
  }

  // Filter listings
  const filteredListings = useMemo(() => {
    if (activeFilter === 'all') return mockProperties
    return mockProperties.filter(item => item.type === activeFilter)
  }, [activeFilter])

  return (
    <div className="page-enter">

      {/* ══════════════════════════════════════════════════════
          HERO SECTION — 2-Column Balanced Architecture
          ══════════════════════════════════════════════════════ */}
      <section className="relative bg-[#fafaf7] pt-8 pb-14 md:pt-12 md:pb-20 border-b border-stone-200/60 overflow-hidden">
        <div className="container-xl">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Column: Heading, Value Prop, Search Box */}
            <div className="lg:col-span-7 flex flex-col justify-center">

              {/* Eyebrow Label */}
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="section-badge">
                  <span className="size-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  Verified Rental Platform · India
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-extrabold text-3xl sm:text-4xl lg:text-[2.9rem] text-stone-900 tracking-tight leading-[1.18] mb-4">
                Find a Place You'll <br className="hidden sm:inline" />
                <span className="text-brand-700">Love to Call Home.</span>
              </h1>

              {/* Supporting Description */}
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed mb-8 max-w-xl">
                Discover thoughtfully selected rooms, apartments and homes that match your lifestyle and budget. Direct owner connections, zero broker markups, and transparent leases.
              </p>

              {/* ── SEARCH MODULE (Responsive Horizontal on Desktop, Stacked on Mobile) ── */}
              <form
                onSubmit={handleSearchSubmit}
                className="bg-white p-2.5 sm:p-3 rounded-2xl border border-stone-200 shadow-[0_8px_30px_rgb(25,51,107,0.06)] mb-7"
              >
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">

                  {/* Location Input */}
                  <div className="sm:col-span-5 flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-stone-100/70 border border-stone-200/80 focus-within:border-brand-700 focus-within:bg-white transition-all">
                    <MapPin size={16} className="text-brand-700 shrink-0" />
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                        Location
                      </span>
                      <input
                        type="text"
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                        placeholder="City, area or landmark…"
                        className="text-xs sm:text-sm font-semibold text-stone-900 placeholder:text-stone-400 bg-transparent outline-none truncate"
                      />
                    </div>
                  </div>

                  {/* Property Type Dropdown */}
                  <div className="sm:col-span-3 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-stone-100/70 border border-stone-200/80 focus-within:border-brand-700 focus-within:bg-white transition-all">
                    <Building2 size={16} className="text-brand-700 shrink-0" />
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                        Type
                      </span>
                      <select
                        value={searchType}
                        onChange={(e) => setSearchType(e.target.value)}
                        className="text-xs sm:text-sm font-semibold text-stone-900 bg-transparent outline-none cursor-pointer truncate"
                      >
                        <option value="">Any Type</option>
                        <option value="room">Room</option>
                        <option value="flat">Apartment</option>
                        <option value="house">House / Villa</option>
                        <option value="pg">PG / Hostel</option>
                      </select>
                    </div>
                  </div>

                  {/* Budget Dropdown */}
                  <div className="sm:col-span-4 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-stone-100/70 border border-stone-200/80 focus-within:border-brand-700 focus-within:bg-white transition-all">
                    <span className="text-sm font-bold text-brand-700 shrink-0">₹</span>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                        Max Budget
                      </span>
                      <select
                        value={searchBudget}
                        onChange={(e) => setSearchBudget(e.target.value)}
                        className="text-xs sm:text-sm font-semibold text-stone-900 bg-transparent outline-none cursor-pointer truncate"
                      >
                        <option value="">Any Budget</option>
                        <option value="10000">Up to ₹10,000</option>
                        <option value="20000">Up to ₹20,000</option>
                        <option value="35000">Up to ₹35,000</option>
                        <option value="50000">Up to ₹50,000</option>
                        <option value="75000">Up to ₹75,000</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Submit Row on Search Component */}
                <div className="mt-2.5 pt-2 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <span className="font-semibold text-stone-700">Popular:</span>
                    <div className="flex gap-1.5 flex-wrap">
                      {['Bengaluru', 'Mumbai', 'Pune', 'Hyderabad'].map((city) => (
                        <button
                          key={city}
                          type="button"
                          onClick={() => {
                            setSearchLocation(city)
                            navigate(`/explore?city=${city}`)
                          }}
                          className="px-2 py-0.5 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-medium transition-colors"
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 bg-brand-700 hover:bg-brand-600 text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                  >
                    <Search size={15} />
                    Search Properties
                  </button>
                </div>
              </form>

              {/* Trust Micro-Indicators */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-stone-600">
                <div className="flex items-center gap-1.5">
                  <Shield size={14} className="text-emerald-600" />
                  <span className="font-medium">100% Verified Properties</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-600" />
                  <span className="font-medium">Zero Brokerage Options</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-emerald-600" />
                  <span className="font-medium">Real-time Availability</span>
                </div>
              </div>
            </div>

            {/* Right Column: High Quality Photography Composition */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              {/* Primary Architectural Showcase */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[14/11] border border-stone-200 shadow-xl bg-stone-200">
                <img
                  src={HERO_MAIN_PHOTO}
                  alt="High quality rental property showcase"
                  className="w-full h-full object-cover"
                />

                {/* Floating Information Card */}
                <div className="absolute bottom-4 inset-x-4">
                  <div className="bg-white/95 backdrop-blur-md rounded-xl p-3.5 border border-stone-200 shadow-lg flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="inline-block size-2 rounded-full bg-emerald-500" />
                        <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                          Featured Home
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-extrabold text-stone-900 truncate">
                        3BHK Villa with Private Garden
                      </p>
                      <p className="text-[11px] text-stone-500 truncate">Koregaon Park, Pune</p>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="text-xs sm:text-sm font-extrabold text-brand-700">
                        ₹68,000<span className="text-[10px] font-normal text-stone-500">/mo</span>
                      </p>
                      <Link
                        to="/property/3"
                        className="text-[11px] font-bold text-emerald-700 hover:underline flex items-center gap-0.5 justify-end mt-0.5"
                      >
                        Details <ChevronRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Supporting Secondary Thumbnails */}
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="relative rounded-xl overflow-hidden h-20 border border-stone-200 shadow-xs group">
                  <img
                    src={HERO_SUB_PHOTO_1}
                    alt="Living area"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-stone-900/25 flex items-center justify-center p-2">
                    <span className="text-[11px] font-bold text-white text-center drop-shadow-sm">
                      Designer Apartments
                    </span>
                  </div>
                </div>

                <div className="relative rounded-xl overflow-hidden h-20 border border-stone-200 shadow-xs group">
                  <img
                    src={HERO_SUB_PHOTO_2}
                    alt="Furnished bedroom"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-stone-900/25 flex items-center justify-center p-2">
                    <span className="text-[11px] font-bold text-white text-center drop-shadow-sm">
                      Furnished Rooms
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PROJECT METRICS STRIP (Grounded Academic & Demo Metrics)
          ══════════════════════════════════════════════════════ */}
      <section className="bg-[#142854] text-white py-8 border-y border-brand-900">
        <div className="container-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="pt-2 md:pt-0">
              <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-0.5">
                50+
              </p>
              <p className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
                Rental Cities
              </p>
              <p className="text-[10px] text-stone-400 mt-0.5">Top Metros & Tier-1 Hubs</p>
            </div>

            <div className="pt-2 md:pt-0">
              <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-emerald-400 mb-0.5">
                100%
              </p>
              <p className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
                Verified Listings
              </p>
              <p className="text-[10px] text-stone-400 mt-0.5">Onboarded via Review</p>
            </div>

            <div className="pt-2 md:pt-0">
              <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-0.5">
                4.8 / 5
              </p>
              <p className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
                Average Rating
              </p>
              <p className="text-[10px] text-stone-400 mt-0.5">Tenant Satisfaction Index</p>
            </div>

            <div className="pt-2 md:pt-0">
              <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-emerald-400 mb-0.5">
                0₹
              </p>
              <p className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
                Brokerage Commission
              </p>
              <p className="text-[10px] text-stone-400 mt-0.5">Direct Owner Contact</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PROPERTY CATEGORIES — Visual exploration cards
          ══════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-18 bg-white border-b border-stone-200">
        <div className="container-xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="section-badge mb-2.5">
                Diverse Rental Options
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                Explore by Property Category
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Whether you need a private room, an entire flat or an independent villa.
              </p>
            </div>

            <Link
              to="/explore"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-700 hover:text-brand-600 transition-colors"
            >
              Browse All Listings <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((cat) => (
              <Link
                key={cat.type}
                to={`/explore?type=${cat.type}`}
                className="group relative rounded-2xl overflow-hidden aspect-[4/5] border border-stone-200 shadow-sm block transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                {/* Background Photography */}
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/30 to-transparent" />

                {/* Price Pill Tag on Top */}
                <div className="absolute top-3.5 left-3.5">
                  <span className="px-2.5 py-1 rounded-md bg-white/95 text-stone-900 text-[10px] font-bold shadow-xs">
                    {cat.tag}
                  </span>
                </div>

                {/* Content at Bottom */}
                <div className="absolute bottom-4 inset-x-4">
                  <h3 className="text-lg font-extrabold text-white leading-tight mb-1 group-hover:text-emerald-300 transition-colors">
                    {cat.label}
                  </h3>
                  <p className="text-xs text-stone-300 leading-snug line-clamp-1">
                    {cat.subtext}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FEATURED PROPERTIES — Real Listings Grid with Category Filter
          ══════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-18 bg-[#fafaf7] border-b border-stone-200">
        <div className="container-xl">

          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="section-badge mb-2.5">
                Handpicked Listings
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                Featured Rental Properties
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Verified photos, verified owners, and complete upfront pricing.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setActiveFilter(tab.value)}
                  className={cn(
                    'px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 whitespace-nowrap cursor-pointer',
                    activeFilter === tab.value
                      ? 'bg-brand-700 text-white shadow-xs'
                      : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-300 hover:text-stone-900'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3-Column Uniform Listing Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((property) => (
              <ListingCard key={property.id} property={property} />
            ))}
          </div>

          {/* Bottom Grid Actions */}
          <div className="mt-12 text-center">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-stone-200 text-stone-800 text-sm font-bold shadow-xs hover:border-brand-700 hover:text-brand-700 transition-colors"
            >
              Browse All Properties in Catalog <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          HOW IT WORKS — 3-Step Clear Rental Process
          ══════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="py-14 sm:py-18 bg-white border-b border-stone-200">
        <div className="container-xl">
          <div className="max-w-xl mx-auto text-center mb-12">
            <span className="section-badge mb-2.5">
              Frictionless Journey
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Rent Your Next Home in 3 Steps
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-2">
              No endless phone calls with middle-agents. Connect directly with owners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                step: '01',
                title: 'Search & Refine',
                description:
                  'Filter by city, locality, property type, monthly rent, and furnished options to pinpoint exactly what fits your lifestyle.',
                icon: Search,
              },
              {
                step: '02',
                title: 'Inspect & Shortlist',
                description:
                  'Review high-resolution verified photographs, floor plans, neighborhood perks, and save your top choices to your wishlist.',
                icon: Heart,
              },
              {
                step: '03',
                title: 'Connect & Finalize',
                description:
                  'Message the verified owner directly, schedule an in-person or virtual tour, agree on terms, and complete move-in securely.',
                icon: CheckCircle2,
              },
            ].map((card) => {
              const Icon = card.icon
              return (
                <div
                  key={card.step}
                  className="bg-[#fafaf7] rounded-2xl p-6 lg:p-7 border border-stone-200/90 relative flex flex-col justify-between"
                >
                  <div>
                    {/* Header: Step Number & Icon */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-700">
                        <Icon size={18} strokeWidth={2.4} />
                      </div>
                      <span className="text-2xl font-extrabold text-stone-300 font-mono">
                        {card.step}
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-stone-900 mb-2">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-200/60 flex items-center gap-1.5 text-[11px] font-bold text-brand-700">
                    <span>Direct Platform Feature</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PROPERTY OWNER CTA — Harmonized with Primary Navy
          ══════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-18 bg-[#142854] text-white border-b border-brand-900 relative overflow-hidden">
        {/* Subtle geometric pattern overlay */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="container-xl relative z-10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
              <Building2 size={13} /> For Property Owners & Landlords
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
              List Your Property. Connect with Responsible Tenants.
            </h2>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-8 max-w-xl">
              NextFind connects you with verified students, professionals and families across major cities. Enjoy transparent tenant profiles, direct messaging, and zero listing charges.
            </p>

            {/* Key Owner Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {[
                { label: 'Free property listing & instant publishing' },
                { label: 'Verified tenant identities & chat' },
                { label: 'Direct inquiries without third-party brokers' },
                { label: 'Intuitive owner dashboard management' },
              ].map((perk, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="size-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="text-xs font-semibold text-stone-200">{perk.label}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/owner/add-property"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm"
              >
                List Your Property Free
                <ArrowRight size={15} />
              </Link>
              <Link
                to="/owner/dashboard"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold text-xs sm:text-sm rounded-xl transition-all"
              >
                Go to Owner Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WHY NEXTFIND — Four Pillars of Rental Excellence
          ══════════════════════════════════════════════════════ */}
      <section id="why-nextfind" className="py-14 sm:py-18 bg-[#fafaf7]">
        <div className="container-xl">
          <div className="max-w-xl mx-auto text-center mb-12">
            <span className="section-badge mb-2.5">
              The NextFind Difference
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Renting Built for Trust & Simplicity
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-2">
              Every design and engineering choice is made to eliminate friction between owners and renters.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: 'Verified Listings',
                desc: 'Every home listing is audited for genuine photos, active contact details and accurate rent figures.',
                icon: Shield,
                accent: 'text-brand-700 bg-brand-50 border-brand-200',
              },
              {
                title: 'Direct Connections',
                desc: 'Communicate directly with landlords. Schedule visits, discuss deposit terms and move in without intermediaries.',
                icon: UserCheck,
                accent: 'text-emerald-700 bg-emerald-50 border-emerald-200',
              },
              {
                title: 'Transparent Pricing',
                desc: 'Clear breakdown of monthly rent, security deposit, maintenance and utility dues upfront without surprise charges.',
                icon: CheckCircle2,
                accent: 'text-brand-700 bg-brand-50 border-brand-200',
              },
              {
                title: 'Smart Location Search',
                desc: 'Discover accommodations close to major tech parks, university campuses and rapid transit metro corridors.',
                icon: MapPin,
                accent: 'text-emerald-700 bg-emerald-50 border-emerald-200',
              },
            ].map((pillar, i) => {
              const Icon = pillar.icon
              return (
                <div
                  key={i}
                  className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className={cn('size-10 rounded-xl border flex items-center justify-center mb-4', pillar.accent)}>
                      <Icon size={18} strokeWidth={2.4} />
                    </div>
                    <h3 className="text-sm font-extrabold text-stone-900 mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center gap-1 text-[11px] font-bold text-stone-500">
                    <Check size={12} className="text-emerald-600" /> Standard NextFind Guarantee
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
