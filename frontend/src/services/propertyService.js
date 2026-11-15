import api from './api'
import { demoPersistence } from './demoPersistence'

const USE_MOCK = import.meta.env?.VITE_USE_MOCK !== 'false'
const DEMO_OWNER = { id: 'demo-owner', name: 'NextFind Demo Owner', responseRate: 100, verifiedOwner: false }
let properties = demoPersistence.readProperties()
const listeners = new Set()

function notify() {
  listeners.forEach((listener) => listener())
}

function publish(nextProperties, persist = false) {
  if (persist && USE_MOCK) demoPersistence.writeProperties(nextProperties)
  properties = nextProperties
  notify()
}

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (event.key === 'nextfind.demo.properties.v1') {
      properties = demoPersistence.readProperties()
      notify()
    }
  })
}

function createId() {
  let id
  do {
    id = globalThis.crypto?.randomUUID?.() || `demo-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
  } while (properties.some((property) => property.id === id))
  return id
}

function filterProperties(source, filters = {}) {
  let results = [...source]
  if (filters.city) results = results.filter((p) => p.location?.city?.toLowerCase().includes(filters.city.toLowerCase()))
  if (filters.type) results = results.filter((p) => p.type === filters.type)
  if (filters.minPrice) results = results.filter((p) => p.price >= Number(filters.minPrice))
  if (filters.maxPrice) results = results.filter((p) => p.price <= Number(filters.maxPrice))
  if (filters.bedrooms) results = results.filter((p) => p.bedrooms >= Number(filters.bedrooms))
  return results
}

const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms))

export const propertyService = {
  isDemoMode: USE_MOCK,
  getSnapshot: () => properties,
  subscribe(listener) {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
  async getProperties(filters = {}) {
    if (!USE_MOCK) return api.get('/properties', { params: filters })
    await delay()
    const results = filterProperties(properties, filters)
    return { data: results, total: results.length }
  },
  async getPropertyById(id) {
    if (!USE_MOCK) return api.get(`/properties/${id}`)
    await delay(150)
    const property = properties.find((item) => item.id === String(id))
    if (!property) throw new Error('Property not found')
    return { data: property }
  },
  async createProperty(data) {
    if (!USE_MOCK) {
      const response = await api.post('/properties', data)
      const property = response?.data || response?.property || response
      if (!property?.id) throw new Error('The property service returned an invalid create response.')
      notify()
      return { data: property, message: response?.message || 'Property listed!' }
    }
    if (!data?.title?.trim() || !data?.location?.city || !data?.location?.area?.trim() ||
      !data?.location?.address?.trim() || !Number.isFinite(Number(data.price)) || Number(data.price) <= 0 ||
      !Number.isFinite(Number(data.area)) || Number(data.area) <= 0 || !Array.isArray(data.images) || !data.images.length) {
      throw new Error('Required property details are missing or invalid.')
    }
    const id = createId()
    const property = {
      ...data,
      id,
      price: Number(data.price),
      deposit: Number(data.deposit) || 0,
      bedrooms: Number(data.bedrooms) || 0,
      bathrooms: Number(data.bathrooms) || 0,
      area: Number(data.area),
      location: { ...data.location },
      images: [...data.images],
      amenities: Array.isArray(data.amenities) ? [...data.amenities] : [],
      rating: null,
      reviewCount: 0,
      isVerified: false,
      isAvailable: true,
      postedAt: new Date().toISOString().slice(0, 10),
      owner: { ...DEMO_OWNER, ...data.owner },
    }
    const nextProperties = [property, ...properties]
    await delay(100)
    publish(nextProperties, true)
    return { data: property, message: 'Property listed!' }
  },
  async updateProperty(id, data) {
    if (!USE_MOCK) {
      const response = await api.put(`/properties/${id}`, data)
      notify()
      return response
    }
    const existing = properties.find((item) => item.id === String(id))
    if (!existing) throw new Error('Property not found')
    const updated = { ...existing, ...data, id: existing.id }
    publish(properties.map((item) => item.id === existing.id ? updated : item), true)
    return { data: updated, message: 'Property updated!' }
  },
  async deleteProperty(id) {
    if (!USE_MOCK) {
      const response = await api.delete(`/properties/${id}`)
      notify()
      return response
    }
    if (!properties.some((item) => item.id === String(id))) throw new Error('Property not found')
    publish(properties.filter((item) => item.id !== String(id)), true)
    return { message: 'Property deleted.' }
  },
}
