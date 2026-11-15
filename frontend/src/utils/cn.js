import { clsx } from 'clsx'

/**
 * Utility to merge Tailwind class names conditionally.
 * Usage: cn('base-class', condition && 'conditional-class', { 'object-class': bool })
 */
export function cn(...inputs) {
  return clsx(inputs)
}

