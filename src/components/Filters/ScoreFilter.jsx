/**
 * Generic "score at least X" range slider. Reused for Assignment, Video,
 * and ATS score minimums so the three filters stay visually and
 * behaviorally identical.
 */
export default function ScoreFilter({ label, value, onChange }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs text-ink-soft">
        <span>{label}</span>
        <span className="font-mono font-medium text-ink">{value}+</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-brand-500"
        aria-label={label}
      />
    </div>
  )
}
