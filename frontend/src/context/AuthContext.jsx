import { createContext, useContext, useState, useCallback } from 'react'
import { authService } from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const login = useCallback(async (email, password) => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await authService.login(email, password)
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
      return res
    } catch (err) {
      setError(err.message || 'Signup failed')
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    await authService.logout()
    setUser(null)
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

