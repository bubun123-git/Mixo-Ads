import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import CampaignDetailsPage from './pages/CampaignDetailsPage'
import Layout from './components/Layout'
import ErrorBoundary from './components/ErrorBoundary'
import NotFound from './components/NotFound'

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/campaign/:id" element={<CampaignDetailsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </ErrorBoundary>
  )
}

export default App
