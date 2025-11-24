# API Documentation

This document describes the API integration for the Mixo Ads Dashboard.

## API Overview

**Base URL**: `https://mixo-fe-backend-task.vercel.app/`

**Protocol**: REST API with JSON

**Authentication**: None required (public API)

## Authentication

This API does not require authentication. All endpoints are publicly accessible.

## Endpoints

### 1. Get All Campaigns

Fetch a list of all campaigns.

**Request:**
```http
GET /campaigns
```

**Parameters:**
None

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "campaign-1",
      "name": "Summer Sale 2024",
      "status": "active",
      "budget": 10000,
      "spent": 5000,
      "impressions": 50000,
      "clicks": 2500,
      "conversions": 250,
      "createdAt": "2024-05-20T10:00:00Z",
      "startDate": "2024-06-01T00:00:00Z",
      "endDate": "2024-08-31T23:59:59Z"
    },
    // ... more campaigns
  ],
  "total": 10
}
```

**Example Usage:**
```typescript
import { getCampaigns } from './services/api'

const response = await getCampaigns()
console.log(`Total campaigns: ${response.total}`)
response.data.forEach(campaign => {
  console.log(`${campaign.name}: $${campaign.budget}`)
})
```

### 2. Get Single Campaign

Fetch a specific campaign by ID.

**Request:**
```http
GET /campaigns/:id
```

**Parameters:**
- `id` (path parameter, required): Campaign ID string

**Response (200 OK):**
```json
{
  "id": "campaign-1",
  "name": "Summer Sale 2024",
  "status": "active",
  "budget": 10000,
  "spent": 5000,
  "impressions": 50000,
  "clicks": 2500,
  "conversions": 250,
  "createdAt": "2024-05-20T10:00:00Z",
  "startDate": "2024-06-01T00:00:00Z",
  "endDate": "2024-08-31T23:59:59Z"
}
```

**Error (404 Not Found):**
```json
{
  "error": "Campaign not found"
}
```

**Example Usage:**
```typescript
import { getCampaignById } from './services/api'

const campaign = await getCampaignById('campaign-1')
console.log(`Campaign: ${campaign.name}`)
console.log(`Status: ${campaign.status}`)
```

## Data Types

### Campaign Object

```typescript
interface Campaign {
  // Identifiers
  id: string                    // Unique campaign identifier
  name: string                  // Campaign display name
  
  // Status
  status: 'active' 
         | 'paused' 
         | 'completed' 
         | 'draft'             // Current campaign status
  
  // Budget Information
  budget: number                // Total allocated budget in USD
  spent: number                 // Amount already spent in USD
  
  // Performance Metrics
  impressions: number           // Total number of times ad was shown
  clicks: number                // Total number of clicks
  conversions: number           // Total number of conversions
  
  // Dates
  createdAt: string            // ISO 8601 timestamp of creation
  startDate: string            // ISO 8601 start date
  endDate: string              // ISO 8601 end date
  
  // Calculated Metrics (optional, added by frontend)
  ctr?: number                 // Click-Through Rate percentage
  cpc?: number                 // Cost Per Click in USD
  conversionRate?: number      // Conversion Rate percentage
}
```

## Response Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 400 | Bad request |
| 404 | Not found |
| 500 | Server error |
| 503 | Service unavailable |

## Error Handling

### Network Errors

The API client automatically handles network timeouts (10 second limit).

```typescript
try {
  const campaigns = await getCampaigns()
} catch (error) {
  if (error instanceof Error) {
    console.error(`Failed: ${error.message}`)
  }
}
```

### Rate Limiting

No explicit rate limiting is documented. Requests are throttled by network conditions.

## Calculated Metrics

The frontend calculates additional metrics from API data:

### Click-Through Rate (CTR)
```typescript
CTR = (clicks / impressions) * 100
```
- Represents the percentage of impressions that resulted in clicks
- Example: 100 clicks from 10,000 impressions = 1.00% CTR

### Cost Per Click (CPC)
```typescript
CPC = spent / clicks
```
- Average cost for each click
- Example: $500 spent / 100 clicks = $5 CPC

### Conversion Rate
```typescript
conversionRate = (conversions / clicks) * 100
```
- Percentage of clicks that resulted in conversions
- Example: 10 conversions / 100 clicks = 10%

## API Service Module

The `src/services/api.ts` module provides a wrapper around the API:

### Functions

#### `getCampaigns(): Promise<CampaignsResponse>`
Fetches all campaigns.

```typescript
const response = await getCampaigns()
// response: { data: Campaign[], total: number }
```

#### `getCampaignById(id: string): Promise<Campaign>`
Fetches a single campaign.

```typescript
const campaign = await getCampaignById('campaign-123')
// campaign: Campaign
```

#### `calculateMetrics(campaign: Campaign): Campaign`
Adds calculated metrics to a campaign.

```typescript
const enrichedCampaign = calculateMetrics(campaign)
// enrichedCampaign now has ctr, cpc, and conversionRate
```

## Testing the API

### Using cURL

```bash
# Get all campaigns
curl https://mixo-fe-backend-task.vercel.app/campaigns

# Get single campaign
curl https://mixo-fe-backend-task.vercel.app/campaigns/campaign-1
```

### Using JavaScript/Fetch

```javascript
// Get all campaigns
fetch('https://mixo-fe-backend-task.vercel.app/campaigns')
  .then(res => res.json())
  .then(data => console.log(data))

// Get single campaign
fetch('https://mixo-fe-backend-task.vercel.app/campaigns/campaign-1')
  .then(res => res.json())
  .then(campaign => console.log(campaign))
```

### Using Axios

```typescript
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://mixo-fe-backend-task.vercel.app'
})

// Get all campaigns
const { data } = await api.get('/campaigns')

// Get single campaign
const campaign = await api.get('/campaigns/campaign-1')
```

## Performance Considerations

- **Response Time**: Typically < 500ms
- **Payload Size**: ~2-5KB per campaign
- **Caching**: Consider caching campaign list if not changing frequently
- **Pagination**: Not available; all campaigns returned in single request

## Pagination (Future)

The API currently returns all campaigns in a single request. For a production API, pagination might be added:

```typescript
// Potential future endpoint
GET /campaigns?page=1&limit=20
```

## Timestamps

All timestamps are in ISO 8601 format (UTC):
```
2024-11-24T15:30:00Z
```

Convert to local time in JavaScript:
```typescript
const date = new Date('2024-11-24T15:30:00Z')
const localDate = date.toLocaleDateString()
```

## CORS

The API supports CORS headers, allowing requests from any origin.

## Support

For API issues:
1. Check if the API is accessible: `https://mixo-fe-backend-task.vercel.app/campaigns`
2. Review browser console for detailed error messages
3. Check network tab in DevTools
4. Verify your internet connection

---

Last Updated: 2024-11-24
