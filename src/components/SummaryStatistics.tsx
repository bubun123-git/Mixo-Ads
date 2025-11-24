import { Campaign } from '../services/api'

interface SummaryStatisticsProps {
  campaigns: Campaign[]
}

export default function SummaryStatistics({ campaigns }: SummaryStatisticsProps) {
  const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0)
  const totalSpent = campaigns.reduce((sum, c) => sum + (c.spend || 0), 0)
  const totalImpressions = campaigns.reduce((sum, c) => sum + (c.impressions || 0), 0)
  const totalClicks = campaigns.reduce((sum, c) => sum + (c.clicks || 0), 0)
  const totalConversions = campaigns.reduce((sum, c) => sum + (c.conversions || 0), 0)
  const averageCTR = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0
  const activeCampaigns = campaigns.filter(c => c.status === 'active').length

  const stats = [
    {
      label: 'Active Campaigns',
      value: activeCampaigns,
      icon: '📊',
      color: 'bg-blue-50',
    },
    {
      label: 'Total Budget',
      value: `$${(totalBudget / 1000).toFixed(1)}k`,
      icon: '💰',
      color: 'bg-green-50',
    },
    {
      label: 'Total Spent',
      value: `$${(totalSpent / 1000).toFixed(1)}k`,
      icon: '💸',
      color: 'bg-orange-50',
    },
    {
      label: 'Total Impressions',
      value: `${(totalImpressions / 1000).toFixed(0)}k`,
      icon: '👁️',
      color: 'bg-purple-50',
    },
    {
      label: 'Total Clicks',
      value: totalClicks.toLocaleString(),
      icon: '🖱️',
      color: 'bg-pink-50',
    },
    {
      label: 'Total Conversions',
      value: totalConversions.toLocaleString(),
      icon: '✅',
      color: 'bg-cyan-50',
    },
    {
      label: 'Average CTR',
      value: `${averageCTR.toFixed(2)}%`,
      icon: '📈',
      color: 'bg-yellow-50',
    },
    {
      label: 'Spend Ratio',
      value: totalBudget > 0 ? `${((totalSpent / totalBudget) * 100).toFixed(1)}%` : '0%',
      icon: '📉',
      color: 'bg-red-50',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, idx) => (
        <div key={idx} className={`card ${stat.color} p-6 hover:shadow-md transition-shadow`}>
          <div className="text-3xl mb-2">{stat.icon}</div>
          <div className="stat-value">{stat.value}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}
