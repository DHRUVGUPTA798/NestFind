/**
 * Format a number as Indian Rupee currency.
 * e.g. formatPrice(12000) → "₹12,000"
 */
export function formatPrice(amount, options = {}) {
  const { showPerMonth = true } = options
  const formatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
  return showPerMonth ? `${formatted}/mo` : formatted
}

/**
 * Truncate a string to a given length with ellipsis.
 */
export function truncate(str, length = 80) {
  if (!str) return ''
  return str.length > length ? `${str.slice(0, length)}…` : str
}

/**
 * Format distance in km/m for display.
 */
export function formatDistance(meters) {
  if (meters < 1000) return `${meters}m`
  return `${(meters / 1000).toFixed(1)}km`
}

/**
 * Format a date string to "DD MMM YYYY".
 */
export function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

