import { useCandidateContext } from '../../context/CandidateContext.jsx'

export default function Footer({ onNavigate }) {
  const { candidates } = useCandidateContext()
  const year = new Date().getFullYear()

  return (
    <footer className="flex shrink-0 flex-col items-center justify-between gap-2 border-t border-line bg-surface px-4 py-3 text-xs text-ink-faint sm:flex-row sm:px-6">
      <p>
         © {year} Candidate Review · Internal recruiter tool · not for external distribution · Built by Harsh Vardhan Maurya
      </p>
      <div className="flex items-center gap-4">
        <span>{candidates.length} candidates loaded</span>
        <button onClick={() => onNavigate('dashboard')} className="hover:text-ink-soft">
          Dashboard
        </button>
        <button onClick={() => onNavigate('settings')} className="hover:text-ink-soft">
          Settings
        </button>
        <span className="hidden sm:inline">v1.0.0</span>
      </div>
    </footer>
  )
}
