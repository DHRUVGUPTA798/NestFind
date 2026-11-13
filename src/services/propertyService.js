import api from './api'
import { mockProperties } from '../data/mock/properties'

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'

// Simulate async delay for mock responses
const delay = (ms = 400) => new Promise((res) => setTimeout(res, ms))

export const propertyService = {
  /**
   * Fetch all properties with optional filters
   */
  async getProperties(filters = {}) {
    if (USE_MOCK) {
      await delay()
      let results = [...mockProperties]

      // Basic client-side filtering on mock data
      if (filters.city) {
        results = results.filter((p) =>
          p.location.city.toLowerCase().includes(filters.city.toLowerCase())
        )
      }
      if (filters.type) {
        results = results.filter((p) => p.type === filters.type)
      }
      if (filters.minPrice) {
        results = results.filter((p) => p.price >= Number(filters.minPrice))
      }
      if (filters.maxPrice) {
        results = results.filter((p) => p.price <= Number(filters.maxPrice))
      }
      if (filters.bedrooms) {
        results = results.filter((p) => p.bedrooms >= Number(filters.bedrooms))
      }

      return { data: results, total: results.length }
    }
    return api.get('/properties', { params: filters })
  },

  /**
   * Fetch a single property by ID
   */
  async getPropertyById(id) {
    if (USE_MOCK) {
      await delay(300)
      const property = mockProperties.find((p) => p.id === id)
      if (!property) throw new Error('Property not found')
      return { data: property }
    }
    return api.get(`/properties/${id}`)
  },

  /**
   * Create a new property listing (owner only)
   */
  async createProperty(data) {
    if (USE_MOCK) {
      await delay(600)
      return { data: { ...data, id: Date.now().toString() }, message: 'Property listed!' }
    }
    return api.post('/properties', data)
  },

  /**
   * Update an existing property listing
   */
  async updateProperty(id, data) {
    if (USE_MOCK) {
      await delay(500)
      return { data: { id, ...data }, message: 'Property updated!' }
    }
    return api.put(`/properties/${id}`, data)
  },

  /**
   * Delete a property listing
   */
  async deleteProperty(id) {
    if (USE_MOCK) {
      await delay(400)
      return { message: 'Property deleted.' }
    }
    return api.delete(`/properties/${id}`)
  },
}

