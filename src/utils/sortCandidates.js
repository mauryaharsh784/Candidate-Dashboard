/**
 * Reusable candidate sort function. Given a list and one of the SORT_OPTIONS
 * values from constants.js, returns a *new* sorted array (never mutates the
 * input) so it's safe to call directly from useMemo, tests, or anywhere else
 * that needs the same ordering the table uses.
 */
export function sortCandidates(list, sortBy) {
  const comparators = {
    assignmentScore: (a, b) => b.assignmentScore - a.assignmentScore,
    videoScore: (a, b) => b.videoScore - a.videoScore,
    atsScore: (a, b) => b.atsScore - a.atsScore,
    newest: (a, b) => new Date(b.submissionDate) - new Date(a.submissionDate),
    oldest: (a, b) => new Date(a.submissionDate) - new Date(b.submissionDate),
    priority: (a, b) => b.finalScore - a.finalScore,
  }

  const compare = comparators[sortBy] || comparators.priority
  return [...list].sort(compare)
}
