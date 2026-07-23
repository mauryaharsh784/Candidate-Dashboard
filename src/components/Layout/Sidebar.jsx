import {
  HiOutlineSquares2X2,
  HiOutlineUsers,
  HiOutlineScale,
  HiOutlineChartBarSquare,
  HiOutlineCog6Tooth,
  HiOutlineXMark,
} from 'react-icons/hi2'
import { classNames } from '../../utils/helpers'

const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', icon: HiOutlineSquares2X2 },
  { key: 'candidates', label: 'Candidates', icon: HiOutlineUsers },
  { key: 'comparison', label: 'Comparison', icon: HiOutlineScale },
  { key: 'analytics', label: 'Analytics', icon: HiOutlineChartBarSquare },
  { key: 'settings', label: 'Settings', icon: HiOutlineCog6Tooth },
]

export default function Sidebar({ activeView, onNavigate, comparisonCount, mobileOpen, onCloseMobile }) {
  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-ink/30 lg:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}
      <aside
        className={classNames(
          'fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-line bg-surface transition-transform lg:static lg:z-0 lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex h-16 items-center justify-between gap-2 px-5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink font-display text-sm font-bold text-white">
              CR
            </div>
            <span className="font-display text-sm font-semibold tracking-tight text-ink">
              Candidate Review
            </span>
          </div>
          <button
            onClick={onCloseMobile}
            className="rounded-lg p-1 text-ink-faint hover:bg-surface-sunken lg:hidden"
            aria-label="Close menu"
          >
            <HiOutlineXMark size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const active = activeView === item.key
            return (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={classNames(
                  'flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition',
                  active
                    ? 'bg-brand-50 text-brand-600'
                    : 'text-ink-soft hover:bg-surface-sunken hover:text-ink',
                )}
              >
                <span className="flex items-center gap-2.5">
                  <Icon size={18} />
                  {item.label}
                </span>
                {item.key === 'comparison' && comparisonCount > 0 && (
                  <span className="rounded-full bg-brand-500 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                    {comparisonCount}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        <div className="border-t border-line p-4">
          <div className="rounded-xl bg-surface-subtle p-3">
            <p className="text-xs font-medium text-ink">Priority formula</p>
            <p className="mt-1 text-[11px] leading-relaxed text-ink-soft">
              Assignment 30% · Video 25% · ATS 20% · GitHub 15% · Comm 10%
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}
