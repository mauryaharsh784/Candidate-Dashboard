import { useMemo } from 'react'
import { getCandidatePriority } from '../utils/priorityEngine'
import { PRIORITY_META } from '../utils/constants'

/**
 * Given a candidate (or partial score set), returns the live-calculated
 * final score, priority tier, and its display metadata (color/label).
 * Recalculates whenever the underlying scores change, e.g. while a
 * recruiter is dragging a slider in the evaluation panel.
 */
export function usePriority(candidate) {
  return useMemo(() => {
    const { finalScore, priority } = getCandidatePriority(candidate)
    const meta = PRIORITY_META[priority] || PRIORITY_META.Unknown
    return { finalScore, priority, meta }
  }, [candidate])
}
