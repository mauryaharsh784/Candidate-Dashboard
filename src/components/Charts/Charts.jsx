import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'
import { useMemo } from 'react'
import { useCandidateContext } from '../../context/CandidateContext.jsx'
import { PRIORITY_META, REVIEW_STATUS } from '../../utils/constants'
import EmptyState from '../common/EmptyState.jsx'

const BUCKETS = ['0-20', '21-40', '41-60', '61-80', '81-100']

function bucketFor(score) {
  if (score <= 20) return BUCKETS[0]
  if (score <= 40) return BUCKETS[1]
  if (score <= 60) return BUCKETS[2]
  if (score <= 80) return BUCKETS[3]
  return BUCKETS[4]
}

function ChartCard({ title, subtitle, children }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-5 shadow-soft">
      <p className="font-display text-sm font-semibold text-ink">{title}</p>
      {subtitle && <p className="mb-4 mt-0.5 text-xs text-ink-soft">{subtitle}</p>}
      <div className={subtitle ? '' : 'mt-4'}>{children}</div>
    </div>
  )
}

export function AssignmentDistributionChart() {
  const { candidates, loading } = useCandidateContext()

  const data = useMemo(() => {
    const counts = Object.fromEntries(BUCKETS.map((b) => [b, 0]))
    candidates.forEach((c) => {
      counts[bucketFor(c.assignmentScore)] += 1
    })
    return BUCKETS.map((b) => ({ bucket: b, count: counts[b] }))
  }, [candidates])

  return (
    <ChartCard title="Assignment distribution" subtitle="Number of candidates per score range">
      {loading || candidates.length === 0 ? (
        <EmptyState variant="candidates" title="No data yet" />
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} margin={{ left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E6E8EE" vertical={false} />
            <XAxis dataKey="bucket" tick={{ fontSize: 11, fill: '#8991A3' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#8991A3' }} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip
              contentStyle={{ borderRadius: 10, borderColor: '#E6E8EE', fontSize: 12 }}
              cursor={{ fill: '#F7F8FA' }}
            />
            <Bar dataKey="count" fill="#4F46E5" radius={[6, 6, 0, 0]} maxBarSize={44} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  )
}

export function PriorityDistributionChart() {
  const { candidates, loading } = useCandidateContext()

  const data = useMemo(() => {
    const counts = { P0: 0, P1: 0, P2: 0, P3: 0 }
    candidates.forEach((c) => {
      if (counts[c.priority] !== undefined) counts[c.priority] += 1
    })
    return Object.entries(counts).map(([priority, value]) => ({
      priority,
      value,
      color: PRIORITY_META[priority].ring,
    }))
  }, [candidates])

  return (
    <ChartCard title="Priority distribution" subtitle="Share of candidates in each tier">
      {loading || candidates.length === 0 ? (
        <EmptyState variant="candidates" title="No data yet" />
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="priority"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={3}
              stroke="none"
            >
              {data.map((entry) => (
                <Cell key={entry.priority} fill={entry.color} />
              ))}
            </Pie>
            <Legend
              verticalAlign="bottom"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: 11, color: '#4B5160' }}
            />
            <Tooltip contentStyle={{ borderRadius: 10, borderColor: '#E6E8EE', fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  )
}

export function ReviewProgressChart() {
  const { candidates, loading } = useCandidateContext()

  const data = useMemo(() => {
    const counts = {
      [REVIEW_STATUS.PENDING]: 0,
      [REVIEW_STATUS.IN_REVIEW]: 0,
      [REVIEW_STATUS.SHORTLISTED]: 0,
      [REVIEW_STATUS.REJECTED]: 0,
    }
    candidates.forEach((c) => {
      if (counts[c.reviewStatus] !== undefined) counts[c.reviewStatus] += 1
    })
    return Object.entries(counts).map(([status, count]) => ({ status, count }))
  }, [candidates])

  return (
    <ChartCard title="Review progress" subtitle="Candidates by review stage">
      {loading || candidates.length === 0 ? (
        <EmptyState variant="candidates" title="No data yet" />
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} layout="vertical" margin={{ left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E6E8EE" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11, fill: '#8991A3' }} axisLine={false} tickLine={false} allowDecimals={false} />
            <YAxis
              type="category"
              dataKey="status"
              tick={{ fontSize: 11, fill: '#4B5160' }}
              axisLine={false}
              tickLine={false}
              width={90}
            />
            <Tooltip contentStyle={{ borderRadius: 10, borderColor: '#E6E8EE', fontSize: 12 }} cursor={{ fill: '#F7F8FA' }} />
            <Bar dataKey="count" fill="#16A34A" radius={[0, 6, 6, 0]} maxBarSize={22} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  )
}
