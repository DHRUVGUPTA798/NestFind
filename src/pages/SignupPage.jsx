import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Lock, Phone, Eye, EyeOff, Home, Building2, ShieldCheck, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Button from '../components/ui/Button'
import { cn } from '../utils/cn'

export default function SignupPage() {
  const navigate = useNavigate()
  const { signup, isLoading } = useAuth()

  const [role, setRole] = useState('tenant') // 'tenant' | 'owner'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.')
      return
    }

    try {
      await signup({
        name,
        email,
        phone,
        password,
        role,
        avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80&fit=crop`,
      })
      navigate(role === 'owner' ? '/owner/dashboard' : '/dashboard')
    } catch (err) {
      setErrorMessage(err.message || 'Signup failed. Please try again.')
    }
  }

  return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center bg-[#f8f9fb] py-12 px-4 page-enter">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-stone-200 shadow-md">

        {/* Brand Icon Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center size-10 rounded-xl bg-brand-700 text-white mb-3 shadow-xs">
            <Home size={20} strokeWidth={2.4} />
          </div>
          <h1 className="text-xl font-extrabold text-stone-900 tracking-tight">
            Create Your NextFind Account
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Join thousands of verified renters and landlords across India
          </p>
        </div>

        {/* Role Selector Tabs (Tenant vs Landlord) */}
        <div className="mb-5 grid grid-cols-2 gap-2 p-1 bg-stone-100 rounded-xl border border-stone-200">
          <button
            type="button"
            onClick={() => setRole('tenant')}
            className={cn(
              'py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5',
              role === 'tenant'
                ? 'bg-white text-brand-700 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            )}
          >
            <User size={14} /> I am a Tenant
          </button>
          <button
            type="button"
            onClick={() => setRole('owner')}
            className={cn(
              'py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5',
              role === 'owner'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            )}
          >
            <Building2 size={14} /> I am an Owner
          </button>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-semibold flex items-center gap-2">
            <AlertCircle size={15} className="shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Full Name */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block mb-1">
              Full Name
            </label>
            <div className="relative flex items-center">
              <User size={15} className="absolute left-3 text-stone-400" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Aarav Sharma"
                className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl bg-stone-50 border border-stone-200 text-stone-900 outline-none focus:bg-white focus:border-brand-700 transition-all"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block mb-1">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail size={15} className="absolute left-3 text-stone-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl bg-stone-50 border border-stone-200 text-stone-900 outline-none focus:bg-white focus:border-brand-700 transition-all"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block mb-1">
              Phone Number
            </label>
            <div className="relative flex items-center">
              <Phone size={15} className="absolute left-3 text-stone-400" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl bg-stone-50 border border-stone-200 text-stone-900 outline-none focus:bg-white focus:border-brand-700 transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block mb-1">
              Create Password
            </label>
            <div className="relative flex items-center">
              <Lock size={15} className="absolute left-3 text-stone-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full pl-9 pr-10 py-2.5 text-xs sm:text-sm font-semibold rounded-xl bg-stone-50 border border-stone-200 text-stone-900 outline-none focus:bg-white focus:border-brand-700 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="absolute right-3 text-stone-400 hover:text-stone-700"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            variant={role === 'owner' ? 'emerald' : 'primary'}
            size="md"
            className="w-full mt-2"
            isLoading={isLoading}
          >
            Create {role === 'owner' ? 'Landlord' : 'Tenant'} Account
          </Button>
        </form>

        <div className="mt-6 pt-5 border-t border-stone-100 text-center">
          <p className="text-xs text-stone-500">
            Already registered?{' '}
            <Link to="/login" className="font-bold text-brand-700 hover:underline">
              Sign In here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

