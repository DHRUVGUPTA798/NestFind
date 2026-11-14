import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Search, MapPin, ChevronRight, Shield, CheckCircle2,
  Heart, ArrowRight, Building2, Check, Clock, UserCheck
} from 'lucide-react'
import { mockProperties } from '../data/mock/properties'
import PropertyCard, { formatRupee } from '../components/property/PropertyCard'
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
  },
  {
    type: 'flat',
    label: 'Apartments',
    subtext: '1BHK, 2BHK & 3BHK flats',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=85&fit=crop',
  },
  {
    type: 'house',
    label: 'Independent Houses',
    subtext: 'Stand-alone villas & houses',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=85&fit=crop',
  },
  {
    type: 'pg',
    label: 'PG / Hostels',
    subtext: 'Student & executive stays with food',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=85&fit=crop',
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

function categoryPriceLabel(type) {
  const prices = mockProperties.filter((property) => property.type === type).map((property) => property.price)
  if (!prices.length) return 'Explore available options'
  return `From ${formatRupee(Math.min(...prices))}/mo`
}

/* ─────────────────────────────────────────────
   INDIVIDUAL PROPERTY CARD COMPONENT
   ─────────────────────────────────────────── */
function ListingCard({ property }) {
  return <PropertyCard property={property} />
}

export default function HomePage() {
  const navigate = useNavigate()
  const featuredProperty = mockProperties.find((property) => property.id === '3') || mockProperties[0]
  const cityCount = new Set(mockProperties.map((property) => property.location.city)).size
  const categoryCount = new Set(mockProperties.map((property) => property.type)).size

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
      <section className="relative bg-stone-50 pt-10 pb-14 sm:pt-14 lg:pt-16 lg:pb-20 border-b border-stone-200/70 overflow-hidden">
        <div className="container-xl">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">

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
              <h1 className="font-extrabold text-display text-stone-900 tracking-[-0.04em] leading-[1.08] mb-5">
                Find a Place You'll <br className="hidden sm:inline" />
                <span className="text-brand-700">Love to Call Home.</span>
              </h1>

              {/* Supporting Description */}
              <p className="text-base sm:text-lg text-stone-600 leading-relaxed mb-8 max-w-xl">
                Discover thoughtfully selected rooms, apartments and homes that match your lifestyle and budget. Direct owner connections, zero broker markups, and transparent leases.
              </p>

              {/* ── SEARCH MODULE (Responsive Horizontal on Desktop, Stacked on Mobile) ── */}
              <form
                onSubmit={handleSearchSubmit}
                className="bg-white p-3 sm:p-4 rounded-2xl border border-stone-200 shadow-[0_16px_42px_-24px_rgba(25,51,107,0.32)] mb-7"
              >
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">

                  {/* Location Input */}
                  <div className="sm:col-span-5 flex min-h-16 items-center gap-3 px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus-within:border-brand-500 focus-within:bg-white transition-all">
                    <MapPin size={16} className="text-brand-700 shrink-0" />
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                        Location
                      </span>
                      <input
                        type="text"
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                        placeholder="City, area or landmark…"
                        aria-label="Search by city, area or landmark"
                        className="text-xs sm:text-sm font-semibold text-stone-900 placeholder:text-stone-400 bg-transparent outline-none truncate"
                      />
                    </div>
                  </div>

                  {/* Property Type Dropdown */}
                  <div className="sm:col-span-3 flex min-h-16 items-center gap-3 px-3 py-3 rounded-xl bg-stone-50 border border-stone-200 focus-within:border-brand-500 focus-within:bg-white transition-all">
                    <Building2 size={16} className="text-brand-700 shrink-0" />
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                        Type
                      </span>
                      <select
                        value={searchType}
                        onChange={(e) => setSearchType(e.target.value)}
                        aria-label="Property type"
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
                  <div className="sm:col-span-4 flex min-h-16 items-center gap-3 px-3 py-3 rounded-xl bg-stone-50 border border-stone-200 focus-within:border-brand-500 focus-within:bg-white transition-all">
                    <span className="text-sm font-bold text-brand-700 shrink-0">₹</span>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                        Max Budget
                      </span>
                      <select
                        value={searchBudget}
                        onChange={(e) => setSearchBudget(e.target.value)}
                        aria-label="Maximum monthly budget"
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
                          className="min-h-9 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors"
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto min-h-12 px-6 py-3 bg-brand-700 hover:bg-brand-800 text-white text-sm font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 shrink-0 cursor-pointer"
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
                  <span className="font-medium">Verified status on each listing</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-600" />
                  <span className="font-medium">Direct owner discovery</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-emerald-600" />
                  <span className="font-medium">Contact owners about availability</span>
                </div>
              </div>
            </div>

            {/* Right Column: High Quality Photography Composition */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              {/* Primary Architectural Showcase */}
              <div className="relative rounded-[1.75rem] overflow-hidden aspect-[4/3] sm:aspect-[5/4] border border-white shadow-[0_30px_70px_-32px_rgba(15,29,62,0.48)] bg-stone-200">
                <img
                  src={featuredProperty?.images[0] || HERO_MAIN_PHOTO}
                  alt={featuredProperty?.title || 'Rental home featured by NextFind'}
                  className="w-full h-full object-cover"
                  fetchPriority="high"
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
                        {featuredProperty?.title || 'Homes picked for your next move'}
                      </p>
                      <p className="text-xs text-stone-500 truncate">{featuredProperty ? `${featuredProperty.location.area}, ${featuredProperty.location.city}` : 'Explore homes across India'}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="text-xs sm:text-sm font-extrabold text-brand-700">
                        {featuredProperty ? formatRupee(featuredProperty.price) : 'Explore'}<span className="text-[10px] font-normal text-stone-500">{featuredProperty ? '/mo' : ''}</span>
                      </p>
                      <Link
                        to={featuredProperty ? `/property/${featuredProperty.id}` : '/explore'}
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
      <section className="bg-brand-900 text-white py-8 border-y border-brand-900">
        <div className="container-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="pt-2 md:pt-0">
              <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-0.5">
                {mockProperties.length}
              </p>
              <p className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
                Preview listings
              </p>
              <p className="text-xs text-stone-400 mt-1">Sample property catalog</p>
            </div>

            <div className="pt-2 md:pt-0">
              <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-emerald-400 mb-0.5">
                {cityCount}
              </p>
              <p className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
                Cities represented
              </p>
              <p className="text-xs text-stone-400 mt-1">Based on sample listings</p>
            </div>

            <div className="pt-2 md:pt-0">
              <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-0.5">
                {categoryCount}
              </p>
              <p className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
                Rental categories
              </p>
              <p className="text-xs text-stone-400 mt-1">Rooms, flats, homes and more</p>
            </div>

            <div className="pt-2 md:pt-0">
              <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-emerald-400 mb-0.5">
                ✓
              </p>
              <p className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
                Direct discovery
              </p>
              <p className="text-xs text-stone-400 mt-1">Connect through each listing</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PROPERTY CATEGORIES — Visual exploration cards
          ══════════════════════════════════════════════════════ */}
      <section className="py-section bg-white border-b border-stone-200">
        <div className="container-xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="section-badge mb-2.5">
                Diverse Rental Options
              </span>
              <h2 className="text-section font-bold text-stone-900 tracking-tight">
                Explore by Property Category
              </h2>
              <p className="text-sm sm:text-base text-stone-500 mt-2">
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
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[4/5] border border-stone-200 shadow-sm block transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-200"
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
                    {categoryPriceLabel(cat.type)}
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
      <section className="py-section bg-stone-50 border-b border-stone-200">
        <div className="container-xl">

          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="section-badge mb-2.5">
                Handpicked Listings
              </span>
              <h2 className="text-section font-bold text-stone-900 tracking-tight">
                Featured Rental Properties
              </h2>
              <p className="text-sm sm:text-base text-stone-500 mt-2">
                Browse available homes and compare the details that matter to you.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setActiveFilter(tab.value)}
                  aria-pressed={activeFilter === tab.value}
                  className={cn(
                    'min-h-10 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 whitespace-nowrap cursor-pointer',
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
      <section id="how-it-works" className="py-section bg-white border-b border-stone-200">
        <div className="container-xl">
          <div className="max-w-xl mx-auto text-center mb-12">
            <span className="section-badge mb-2.5">
              Frictionless Journey
            </span>
            <h2 className="text-section font-bold text-stone-900 tracking-tight">
              Rent Your Next Home in 3 Steps
            </h2>
            <p className="text-sm sm:text-base text-stone-500 mt-3">
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
                  className="bg-stone-50 rounded-2xl p-6 lg:p-7 border border-stone-200/90 relative flex flex-col justify-between"
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
      <section className="py-section bg-brand-900 text-white border-b border-brand-950 relative overflow-hidden">
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
      <section id="why-nextfind" className="py-section bg-stone-50">
        <div className="container-xl">
          <div className="max-w-xl mx-auto text-center mb-12">
            <span className="section-badge mb-2.5">
              The NextFind Difference
            </span>
            <h2 className="text-section font-bold text-stone-900 tracking-tight">
              Renting Built for Trust & Simplicity
            </h2>
            <p className="text-sm sm:text-base text-stone-500 mt-3">
              Every design and engineering choice is made to eliminate friction between owners and renters.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: 'Verified Listings',
                desc: 'Review the verification status and details provided with each property listing.',
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
