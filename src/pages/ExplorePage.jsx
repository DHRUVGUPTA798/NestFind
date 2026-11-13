import React, { useState, useMemo, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import {
  Search, MapPin, SlidersHorizontal, RotateCcw,
  Building2, Bed, Bath, Wifi, Wind, Car, Dumbbell,
  Shield, Check, ArrowUpDown, ChevronDown, Home, X
} from 'lucide-react'
import { mockProperties } from '../data/mock/properties'
import PropertyCard from '../components/property/PropertyCard'
import { PropertyCardSkeleton } from '../components/ui/Skeleton'
import Button from '../components/ui/Button'
import { cn } from '../utils/cn'

const PROPERTY_TYPES = [
  { value: '', label: 'All Types' },
  { value: 'room', label: 'Single/Shared Room' },
  { value: 'flat', label: 'Flat / Apartment' },
  { value: 'house', label: 'House / Villa' },
  { value: 'pg', label: 'PG / Hostel' },
]

const FURNISHING_TYPES = [
  { value: '', label: 'Any Status' },
  { value: 'fully-furnished', label: 'Fully Furnished' },
  { value: 'semi-furnished', label: 'Semi Furnished' },
  { value: 'unfurnished', label: 'Unfurnished' },
]

const AMENITY_OPTIONS = [
  { id: 'wifi', label: 'High-speed WiFi', icon: Wifi },
  { id: 'ac', label: 'Air Conditioning', icon: Wind },
  { id: 'parking', label: 'Dedicated Parking', icon: Car },
  { id: 'security', label: '24/7 Security / CCTV', icon: Shield },
  { id: 'gym', label: 'Fitness / Gym', icon: Dumbbell },
]

export default function ExplorePage() {
  const [searchParams, setSearchParams] = useSearchParams()

  // Read URL query params as initial filters
  const cityParam = searchParams.get('city') || searchParams.get('location') || ''
  const typeParam = searchParams.get('type') || ''
  const maxPriceParam = searchParams.get('maxPrice') || ''

  // Filter States
  const [searchTerm, setSearchTerm] = useState(cityParam)
  const [selectedType, setSelectedType] = useState(typeParam)
  const [priceRange, setPriceRange] = useState(maxPriceParam ? Number(maxPriceParam) : 100000)
  const [minBedrooms, setMinBedrooms] = useState('any')
  const [furnishing, setFurnishing] = useState('')
  const [selectedAmenities, setSelectedAmenities] = useState([])
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [sortBy, setSortBy] = useState('relevance')
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Sync state if URL search query changes
  useEffect(() => {
    if (cityParam) setSearchTerm(cityParam)
    if (typeParam) setSelectedType(typeParam)
    if (maxPriceParam) setPriceRange(Number(maxPriceParam))
  }, [cityParam, typeParam, maxPriceParam])

  // Simulate quick filtering transition
  const handleFilterChange = (setter, val) => {
    setter(val)
  }

  const toggleAmenity = (id) => {
    setSelectedAmenities(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    )
  }

  const resetAllFilters = () => {
    setSearchTerm('')
    setSelectedType('')
    setPriceRange(100000)
    setMinBedrooms('any')
    setFurnishing('')
    setSelectedAmenities([])
    setVerifiedOnly(false)
    setSortBy('relevance')
    setSearchParams({})
  }

  // Filter & Sort Logic
  const filteredProperties = useMemo(() => {
    let result = [...mockProperties]

    // Location / City / Area Search
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim()
      result = result.filter(item =>
        item.location.city.toLowerCase().includes(q) ||
        item.location.area.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.location.address.toLowerCase().includes(q)
      )
    }

    // Property Type
    if (selectedType) {
      result = result.filter(item => item.type === selectedType)
    }

    // Maximum Rent Range
    if (priceRange < 100000) {
      result = result.filter(item => item.price <= priceRange)
    }

    // Bedrooms
    if (minBedrooms !== 'any') {
      result = result.filter(item => item.bedrooms >= Number(minBedrooms))
    }

    // Furnishing
    if (furnishing) {
      result = result.filter(item => item.furnished === furnishing)
    }

    // Amenities
    if (selectedAmenities.length > 0) {
      result = result.filter(item =>
        selectedAmenities.every(amenity => item.amenities.includes(amenity))
      )
    }

    // Verified
    if (verifiedOnly) {
      result = result.filter(item => item.isVerified)
    }

    // Sorting
    if (sortBy === 'price_asc') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price_desc') {
      result.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0))
    } else if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt))
    }

    return result
  }, [
    searchTerm, selectedType, priceRange, minBedrooms,
    furnishing, selectedAmenities, verifiedOnly, sortBy
  ])

  return (
    <div className="bg-[#f8f9fb] min-h-[calc(100vh-72px)] page-enter">

      {/* Top Header Filter Bar */}
      <div className="bg-white border-b border-stone-200 sticky top-[72px] z-30 shadow-xs">
        <div className="container-xl py-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">

            {/* Quick Search Input */}
            <div className="flex items-center gap-2 px-3.5 py-2 bg-stone-100/80 rounded-xl border border-stone-200/90 flex-1 max-w-md focus-within:bg-white focus-within:border-brand-700 transition-all">
              <Search size={16} className="text-brand-700 shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by city (e.g. Bengaluru, Mumbai, Pune)..."
                className="w-full text-xs sm:text-sm font-semibold text-stone-900 bg-transparent outline-none placeholder:text-stone-400"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-stone-400 hover:text-stone-700 text-xs font-bold"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Sort & Mobile Filter Toggle */}
            <div className="flex items-center justify-between md:justify-end gap-2.5">
              {/* Results Count */}
              <span className="text-xs font-bold text-stone-500 whitespace-nowrap hidden sm:inline">
                Showing <strong className="text-stone-900">{filteredProperties.length}</strong> rental properties
              </span>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 rounded-xl border border-stone-200 text-xs font-bold text-stone-700">
                <ArrowUpDown size={13} className="text-stone-500 shrink-0" />
                <span className="text-stone-500 font-semibold hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent outline-none cursor-pointer text-stone-900 font-bold"
                >
                  <option value="relevance">Most Relevant</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="newest">Recently Listed</option>
                </select>
              </div>

              {/* Mobile Filter Sheet Button */}
              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-1.5 px-3.5 py-2 bg-brand-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
              >
                <SlidersHorizontal size={14} />
                Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area: Sidebar + Grid */}
      <div className="container-xl py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Desktop Left Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-6 sticky top-[150px]">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-brand-700" />
                <h3 className="text-sm font-extrabold text-stone-900 uppercase tracking-wider">
                  Filters
                </h3>
              </div>
              <button
                type="button"
                onClick={resetAllFilters}
                className="text-[11px] font-bold text-stone-500 hover:text-brand-700 flex items-center gap-1 transition-colors"
              >
                <RotateCcw size={11} /> Reset
              </button>
            </div>

            {/* Property Type */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block mb-2">
                Property Type
              </label>
              <div className="space-y-1.5">
                {PROPERTY_TYPES.map(type => (
                  <label
                    key={type.value}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-stone-50 cursor-pointer transition-colors text-xs font-semibold text-stone-700"
                  >
                    <span>{type.label}</span>
                    <input
                      type="radio"
                      name="propertyType"
                      checked={selectedType === type.value}
                      onChange={() => setSelectedType(type.value)}
                      className="accent-brand-700 size-3.5 cursor-pointer"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Rent Range Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-600">
                  Max Monthly Rent
                </label>
                <span className="text-xs font-extrabold text-brand-700">
                  {priceRange >= 100000 ? 'Any Budget' : `₹${priceRange.toLocaleString('en-IN')}`}
                </span>
              </div>
              <input
                type="range"
                min="5000"
                max="100000"
                step="2500"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-brand-700 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400 font-bold mt-1">
                <span>₹5K</span>
                <span>₹50K</span>
                <span>₹100K+</span>
              </div>
            </div>

            {/* Bedrooms Count */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block mb-2">
                Bedrooms (Min)
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {['any', '1', '2', '3'].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setMinBedrooms(num)}
                    className={cn(
                      'py-1.5 text-xs font-bold rounded-lg border transition-all text-center',
                      minBedrooms === num
                        ? 'bg-brand-700 text-white border-brand-700'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    )}
                  >
                    {num === 'any' ? 'Any' : `${num}+`}
                  </button>
                ))}
              </div>
            </div>

            {/* Furnishing Status */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block mb-2">
                Furnishing Status
              </label>
              <select
                value={furnishing}
                onChange={(e) => setFurnishing(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs font-semibold text-stone-800 outline-none focus:border-brand-700"
              >
                {FURNISHING_TYPES.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Amenities Checkboxes */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block mb-2">
                Essential Amenities
              </label>
              <div className="space-y-2">
                {AMENITY_OPTIONS.map(amenity => {
                  const Icon = amenity.icon
                  const checked = selectedAmenities.includes(amenity.id)
                  return (
                    <label
                      key={amenity.id}
                      className="flex items-center gap-2 text-xs font-semibold text-stone-700 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleAmenity(amenity.id)}
                        className="rounded accent-emerald-600 size-3.5 cursor-pointer"
                      />
                      <Icon size={13} className="text-stone-400" />
                      <span>{amenity.label}</span>
                    </label>
                  )
                })}
              </div>
            </div>

            {/* Verified Only Toggle */}
            <div className="pt-3 border-t border-stone-100">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                  <Shield size={14} className="text-emerald-600" /> Verified Listings Only
                </span>
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="rounded accent-emerald-600 size-4 cursor-pointer"
                />
              </label>
            </div>
          </aside>

          {/* Right Properties Grid Column */}
          <main className="col-span-1 lg:col-span-9">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <PropertyCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProperties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center flex flex-col items-center justify-center shadow-xs">
                <div className="w-14 h-14 rounded-2xl bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-700 mb-4">
                  <Building2 size={26} />
                </div>
                <h3 className="text-base font-extrabold text-stone-900 mb-1">
                  No Rental Properties Found
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 max-w-sm mb-6 leading-relaxed">
                  We couldn't find any homes matching your exact filter combination. Try adjusting price range, city spelling, or clearing specific amenities.
                </p>
                <Button
                  variant="primary"
                  size="md"
                  onClick={resetAllFilters}
                >
                  <RotateCcw size={14} className="mr-1.5" />
                  Clear All Filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Drawer Filter Dialog */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
          <div
            className="absolute inset-0 bg-stone-900/40 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative bg-white w-full max-h-[85vh] rounded-t-3xl overflow-y-auto p-6 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-5">
                <h3 className="text-base font-extrabold text-stone-900">
                  Refine Search Filters
                </h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="size-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Mobile Filter Controls */}
              <div className="space-y-5">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-2">Property Type</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs font-semibold"
                  >
                    {PROPERTY_TYPES.map(t => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-stone-700 mb-1">
                    <span>Max Budget</span>
                    <span className="text-brand-700">₹{priceRange.toLocaleString('en-IN')}</span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="100000"
                    step="2500"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full accent-brand-700"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-2">Min Bedrooms</label>
                  <div className="grid grid-cols-4 gap-2">
                    {['any', '1', '2', '3'].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setMinBedrooms(num)}
                        className={cn(
                          'py-2 text-xs font-bold rounded-lg border text-center',
                          minBedrooms === num
                            ? 'bg-brand-700 text-white border-brand-700'
                            : 'bg-stone-50 text-stone-700 border-stone-200'
                        )}
                      >
                        {num === 'any' ? 'Any' : `${num}+`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-stone-100 mt-6 flex gap-3">
              <Button
                variant="secondary"
                size="md"
                className="flex-1"
                onClick={resetAllFilters}
              >
                Reset
              </Button>
              <Button
                variant="primary"
                size="md"
                className="flex-1"
                onClick={() => setMobileFilterOpen(false)}
              >
                Show Results ({filteredProperties.length})
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

