import { useState, useRef, useEffect } from 'react'
import { HiOutlineAdjustmentsHorizontal, HiOutlineXMark } from 'react-icons/hi2'
import { useCandidateContext, DEFAULT_FILTERS } from '../../context/CandidateContext.jsx'
import { classNames } from '../../utils/helpers'
import ScoreFilter from './ScoreFilter.jsx'
import PriorityFilter from './PriorityFilter.jsx'
import StatusFilter from './StatusFilter.jsx'
import CollegeFilter from './CollegeFilter.jsx'

export default function Filters() {
  const { filters, setFilters, setPage, colleges } = useCandidateContext()
  const [open, setOpen] = useState(false)
  const popoverRef = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  const activeCount = Object.entries(filters).filter(([key, val]) => val !== DEFAULT_FILTERS[key]).length

  function update(patch) {
    setFilters((prev) => ({ ...prev, ...patch }))
    setPage(1)
  }

  return (
    <div className="relative" ref={popoverRef}>
      <button
        onClick={() => setOpen((o) => !o)}
        className={classNames(
          'flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition',
          activeCount > 0
            ? 'border-brand-400 bg-brand-50 text-brand-600'
            : 'border-line text-ink-soft hover:bg-surface-sunken',
        )}
      >
        <HiOutlineAdjustmentsHorizontal size={16} />
        Filters
        {activeCount > 0 && (
          <span className="rounded-full bg-brand-500 px-1.5 py-0.5 text-[10px] font-semibold text-white">
            {activeCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-30 mt-2 w-80 animate-fadeUp rounded-xl border border-line bg-surface p-4 shadow-card">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-display text-sm font-semibold text-ink">Filter candidates</p>
            <button onClick={() => setOpen(false)} className="text-ink-faint hover:text-ink-soft">
              <HiOutlineXMark size={16} />
            </button>
          </div>

          <div className="space-y-4">
            <ScoreFilter
              label="Assignment score"
              value={filters.assignmentMin}
              onChange={(v) => update({ assignmentMin: v })}
            />
            <ScoreFilter
              label="Video score"
              value={filters.videoMin}
              onChange={(v) => update({ videoMin: v })}
            />
            <ScoreFilter label="ATS score" value={filters.atsMin} onChange={(v) => update({ atsMin: v })} />

            <PriorityFilter value={filters.priority} onChange={(v) => update({ priority: v })} />
            <StatusFilter value={filters.reviewStatus} onChange={(v) => update({ reviewStatus: v })} />
            <CollegeFilter value={filters.college} onChange={(v) => update({ college: v })} options={colleges} />
          </div>

          <button
            onClick={() => update(DEFAULT_FILTERS)}
            className="mt-4 w-full rounded-lg border border-line py-1.5 text-xs font-medium text-ink-soft hover:bg-surface-sunken"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}
