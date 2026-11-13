import { Construction } from 'lucide-react'

/**
 * Placeholder component for pages that are not yet built.
 * Replace with the real implementation when ready.
 */
export default function PlaceholderPage({ title = 'Coming Soon', description }) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center page-enter">
      <div className="size-16 flex items-center justify-center rounded-2xl bg-brand-50 text-brand-600 mb-5">
        <Construction size={32} />
      </div>
      <h1 className="text-2xl font-bold text-neutral-900 mb-2">{title}</h1>
      <p className="text-neutral-500 max-w-sm text-sm">
        {description || 'This page is under development and will be available soon.'}
      </p>
    </div>
  )
}

