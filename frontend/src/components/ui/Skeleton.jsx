/**
 * Skeleton loading placeholder components.
 */
export function SkeletonBox({ className = '' }) {
  return <div className={`skeleton rounded-lg ${className}`} />
}

export function PropertyCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-neutral-100">
      {/* Image placeholder */}
      <SkeletonBox className="w-full h-52" />
      <div className="p-4 space-y-3">
        <SkeletonBox className="h-5 w-3/4" />
        <SkeletonBox className="h-4 w-1/2" />
        <div className="flex justify-between pt-1">
          <SkeletonBox className="h-5 w-24" />
          <SkeletonBox className="h-5 w-16" />
        </div>
        <div className="flex gap-2 pt-1">
          <SkeletonBox className="h-6 w-14 rounded-full" />
          <SkeletonBox className="h-6 w-14 rounded-full" />
          <SkeletonBox className="h-6 w-14 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export function PropertyDetailSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <SkeletonBox className="w-full h-72 md:h-96 rounded-2xl" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <SkeletonBox className="h-8 w-2/3" />
          <SkeletonBox className="h-5 w-1/2" />
          <SkeletonBox className="h-4 w-full" />
          <SkeletonBox className="h-4 w-5/6" />
          <SkeletonBox className="h-4 w-4/5" />
        </div>
        <div className="space-y-4">
          <SkeletonBox className="h-48 rounded-2xl" />
        </div>
      </div>
    </div>
  )
}

export function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="size-10 border-3 border-brand-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-neutral-500 font-medium">Loading…</p>
      </div>
    </div>
  )
}

