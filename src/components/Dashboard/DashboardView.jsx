import SummaryCards from './SummaryCards.jsx'
import CandidateTable from '../CandidateTable/CandidateTable.jsx'
import {
  AssignmentDistributionChart,
  PriorityDistributionChart,
  ReviewProgressChart,
} from '../Charts/Charts.jsx'

export default function DashboardView() {
  return (
    <div className="space-y-6">
      <SummaryCards />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <AssignmentDistributionChart />
        <PriorityDistributionChart />
        <ReviewProgressChart />
      </div>
      <CandidateTable />
    </div>
  )
}
