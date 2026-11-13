import { Link } from 'react-router-dom'
import { Home, Mail, Send, Globe, Share2, MapPin, Phone, ShieldCheck, ArrowUpRight } from 'lucide-react'

const footerLinks = {
  Explore: [
    { label: 'All Properties',      to: '/explore' },
    { label: 'Single & Shared Rooms', to: '/explore?type=room' },
    { label: 'Flats & Apartments',  to: '/explore?type=flat' },
    { label: 'Independent Houses',  to: '/explore?type=house' },
    { label: 'PG & Hostels',        to: '/explore?type=pg' },
  ],
  Platform: [
    { label: 'How It Works',   to: '/#how-it-works' },
    { label: 'Why NextFind',   to: '/#why-nextfind' },
    { label: 'About Project',  to: '#' },
    { label: 'Safety Guidelines', to: '#' },
  ],
  'Property Owners': [
    { label: 'List Your Property', to: '/owner/add-property' },
    { label: 'Owner Dashboard',    to: '/owner/dashboard' },
    { label: 'Rental Agreement Assist', to: '#' },
    { label: 'Verification Process', to: '#' },
  ],
  Support: [
    { label: 'Help & FAQs',    to: '#' },
    { label: 'Contact Support', to: '/chat' },
    { label: 'Privacy Policy', to: '#' },
    { label: 'Terms of Service', to: '#' },
  ],
}

const popularCities = [
  'Bengaluru', 'Mumbai', 'Delhi NCR', 'Hyderabad', 'Pune', 'Chennai'
]

export default function Footer() {
  return (
    <footer className="bg-[#142854] text-stone-300 border-t border-brand-900/60 selection:bg-emerald-600 selection:text-white">

      {/* Top Banner: Quick City Exploration */}
      <div className="border-b border-white/10 bg-[#0f1d3e]/50">
        <div className="container-xl py-3.5">
          <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-4 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
                <MapPin size={12} className="text-emerald-400" /> Major Rental Hubs:
              </span>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                {popularCities.map((city, idx) => (
                  <span key={city} className="flex items-center">
                    <Link
                      to={`/explore?city=${encodeURIComponent(city)}`}
                      className="text-stone-300 hover:text-white hover:underline transition-colors"
                    >
                      {city}
                    </Link>
                    {idx < popularCities.length - 1 && (
                      <span className="text-stone-500 ml-2">/</span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-stone-400 text-[11px]">
              <ShieldCheck size={13} className="text-emerald-400" />
              <span>100% Direct Owner & Verified Listings</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container-xl py-14 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 lg:gap-10">

          {/* Brand Info & Mission Statement */}
          <div className="col-span-2 md:col-span-4 lg:col-span-4">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group inline-flex">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600 text-white shadow-sm">
                <Home size={16} strokeWidth={2.5} />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                Next<span className="text-emerald-400">Find</span>
              </span>
            </Link>

            <p className="text-xs text-stone-300 leading-relaxed mb-6 max-w-sm">
              NextFind is a smart house & room rental platform built to simplify home discovery for students, working professionals, and families across India. Zero broker hassles, transparent pricing, verified homes.
            </p>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-stone-300">
                <Mail size={13} className="text-emerald-400 shrink-0" />
                <a href="mailto:support@nextfind.internal" className="hover:text-white transition-colors">
                  contact@nextfind.local
                </a>
              </div>
              <div className="flex items-center gap-2 text-stone-300">
                <Phone size={13} className="text-emerald-400 shrink-0" />
                <span>Student & Tenant Helpline: +91 (800) 244-FIND</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="col-span-1 md:col-span-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5 text-xs">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-stone-300 hover:text-white transition-colors inline-block"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar: Academic & Copyright Attributions */}
      <div className="border-t border-white/10 bg-[#0c1836]/70">
        <div className="container-xl py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400">
          <p>
            © {new Date().getFullYear()} NextFind Platform. Academic Group Project.
          </p>
          <div className="flex items-center gap-4 text-stone-400 text-[11px]">
            <span>Stack: React · Vite · Tailwind CSS · Node.js · PostgreSQL</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
