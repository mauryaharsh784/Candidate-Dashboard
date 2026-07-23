export function Spinner({ size = 20 }) {
  return (
    <svg
      className="animate-spin text-brand-500"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      role="status"
      aria-label="Loading"
    >
      <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        d="M22 12a10 10 0 0 1-10 10"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function TableSkeleton({ rows = 8 }) {
  return (
    <div className="divide-y divide-line" aria-hidden="true">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 px-6 py-4">
          <div className="skeleton h-9 w-9 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="skeleton h-3 w-1/3" />
            <div className="skeleton h-2.5 w-1/5" />
          </div>
          <div className="skeleton h-3 w-16" />
          <div className="skeleton h-3 w-16" />
          <div className="skeleton h-3 w-16" />
          <div className="skeleton h-6 w-14 rounded-full" />
        </div>
      ))}
    </div>
  )
}

export function CardSkeleton({ count = 5 }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-line bg-surface p-4">
          <div className="skeleton mb-3 h-8 w-8 rounded-lg" />
          <div className="skeleton mb-2 h-5 w-12" />
          <div className="skeleton h-3 w-20" />
        </div>
      ))}
    </div>
  )
}
