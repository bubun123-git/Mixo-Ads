import { Link } from 'react-router-dom'
import { Campaign } from '../services/api'

interface CampaignDetailsProps {
  campaign: Campaign
}

const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'badge-success'
    case 'paused':
      return 'badge-warning'
    case 'completed':
      return 'badge-info'
    case 'draft':
      return 'badge-danger'
    default:
      return 'badge-info'
  }
}

const getStatusLabel = (status: string) => {
  return status.charAt(0).toUpperCase() + status.slice(1)
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function CampaignDetails({ campaign }: CampaignDetailsProps) {
  const ctr = campaign.ctr?.toFixed(2) || '0.00'
  const cpc = campaign.cpc?.toFixed(2) || '0.00'
  const conversionRate = campaign.conversion_rate?.toFixed(2) || '0.00'
  const spend = campaign.spend || 0

  const details = [
    {
      label: 'Campaign Name',
      value: campaign.name,
    },
    {
      label: 'Status',
      value: <span className={`badge ${getStatusBadgeColor(campaign.status)}`}>
        {getStatusLabel(campaign.status)}
      </span>,
    },
    {
      label: 'Brand ID',
      value: campaign.brand_id,
    },
    {
      label: 'Budget',
      value: `$${campaign.budget.toLocaleString()}`,
    },
    {
      label: 'Daily Budget',
      value: `$${campaign.daily_budget.toLocaleString()}`,
    },
    {
      label: 'Spent',
      value: `$${spend.toLocaleString()}`,
    },
    {
      label: 'Remaining Budget',
      value: `$${(campaign.budget - spend).toLocaleString()}`,
    },
    {
      label: 'Platforms',
      value: campaign.platforms.join(', ').toUpperCase(),
    },
    {
      label: 'Created At',
      value: formatDate(campaign.created_at),
    },
  ]

  const metrics = [
    {
      label: 'Impressions',
      value: (campaign.impressions || 0).toLocaleString(),
      icon: '👁️',
    },
    {
      label: 'Clicks',
      value: (campaign.clicks || 0).toLocaleString(),
      icon: '🖱️',
    },
    {
      label: 'Conversions',
      value: (campaign.conversions || 0).toLocaleString(),
      icon: '✅',
    },
    {
      label: 'CTR',
      value: `${ctr}%`,
      icon: '📈',
    },
    {
      label: 'CPC',
      value: `$${cpc}`,
      icon: '💵',
    },
    {
      label: 'Conversion Rate',
      value: `${conversionRate}%`,
      icon: '📊',
    },
  ]

  return (
    <div className="space-y-6">
      <Link
        to="/"
        className="text-primary hover:text-primary-dark font-medium transition-colors inline-flex items-center gap-2"
      >
        ← Back to Dashboard
      </Link>

      {/* Campaign Overview */}
      <div className="card">
        <div className="card-header">
          <h1 className="text-3xl font-bold text-gray-900">{campaign.name}</h1>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {details.map((detail, idx) => (
              <div key={idx}>
                <label className="text-sm font-medium text-gray-600">{detail.label}</label>
                <p className="text-lg text-gray-900 mt-1">{detail.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Performance Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map((metric, idx) => (
            <div key={idx} className="card p-6 hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">{metric.icon}</div>
              <div className="stat-value">{metric.value}</div>
              <div className="stat-label">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Budget Breakdown */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-xl font-bold text-gray-900">Budget Breakdown</h2>
        </div>
        <div className="card-body">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 font-medium">Total Budget</span>
                <span className="text-gray-900 font-semibold">${campaign.budget.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{
                    width: `${Math.min((spend / campaign.budget) * 100, 100)}%`,
                  }}
                ></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-border">
              <div>
                <p className="text-sm text-gray-600">Amount Spent</p>
                <p className="text-lg font-semibold text-gray-900">${spend.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Remaining</p>
                <p className="text-lg font-semibold text-green-600">${(campaign.budget - spend).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Spend %</p>
                <p className="text-lg font-semibold text-gray-900">
                  {campaign.budget > 0 ? ((spend / campaign.budget) * 100).toFixed(1) : 0}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
