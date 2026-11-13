import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, Calendar, Heart, ArrowRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useWishlist } from '../context/WishlistContext'
import { mockUser, mockProperties } from '../data/mock/properties'
import { formatRupee } from '../components/property/PropertyCard'
import Button from '../components/ui/Button'

export default function DashboardPage() {
  const { user } = useAuth()
  const { wishlist } = useWishlist()

  // Use authenticated user or fallback to standard demo user profile
  const currentUser = user || mockUser

  const savedListings = mockProperties.filter(p => wishlist.includes(p.id))

  // Scheduled Visits for Tenant
  const scheduledVisits = [
    {
      id: 'sv-1',
      property: mockProperties[0],
      date: '2026-11-16',
      time: '11:30 AM',
      status: 'Confirmed by Landlord',
    },
    {
      id: 'sv-2',
      property: mockProperties[1],
      date: '2026-11-19',
      time: '4:00 PM',
      status: 'Awaiting Confirmation',
    },
  ]

  return (
    <div className="bg-[#f8f9fb] min-h-[calc(100vh-72px)] py-8 sm:py-12 page-enter">
      <div className="container-xl">

        {/* User Profile Header Card */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="size-16 sm:size-20 rounded-2xl object-cover border-2 border-brand-200"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
                  {currentUser.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-md bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider">
                  Verified {currentUser.role || 'Tenant'}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs font-semibold text-stone-500">
                <span className="flex items-center gap-1">
                  <Mail size={13} className="text-stone-400" /> {currentUser.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone size={13} className="text-stone-400" /> {currentUser.phone}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={13} className="text-stone-400" /> Member since Jan 2026
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <Link to="/explore" className="w-full sm:w-auto">
              <Button variant="primary" size="md" className="w-full sm:w-auto">
                Explore Rentals
              </Button>
            </Link>
          </div>
        </div>

        {/* ── TWO-COLUMN DASHBOARD LAYOUT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Scheduled Visits */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-5">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-brand-700" />
                <h2 className="text-sm font-extrabold text-stone-900 uppercase tracking-wider">
                  My Scheduled Property Visits
                </h2>
              </div>
              <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full">
                {scheduledVisits.length} upcoming
              </span>
            </div>

            <div className="space-y-4">
              {scheduledVisits.map(visit => (
                <div
                  key={visit.id}
                  className="p-4 rounded-xl bg-stone-50 border border-stone-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={visit.property.images[0]}
                      alt={visit.property.title}
                      className="size-16 rounded-xl object-cover shrink-0 border border-stone-200"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-emerald-700 mb-0.5">
                        {visit.status}
                      </p>
                      <h3 className="text-sm font-bold text-stone-900 truncate">
                        {visit.property.title}
                      </h3>
                      <p className="text-xs text-stone-500 truncate">
                        {visit.property.location.area}, {visit.property.location.city} • {formatRupee(visit.property.price)}/mo
                      </p>
                    </div>
                  </div>

                  <div className="text-left sm:text-right shrink-0">
                    <p className="text-xs font-bold text-stone-800">{visit.date}</p>
                    <p className="text-[11px] text-stone-500">{visit.time}</p>
                    <Link
                      to={`/property/${visit.property.id}`}
                      className="text-xs font-bold text-brand-700 hover:underline mt-1 inline-block"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Quick Wishlist Preview */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-5">
              <div className="flex items-center gap-2">
                <Heart size={18} className="text-rose-600 fill-rose-600" />
                <h2 className="text-sm font-extrabold text-stone-900 uppercase tracking-wider">
                  Shortlisted Properties
                </h2>
              </div>
              <Link to="/wishlist" className="text-xs font-bold text-brand-700 hover:underline">
                View all ({savedListings.length})
              </Link>
            </div>

            {savedListings.length > 0 ? (
              <div className="space-y-3">
                {savedListings.slice(0, 3).map(property => (
                  <Link
                    key={property.id}
                    to={`/property/${property.id}`}
                    className="p-3 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200/80 flex items-center justify-between gap-3 transition-colors block"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="size-12 rounded-lg object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-stone-900 truncate">
                          {property.title}
                        </p>
                        <p className="text-[11px] text-stone-500 truncate">
                          {property.location.area} • {formatRupee(property.price)}/mo
                        </p>
                      </div>
                    </div>
                    <ArrowRight size={14} className="text-stone-400 shrink-0" />
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-xs text-stone-400 text-center py-6">
                No properties in wishlist. Browse homes and tap the heart icon to save.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
