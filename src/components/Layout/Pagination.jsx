import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'
import { classNames } from '../../utils/helpers'

const ROWS_PER_PAGE_OPTIONS = [10, 20, 50]

export default function Pagination({
  page,
  totalPages,
  totalResults,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) {
  if (totalResults === 0) return null

  const start = (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, totalResults)

  const pageNumbers = []
  const windowSize = 1
  for (let p = 1; p <= totalPages; p++) {
    if (p === 1 || p === totalPages || Math.abs(p - page) <= windowSize) {
      pageNumbers.push(p)
    } else if (pageNumbers[pageNumbers.length - 1] !== '...') {
      pageNumbers.push('...')
    }
  }

  return (
    <div className="flex flex-col gap-3 border-t border-line px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <p className="text-xs text-ink-soft">
          Showing <span className="font-medium text-ink">{start}–{end}</span> of{' '}
          <span className="font-medium text-ink">{totalResults}</span> candidates
        </p>

        {onPageSizeChange && (
          <label className="flex items-center gap-1.5 text-xs text-ink-soft">
            Rows per page
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="rounded-lg border border-line bg-surface px-2 py-1 text-xs text-ink focus:border-brand-400"
              aria-label="Rows per page"
            >
              {ROWS_PER_PAGE_OPTIONS.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      <div className="flex items-center gap-1 self-end sm:self-auto">
        <button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-ink-soft transition hover:bg-surface-sunken disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Previous page"
        >
          <HiChevronLeft size={16} />
        </button>
        {pageNumbers.map((p, idx) =>
          p === '...' ? (
            <span key={`dots-${idx}`} className="px-1 text-xs text-ink-faint">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={classNames(
                'h-8 min-w-8 rounded-lg px-2 text-xs font-medium transition',
                p === page ? 'bg-ink text-white' : 'text-ink-soft hover:bg-surface-sunken',
              )}
            >
              {p}
            </button>
          ),
        )}
        <button
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-ink-soft transition hover:bg-surface-sunken disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Next page"
        >
          <HiChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}
