import { AnimatePresence, motion } from 'framer-motion'
import { HiOutlineXMark } from 'react-icons/hi2'
import { useCandidateContext } from '../context/CandidateContext.jsx'
import Avatar from './common/Avatar.jsx'
import PriorityBadge from './common/PriorityBadge.jsx'
import EmptyState from './common/EmptyState.jsx'
import { classNames } from '../utils/helpers'

const METRICS = [
  { key: 'assignmentScore', label: 'Assignment' },
  { key: 'videoScore', label: 'Video' },
  { key: 'atsScore', label: 'ATS' },
  { key: 'githubScore', label: 'GitHub' },
  { key: 'communicationScore', label: 'Communication' },
  { key: 'finalScore', label: 'Final priority score' },
]

export default function ComparisonModal({ open, onClose }) {
  const { candidates, comparisonIds, toggleComparison, clearComparison } = useCandidateContext()
  const selected = comparisonIds.map((id) => candidates.find((c) => c.id === id)).filter(Boolean)

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-ink/40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            className="fixed inset-4 z-50 mx-auto flex max-w-4xl flex-col overflow-hidden rounded-2xl bg-surface shadow-drawer sm:inset-x-8 sm:inset-y-10 lg:inset-x-24"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <div>
                <p className="font-display text-sm font-semibold text-ink">Compare candidates</p>
                <p className="text-xs text-ink-faint">Select 2–3 candidates from the table to compare them here.</p>
              </div>
              <div className="flex items-center gap-2">
                {selected.length > 0 && (
                  <button
                    onClick={clearComparison}
                    className="rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-ink-soft hover:bg-surface-sunken"
                  >
                    Clear all
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="rounded-lg p-1.5 text-ink-faint hover:bg-surface-sunken"
                  aria-label="Close comparison"
                >
                  <HiOutlineXMark size={18} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-5">
              {selected.length === 0 ? (
                <EmptyState
                  variant="comparison"
                  title="No candidates selected"
                  description="Use the scale icon next to a candidate in the table or card view to add them here."
                />
              ) : (
                <table className="w-full min-w-[480px] border-collapse text-sm">
                  <thead>
                    <tr>
                      <th className="w-40 pb-4 text-left text-xs font-medium uppercase tracking-wide text-ink-faint">
                        Candidate
                      </th>
                      {selected.map((c) => (
                        <th key={c.id} className="pb-4 pl-4 text-left align-top">
                          <div className="flex items-start gap-2">
                            <Avatar
                              src={c.avatar}
                              name={c.name}
                              finalScore={c.finalScore}
                              priority={c.priority}
                              size={40}
                            />
                            <div className="min-w-0">
                              <p className="truncate text-sm font-semibold text-ink">{c.name}</p>
                              <p className="truncate text-xs text-ink-faint">{c.college}</p>
                              <button
                                onClick={() => toggleComparison(c.id)}
                                className="mt-1 text-[11px] font-medium text-p3 hover:underline"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {METRICS.map((metric) => {
                      const maxValue = Math.max(...selected.map((c) => c[metric.key] ?? 0))
                      return (
                        <tr key={metric.key} className="border-t border-line">
                          <td className="py-3 text-xs font-medium text-ink-soft">{metric.label}</td>
                          {selected.map((c) => {
                            const value = c[metric.key] ?? 0
                            const isMax = value === maxValue && maxValue > 0
                            return (
                              <td key={c.id} className="py-3 pl-4">
                                <span
                                  className={classNames(
                                    'inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-mono text-sm font-semibold',
                                    isMax ? 'bg-p0-bg text-p0' : 'text-ink',
                                  )}
                                >
                                  {value}
                                  {isMax && <span className="text-[10px] font-sans font-medium">highest</span>}
                                </span>
                              </td>
                            )
                          })}
                        </tr>
                      )
                    })}
                    <tr className="border-t border-line">
                      <td className="py-3 text-xs font-medium text-ink-soft">Priority</td>
                      {selected.map((c) => (
                        <td key={c.id} className="py-3 pl-4">
                          <PriorityBadge priority={c.priority} />
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
