import { motion } from 'framer-motion'
import Avatar from '../common/Avatar.jsx'
import PriorityBadge from '../common/PriorityBadge.jsx'
import { ScoreCircle } from '../common/ScoreDisplay.jsx'
import { REVIEW_STATUS_STYLES } from '../../utils/constants'
import { classNames } from '../../utils/helpers'

export default function CandidateCard({ candidate, onOpen, onToggleCompare, isComparing, compareDisabled }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={() => onOpen(candidate.id)}
      className="cursor-pointer rounded-2xl border border-line bg-surface p-4 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar
            src={candidate.avatar}
            name={candidate.name}
            finalScore={candidate.finalScore}
            priority={candidate.priority}
            size={44}
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ink">{candidate.name}</p>
            <p className="truncate text-xs text-ink-faint">{candidate.college}</p>
          </div>
        </div>
        <input
          type="checkbox"
          checked={isComparing}
          disabled={compareDisabled && !isComparing}
          onClick={(e) => e.stopPropagation()}
          onChange={() => onToggleCompare(candidate.id)}
          className="mt-1 h-4 w-4 shrink-0 rounded border-line accent-brand-500 disabled:cursor-not-allowed disabled:opacity-30"
          aria-label={`Add ${candidate.name} to comparison`}
          title="Add to comparison"
        />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-3">
          <ScoreCircle score={candidate.assignmentScore} size={34} />
          <ScoreCircle score={candidate.videoScore} size={34} />
          <ScoreCircle score={candidate.atsScore} size={34} />
        </div>
        <PriorityBadge priority={candidate.priority} size="sm" />
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
        <span
          className={classNames(
            'rounded-full px-2 py-1 text-[11px] font-medium',
            REVIEW_STATUS_STYLES[candidate.reviewStatus] || 'bg-surface-sunken text-ink-soft',
          )}
        >
          {candidate.reviewStatus}
        </span>
        <span className="text-[11px] text-ink-faint">{candidate.experience} yrs exp</span>
      </div>
    </motion.div>
  )
}
