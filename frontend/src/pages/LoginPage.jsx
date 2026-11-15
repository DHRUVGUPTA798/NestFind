import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, Home, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Button from '../components/ui/Button'

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isLoading } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('tenant')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    try {
      const response = await login(email, password, role)
      const requestedPath = location.state?.from?.pathname
      const roleCompatiblePath = response.data.role === 'owner'
        ? requestedPath?.startsWith('/owner/')
        : requestedPath && !requestedPath.startsWith('/owner/')
      navigate(roleCompatiblePath ? requestedPath : (response.data.role === 'owner' ? '/owner/dashboard' : '/dashboard'), { replace: true })
    } catch (err) {
      setErrorMessage(err.message || 'Invalid email or password.')
    }
  }

  return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center bg-stone-50 py-12 px-4 page-enter">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-stone-200 shadow-md">

        {/* Brand Icon Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center size-10 rounded-xl bg-brand-700 text-white mb-3 shadow-xs">
            <Home size={20} strokeWidth={2.4} />
          </div>
          <h1 className="text-xl font-extrabold text-stone-900 tracking-tight">
            Welcome back to NextFind
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Sign in to manage your bookings, wishlist and direct chats
          </p>
        </div>

        <p className="mb-5 text-xs text-stone-500">Sign in with your NextFind account. Demo accounts are stored only in this browser.</p>

        <label htmlFor="login-role" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-600">Account type</label>
        <select id="login-role" value={role} onChange={(event) => setRole(event.target.value)} className="mb-4 w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm font-semibold text-stone-900 focus:border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-100">
          <option value="tenant">Tenant</option>
          <option value="owner">Property Owner</option>
        </select>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-semibold flex items-center gap-2">
            <AlertCircle size={15} className="shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="login-email" className="text-xs font-bold uppercase tracking-wider text-stone-600 block mb-1.5">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail size={16} className="absolute left-3 text-stone-400" />
              <input
                id="login-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl bg-stone-50 border border-stone-200 text-stone-900 outline-none focus:bg-white focus:border-brand-700 transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="login-password" className="text-xs font-bold uppercase tracking-wider text-stone-600">
                Password
              </label>
            </div>
            <div className="relative flex items-center">
              <Lock size={16} className="absolute left-3 text-stone-400" />
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2.5 text-xs sm:text-sm font-semibold rounded-xl bg-stone-50 border border-stone-200 text-stone-900 outline-none focus:bg-white focus:border-brand-700 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                aria-pressed={showPassword}
                className="absolute right-3 text-stone-400 hover:text-stone-700"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full mt-2"
            isLoading={isLoading}
          >
            Sign In to Account
          </Button>
        </form>

        <div className="mt-6 pt-5 border-t border-stone-100 text-center">
          <p className="text-xs text-stone-500">
            Don't have an account yet?{' '}
            <Link to="/signup" state={location.state} className="font-bold text-brand-700 hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

