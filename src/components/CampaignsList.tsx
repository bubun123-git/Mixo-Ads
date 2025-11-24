import { Link } from 'react-router-dom'
import { Campaign } from '../services/api'

interface CampaignsListProps {
  campaigns: Campaign[]
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

export default function CampaignsList({ campaigns }: CampaignsListProps) {
  if (campaigns.length === 0) {
    return null
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="text-xl font-bold text-gray-900">Campaigns</h2>
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Campaign Name</th>
              <th>Status</th>
              <th>Budget</th>
              <th>Spent</th>
              <th>Impressions</th>
              <th>Clicks</th>
              <th>Conversions</th>
              <th>CTR</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => {
              const ctr = campaign.ctr?.toFixed(2) || '0.00'
              
              return (
                <tr key={campaign.id} className="border-t border-neutral-border hover:bg-neutral-light">
                  <td className="font-medium text-primary">{campaign.name}</td>
                  <td>
                    <span className={`badge ${getStatusBadgeColor(campaign.status)}`}>
                      {getStatusLabel(campaign.status)}
                    </span>
                  </td>
                  <td>${campaign.budget.toLocaleString()}</td>
                  <td>${(campaign.spend || 0).toLocaleString()}</td>
                  <td>{(campaign.impressions || 0).toLocaleString()}</td>
                  <td>{(campaign.clicks || 0).toLocaleString()}</td>
                  <td>{(campaign.conversions || 0).toLocaleString()}</td>
                  <td>{ctr}%</td>
                  <td>
                    <Link
                      to={`/campaign/${campaign.id}`}
                      className="text-primary hover:text-primary-dark font-medium transition-colors"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
