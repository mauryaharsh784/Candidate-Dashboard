import { HiOutlineSearch, HiOutlineUserGroup, HiOutlineScale } from 'react-icons/hi'

const ICONS = {
  search: HiOutlineSearch,
  candidates: HiOutlineUserGroup,
  comparison: HiOutlineScale,
}

/**
 * variant: 'search' | 'candidates' | 'comparison'
 */
export default function EmptyState({
  variant = 'search',
  title,
  description,
  action,
}) {
  const Icon = ICONS[variant] || HiOutlineSearch

  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-sunken text-ink-faint">
        <Icon size={26} />
      </div>
      <p className="font-display text-base font-semibold text-ink">{title}</p>
      {description && <p className="max-w-sm text-sm text-ink-soft">{description}</p>}
      {action}
    </div>
  )
}
