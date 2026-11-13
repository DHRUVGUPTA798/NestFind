import { cn } from '../../utils/cn'

const variants = {
  primary:
    'bg-brand-700 text-white hover:bg-brand-600 active:bg-brand-800 shadow-xs border border-transparent',
  secondary:
    'bg-white text-stone-800 border border-stone-200 hover:border-stone-300 hover:bg-stone-50 active:bg-stone-100 shadow-xs',
  emerald:
    'bg-emerald-600 text-white hover:bg-emerald-500 active:bg-emerald-700 shadow-xs border border-transparent',
  ghost:
    'text-stone-600 hover:text-stone-900 hover:bg-stone-100/80 active:bg-stone-200/80',
  danger:
    'bg-red-600 text-white hover:bg-red-500 active:bg-red-700 shadow-xs',
  outline:
    'border border-brand-700 text-brand-700 hover:bg-brand-50 active:bg-brand-100',
  'outline-white':
    'border border-white/40 text-white hover:bg-white/10 hover:border-white/70 active:bg-white/20',
}

const sizes = {
  sm:   'h-8.5  px-3.5  text-xs  font-bold rounded-lg  gap-1.5',
  md:   'h-10   px-4    text-xs sm:text-sm font-bold rounded-xl gap-2',
  lg:   'h-11.5 px-5.5  text-sm  font-bold rounded-xl  gap-2',
  xl:   'h-13   px-7    text-base font-bold rounded-xl gap-2.5',
  icon: 'h-10   w-10    rounded-xl flex items-center justify-center',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  isLoading = false,
  disabled,
  children,
  ...props
}) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center transition-all duration-150 select-none cursor-pointer',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'focus-visible:outline-2 focus-visible:outline-brand-700 focus-visible:outline-offset-2',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Processing…</span>
        </>
      ) : children}
    </button>
  )
}
