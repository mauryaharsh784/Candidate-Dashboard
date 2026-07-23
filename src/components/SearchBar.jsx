import { HiOutlineMagnifyingGlass, HiOutlineXMark } from 'react-icons/hi2'
import { useCandidateContext } from '../context/CandidateContext.jsx'

/**
 * Controlled input bound to context.searchTerm. The actual 500ms debounce
 * lives in useCandidates so typing here always feels instant, while the
 * expensive filter/sort pass only runs after the user pauses.
 */
export default function SearchBar({ compact = false }) {
  const { searchTerm, setSearchTerm, setPage } = useCandidateContext()

  return (
    <div className={compact ? 'w-64' : 'w-full'}>
      <div className="relative">
        <HiOutlineMagnifyingGlass
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint"
          size={16}
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setPage(1)
          }}
          placeholder="Search by name, college, or email…"
          className="w-full rounded-lg border border-line bg-surface py-2 pl-9 pr-8 text-sm text-ink placeholder:text-ink-faint focus:border-brand-400"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink-soft"
            aria-label="Clear search"
          >
            <HiOutlineXMark size={15} />
          </button>
        )}
      </div>
    </div>
  )
}
