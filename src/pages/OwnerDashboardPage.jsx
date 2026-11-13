import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Building2, PlusCircle, CheckCircle2, Clock, Users,
  TrendingUp, Eye, Edit3, Trash2, Shield, AlertCircle,
  Calendar, MessageSquare, ArrowRight, DollarSign
} from 'lucide-react'
import { mockProperties } from '../data/mock/properties'
import { formatRupee } from '../components/property/PropertyCard'
import Button from '../components/ui/Button'
import { cn } from '../utils/cn'

export default function OwnerDashboardPage() {
  const navigate = useNavigate()

  // Track landlord's properties
  const [ownerListings, setOwnerListings] = useState([
    mockProperties[0], // 2BHK Indiranagar
    mockProperties[2], // 3BHK Villa Pune
  ])

  // Mock Tenant Inquiries / Visit Requests
  const [inquiries, setInquiries] = useState([
    {
      id: 'inq-1',
      tenantName: 'Rahul Verma',
      tenantAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80&fit=crop',
      propertyTitle: 'Spacious 2BHK in Indiranagar',
      date: '2026-11-16',
      status: 'pending',
      phone: '+91 98111 22334',
      message: 'Hi, I am looking for immediate move-in for my family. Is parking included?',
    },
    {
      id: 'inq-2',
      tenantName: 'Sneha Patel',
      tenantAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80&fit=crop',
      propertyTitle: 'Modern 3BHK Villa with Garden',
      date: '2026-11-18',
      status: 'confirmed',
      phone: '+91 98222 33445',
      message: 'Software engineer at Hinjawadi. Can I visit this Saturday around 11 AM?',
    },
  ])

  const togglePropertyStatus = (id) => {
    setOwnerListings(prev =>
      prev.map(item => item.id === id ? { ...item, isAvailable: !item.isAvailable } : item)
    )
  }

  const handleDeleteListing = (id) => {
    if (window.confirm('Are you sure you want to remove this property listing?')) {
      setOwnerListings(prev => prev.filter(item => item.id !== id))
    }
  }

  const handleUpdateInquiry = (id, newStatus) => {
    setInquiries(prev =>
      prev.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq)
    )
  }

  return (
    <div className="bg-[#f8f9fb] min-h-[calc(100vh-72px)] py-8 sm:py-12 page-enter">
      <div className="container-xl">

        {/* Dashboard Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase tracking-wider">
                Landlord Portal
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
              Property Owner Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-stone-500">
              Manage your published listings, tenant tour requests and lease status
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/owner/add-property">
              <Button variant="emerald" size="md">
                <PlusCircle size={15} /> Add New Listing
              </Button>
            </Link>
          </div>
        </div>

        {/* ── KPI METRICS CARDS ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
            <div className="flex items-center justify-between text-stone-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Total Listings</span>
              <Building2 size={16} className="text-brand-700" />
            </div>
            <p className="text-2xl font-extrabold text-stone-900">{ownerListings.length}</p>
            <p className="text-[11px] text-stone-400 mt-0.5">Properties on platform</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
            <div className="flex items-center justify-between text-stone-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Active Rentals</span>
              <CheckCircle2 size={16} className="text-emerald-600" />
            </div>
            <p className="text-2xl font-extrabold text-emerald-700">
              {ownerListings.filter(p => p.isAvailable).length}
            </p>
            <p className="text-[11px] text-stone-400 mt-0.5">Available for tenants</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
            <div className="flex items-center justify-between text-stone-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Tenant Inquiries</span>
              <Users size={16} className="text-brand-700" />
            </div>
            <p className="text-2xl font-extrabold text-stone-900">{inquiries.length}</p>
            <p className="text-[11px] text-stone-400 mt-0.5">Active tour schedules</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
            <div className="flex items-center justify-between text-stone-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Potential Income</span>
              <DollarSign size={16} className="text-emerald-600" />
            </div>
            <p className="text-2xl font-extrabold text-stone-900">
              {formatRupee(ownerListings.reduce((sum, p) => sum + p.price, 0))}
            </p>
            <p className="text-[11px] text-stone-400 mt-0.5">Gross monthly roll</p>
          </div>
        </div>

        {/* ── TWO-COLUMN SPLIT: LISTINGS MANAGEMENT & INQUIRIES ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column (8 cols): Property Management Table */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-stone-100 flex items-center justify-between">
              <h2 className="text-sm font-extrabold text-stone-900 uppercase tracking-wider">
                My Listed Properties
              </h2>
              <span className="text-xs text-stone-500 font-semibold">
                {ownerListings.length} total homes
              </span>
            </div>

            {ownerListings.length > 0 ? (
              <div className="divide-y divide-stone-100">
                {ownerListings.map(property => (
                  <div key={property.id} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-stone-50/50 transition-colors">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="size-16 sm:size-20 rounded-xl object-cover shrink-0 border border-stone-200"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={cn(
                            'px-2 py-0.5 rounded text-[10px] font-bold uppercase',
                            property.isAvailable
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-stone-100 text-stone-600'
                          )}>
                            {property.isAvailable ? 'Available' : 'Occupied'}
                          </span>
                          <span className="text-[11px] font-bold text-stone-500">
                            {property.propertyTypeName || property.type}
                          </span>
                        </div>

                        <h3 className="text-sm font-bold text-stone-900 truncate">
                          {property.title}
                        </h3>
                        <p className="text-xs text-stone-500 truncate mt-0.5">
                          {property.location.area}, {property.location.city} • <strong className="text-brand-700">{formatRupee(property.price)}/mo</strong>
                        </p>
                      </div>
                    </div>

                    {/* Listing Action Controls */}
                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <button
                        onClick={() => togglePropertyStatus(property.id)}
                        className="px-2.5 py-1.5 rounded-lg border border-stone-200 text-xs font-bold text-stone-700 hover:bg-stone-100 transition-colors"
                      >
                        Mark as {property.isAvailable ? 'Occupied' : 'Available'}
                      </button>

                      <Link
                        to={`/property/${property.id}`}
                        className="p-2 rounded-lg border border-stone-200 text-stone-600 hover:text-brand-700 hover:bg-stone-100 transition-colors"
                        title="Preview Public Page"
                      >
                        <Eye size={15} />
                      </Link>

                      <button
                        onClick={() => handleDeleteListing(property.id)}
                        className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete Property"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-stone-500 text-xs">
                No active properties listed yet. Click "Add New Listing" to publish a home.
              </div>
            )}
          </div>

          {/* Right Column (4 cols): Tenant Tour Requests */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-stone-200 shadow-xs p-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
              <h2 className="text-sm font-extrabold text-stone-900 uppercase tracking-wider">
                Tenant Tour Inquiries
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 font-bold text-[11px]">
                {inquiries.length}
              </span>
            </div>

            <div className="space-y-4">
              {inquiries.map(inq => (
                <div key={inq.id} className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <img src={inq.tenantAvatar} alt={inq.tenantName} className="size-7 rounded-full object-cover" />
                      <div>
                        <p className="text-xs font-bold text-stone-900 leading-none">{inq.tenantName}</p>
                        <p className="text-[10px] text-stone-400 mt-0.5">{inq.phone}</p>
                      </div>
                    </div>
                    <span className={cn(
                      'text-[10px] font-bold px-2 py-0.5 rounded uppercase',
                      inq.status === 'confirmed'
                        ? 'bg-emerald-50 text-emerald-800'
                        : 'bg-amber-50 text-amber-800'
                    )}>
                      {inq.status}
                    </span>
                  </div>

                  <p className="text-[11px] text-stone-600 bg-white p-2 rounded-lg border border-stone-200/60 leading-relaxed italic">
                    "{inq.message}"
                  </p>

                  <div className="flex items-center justify-between pt-1 text-[11px]">
                    <span className="text-stone-500 flex items-center gap-1 font-semibold">
                      <Calendar size={12} className="text-stone-400" /> Visit: {inq.date}
                    </span>
                    {inq.status === 'pending' ? (
                      <button
                        onClick={() => handleUpdateInquiry(inq.id, 'confirmed')}
                        className="text-xs font-bold text-emerald-700 hover:underline"
                      >
                        Accept Visit
                      </button>
                    ) : (
                      <span className="text-emerald-700 font-bold text-xs">Confirmed ✓</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-stone-100 text-center">
              <Link
                to="/chat"
                className="text-xs font-bold text-brand-700 hover:underline inline-flex items-center gap-1"
              >
                Open Messaging Inbox <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

