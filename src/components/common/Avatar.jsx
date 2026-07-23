import { useState } from 'react'
import { initials, stringToColor, classNames } from '../../utils/helpers'
import { PRIORITY_META } from '../../utils/constants'

/**
 * Avatar with a conic-gradient "priority ring" — the percentage of the ring
 * filled reflects the candidate's final score, colored by their priority tier.
 * This is the dashboard's signature recurring visual: used in the table,
 * cards, drawer, and comparison modal so a recruiter can gauge fit at a glance.
 */
export default function Avatar({ src, name = '', finalScore = 0, priority = 'Unknown', size = 40 }) {
  const [broken, setBroken] = useState(false)
  const meta = PRIORITY_META[priority] || PRIORITY_META.Unknown
  const pct = Math.max(0, Math.min(100, finalScore))
  const ringSize = size + 6

  return (
    <div
      className="relative shrink-0"
      style={{ width: ringSize, height: ringSize }}
      title={`${name} · ${priority !== 'Unknown' ? `${finalScore} pts` : 'not yet scored'}`}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(${meta.ring} ${pct * 3.6}deg, #EEF0F4 0deg)`,
        }}
        aria-hidden="true"
      />
      <div
        className="absolute rounded-full bg-surface"
        style={{ inset: 2 }}
      >
        {!broken && src ? (
          <img
            src={src}
            alt={name}
            onError={() => setBroken(true)}
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          <div
            className={classNames(
              'flex h-full w-full items-center justify-center rounded-full text-xs font-semibold text-ink-soft',
            )}
            style={{ backgroundColor: stringToColor(name) }}
          >
            {initials(name) || '?'}
          </div>
        )}
      </div>
    </div>
  )
}
