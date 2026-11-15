import api from './api'

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'
const USERS_KEY = 'nextfind.demo.users.v1'
const SESSION_KEY = 'nextfind.demo.session.v1'
const ITERATIONS = 120000

function readUsers() {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
    return Array.isArray(users) ? users.map((user) => ({
      ...user,
      email: String(user.email || '').trim().toLowerCase(),
      role: user.role === 'owner' ? 'owner' : 'tenant',
    })) : []
  } catch {
    return []
  }
}

function publicUser(user) {
  const { passwordHash: _passwordHash, passwordSalt: _passwordSalt, password: _password, ...profile } = user
  return profile
}

function bytesToBase64(bytes) {
  return btoa(String.fromCharCode(...new Uint8Array(bytes)))
}

async function hashPassword(password, salt) {
  if (!globalThis.crypto?.subtle) throw new Error('Secure browser cryptography is unavailable. Use localhost or HTTPS.')
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits'])
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: ITERATIONS, hash: 'SHA-256' }, key, 256)
  return bytesToBase64(bits)
}

async function createCredential(password) {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  return { passwordSalt: bytesToBase64(salt), passwordHash: await hashPassword(password, salt) }
}

function currentDemoUser() {
  try {
    const session = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null')
    if (!session?.userId) return null
    const user = readUsers().find((item) => item.id === session.userId)
    return user ? publicUser(user) : null
  } catch {
    return null
  }
}

const delay = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms))

export const authService = {
  isDemoMode: USE_MOCK,
  async login(email, password, role = 'tenant') {
    if (USE_MOCK) {
      await delay()
      const normalizedEmail = email.trim().toLowerCase()
      let user = readUsers().find((item) => item.email === normalizedEmail)
      if (!user) throw new Error('No account was found for that email address.')
      let authenticated = false
      if (user.passwordHash && user.passwordSalt) {
        const candidate = await hashPassword(password, Uint8Array.from(atob(user.passwordSalt), (char) => char.charCodeAt(0)))
        authenticated = candidate === user.passwordHash
      } else if (typeof user.password === 'string') {
        // Upgrade credentials from earlier browser demo builds after a successful match.
        authenticated = user.password === password
        if (authenticated) {
          const users = readUsers()
          const index = users.findIndex((item) => item.id === user.id)
          if (index >= 0) {
            const { password: _legacyPassword, ...profile } = users[index]
            users[index] = { ...profile, ...(await createCredential(password)) }
            localStorage.setItem(USERS_KEY, JSON.stringify(users))
            user = users[index]
          }
        }
      }
      if (!authenticated) throw new Error('Incorrect password for this email address.')
      if (user.role !== role) {
        throw new Error(`This account is registered as a ${user.role === 'owner' ? 'property owner' : 'tenant'}. Select the matching account type to sign in.`)
      }
      const token = `demo-session-${crypto.randomUUID()}`
      localStorage.setItem(SESSION_KEY, JSON.stringify({ userId: user.id, token }))
      return { data: publicUser(user), token }
    }
    const response = await api.post('/auth/login', { email: email.trim().toLowerCase(), password, role })
    const token = response?.token || response?.accessToken
    const profile = response?.data || response?.user || response
    if (profile?.role !== role) {
      localStorage.removeItem('nf_token')
      if (profile?.role) throw new Error(`This account is registered as a ${profile.role === 'owner' ? 'property owner' : 'tenant'}. Select the matching account type to sign in.`)
      throw new Error('The account type could not be verified. Please try again.')
    }
    if (token) localStorage.setItem('nf_token', token)
    return { ...response, data: profile, token }
  },

  async signup(userData) {
    if (USE_MOCK) {
      await delay()
      const name = userData.name?.trim()
      const email = userData.email?.trim().toLowerCase()
      const password = userData.password || ''
      if (!name || !email || !/^\S+@\S+\.\S+$/.test(email)) throw new Error('Enter a valid name and email address.')
      if (password.length < 8) throw new Error('Password must be at least 8 characters long.')
      const users = readUsers()
      if (users.some((user) => String(user.email).trim().toLowerCase() === email)) throw new Error('An account with this email already exists.')
      if (!['tenant', 'owner'].includes(userData.role)) throw new Error('Choose Tenant or Property Owner as your account type.')
      const credentials = await createCredential(password)
      const user = {
        id: crypto.randomUUID(), name, email, phone: userData.phone?.trim() || '', role: userData.role || 'tenant',
        avatar: userData.avatar || '', joinedAt: new Date().toISOString().slice(0, 10), ...credentials,
      }
      users.push(user)
      localStorage.setItem(USERS_KEY, JSON.stringify(users))
      const token = `demo-session-${crypto.randomUUID()}`
      localStorage.setItem(SESSION_KEY, JSON.stringify({ userId: user.id, token }))
      return { data: publicUser(user), token, message: 'Demo account created and signed in.' }
    }
    const response = await api.post('/auth/signup', {
      ...userData,
      name: userData.name?.trim(),
      email: userData.email?.trim().toLowerCase(),
      phone: userData.phone?.trim() || '',
    })
    const token = response?.token || response?.accessToken
    if (token) localStorage.setItem('nf_token', token)
    return { ...response, data: response?.data || response?.user || response, token }
  },

  async logout() {
    if (USE_MOCK) {
      localStorage.removeItem(SESSION_KEY)
      return
    }
    try {
      return await api.post('/auth/logout')
    } finally {
      localStorage.removeItem('nf_token')
    }
  },

  async getProfile() {
    if (USE_MOCK) {
      await delay(50)
      const user = currentDemoUser()
      if (!user) throw new Error('Not authenticated')
      return { data: user }
    }
    const response = await api.get('/auth/me')
    return { ...response, data: response?.data || response?.user || response }
  },

  getStoredProfile() {
    return USE_MOCK ? currentDemoUser() : null
  },
}

