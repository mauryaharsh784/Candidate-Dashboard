import { useState } from 'react'
import { HiOutlineTableCells, HiOutlineSquares2X2 } from 'react-icons/hi2'
import { useCandidateContext } from '../../context/CandidateContext.jsx'
import { useCandidates } from '../../hooks/useCandidates.js'
import CandidateRow from './CandidateRow.jsx'
import CandidateCard from './CandidateCard.jsx'
import SearchBar from '../SearchBar.jsx'
import Filters from '../Filters/Filters.jsx'
import SortMenu from '../Filters/SortMenu.jsx'
import Pagination from '../Layout/Pagination.jsx'
import EmptyState from '../common/EmptyState.jsx'
import ErrorState from '../common/ErrorState.jsx'
import { TableSkeleton } from '../common/Loading.jsx'
import { classNames } from '../../utils/helpers'

const COLUMNS = ['Compare', 'Avatar', 'Name', 'College', 'Assignment', 'Video', 'ATS', 'Priority', 'Status', 'Actions']

export default function CandidateTable() {
  const {
    loading,
    error,
    comparisonIds,
    toggleComparison,
    setActiveCandidateId,
    resetFilters,
    searchTerm,
    setPageSize,
  } = useCandidateContext()
  const { candidates, totalResults, totalPages, page, setPage, pageSize } = useCandidates()
  const [view, setView] = useState('table')

  if (loading) {
    return (
      <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-soft">
        <div className="border-b border-line px-6 py-4">
          <div className="skeleton h-9 w-72" />
        </div>
        <TableSkeleton rows={8} />
      </div>
    )
  }

  if (error) {
    return <ErrorState description={error} onRetry={() => window.location.reload()} />
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-soft">
      <div className="flex flex-col gap-3 border-b border-line px-4 py-4 sm:flex-row sm:items-center sm:px-6">
        <SearchBar />
        <div className="flex items-center gap-2 sm:ml-auto">
          <Filters />
          <SortMenu />
          <div className="flex rounded-lg border border-line p-0.5">
            <button
              onClick={() => setView('table')}
              className={classNames(
                'flex h-8 w-8 items-center justify-center rounded-md transition',
                view === 'table' ? 'bg-ink text-white' : 'text-ink-faint hover:bg-surface-sunken',
              )}
              aria-label="Table view"
            >
              <HiOutlineTableCells size={16} />
            </button>
            <button
              onClick={() => setView('card')}
              className={classNames(
                'flex h-8 w-8 items-center justify-center rounded-md transition',
                view === 'card' ? 'bg-ink text-white' : 'text-ink-faint hover:bg-surface-sunken',
              )}
              aria-label="Card view"
            >
              <HiOutlineSquares2X2 size={16} />
            </button>
          </div>
        </div>
      </div>

      {totalResults === 0 ? (
        <EmptyState
          variant="search"
          title={searchTerm ? 'No candidates match your search' : 'No candidates match these filters'}
          description="Try adjusting your search term or clearing active filters."
          action={
            <button
              onClick={resetFilters}
              className="mt-1 rounded-lg bg-ink px-4 py-2 text-sm font-medium text-white hover:bg-ink/90"
            >
              Clear filters
            </button>
          }
        />
      ) : view === 'table' ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="sticky top-16 z-10 bg-surface-subtle text-xs uppercase tracking-wide text-ink-faint">
              <tr>
                {COLUMNS.map((col) => (
                  <th
                    key={col}
                    className={classNames(
                      'py-3 font-medium',
                      col === 'Compare' ? 'w-10 pl-6' : '',
                      col === 'Avatar' || col === 'Name' ? 'pl-3' : col === 'Compare' ? '' : 'px-3',
                      col === 'Actions' ? 'pr-6 text-right' : '',
                      col === 'College' ? 'hidden md:table-cell' : '',
                      col === 'Assignment' ? 'hidden lg:table-cell' : '',
                      (col === 'Video' || col === 'ATS') ? 'hidden xl:table-cell' : '',
                      col === 'Status' ? 'hidden sm:table-cell' : '',
                      col === 'Avatar' ? 'hidden' : '',
                    )}
                  >
                    {col === 'Avatar' || col === 'Compare' ? null : col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {candidates.map((c) => (
                <CandidateRow
                  key={c.id}
                  candidate={c}
                  onOpen={setActiveCandidateId}
                  onToggleCompare={toggleComparison}
                  isComparing={comparisonIds.includes(c.id)}
                  compareDisabled={comparisonIds.length >= 3}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 sm:p-6">
          {candidates.map((c) => (
            <CandidateCard
              key={c.id}
              candidate={c}
              onOpen={setActiveCandidateId}
              onToggleCompare={toggleComparison}
              isComparing={comparisonIds.includes(c.id)}
              compareDisabled={comparisonIds.length >= 3}
            />
          ))}
        </div>
      )}

      <Pagination
        page={page}
        totalPages={totalPages}
        totalResults={totalResults}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    </div>
  )
}
