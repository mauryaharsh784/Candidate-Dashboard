import { HiOutlineExclamationTriangle } from 'react-icons/hi2'

export default function ErrorState({
  title = 'Something went wrong',
  description = 'This data could not be displayed. Try refreshing the page.',
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-p3-bg bg-p3-bg/40 px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-p3-bg text-p3">
        <HiOutlineExclamationTriangle size={26} />
      </div>
      <p className="font-display text-base font-semibold text-ink">{title}</p>
      <p className="max-w-sm text-sm text-ink-soft">{description}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-1 rounded-lg bg-ink px-4 py-2 text-sm font-medium text-white transition hover:bg-ink/90"
        >
          Retry
        </button>
      )}
    </div>
  )
}
