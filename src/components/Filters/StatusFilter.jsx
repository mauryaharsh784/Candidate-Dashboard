import { REVIEW_STATUS } from '../../utils/constants'

const OPTIONS = ['All', ...Object.values(REVIEW_STATUS)]

export default function StatusFilter({ value, onChange }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs text-ink-soft">Review status</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-ink focus:border-brand-400"
      >
        {OPTIONS.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  )
}
