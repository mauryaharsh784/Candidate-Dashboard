/**
 * `options` comes from context (the distinct set of colleges present in the
 * current candidate pool, with 'All' prepended) rather than being hardcoded
 * here, since it should track whatever colleges actually appear in the data.
 */
export default function CollegeFilter({ value, onChange, options }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs text-ink-soft">College</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-ink focus:border-brand-400"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  )
}
