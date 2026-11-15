import { useEffect, useState, useSyncExternalStore } from 'react'
import { propertyService } from '../services/propertyService'

export function usePropertyCatalog() {
  const demoProperties = useSyncExternalStore(
    propertyService.subscribe,
    propertyService.getSnapshot,
    propertyService.getSnapshot,
  )
  const [apiProperties, setApiProperties] = useState([])

  useEffect(() => {
    if (propertyService.isDemoMode) return undefined
    let active = true
    const refresh = async () => {
      try {
        const result = await propertyService.getProperties()
        if (active) setApiProperties(result.data || [])
      } catch {
        if (active) setApiProperties([])
      }
    }
    const unsubscribe = propertyService.subscribe(refresh)
    refresh()
    return () => {
      active = false
      unsubscribe()
    }
  }, [])

  return propertyService.isDemoMode ? demoProperties : apiProperties
}
