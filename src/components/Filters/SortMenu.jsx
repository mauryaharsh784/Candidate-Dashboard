import { HiOutlineArrowsUpDown } from 'react-icons/hi2'
import { useCandidateContext } from '../../context/CandidateContext.jsx'
import { SORT_OPTIONS } from '../../utils/constants'

export default function SortMenu() {
  const { sortBy, setSortBy } = useCandidateContext()

  return (
    <div className="relative">
      <HiOutlineArrowsUpDown
        className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-faint"
        size={15}
      />
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="appearance-none rounded-lg border border-line bg-surface py-2 pl-8 pr-8 text-sm text-ink focus:border-brand-400"
        aria-label="Sort candidates"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            Sort: {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
