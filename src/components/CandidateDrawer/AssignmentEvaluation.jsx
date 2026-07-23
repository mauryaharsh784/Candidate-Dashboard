import { useMemo } from 'react'
import { ASSIGNMENT_CRITERIA } from '../../utils/constants'
import { averageOf } from '../../utils/helpers'

export default function AssignmentEvaluation({ candidate, onUpdate }) {
  const review = candidate.assignmentReview || {}

  const average = useMemo(() => averageOf(review), [review])

  function handleChange(key, value) {
    const updated = { ...review, [key]: value }
    onUpdate(candidate.id, updated)
  }

  return (
    <div className="space-y-4 rounded-xl border border-line bg-surface-subtle p-4">
      <div className="flex items-center justify-between">
        <p className="font-display text-sm font-semibold text-ink">Assignment review</p>
        <span className="rounded-full bg-brand-50 px-2.5 py-1 font-mono text-xs font-semibold text-brand-600">
          Avg {average}
        </span>
      </div>

      {ASSIGNMENT_CRITERIA.map((criterion) => {
        const value = review[criterion.key] ?? 0
        return (
          <div key={criterion.key}>
            <div className="mb-1 flex items-center justify-between text-xs text-ink-soft">
              <span>{criterion.label}</span>
              <span className="font-mono font-medium text-ink">{value}</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={value}
              onChange={(e) => handleChange(criterion.key, Number(e.target.value))}
              className="w-full accent-brand-500"
              aria-label={criterion.label}
            />
          </div>
        )
      })}
    </div>
  )
}
