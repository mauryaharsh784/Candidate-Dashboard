import { useEffect, useMemo, useState } from 'react'
import { useCandidateContext } from '../context/CandidateContext.jsx'
import { debounce } from '../utils/helpers'
import { sortCandidates } from '../utils/sortCandidates'

/**
 * Combines raw candidate state with the active search/filter/sort/page state
 * from context and returns the derived, ready-to-render slice.
 */
export function useCandidates() {
  const { candidates, searchTerm, filters, sortBy, page, setPage, pageSize } = useCandidateContext()
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm)

  // Debounced search (500ms) as specified in the brief.
  useEffect(() => {
    const handler = debounce((val) => setDebouncedSearch(val), 500)
    handler(searchTerm)
  }, [searchTerm])

  const filtered = useMemo(() => {
    const term = debouncedSearch.trim().toLowerCase()

    const result = candidates.filter((c) => {
      const matchesSearch =
        !term ||
        c.name.toLowerCase().includes(term) ||
        c.college.toLowerCase().includes(term) ||
        c.email.toLowerCase().includes(term)

      const matchesAssignment = c.assignmentScore >= filters.assignmentMin
      const matchesVideo = c.videoScore >= filters.videoMin
      const matchesAts = c.atsScore >= filters.atsMin
      const matchesPriority = filters.priority === 'All' || c.priority === filters.priority
      const matchesStatus = filters.reviewStatus === 'All' || c.reviewStatus === filters.reviewStatus
      const matchesCollege = filters.college === 'All' || c.college === filters.college

      return (
        matchesSearch &&
        matchesAssignment &&
        matchesVideo &&
        matchesAts &&
        matchesPriority &&
        matchesStatus &&
        matchesCollege
      )
    })

    return sortCandidates(result, sortBy)
  }, [candidates, debouncedSearch, filters, sortBy])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const safePage = Math.min(page, totalPages)

  const paginated = useMemo(() => {
    const start = (safePage - 1) * pageSize
    return filtered.slice(start, start + pageSize)
  }, [filtered, safePage, pageSize])

  return {
    candidates: paginated,
    totalResults: filtered.length,
    totalPages,
    page: safePage,
    setPage,
    pageSize,
  }
}
