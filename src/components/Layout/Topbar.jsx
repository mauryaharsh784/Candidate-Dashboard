import { HiOutlineBars3, HiOutlineBell } from 'react-icons/hi2'
import SearchBar from '../SearchBar.jsx'

const VIEW_TITLES = {
  dashboard: 'Dashboard',
  candidates: 'Candidates',
  comparison: 'Comparison',
  analytics: 'Analytics',
  settings: 'Settings',
}

export default function Topbar({ activeView, onOpenMobileMenu, recruiterName = 'Priya Kapoor' }) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-line bg-surface/80 px-4 backdrop-blur sm:px-6">
      <button
        onClick={onOpenMobileMenu}
        className="rounded-lg p-2 text-ink-soft hover:bg-surface-sunken lg:hidden"
        aria-label="Open menu"
      >
        <HiOutlineBars3 size={20} />
      </button>

      <h1 className="font-display text-lg font-semibold text-ink">
        {VIEW_TITLES[activeView] || 'Dashboard'}
      </h1>

      <div className="ml-auto flex items-center gap-3">
        <div className="hidden sm:block">
          <SearchBar compact />
        </div>
        <button
          className="relative rounded-lg p-2 text-ink-soft hover:bg-surface-sunken"
          aria-label="Notifications"
        >
          <HiOutlineBell size={19} />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-p3" />
        </button>
        <div className="flex items-center gap-2 border-l border-line pl-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-xs font-semibold text-white">
            {recruiterName
              .split(' ')
              .map((p) => p[0])
              .join('')}
          </div>
          <div className="hidden leading-tight sm:block">
            <p className="text-xs font-medium text-ink">{recruiterName}</p>
            <p className="text-[11px] text-ink-faint">Recruiter</p>
          </div>
        </div>
      </div>
    </header>
  )
}
