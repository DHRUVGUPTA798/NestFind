import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  CheckCircle2, ArrowLeft, ArrowRight, AlertCircle
} from 'lucide-react'
import Button from '../components/ui/Button'
import { cn } from '../utils/cn'
import { propertyService } from '../services/propertyService'
import { useAuth } from '../context/AuthContext'
import { imageService } from '../services/imageService'

const AMENITY_LIST = [
  { id: 'wifi', label: 'High-speed WiFi' },
  { id: 'ac', label: 'Air Conditioning' },
  { id: 'parking', label: 'Dedicated Parking' },
  { id: 'laundry', label: 'Washing Machine' },
  { id: 'gym', label: 'Gym / Fitness Center' },
  { id: 'security', label: '24/7 Gated Security' },
  { id: 'powerbackup', label: 'Full Power Backup' },
  { id: 'garden', label: 'Private Garden / Lawn' },
]

export default function AddPropertyPage() {
  const navigate = useNavigate()
  const { user } = useAuth()

  // Multi-step Form State
  const [currentStep, setCurrentStep] = useState(1) // 1: Info, 2: Specs & Pricing, 3: Photos & Amenities, 4: Review

  // Form Fields
  const [title, setTitle] = useState('')
  const [propertyType, setPropertyType] = useState('flat')
  const [city, setCity] = useState('Bengaluru')
  const [area, setArea] = useState('')
  const [address, setAddress] = useState('')
  const [price, setPrice] = useState('')
  const [deposit, setDeposit] = useState('')
  const [bedrooms, setBedrooms] = useState('2')
  const [bathrooms, setBathrooms] = useState('2')
  const [superArea, setSuperArea] = useState('')
  const [furnishing, setFurnishing] = useState('fully-furnished')
  const [description, setDescription] = useState('')
  const [selectedAmenities, setSelectedAmenities] = useState(['wifi', 'security', 'parking'])
  const [selectedImages, setSelectedImages] = useState([])
  const [primaryImageId, setPrimaryImageId] = useState(null)
  const previewUrls = useRef(new Set())
  const [imageUrlInput, setImageUrlInput] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState('')

  useEffect(() => () => previewUrls.current.forEach((url) => URL.revokeObjectURL(url)), [])

  const toggleAmenity = (id) => {
    setSelectedAmenities(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    )
  }

  const handleAddImageUrl = (e) => {
    e.preventDefault()
    try {
      const url = new URL(imageUrlInput.trim())
      if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Use a public HTTP or HTTPS image URL.')
      if (selectedImages.length >= 10) throw new Error('A listing can include up to 10 photos.')
      const image = { id: crypto.randomUUID(), kind: 'url', src: url.href, name: 'Hosted image' }
      setSelectedImages((previous) => [...previous, image])
      setPrimaryImageId((current) => current || image.id)
      setImageUrlInput('')
      setFormError('')
    } catch (error) {
      setFormError(error.message || 'Enter a valid image URL.')
    }
  }

  const handleSelectImages = (event) => {
    const files = Array.from(event.target.files || [])
    event.target.value = ''
    if (selectedImages.length + files.length > 10) {
      setFormError('A listing can include up to 10 photos.')
      return
    }
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    const invalid = files.find((file) => !allowedTypes.includes(file.type) || file.size > 10 * 1024 * 1024)
    if (invalid) {
      setFormError(invalid.size > 10 * 1024 * 1024
        ? `${invalid.name} is larger than the 10 MB limit.`
        : `${invalid.name} is not a JPG, PNG or WebP image.`)
      return
    }
    const additions = files.map((file) => {
      const preview = URL.createObjectURL(file)
      previewUrls.current.add(preview)
      return { id: crypto.randomUUID(), kind: 'file', file, preview, name: file.name }
    })
    setSelectedImages((previous) => [...previous, ...additions])
    setPrimaryImageId((current) => current || additions[0]?.id || null)
    setFormError('')
  }

  const removeSelectedImage = (image) => {
    if (image.preview) {
      URL.revokeObjectURL(image.preview)
      previewUrls.current.delete(image.preview)
    }
    const remaining = selectedImages.filter((item) => item.id !== image.id)
    setSelectedImages(remaining)
    if (primaryImageId === image.id) setPrimaryImageId(remaining[0]?.id || null)
  }

  const handleNextStep = (e) => {
    e.preventDefault()
    setFormError('')

    if (currentStep === 1) {
      if (!title.trim() || !area.trim() || !address.trim()) {
        setFormError('Please fill out the property title, area and address.')
        return
      }
    } else if (currentStep === 2) {
      if (!Number.isFinite(Number(price)) || Number(price) <= 0 || !Number.isFinite(Number(superArea)) || Number(superArea) <= 0) {
        setFormError('Enter a monthly rent and square footage greater than zero.')
        return
      }
    }

    setCurrentStep(prev => prev + 1)
  }

  const handleFinalSubmit = async (e) => {
    e.preventDefault()
    setFormError('')
    if (!title.trim() || !area.trim() || !address.trim() || !city || !propertyType || !selectedImages.length ||
      !Number.isFinite(Number(price)) || Number(price) <= 0 ||
      !Number.isFinite(Number(superArea)) || Number(superArea) <= 0) {
      setFormError(selectedImages.length ? 'Complete all required property details before publishing.' : 'Add at least one property photo before publishing.')
      setCurrentStep(!title.trim() || !area.trim() || !address.trim() ? 1 : selectedImages.length ? 2 : 3)
      return
    }

    const typeNames = { room: 'Room', flat: 'Apartment', house: 'Independent House', pg: 'PG / Hostel' }
    const furnishingNames = { 'fully-furnished': 'Fully Furnished', 'semi-furnished': 'Semi Furnished', unfurnished: 'Unfurnished' }
    const listing = {
      title: title.trim(),
      type: propertyType,
      propertyTypeName: typeNames[propertyType],
      price: Number(price),
      deposit: Number(deposit) || 0,
      location: { city, area: area.trim(), address: address.trim(), lat: null, lng: null },
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      area: Number(superArea),
      furnished: furnishing,
      furnishedLabel: furnishingNames[furnishing],
      images: [],
      amenities: selectedAmenities,
      description: description.trim(),
      owner: {
        id: user?.id || 'demo-owner',
        name: user?.name || 'NextFind Demo Owner',
        avatar: user?.avatar,
        responseRate: 100,
        verifiedOwner: false,
      },
    }

    setIsSubmitting(true)
    try {
      const uploadedFiles = selectedImages.filter((image) => image.kind === 'file')
      const uploadedReferences = await imageService.upload(uploadedFiles.map((image) => image.file))
      let fileIndex = 0
      listing.images = selectedImages.map((image) => image.kind === 'file' ? uploadedReferences[fileIndex++] : image.src)
      const primaryIndex = selectedImages.findIndex((image) => image.id === primaryImageId)
      if (primaryIndex > 0) listing.images.unshift(listing.images.splice(primaryIndex, 1)[0])
      const result = await propertyService.createProperty(listing)
      if (!result?.data?.id) throw new Error('The listing could not be confirmed.')
      setIsSuccess(true)
      setTimeout(() => navigate('/owner/dashboard'), 1200)
    } catch (error) {
      setFormError(error?.message || 'We could not save this listing. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-stone-50 min-h-[calc(100vh-72px)] py-8 sm:py-12 page-enter">
      <div className="container-xl max-w-3xl">

        {/* Back Link */}
        <Link
          to="/owner/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-brand-700 mb-6 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Dashboard
        </Link>

        {/* Page Card */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8">

          {/* Form Step Indicator */}
          <div className="mb-8">
            <span className="section-badge mb-2">Step {currentStep} of 4</span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
              List Your Property on NextFind
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Connect directly with verified students and professionals
            </p>

            {/* Stepper Progress Bar */}
            <div className="grid grid-cols-4 gap-2 mt-5">
              {[
                { s: 1, label: 'Basic Info' },
                { s: 2, label: 'Pricing & Specs' },
                { s: 3, label: 'Amenities & Media' },
                { s: 4, label: 'Review & Publish' },
              ].map(st => (
                <div key={st.s} className="flex flex-col gap-1">
                  <div className={cn(
                    'h-1.5 rounded-full transition-all duration-300',
                    currentStep >= st.s ? 'bg-emerald-600' : 'bg-stone-200'
                  )} />
                  <span className="text-[10px] font-bold text-stone-500 truncate hidden sm:inline">
                    {st.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {formError && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-semibold flex items-center gap-2">
              <AlertCircle size={15} className="shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {isSuccess ? (
            <div className="py-12 text-center space-y-4">
              <div className="size-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 size={36} />
              </div>
              <h2 className="text-xl font-extrabold text-stone-900">
                Property Successfully Listed!
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto">
                Your listing has been created and published to our tenant search catalog. Redirecting to your dashboard...
              </p>
            </div>
          ) : (
            <form onSubmit={currentStep === 4 ? handleFinalSubmit : handleNextStep}>

              {/* ── STEP 1: BASIC INFORMATION ── */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block mb-1">
                      Listing Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Spacious Sunlit 2BHK near Metro Station"
                      className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm font-semibold outline-none focus:border-brand-700"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block mb-1">
                        Property Category *
                      </label>
                      <select
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm font-semibold outline-none focus:border-brand-700 cursor-pointer"
                      >
                        <option value="room">Private / Shared Room</option>
                        <option value="flat">Flat / Apartment</option>
                        <option value="house">Independent House / Villa</option>
                        <option value="pg">PG / Student Hostel</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block mb-1">
                        City *
                      </label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm font-semibold outline-none focus:border-brand-700 cursor-pointer"
                      >
                        <option value="Bengaluru">Bengaluru</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Delhi">Delhi NCR</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Pune">Pune</option>
                        <option value="Chennai">Chennai</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block mb-1">
                        Locality / Area *
                      </label>
                      <input
                        type="text"
                        required
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        placeholder="e.g. Indiranagar, Koramangala"
                        className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm font-semibold outline-none focus:border-brand-700"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block mb-1">
                        Full Address / Landmark *
                      </label>
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="e.g. 100 Feet Road, near Metro station"
                        className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm font-semibold outline-none focus:border-brand-700"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 2: PRICING & SPECIFICATIONS ── */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block mb-1">
                        Monthly Rent (₹) *
                      </label>
                      <input
                        type="number"
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="25000"
                        className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm font-semibold outline-none focus:border-brand-700"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block mb-1">
                        Security Deposit (₹)
                      </label>
                      <input
                        type="number"
                        value={deposit}
                        onChange={(e) => setDeposit(e.target.value)}
                        placeholder="50000"
                        className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm font-semibold outline-none focus:border-brand-700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block mb-1">
                        Bedrooms
                      </label>
                      <select
                        value={bedrooms}
                        onChange={(e) => setBedrooms(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm font-semibold"
                      >
                        <option value="1">1 BHK / Room</option>
                        <option value="2">2 BHK</option>
                        <option value="3">3 BHK</option>
                        <option value="4">4+ BHK</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block mb-1">
                        Bathrooms
                      </label>
                      <select
                        value={bathrooms}
                        onChange={(e) => setBathrooms(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm font-semibold"
                      >
                        <option value="1">1 Bath</option>
                        <option value="2">2 Baths</option>
                        <option value="3">3 Baths</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block mb-1">
                        Super Area (sqft) *
                      </label>
                      <input
                        type="number"
                        required
                        value={superArea}
                        onChange={(e) => setSuperArea(e.target.value)}
                        placeholder="950"
                        className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm font-semibold outline-none focus:border-brand-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block mb-1">
                      Furnishing Status
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'fully-furnished', label: 'Fully Furnished' },
                        { id: 'semi-furnished', label: 'Semi Furnished' },
                        { id: 'unfurnished', label: 'Unfurnished' },
                      ].map(f => (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => setFurnishing(f.id)}
                          className={cn(
                            'py-2 px-3 rounded-xl border text-xs font-bold transition-all text-center',
                            furnishing === f.id
                              ? 'bg-brand-50 border-brand-700 text-brand-700'
                              : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                          )}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block mb-1">
                      Detailed Description
                    </label>
                    <textarea
                      rows="3"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Mention key highlights, sunlight, balcony, metro distance, building amenities..."
                      className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm font-semibold outline-none focus:border-brand-700 resize-none"
                    />
                  </div>
                </div>
              )}

              {/* ── STEP 3: AMENITIES & MEDIA ── */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block mb-2.5">
                      Included Amenities
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {AMENITY_LIST.map(amenity => {
                        const checked = selectedAmenities.includes(amenity.id)
                        return (
                          <button
                            key={amenity.id}
                            type="button"
                            onClick={() => toggleAmenity(amenity.id)}
                            className={cn(
                              'p-3 rounded-xl border text-xs font-bold text-left transition-all flex items-center justify-between',
                              checked
                                ? 'bg-emerald-50/80 border-emerald-600 text-emerald-900'
                                : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                            )}
                          >
                            <span>{amenity.label}</span>
                            {checked && <CheckCircle2 size={14} className="text-emerald-600" />}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block mb-2">
                      Property Photographs
                    </label>
                    <p className="mb-3 text-xs text-stone-500">Upload up to 10 JPG, PNG or WebP images, 10 MB each. Files stay in this browser until backend image storage is connected.</p>
                    <label className="mb-3 inline-flex cursor-pointer items-center rounded-xl border border-brand-200 bg-brand-50 px-4 py-2.5 text-xs font-bold text-brand-800 hover:bg-brand-100 focus-within:ring-2 focus-within:ring-brand-500">
                      Choose photos from device
                      <input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={handleSelectImages} className="sr-only" aria-label="Choose property photos" />
                    </label>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="url"
                        value={imageUrlInput}
                        onChange={(e) => setImageUrlInput(e.target.value)}
                        placeholder="Paste image URL (e.g. Unsplash or hosted photo link)..."
                        className="flex-1 p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs font-semibold outline-none focus:border-brand-700"
                      />
                      <button
                        type="button"
                        onClick={handleAddImageUrl}
                        className="px-4 py-2 bg-stone-800 text-white text-xs font-bold rounded-xl hover:bg-stone-700"
                      >
                        Add Photo
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {selectedImages.map((image) => (
                        <div key={image.id} className="relative rounded-xl overflow-hidden aspect-[4/3] border border-stone-200 group">
                          <img src={image.preview || image.src} alt={image.name} className="w-full h-full object-cover" />
                          <button type="button" onClick={() => setPrimaryImageId(image.id)} aria-pressed={primaryImageId === image.id} className="absolute left-1 top-1 rounded-md bg-white/95 px-2 py-1 text-[10px] font-bold text-stone-800 shadow-sm">
                            {primaryImageId === image.id ? 'Cover photo' : 'Set as cover'}
                          </button>
                          <button
                            type="button"
                            onClick={() => removeSelectedImage(image)}
                            aria-label={`Remove ${image.name}`}
                            className="absolute top-1 right-1 size-7 rounded-full bg-black/70 text-white text-sm flex items-center justify-center opacity-100 sm:opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 4: REVIEW & PUBLISH ── */}
              {currentStep === 4 && (
                <div className="space-y-5">
                  <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-3 text-xs sm:text-sm">
                    <div className="flex justify-between pb-2 border-b border-stone-200 font-bold text-stone-900">
                      <span>Listing Summary</span>
                      <span className="text-emerald-700 font-extrabold">₹{Number(price).toLocaleString('en-IN')}/mo</span>
                    </div>

                    <p><strong>Title:</strong> {title}</p>
                    <p><strong>Location:</strong> {address}, {area}, {city}</p>
                    <p><strong>Category:</strong> {propertyType.toUpperCase()} • {bedrooms} Beds • {bathrooms} Baths • {superArea} sqft</p>
                    <p><strong>Furnishing:</strong> {furnishing.replace('-', ' ')}</p>
                    <p><strong>Selected Amenities:</strong> {selectedAmenities.join(', ')}</p>
                    <p><strong>Total Photos:</strong> {selectedImages.length} attached</p>
                  </div>

                  <p className="text-[11px] text-stone-400">
                    By submitting, you confirm that you are the lawful owner or authorized representative of this property. Zero broker charges apply.
                  </p>
                </div>
              )}

              {/* Form Navigation Controls */}
              <div className="mt-8 pt-5 border-t border-stone-100 flex items-center justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    className="px-4 py-2 rounded-xl border border-stone-200 text-xs font-bold text-stone-700 hover:bg-stone-50"
                  >
                    Previous Step
                  </button>
                ) : <div />}

                <Button
                  type="submit"
                  variant={currentStep === 4 ? 'emerald' : 'primary'}
                  size="md"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving Listing…' : currentStep === 4 ? 'Publish Listing' : 'Continue to Next Step'}
                  <ArrowRight size={14} className="ml-1" />
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

