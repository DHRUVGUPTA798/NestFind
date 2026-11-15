import { cn } from '../../utils/cn'

/**
 * Reusable Input component with label and error state.
 */
export function Input({
  label,
  id,
  error,
  hint,
  className,
  wrapperClassName,
  ...props
}) {
  return (
    <div className={cn('flex flex-col gap-1.5', wrapperClassName)}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-neutral-700">
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          'w-full h-11 px-3.5 rounded-lg border bg-white text-neutral-900',
          'placeholder:text-neutral-400 text-sm',
          'transition-all duration-150',
          'border-neutral-200 hover:border-neutral-300',
          'focus:outline-none focus:border-brand-500 focus:ring-3 focus:ring-brand-500/15',
          error && 'border-red-400 focus:border-red-500 focus:ring-red-500/15',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
      {hint && !error && <p className="text-xs text-neutral-500">{hint}</p>}
    </div>
  )
}

/**
 * Reusable Select component.
 */
export function Select({ label, id, error, options = [], className, wrapperClassName, ...props }) {
  return (
    <div className={cn('flex flex-col gap-1.5', wrapperClassName)}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-neutral-700">
          {label}
        </label>
      )}
      <select
        id={id}
        className={cn(
          'w-full h-11 px-3.5 rounded-lg border bg-white text-neutral-900 text-sm',
          'transition-all duration-150 cursor-pointer',
          'border-neutral-200 hover:border-neutral-300',
          'focus:outline-none focus:border-brand-500 focus:ring-3 focus:ring-brand-500/15',
          error && 'border-red-400',
          className
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

/**
 * Reusable Textarea component.
 */
export function Textarea({ label, id, error, className, wrapperClassName, ...props }) {
  return (
    <div className={cn('flex flex-col gap-1.5', wrapperClassName)}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-neutral-700">
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={cn(
          'w-full px-3.5 py-3 rounded-lg border bg-white text-neutral-900 text-sm',
          'placeholder:text-neutral-400 resize-y min-h-[100px]',
          'transition-all duration-150',
          'border-neutral-200 hover:border-neutral-300',
          'focus:outline-none focus:border-brand-500 focus:ring-3 focus:ring-brand-500/15',
          error && 'border-red-400',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

