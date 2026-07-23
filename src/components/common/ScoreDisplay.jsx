import { classNames } from '../../utils/helpers'

function scoreColor(score) {
  if (score >= 90) return '#16A34A'
  if (score >= 75) return '#EAB308'
  if (score >= 60) return '#F97316'
  return '#EF4444'
}

/** Horizontal progress bar used in table cells and the drawer. */
export function ScoreBar({ label, score = 0 }) {
  const color = scoreColor(score)
  return (
    <div className="w-full min-w-[92px]">
      <div className="mb-1 flex items-center justify-between text-[11px] text-ink-soft">
        <span>{label}</span>
        <span className="font-mono font-medium text-ink">{score}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-sunken">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${score}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}

/** Small circular badge showing a raw 0-100 score, used compactly in dense rows. */
export function ScoreCircle({ score = 0, size = 36 }) {
  const color = scoreColor(score)
  const pct = Math.max(0, Math.min(100, score))
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
        <circle cx="18" cy="18" r="15.5" fill="none" stroke="#EEF0F4" strokeWidth="3.5" />
        <circle
          cx="18"
          cy="18"
          r="15.5"
          fill="none"
          stroke={color}
          strokeWidth="3.5"
          strokeDasharray={`${(pct / 100) * 97.4} 97.4`}
          strokeLinecap="round"
        />
      </svg>
      <span
        className={classNames(
          'absolute inset-0 flex items-center justify-center font-mono font-semibold text-ink',
          size < 32 ? 'text-[9px]' : 'text-[11px]',
        )}
      >
        {score}
      </span>
    </div>
  )
}
