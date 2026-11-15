const DB_NAME = 'nextfind.demo.images'
const STORE_NAME = 'propertyImages'
const DB_VERSION = 1
const objectUrls = new Map()

function openDatabase() {
  if (!globalThis.indexedDB) return Promise.reject(new Error('This browser does not support local image storage.'))
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)
    request.onupgradeneeded = () => {
      const database = request.result
      if (!database.objectStoreNames.contains(STORE_NAME)) database.createObjectStore(STORE_NAME, { keyPath: 'id' })
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error || new Error('Could not open local image storage.'))
  })
}

export const demoImagePersistence = {
  async save(files) {
    const database = await openDatabase()
    const records = files.map((file) => ({ id: crypto.randomUUID(), blob: file, name: file.name, type: file.type }))
    await new Promise((resolve, reject) => {
      const transaction = database.transaction(STORE_NAME, 'readwrite')
      const store = transaction.objectStore(STORE_NAME)
      records.forEach((record) => store.put(record))
      transaction.oncomplete = resolve
      transaction.onerror = () => reject(transaction.error || new Error('Could not save property images.'))
      transaction.onabort = () => reject(transaction.error || new Error('Property image storage was interrupted.'))
    })
    database.close()
    return records.map(({ id }) => `idb:${id}`)
  },

  async acquire(reference) {
    const id = reference.slice(4)
    if (objectUrls.has(id)) {
      const cached = objectUrls.get(id)
      cached.users += 1
      return cached.url
    }
    const database = await openDatabase()
    const record = await new Promise((resolve, reject) => {
      const request = database.transaction(STORE_NAME, 'readonly').objectStore(STORE_NAME).get(id)
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
    database.close()
    if (!record?.blob) throw new Error('Image is not available in this browser.')
    const url = URL.createObjectURL(record.blob)
    objectUrls.set(id, { url, users: 1 })
    return url
  },

  release(reference) {
    const id = reference.slice(4)
    const cached = objectUrls.get(id)
    if (!cached) return
    cached.users -= 1
    if (cached.users <= 0) {
      URL.revokeObjectURL(cached.url)
      objectUrls.delete(id)
    }
  },
}
