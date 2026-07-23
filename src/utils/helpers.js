/**
 * Debounce a function by the given delay (ms). Used for the search input.
 */
export function debounce(fn, delay = 500) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

export function formatDate(dateString) {
  try {
    const d = new Date(dateString)
    if (Number.isNaN(d.getTime())) return 'Unknown date'
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  } catch {
    return 'Unknown date'
  }
}

export function initials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('')
}

/** Deterministic pastel color from a string, used as an avatar fallback background. */
export function stringToColor(str = '') {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  const hue = Math.abs(hash) % 360
  return `hsl(${hue}, 62%, 88%)`
}

export function classNames(...args) {
  return args.filter(Boolean).join(' ')
}

/** Average of an object's numeric values, rounded to 1 decimal. Returns 0 for empty input. */
export function averageOf(valuesObj = {}) {
  const values = Object.values(valuesObj).filter((v) => typeof v === 'number')
  if (values.length === 0) return 0
  const sum = values.reduce((a, b) => a + b, 0)
  return Math.round((sum / values.length) * 10) / 10
}
