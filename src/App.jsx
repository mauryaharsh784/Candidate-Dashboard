import { useState } from 'react'
import Sidebar from './components/Layout/Sidebar.jsx'
import Topbar from './components/Layout/Topbar.jsx'
import Footer from './components/Layout/Footer.jsx'
import DashboardView from './components/Dashboard/DashboardView.jsx'
import CandidateTable from './components/CandidateTable/CandidateTable.jsx'
import AnalyticsView from './components/Dashboard/AnalyticsView.jsx'
import SettingsView from './components/Dashboard/SettingsView.jsx'
import CandidateDrawer from './components/CandidateDrawer/CandidateDrawer.jsx'
import ComparisonModal from './components/ComparisonModal.jsx'
import { useCandidateContext } from './context/CandidateContext.jsx'

const VIEWS = {
  dashboard: DashboardView,
  candidates: CandidateTable,
  analytics: AnalyticsView,
  settings: SettingsView,
}

export default function App() {
  const [activeView, setActiveView] = useState('dashboard')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [comparisonOpen, setComparisonOpen] = useState(false)
  const { comparisonIds } = useCandidateContext()

  function handleNavigate(key) {
    setMobileNavOpen(false)
    if (key === 'comparison') {
      setComparisonOpen(true)
      return
    }
    setActiveView(key)
  }

  const ActiveComponent = VIEWS[activeView] || DashboardView

  return (
    <div className="flex h-screen overflow-hidden bg-surface-subtle">
      <Sidebar
        activeView={activeView}
        onNavigate={handleNavigate}
        comparisonCount={comparisonIds.length}
        mobileOpen={mobileNavOpen}
        onCloseMobile={() => setMobileNavOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar activeView={activeView} onOpenMobileMenu={() => setMobileNavOpen(true)} />

        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
          <ActiveComponent />
        </main>

        <Footer onNavigate={handleNavigate} />
      </div>

      <CandidateDrawer />
      <ComparisonModal open={comparisonOpen} onClose={() => setComparisonOpen(false)} />
    </div>
  )
}
