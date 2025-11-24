import axios from 'axios'
import axiosRetry from 'axios-retry'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://mixo-fe-backend-task.vercel.app'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds for slow API
  headers: {
    'Content-Type': 'application/json',
  },
})

// Configure retry logic
axiosRetry(apiClient, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    return axiosRetry.isNetworkOrIdempotentRequestError(error) || error.response?.status === 429
  },
})

export interface Campaign {
  id: string
  name: string
  brand_id: string
  status: 'active' | 'paused' | 'completed' | 'draft'
  budget: number
  daily_budget: number
  platforms: string[]
  created_at: string
  // Insights data (fetched separately)
  impressions?: number
  clicks?: number
  conversions?: number
  spend?: number
  ctr?: number
  cpc?: number
  conversion_rate?: number
}

export interface CampaignsResponse {
  campaigns: Campaign[]
}

export interface CampaignInsights {
  campaign_id: string
  timestamp: string
  impressions: number
  clicks: number
  conversions: number
  spend: number
  ctr: number
  cpc: number
  conversion_rate: number
}

export interface AggregateInsights {
  timestamp: string
  total_campaigns: number
  active_campaigns: number
  paused_campaigns: number
  completed_campaigns: number
  total_impressions: number
  total_clicks: number
  total_conversions: number
  total_spend: number
  avg_ctr: number
  avg_cpc: number
  avg_conversion_rate: number
}

// Fetch all campaigns
export const getCampaigns = async (): Promise<CampaignsResponse> => {
  try {
    const response = await apiClient.get<CampaignsResponse>('/campaigns')
    return response.data
  } catch (error) {
    throw new Error(`Failed to fetch campaigns: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

// Fetch single campaign by ID
export const getCampaignById = async (id: string): Promise<Campaign> => {
  try {
    const [campaignsResponse, insightsResponse] = await Promise.all([
      apiClient.get<CampaignsResponse>('/campaigns'),
      apiClient.get<{ insights: CampaignInsights }>(`/campaigns/${id}/insights`)
    ])
    
    const campaign = campaignsResponse.data.campaigns.find(c => c.id === id)
    if (!campaign) {
      throw new Error('Campaign not found')
    }
    
    const insights = insightsResponse.data.insights
    return {
      ...campaign,
      impressions: insights.impressions,
      clicks: insights.clicks,
      conversions: insights.conversions,
      spend: insights.spend,
      ctr: insights.ctr,
      cpc: insights.cpc,
      conversion_rate: insights.conversion_rate
    }
  } catch (error) {
    throw new Error(`Failed to fetch campaign: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

// Fetch aggregate insights
export const getAggregateInsights = async (): Promise<AggregateInsights> => {
  try {
    const response = await apiClient.get<{ insights: AggregateInsights }>('/campaigns/insights')
    return response.data.insights
  } catch (error) {
    throw new Error(`Failed to fetch insights: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

// Fetch insights for a specific campaign
export const getCampaignInsights = async (id: string): Promise<CampaignInsights> => {
  try {
    const response = await apiClient.get<{ insights: CampaignInsights }>(`/campaigns/${id}/insights`)
    return response.data.insights
  } catch (error) {
    throw new Error(`Failed to fetch campaign insights: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

// Enrich campaigns with insights data
export const enrichCampaignsWithInsights = async (campaigns: Campaign[]): Promise<Campaign[]> => {
  try {
    const enrichedCampaigns = await Promise.all(
      campaigns.map(async (campaign) => {
        try {
          const insights = await getCampaignInsights(campaign.id)
          return {
            ...campaign,
            impressions: insights.impressions,
            clicks: insights.clicks,
            conversions: insights.conversions,
            spend: insights.spend,
            ctr: insights.ctr,
            cpc: insights.cpc,
            conversion_rate: insights.conversion_rate
          }
        } catch (error) {
          // Return campaign without insights if fetch fails
          return campaign
        }
      })
    )
    return enrichedCampaigns
  } catch (error) {
    return campaigns
  }
}
