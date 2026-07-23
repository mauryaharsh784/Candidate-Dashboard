import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import rawCandidates from '../data/candidates.json'
import { getCandidatePriority } from '../utils/priorityEngine'
import { PAGE_SIZE } from '../utils/constants'

const CandidateContext = createContext(null)

const DEFAULT_FILTERS = {
  assignmentMin: 0,
  videoMin: 0,
  atsMin: 0,
  priority: 'All',
  reviewStatus: 'All',
  college: 'All',
}

export function CandidateProvider({ children }) {
  // ---- Candidate state ----
  const [candidates, setCandidates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // ---- Filter state ----
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [sortBy, setSortBy] = useState('priority')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSizeState] = useState(PAGE_SIZE)

  // Changing rows-per-page mid-browse would otherwise strand the user on a
  // page number that no longer makes sense, so always snap back to page 1.
  const setPageSize = useCallback((size) => {
    setPageSizeState(size)
    setPage(1)
  }, [])

  // ---- Comparison state ----
  const [comparisonIds, setComparisonIds] = useState([])

  // ---- Drawer state ----
  const [activeCandidateId, setActiveCandidateId] = useState(null)

  // Simulate an async data load so Loading/Skeleton states have somewhere to live.
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      try {
        if (!Array.isArray(rawCandidates)) {
          throw new Error('Candidate dataset is malformed.')
        }
        const withPriority = rawCandidates.map((c) => {
          const { finalScore, priority } = getCandidatePriority(c)
          return { ...c, finalScore, priority }
        })
        setCandidates(withPriority)
        setError(null)
      } catch (err) {
        setError(err.message || 'Failed to load candidates.')
      } finally {
        setLoading(false)
      }
    }, 550)
    return () => clearTimeout(timer)
  }, [])

  const updateCandidateScores = useCallback((id, scoreUpdates) => {
    setCandidates((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c
        const merged = { ...c, ...scoreUpdates }
        const { finalScore, priority } = getCandidatePriority(merged)
        return { ...merged, finalScore, priority }
      }),
    )
  }, [])

  const updateAssignmentReview = useCallback((id, assignmentReview) => {
    setCandidates((prev) => prev.map((c) => (c.id === id ? { ...c, assignmentReview } : c)))
  }, [])

  const updateVideoReview = useCallback((id, videoReview) => {
    setCandidates((prev) => prev.map((c) => (c.id === id ? { ...c, videoReview } : c)))
  }, [])

  const updateReviewStatus = useCallback((id, reviewStatus) => {
    setCandidates((prev) => prev.map((c) => (c.id === id ? { ...c, reviewStatus } : c)))
  }, [])

  const toggleComparison = useCallback((id) => {
    setComparisonIds((prev) => {
      if (prev.includes(id)) return prev.filter((c) => c !== id)
      if (prev.length >= 3) return prev
      return [...prev, id]
    })
  }, [])

  const clearComparison = useCallback(() => setComparisonIds([]), [])

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS)
    setSearchTerm('')
    setSortBy('priority')
    setPage(1)
  }, [])

  const colleges = useMemo(
    () => ['All', ...Array.from(new Set(candidates.map((c) => c.college))).sort()],
    [candidates],
  )

  const value = useMemo(
    () => ({
      candidates,
      loading,
      error,
      searchTerm,
      setSearchTerm,
      filters,
      setFilters,
      sortBy,
      setSortBy,
      page,
      setPage,
      pageSize,
      setPageSize,
      comparisonIds,
      toggleComparison,
      clearComparison,
      activeCandidateId,
      setActiveCandidateId,
      updateCandidateScores,
      updateAssignmentReview,
      updateVideoReview,
      updateReviewStatus,
      resetFilters,
      colleges,
    }),
    [
      candidates,
      loading,
      error,
      searchTerm,
      filters,
      sortBy,
      page,
      pageSize,
      comparisonIds,
      activeCandidateId,
      updateCandidateScores,
      updateAssignmentReview,
      updateVideoReview,
      updateReviewStatus,
      resetFilters,
      colleges,
      toggleComparison,
      clearComparison,
    ],
  )

  return <CandidateContext.Provider value={value}>{children}</CandidateContext.Provider>
}

export function useCandidateContext() {
  const ctx = useContext(CandidateContext)
  if (!ctx) throw new Error('useCandidateContext must be used within a CandidateProvider')
  return ctx
}

export { DEFAULT_FILTERS }
