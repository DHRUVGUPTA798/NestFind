import api from './api'
import { mockUser } from '../data/mock/properties'

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'
const delay = (ms = 400) => new Promise((res) => setTimeout(res, ms))

export const authService = {
  async login(email, password) {
    if (USE_MOCK) {
      await delay(600)
      if (email && password) {
        const token = 'mock_jwt_token_' + Date.now()
        localStorage.setItem('nf_token', token)
        return { data: mockUser, token }
      }
      throw new Error('Invalid credentials')
    }
    return api.post('/auth/login', { email, password })
  },

  async signup(userData) {
    if (USE_MOCK) {
      await delay(800)
      return { data: { ...userData, id: 'u_new' }, message: 'Account created!' }
    }
    return api.post('/auth/signup', userData)
  },

  async logout() {
    localStorage.removeItem('nf_token')
    if (!USE_MOCK) return api.post('/auth/logout')
  },

  async getProfile() {
    if (USE_MOCK) {
      await delay(300)
      const token = localStorage.getItem('nf_token')
      if (!token) throw new Error('Not authenticated')
      return { data: mockUser }
    }
    return api.get('/auth/me')
  },
}

