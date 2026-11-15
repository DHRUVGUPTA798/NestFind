import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function RequireAuth({ children, role }) {
  const { user, isLoading } = useAuth()
  const location = useLocation()
  if (isLoading) return <div className="container-xl py-16 text-center text-sm text-stone-500" role="status">Loading your account…</div>
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />
  if (role && user.role !== role) {
    const destination = user.role === 'owner' ? '/owner/dashboard' : '/dashboard'
    return <main className="container-xl flex min-h-[55vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-bold text-stone-900">This area is for {role === 'owner' ? 'property owners' : 'tenants'}</h1>
      <p className="mt-3 max-w-md text-sm leading-6 text-stone-600">You are signed in as a {user.role === 'owner' ? 'property owner' : 'tenant'}. Your account cannot access this dashboard.</p>
      <Link to={destination} className="mt-6 rounded-xl bg-brand-700 px-5 py-3 text-sm font-bold text-white hover:bg-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700">Go to your dashboard</Link>
    </main>
  }
  return children || <Outlet />
}
