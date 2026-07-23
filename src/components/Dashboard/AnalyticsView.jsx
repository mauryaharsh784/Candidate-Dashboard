import { useMemo } from 'react'
import { useCandidateContext } from '../../context/CandidateContext.jsx'
import {
  AssignmentDistributionChart,
  PriorityDistributionChart,
  ReviewProgressChart,
} from '../Charts/Charts.jsx'
import { CardSkeleton } from '../common/Loading.jsx'

export default function AnalyticsView() {
  const { candidates, loading } = useCandidateContext()

  const stats = useMemo(() => {
    if (candidates.length === 0) {
      return { avgFinal: 0, avgAssignment: 0, avgVideo: 0, avgAts: 0 }
    }
    const sum = (key) => candidates.reduce((acc, c) => acc + (c[key] || 0), 0)
    const n = candidates.length
    return {
      avgFinal: Math.round((sum('finalScore') / n) * 10) / 10,
      avgAssignment: Math.round(sum('assignmentScore') / n),
      avgVideo: Math.round(sum('videoScore') / n),
      avgAts: Math.round(sum('atsScore') / n),
    }
  }, [candidates])

  return (
    <div className="space-y-6">
      {loading ? (
        <CardSkeleton count={4} />
      ) : (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            ['Avg. final score', stats.avgFinal],
            ['Avg. assignment', stats.avgAssignment],
            ['Avg. video', stats.avgVideo],
            ['Avg. ATS', stats.avgAts],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-line bg-surface p-4 shadow-soft">
              <p className="font-display text-2xl font-semibold text-ink">{value}</p>
              <p className="mt-0.5 text-xs text-ink-soft">{label}</p>
            </div>
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <AssignmentDistributionChart />
        <PriorityDistributionChart />
        <ReviewProgressChart />
      </div>
    </div>
  )
}
