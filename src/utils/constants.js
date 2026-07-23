// Central place for enums / lookups so components never hardcode strings.

export const REVIEW_STATUS = {
  PENDING: 'Pending',
  IN_REVIEW: 'In Review',
  SHORTLISTED: 'Shortlisted',
  REJECTED: 'Rejected',
}

export const REVIEW_STATUS_STYLES = {
  [REVIEW_STATUS.PENDING]: 'bg-surface-sunken text-ink-soft',
  [REVIEW_STATUS.IN_REVIEW]: 'bg-brand-50 text-brand-600',
  [REVIEW_STATUS.SHORTLISTED]: 'bg-p0-bg text-p0',
  [REVIEW_STATUS.REJECTED]: 'bg-p3-bg text-p3',
}

export const PRIORITY_TIERS = {
  P0: 'P0',
  P1: 'P1',
  P2: 'P2',
  P3: 'P3',
}

export const PRIORITY_META = {
  P0: { label: 'Interview immediately', color: 'text-p0', bg: 'bg-p0-bg', ring: '#16A34A' },
  P1: { label: 'Strong shortlist', color: 'text-p1', bg: 'bg-p1-bg', ring: '#EAB308' },
  P2: { label: 'Review later', color: 'text-p2', bg: 'bg-p2-bg', ring: '#F97316' },
  P3: { label: 'Reject', color: 'text-p3', bg: 'bg-p3-bg', ring: '#EF4444' },
  Unknown: { label: 'Not yet scored', color: 'text-ink-faint', bg: 'bg-surface-sunken', ring: '#C7CBD6' },
}

export const PRIORITY_WEIGHTS = {
  assignmentScore: 0.3,
  videoScore: 0.25,
  atsScore: 0.2,
  githubScore: 0.15,
  communicationScore: 0.1,
}

export const SORT_OPTIONS = [
  { value: 'priority', label: 'Priority' },
  { value: 'assignmentScore', label: 'Assignment score' },
  { value: 'videoScore', label: 'Video score' },
  { value: 'atsScore', label: 'ATS score' },
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
]

export const PAGE_SIZE = 10

export const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', icon: 'HiOutlineViewGrid' },
  { key: 'candidates', label: 'Candidates', icon: 'HiOutlineUsers' },
  { key: 'comparison', label: 'Comparison', icon: 'HiOutlineScale' },
  { key: 'analytics', label: 'Analytics', icon: 'HiOutlineChartBar' },
  { key: 'settings', label: 'Settings', icon: 'HiOutlineCog' },
]

export const ASSIGNMENT_CRITERIA = [
  { key: 'uiQuality', label: 'UI quality' },
  { key: 'componentStructure', label: 'Component structure' },
  { key: 'stateHandling', label: 'State handling' },
  { key: 'edgeCaseHandling', label: 'Edge-case handling' },
  { key: 'responsiveness', label: 'Responsiveness' },
  { key: 'accessibilityAwareness', label: 'Accessibility awareness' },
]

export const VIDEO_CRITERIA = [
  { key: 'clarity', label: 'Clarity' },
  { key: 'confidence', label: 'Confidence' },
  { key: 'architectureExplanation', label: 'Architecture explanation' },
  { key: 'tradeoffReasoning', label: 'Tradeoff reasoning' },
  { key: 'communicationStrength', label: 'Communication strength' },
]
