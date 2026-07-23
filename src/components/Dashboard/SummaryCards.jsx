import { motion } from 'framer-motion'
import {
  HiOutlineUserGroup,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineStar,
  HiOutlineXCircle,
} from 'react-icons/hi2'
import { useCandidateContext } from '../../context/CandidateContext.jsx'
import { REVIEW_STATUS } from '../../utils/constants'
import { CardSkeleton } from '../common/Loading.jsx'

const CARD_DEFS = [
  {
    key: 'total',
    label: 'Total candidates',
    icon: HiOutlineUserGroup,
    border: 'border-l-brand-500',
    iconBg: 'bg-brand-50 text-brand-600',
  },
  {
    key: 'reviewed',
    label: 'Reviewed',
    icon: HiOutlineCheckCircle,
    border: 'border-l-p0',
    iconBg: 'bg-p0-bg text-p0',
  },
  {
    key: 'pending',
    label: 'Pending',
    icon: HiOutlineClock,
    border: 'border-l-p1',
    iconBg: 'bg-p1-bg text-p1',
  },
  {
    key: 'shortlisted',
    label: 'Shortlisted',
    icon: HiOutlineStar,
    border: 'border-l-p2',
    iconBg: 'bg-p2-bg text-p2',
  },
  {
    key: 'rejected',
    label: 'Rejected',
    icon: HiOutlineXCircle,
    border: 'border-l-p3',
    iconBg: 'bg-p3-bg text-p3',
  },
]

export default function SummaryCards() {
  const { candidates, loading } = useCandidateContext()

  if (loading) return <CardSkeleton count={5} />

  const total = candidates.length
  const pending = candidates.filter((c) => c.reviewStatus === REVIEW_STATUS.PENDING).length
  const shortlisted = candidates.filter((c) => c.reviewStatus === REVIEW_STATUS.SHORTLISTED).length
  const rejected = candidates.filter((c) => c.reviewStatus === REVIEW_STATUS.REJECTED).length
  const reviewed = total - pending

  const counts = { total, reviewed, pending, shortlisted, rejected }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {CARD_DEFS.map((card, i) => {
        const Icon = card.icon
        return (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className={`group rounded-2xl border border-l-4 border-line bg-surface p-4 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card ${card.border}`}
          >
            <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-xl ${card.iconBg}`}>
              <Icon size={18} />
            </div>
            <p className="font-display text-2xl font-semibold text-ink">{counts[card.key]}</p>
            <p className="mt-0.5 text-xs text-ink-soft">{card.label}</p>
          </motion.div>
        )
      })}
    </div>
  )
}
