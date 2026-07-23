import AssignmentEvaluation from './AssignmentEvaluation.jsx'
import VideoEvaluation from './VideoEvaluation.jsx'
import PriorityBadge from '../common/PriorityBadge.jsx'
import { usePriority } from '../../hooks/usePriority.js'

export default function EvaluationPanel({ candidate, onUpdateAssignment, onUpdateVideo }) {
  const { finalScore, priority, meta } = usePriority(candidate)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-xl border border-line bg-surface p-4">
        <div>
          <p className="text-xs text-ink-soft">Live final score</p>
          <p className="font-display text-2xl font-semibold text-ink">{finalScore}</p>
        </div>
        <div className="text-right">
          <PriorityBadge priority={priority} />
          <p className="mt-1 text-xs text-ink-faint">{meta.label}</p>
        </div>
      </div>

      <AssignmentEvaluation candidate={candidate} onUpdate={onUpdateAssignment} />
      <VideoEvaluation candidate={candidate} onUpdate={onUpdateVideo} />
    </div>
  )
}
