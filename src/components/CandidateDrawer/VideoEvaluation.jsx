import { useMemo, useState } from 'react'
import { HiOutlinePlus, HiOutlineTrash } from 'react-icons/hi2'
import { VIDEO_CRITERIA } from '../../utils/constants'
import { averageOf } from '../../utils/helpers'

export default function VideoEvaluation({ candidate, onUpdate }) {
  const review = candidate.videoReview || {}
  const notes = review.notes || []
  const [draftNote, setDraftNote] = useState('')
  const [draftTimestamp, setDraftTimestamp] = useState('00:00')

  const average = useMemo(() => {
    const { notes: _notes, ...scores } = review
    return averageOf(scores)
  }, [review])

  function patch(updates) {
    onUpdate(candidate.id, { ...review, ...updates })
  }

  function handleSliderChange(key, value) {
    patch({ [key]: value })
  }

  function addNote() {
    if (!draftNote.trim()) return
    const newNote = { id: `note_${Date.now()}`, timestamp: draftTimestamp, text: draftNote.trim() }
    patch({ notes: [...notes, newNote] })
    setDraftNote('')
  }

  function updateNoteText(id, text) {
    patch({ notes: notes.map((n) => (n.id === id ? { ...n, text } : n)) })
  }

  function removeNote(id) {
    patch({ notes: notes.filter((n) => n.id !== id) })
  }

  return (
    <div className="space-y-4 rounded-xl border border-line bg-surface-subtle p-4">
      <div className="flex items-center justify-between">
        <p className="font-display text-sm font-semibold text-ink">Video review</p>
        <span className="rounded-full bg-brand-50 px-2.5 py-1 font-mono text-xs font-semibold text-brand-600">
          Avg {average}
        </span>
      </div>

      {VIDEO_CRITERIA.map((criterion) => {
        const value = review[criterion.key] ?? 0
        return (
          <div key={criterion.key}>
            <div className="mb-1 flex items-center justify-between text-xs text-ink-soft">
              <span>{criterion.label}</span>
              <span className="font-mono font-medium text-ink">{value}</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={value}
              onChange={(e) => handleSliderChange(criterion.key, Number(e.target.value))}
              className="w-full accent-brand-500"
              aria-label={criterion.label}
            />
          </div>
        )
      })}

      <div className="border-t border-line pt-3">
        <p className="mb-2 text-xs font-medium text-ink-soft">Timestamp notes</p>

        <div className="mb-3 space-y-2">
          {notes.length === 0 && <p className="text-xs text-ink-faint">No notes added yet.</p>}
          {notes.map((note) => (
            <div key={note.id} className="flex items-start gap-2 rounded-lg border border-line bg-surface p-2">
              <span className="mt-1 shrink-0 rounded bg-surface-sunken px-1.5 py-0.5 font-mono text-[10px] text-ink-soft">
                {note.timestamp}
              </span>
              <textarea
                value={note.text}
                onChange={(e) => updateNoteText(note.id, e.target.value)}
                rows={1}
                className="flex-1 resize-none bg-transparent text-xs text-ink outline-none"
              />
              <button onClick={() => removeNote(note.id)} className="mt-0.5 text-ink-faint hover:text-p3">
                <HiOutlineTrash size={14} />
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={draftTimestamp}
            onChange={(e) => setDraftTimestamp(e.target.value)}
            placeholder="mm:ss"
            className="w-16 rounded-lg border border-line px-2 py-1.5 text-center font-mono text-xs"
          />
          <input
            type="text"
            value={draftNote}
            onChange={(e) => setDraftNote(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addNote()}
            placeholder="Add a note at this timestamp…"
            className="flex-1 rounded-lg border border-line px-3 py-1.5 text-xs"
          />
          <button
            onClick={addNote}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ink text-white hover:bg-ink/90"
            aria-label="Add note"
          >
            <HiOutlinePlus size={15} />
          </button>
        </div>
      </div>
    </div>
  )
}
