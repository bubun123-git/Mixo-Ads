import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import CampaignDetailsPage from './pages/CampaignDetailsPage'
import Layout from './components/Layout'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/campaign/:id" element={<CampaignDetailsPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
