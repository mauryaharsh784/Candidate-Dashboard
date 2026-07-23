import { AnimatePresence, motion } from 'framer-motion'
import {
  HiOutlineXMark,
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineAcademicCap,
  HiOutlineCodeBracket,
  HiOutlineLink,
  HiOutlineDocumentText,
} from 'react-icons/hi2'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { useCandidateContext } from '../../context/CandidateContext.jsx'
import Avatar from '../common/Avatar.jsx'
import PriorityBadge from '../common/PriorityBadge.jsx'
import { ScoreCircle } from '../common/ScoreDisplay.jsx'
import EvaluationPanel from './EvaluationPanel.jsx'
import { REVIEW_STATUS, REVIEW_STATUS_STYLES } from '../../utils/constants'
import { formatDate, classNames } from '../../utils/helpers'

export default function CandidateDrawer() {
  const {
    candidates,
    activeCandidateId,
    setActiveCandidateId,
    updateAssignmentReview,
    updateVideoReview,
    updateReviewStatus,
  } = useCandidateContext()

  const candidate = candidates.find((c) => c.id === activeCandidateId)
  const open = Boolean(candidate)

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-ink/30"
            onClick={() => setActiveCandidateId(null)}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full flex-col bg-surface shadow-drawer sm:w-[440px] lg:w-[480px]"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <p className="font-display text-sm font-semibold text-ink">Candidate profile</p>
              <button
                onClick={() => setActiveCandidateId(null)}
                className="rounded-lg p-1.5 text-ink-faint hover:bg-surface-sunken"
                aria-label="Close panel"
              >
                <HiOutlineXMark size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              {/* Identity */}
              <div className="flex items-center gap-4">
                <Avatar
                  src={candidate.avatar}
                  name={candidate.name}
                  finalScore={candidate.finalScore}
                  priority={candidate.priority}
                  size={64}
                />
                <div className="min-w-0">
                  <p className="truncate font-display text-lg font-semibold text-ink">{candidate.name}</p>
                  <p className="truncate text-xs text-ink-faint">{candidate.degree}</p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <PriorityBadge priority={candidate.priority} size="sm" />
                    <span
                      className={classNames(
                        'rounded-full px-2 py-0.5 text-[11px] font-medium',
                        REVIEW_STATUS_STYLES[candidate.reviewStatus],
                      )}
                    >
                      {candidate.reviewStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Review status control */}
              <div className="mt-4">
                <label className="mb-1 block text-xs text-ink-soft">Review status</label>
                <select
                  value={candidate.reviewStatus}
                  onChange={(e) => updateReviewStatus(candidate.id, e.target.value)}
                  className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink focus:border-brand-400"
                >
                  {Object.values(REVIEW_STATUS).map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Contact & links */}
              <div className="mt-4 grid grid-cols-1 gap-2 rounded-xl border border-line bg-surface-subtle p-3 text-xs text-ink-soft">
                <a href={`mailto:${candidate.email}`} className="flex items-center gap-2 hover:text-ink">
                  <HiOutlineEnvelope size={15} /> {candidate.email}
                </a>
                <span className="flex items-center gap-2">
                  <HiOutlinePhone size={15} /> {candidate.phone}
                </span>
                <span className="flex items-center gap-2">
                  <HiOutlineAcademicCap size={15} /> {candidate.college}
                </span>
                <a
                  href={candidate.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-ink"
                >
                  <FaGithub size={14} /> GitHub profile
                </a>
                <a
                  href={candidate.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-ink"
                >
                  <FaLinkedin size={14} /> LinkedIn profile
                </a>
                <a
                  href={candidate.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-ink"
                >
                  <HiOutlineDocumentText size={15} /> Resume
                </a>
              </div>

              {/* Score overview */}
              <div className="mt-4 grid grid-cols-5 gap-2 rounded-xl border border-line bg-surface-subtle p-3">
                {[
                  ['Assign.', candidate.assignmentScore],
                  ['Video', candidate.videoScore],
                  ['ATS', candidate.atsScore],
                  ['GitHub', candidate.githubScore],
                  ['Comm.', candidate.communicationScore],
                ].map(([label, score]) => (
                  <div key={label} className="flex flex-col items-center gap-1">
                    <ScoreCircle score={score} size={40} />
                    <span className="text-[10px] text-ink-faint">{label}</span>
                  </div>
                ))}
              </div>

              {/* Skills */}
              <div className="mt-4">
                <p className="mb-2 flex items-center gap-1.5 text-xs font-medium text-ink-soft">
                  <HiOutlineCodeBracket size={14} /> Skills
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {candidate.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-line bg-surface px-2.5 py-1 text-[11px] text-ink-soft"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Education & experience */}
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl border border-line bg-surface-subtle p-3">
                  <p className="text-ink-faint">Experience</p>
                  <p className="mt-0.5 font-medium text-ink">{candidate.experience} years</p>
                </div>
                <div className="rounded-xl border border-line bg-surface-subtle p-3">
                  <p className="text-ink-faint">Submitted</p>
                  <p className="mt-0.5 font-medium text-ink">{formatDate(candidate.submissionDate)}</p>
                </div>
              </div>

              {/* Evaluation */}
              <div className="mt-5">
                <p className="mb-2 flex items-center gap-1.5 text-xs font-medium text-ink-soft">
                  <HiOutlineLink size={14} /> Evaluation
                </p>
                <EvaluationPanel
                  candidate={candidate}
                  onUpdateAssignment={updateAssignmentReview}
                  onUpdateVideo={updateVideoReview}
                />
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
