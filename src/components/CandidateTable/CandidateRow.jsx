import { HiOutlineEye } from 'react-icons/hi2'
import Avatar from '../common/Avatar.jsx'
import PriorityBadge from '../common/PriorityBadge.jsx'
import { ScoreBar } from '../common/ScoreDisplay.jsx'
import { REVIEW_STATUS_STYLES } from '../../utils/constants'
import { classNames } from '../../utils/helpers'

export default function CandidateRow({ candidate, onOpen, onToggleCompare, isComparing, compareDisabled }) {
  return (
    <tr
      onClick={() => onOpen(candidate.id)}
      className="cursor-pointer border-b border-line last:border-0 transition hover:bg-surface-subtle"
    >
      <td className="whitespace-nowrap py-3 pl-6 pr-1" onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          checked={isComparing}
          disabled={compareDisabled && !isComparing}
          onChange={() => onToggleCompare(candidate.id)}
          className="h-4 w-4 rounded border-line accent-brand-500 disabled:cursor-not-allowed disabled:opacity-30"
          aria-label={`Add ${candidate.name} to comparison`}
          title="Add to comparison"
        />
      </td>
      <td className="whitespace-nowrap py-3 pl-3 pr-3">
        <div className="flex items-center gap-3">
          <Avatar
            src={candidate.avatar}
            name={candidate.name}
            finalScore={candidate.finalScore}
            priority={candidate.priority}
            size={36}
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-ink">{candidate.name}</p>
            <p className="truncate text-xs text-ink-faint">{candidate.email}</p>
          </div>
        </div>
      </td>
      <td className="hidden whitespace-nowrap px-3 py-3 text-sm text-ink-soft md:table-cell">
        {candidate.college}
      </td>
      <td className="hidden px-3 py-3 lg:table-cell">
        <ScoreBar label="Assignment" score={candidate.assignmentScore} />
      </td>
      <td className="hidden px-3 py-3 xl:table-cell">
        <ScoreBar label="Video" score={candidate.videoScore} />
      </td>
      <td className="hidden px-3 py-3 xl:table-cell">
        <ScoreBar label="ATS" score={candidate.atsScore} />
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        <PriorityBadge priority={candidate.priority} size="sm" />
      </td>
      <td className="hidden whitespace-nowrap px-3 py-3 sm:table-cell">
        <span
          className={classNames(
            'rounded-full px-2 py-1 text-[11px] font-medium',
            REVIEW_STATUS_STYLES[candidate.reviewStatus] || 'bg-surface-sunken text-ink-soft',
          )}
        >
          {candidate.reviewStatus}
        </span>
      </td>
      <td className="whitespace-nowrap py-3 pl-3 pr-6 text-right">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onOpen(candidate.id)
          }}
          title="View profile"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-faint transition hover:bg-surface-sunken"
        >
          <HiOutlineEye size={16} />
        </button>
      </td>
    </tr>
  )
}
