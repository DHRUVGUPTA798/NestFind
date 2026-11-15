import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, Heart, ChevronDown, LogOut, LayoutDashboard, MessageSquare, Home, PlusCircle } from 'lucide-react'
import { useScrolled } from '../../hooks/useScrollPosition'
import { useAuth } from '../../context/AuthContext'
import { useWishlist } from '../../context/WishlistContext'
import { cn } from '../../utils/cn'

const navLinks = [
  { to: '/explore', label: 'Explore' },
  { to: '/wishlist', label: 'Saved' },
]

export default function Navbar() {
  const scrolled = useScrolled(12)
  const { user, logout } = useAuth()
  const { wishlist } = useWishlist()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef(null)

  // Close dropdown on click outside
  useEffect(() => {
    function handler(e) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    function closeMenus(event) {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        setUserMenuOpen(false)
      }
    }
    window.addEventListener('keydown', closeMenus)
    return () => window.removeEventListener('keydown', closeMenus)
  }, [])

  // Prevent scroll lock issues
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    if (menuOpen) document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [menuOpen])

  const handleLogout = async () => {
    await logout()
    setUserMenuOpen(false)
    setMenuOpen(false)
    navigate('/')
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-200',
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-stone-200/90 shadow-[0_2px_16px_-4px_rgba(25,51,107,0.06)]'
            : 'bg-stone-50 border-b border-stone-200/60'
        )}
      >
        <div className="container-xl">
          <div className="flex items-center justify-between h-[72px]">

            {/* ── Left: Logo ─────────────────────────── */}
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2.5 group select-none">
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-brand-700 text-white shadow-sm transition-transform duration-200 group-hover:scale-[1.03]">
                  <Home size={18} strokeWidth={2.4} />
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-[1.2rem] tracking-tight text-stone-900 leading-none">
                    Next<span className="text-brand-700">Find</span>
                  </span>
                  <span className="text-[9px] font-semibold text-stone-500 tracking-wider uppercase mt-0.5">
                    Rental Platform
                  </span>
                </div>
              </Link>
            </div>

            {/* ── Center: Navigation Links ──────────── */}
            <nav className="hidden lg:flex items-center gap-1.5">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    cn(
                      'px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150',
                      isActive
                        ? 'text-brand-700 bg-brand-50/80 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/70'
                    )
                  }
                >
                  <span className="flex items-center gap-1.5">
                    {label}
                    {to === '/wishlist' && wishlist.length > 0 && (
                      <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold rounded-full bg-emerald-600 text-white">
                        {wishlist.length}
                      </span>
                    )}
                  </span>
                </NavLink>
              ))}
            </nav>

            {/* ── Right: Owner CTA + Auth Actions ──── */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Secondary CTA: List Your Property */}
              {(!user || user.role === 'owner') && <Link
                to={user ? '/owner/add-property' : '/signup'}
                state={!user ? { from: { pathname: '/owner/add-property' } } : undefined}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-stone-700 hover:text-brand-700 hover:bg-stone-100/70 rounded-lg transition-colors duration-150"
              >
                <PlusCircle size={14} className="text-emerald-600" />
                List Your Property
              </Link>}

              <div className="h-4 w-px bg-stone-200 mx-0.5" />

              {user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen(v => !v)}
                    className={cn(
                      'flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-semibold transition-all duration-150',
                      userMenuOpen
                        ? 'border-brand-300 bg-brand-50/70 text-brand-700'
                        : 'border-stone-200 hover:border-stone-300 text-stone-800 bg-white'
                    )}
                  >
                    {user.avatar ? <img src={user.avatar} alt="" className="size-7 rounded-full object-cover border border-stone-200" /> : (
                      <span aria-hidden="true" className="grid size-7 place-items-center rounded-full border border-brand-200 bg-brand-50 text-[10px] font-bold text-brand-700">
                        {user.name.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase()}
                      </span>
                    )}
                    <span className="max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                    <ChevronDown size={14} className={cn('text-stone-400 transition-transform duration-200', userMenuOpen && 'rotate-180')} />
                  </button>

                  {/* Dropdown */}
                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl border border-stone-200 shadow-xl overflow-hidden py-1.5 z-50">
                      <div className="px-4 py-3 border-b border-stone-100 bg-stone-50/60">
                        <p className="text-sm font-bold text-stone-900 truncate">{user.name}</p>
                        <p className="text-xs text-stone-500 truncate">{user.email}</p>
                      </div>

                      <div className="py-1">
                        <Link
                          to={user.role === 'owner' ? '/owner/dashboard' : '/dashboard'}
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50 hover:text-brand-700 transition-colors"
                        >
                          <LayoutDashboard size={14} className="text-stone-400" />
                          {user.role === 'owner' ? 'Owner Dashboard' : 'Tenant Dashboard'}
                        </Link>
                        <Link
                          to="/wishlist"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50 hover:text-brand-700 transition-colors"
                        >
                          <Heart size={14} className="text-stone-400" />
                          Saved Listings ({wishlist.length})
                        </Link>
                        <Link
                          to="/chat"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50 hover:text-brand-700 transition-colors"
                        >
                          <MessageSquare size={14} className="text-stone-400" />
                          Messages
                        </Link>
                      </div>

                      <div className="pt-1 border-t border-stone-100">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2.5 w-full text-left px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut size={14} />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate('/login')}
                    className="px-3.5 py-2 text-sm font-semibold text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => navigate('/signup')}
                    className="px-4 py-2 text-sm font-bold text-white bg-brand-700 hover:bg-brand-600 rounded-lg shadow-sm transition-all duration-150"
                  >
                    Get Started
                  </button>
                </div>
              )}
            </div>

            {/* ── Mobile Hamburger ─────────────────── */}
            <button
              onClick={() => setMenuOpen(v => !v)}
              className="lg:hidden flex items-center justify-center size-10 rounded-lg text-stone-700 hover:bg-stone-100"
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Navigation Drawer ──────────── */}
      {menuOpen && (
        <div id="mobile-navigation" className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true" aria-label="Main navigation">
          <div
            className="absolute inset-0 bg-stone-900/40 backdrop-blur-xs"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute top-[72px] inset-x-0 bottom-0 bg-stone-50 overflow-y-auto px-5 py-6 flex flex-col justify-between">
            <div className="space-y-1">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center justify-between px-4 py-3 rounded-xl text-base font-bold',
                      isActive ? 'bg-brand-50 text-brand-700' : 'text-stone-700 hover:bg-stone-100'
                    )
                  }
                >
                  <span>{label}</span>
                  {to === '/wishlist' && wishlist.length > 0 && (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-600 text-white font-bold">
                      {wishlist.length}
                    </span>
                  )}
                </NavLink>
              ))}

              {(!user || user.role === 'owner') && <Link
                to={user ? '/owner/add-property' : '/signup'}
                state={!user ? { from: { pathname: '/owner/add-property' } } : undefined}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-base font-bold text-emerald-700 hover:bg-emerald-50 mt-2"
              >
                <PlusCircle size={18} />
                List Your Property
              </Link>}
            </div>

            <div className="pt-6 border-t border-stone-200 space-y-3">
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-3 py-2 bg-white rounded-xl border border-stone-200">
                    {user.avatar ? <img src={user.avatar} alt="" className="size-10 rounded-full object-cover" /> : (
                      <span aria-hidden="true" className="grid size-10 place-items-center rounded-full bg-brand-50 font-bold text-brand-700">
                        {user.name.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase()}
                      </span>
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-stone-900 truncate">{user.name}</p>
                      <p className="text-xs text-stone-500 truncate">{user.email}</p>
                    </div>
                  </div>
                  <Link to={user.role === 'owner' ? '/owner/dashboard' : '/dashboard'} onClick={() => setMenuOpen(false)} className="block rounded-xl px-4 py-3 text-sm font-bold text-stone-800 hover:bg-white">
                    <LayoutDashboard size={16} className="mr-2 inline-block text-brand-700" />{user.role === 'owner' ? 'Owner Dashboard' : 'Tenant Dashboard'}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full py-3 text-sm font-bold text-red-600 border border-red-200 bg-red-50/50 rounded-xl"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => { navigate('/login'); setMenuOpen(false) }}
                    className="w-full py-3 text-sm font-bold text-stone-800 bg-white border border-stone-200 rounded-xl"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => { navigate('/signup'); setMenuOpen(false) }}
                    className="w-full py-3 text-sm font-bold text-white bg-brand-700 rounded-xl shadow-sm"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
