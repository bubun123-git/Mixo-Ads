import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCampaignById, Campaign } from '../services/api'
import CampaignDetails from '../components/CampaignDetails'
import Loading from '../components/Loading'
import Error from '../components/Error'

export default function CampaignDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCampaign = async () => {
    if (!id) {
      setError('Campaign ID not found')
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const data = await getCampaignById(id)
      setCampaign(data)
    } catch (err: any) {
      if (err instanceof Error && 'message' in err) {
        setError((err as Error).message)
      } else {
        setError('Failed to fetch campaign')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCampaign()
  }, [id])

  if (loading) {
    return <Loading message="Loading campaign details..." />
  }

  if (error) {
    return (
      <Error
        title="Failed to Load Campaign"
        message={error}
        onRetry={fetchCampaign}
      />
    )
  }

  if (!campaign) {
    return (
      <Error
        title="Campaign Not Found"
        message="The campaign you're looking for doesn't exist."
      />
    )
  }

  return <CampaignDetails campaign={campaign} />
}
