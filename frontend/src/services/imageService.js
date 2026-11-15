import api from './api'
import { demoImagePersistence } from './demoImagePersistence'

const USE_MOCK = import.meta.env?.VITE_USE_MOCK !== 'false'

// Replace this service with a multipart image API when the backend is available.
export const imageService = {
  async upload(files) {
    if (!files.length) return []
    if (USE_MOCK) return demoImagePersistence.save(files)
    const body = new FormData()
    files.forEach((file) => body.append('images', file))
    const response = await api.post('/properties/images', body)
    const images = response?.data?.images || response?.images
    if (!Array.isArray(images) || images.length !== files.length) throw new Error('The image service returned an invalid response.')
    return images
  },

  async acquire(reference) {
    return typeof reference === 'string' && reference.startsWith('idb:')
      ? demoImagePersistence.acquire(reference)
      : reference
  },

  release(reference) {
    if (typeof reference === 'string' && reference.startsWith('idb:')) demoImagePersistence.release(reference)
  },
}
