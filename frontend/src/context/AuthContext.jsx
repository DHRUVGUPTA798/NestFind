import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { authService } from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authService.getStoredProfile())
  const [isLoading, setIsLoading] = useState(!authService.isDemoMode)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (authService.isDemoMode) return undefined
    let active = true
    authService.getProfile()
      .then((response) => { if (active) setUser(response.data) })
      .catch(() => { if (active) setUser(null) })
      .finally(() => { if (active) setIsLoading(false) })
    return () => { active = false }
  }, [])

  const login = useCallback(async (email, password, role) => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await authService.login(email, password, role)
      setUser(res.data)
      return res
    } catch (err) {
      setError(err.message || 'Login failed')
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const signup = useCallback(async (userData) => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await authService.signup(userData)
      setUser(res.data)
      return res
    } catch (err) {
      setError(err.message || 'Signup failed')
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await authService.logout()
    } finally {
      setUser(null)
    }
  }, [])

  const value = {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}

