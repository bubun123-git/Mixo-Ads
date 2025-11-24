import { useEffect, useState } from 'react'
import { getCampaigns, enrichCampaignsWithInsights, Campaign } from '../services/api'
import SummaryStatistics from '../components/SummaryStatistics'
import CampaignsList from '../components/CampaignsList'
import Loading from '../components/Loading'
import Error from '../components/Error'
import EmptyState from '../components/EmptyState'

export default function DashboardPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCampaigns = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await getCampaigns()
      const enrichedCampaigns = await enrichCampaignsWithInsights(response.campaigns)
      setCampaigns(enrichedCampaigns)
    } catch (err: any) {
      if (err instanceof Error && 'message' in err) {
        setError((err as Error).message)
      } else {
        setError('Failed to fetch campaigns')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCampaigns()
  }, [])

  if (loading) {
    return <Loading message="Loading your campaigns..." />
  }

  if (error) {
    return (
      <Error
        title="Failed to Load Campaigns"
        message={error}
        onRetry={fetchCampaigns}
      />
    )
  }

  if (campaigns.length === 0) {
    return (
      <EmptyState
        title="No Campaigns"
        message="You don't have any campaigns yet. Start by creating your first campaign!"
        action={{
          label: 'Create Campaign',
          onClick: () => console.log('Create campaign'),
        }}
      />
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Monitor your campaign performance and metrics</p>
      </div>

      <SummaryStatistics campaigns={campaigns} />
      <CampaignsList campaigns={campaigns} />
    </div>
  )
}
