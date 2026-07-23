import { PRIORITY_WEIGHTS, PRIORITY_TIERS } from './constants'

/**
 * Clamp a number between 0 and 100. Guards against bad/missing upstream data.
 */
function clampScore(value) {
  const n = Number(value)
  if (Number.isNaN(n)) return 0
  return Math.min(100, Math.max(0, n))
}

/**
 * Weighted final score:
 * Assignment 30%, Video 25%, ATS 20%, GitHub 15%, Communication 10%.
 * Returns a number rounded to 1 decimal place.
 */
export function calculateFinalScore(candidate) {
  if (!candidate) return 0

  const {
    assignmentScore,
    videoScore,
    atsScore,
    githubScore,
    communicationScore,
  } = candidate

  const weighted =
    clampScore(assignmentScore) * PRIORITY_WEIGHTS.assignmentScore +
    clampScore(videoScore) * PRIORITY_WEIGHTS.videoScore +
    clampScore(atsScore) * PRIORITY_WEIGHTS.atsScore +
    clampScore(githubScore) * PRIORITY_WEIGHTS.githubScore +
    clampScore(communicationScore) * PRIORITY_WEIGHTS.communicationScore

  return Math.round(weighted * 10) / 10
}

/**
 * Maps a final score to a priority tier.
 * 90+  -> P0 Interview Immediately
 * 75-89 -> P1 Strong Shortlist
 * 60-74 -> P2 Review Later
 * <60  -> P3 Reject
 */
export function scoreToPriority(score) {
  if (typeof score !== 'number' || Number.isNaN(score)) return 'Unknown'
  if (score >= 90) return PRIORITY_TIERS.P0
  if (score >= 75) return PRIORITY_TIERS.P1
  if (score >= 60) return PRIORITY_TIERS.P2
  return PRIORITY_TIERS.P3
}

/**
 * Convenience helper: given a raw candidate object, returns
 * { finalScore, priority } computed in real time.
 */
export function getCandidatePriority(candidate) {
  const finalScore = calculateFinalScore(candidate)
  const priority = scoreToPriority(finalScore)
  return { finalScore, priority }
}
