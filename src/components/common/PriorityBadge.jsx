import { PRIORITY_META } from '../../utils/constants'
import { classNames } from '../../utils/helpers'

/**
 * priority: 'P0' | 'P1' | 'P2' | 'P3' | 'Unknown'
 * size: 'sm' | 'md'
 */
export default function PriorityBadge({ priority, size = 'md', showLabel = false }) {
  const meta = PRIORITY_META[priority] || PRIORITY_META.Unknown

  return (
    <span
      className={classNames(
        'inline-flex items-center gap-1.5 rounded-full font-semibold',
        meta.bg,
        meta.color,
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs',
      )}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: meta.ring }}
        aria-hidden="true"
      />
      {priority === 'Unknown' ? '—' : priority}
      {showLabel && <span className="font-normal opacity-80">· {meta.label}</span>}
    </span>
  )
}
