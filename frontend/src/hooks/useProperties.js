import { useState, useEffect, useCallback } from 'react'
import { propertyService } from '../services/propertyService'

/**
 * Hook to fetch and filter properties.
 * @param {object} initialFilters
 */
export function useProperties(initialFilters = {}) {
  const [properties, setProperties] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [total, setTotal] = useState(0)
  const [filters, setFilters] = useState(initialFilters)

  const fetchProperties = useCallback(async (activeFilters) => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await propertyService.getProperties(activeFilters)
      setProperties(res.data)
      setTotal(res.total)
    } catch (err) {
      setError(err.message || 'Failed to load properties')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProperties(filters)
  }, [filters, fetchProperties])

  const updateFilters = useCallback((newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }, [])

  const resetFilters = useCallback(() => {
    setFilters(initialFilters)
  }, [initialFilters])

  return {
    properties,
    isLoading,
    error,
    total,
    filters,
    updateFilters,
    resetFilters,
    refetch: () => fetchProperties(filters),
  }
}

