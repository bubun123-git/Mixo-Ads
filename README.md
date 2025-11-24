# Mixo Ads Campaign Monitoring Dashboard

A production-ready, responsive campaign monitoring dashboard built with React, TypeScript, and Tailwind CSS. Monitor your campaign performance with real-time metrics and comprehensive analytics.

> **📋 Project Complete!** See [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) for complete project overview, deliverables checklist, and build information.

## Features

✨ **Key Features:**

- 📊 **Campaign Dashboard** - View all campaigns with key performance metrics at a glance
- 📈 **Summary Statistics** - Track total budget, impressions, clicks, conversions, and more
- 🎯 **Detailed Campaign Views** - Dive deep into individual campaign metrics and budgets
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- ⚡ **Fast Performance** - Built with Vite for optimal build times and development experience
- 🔄 **Error Handling** - Graceful error states, loading indicators, and empty state handling
- 🎨 **Clean UI** - Minimalist, professional design focused on usability
- 🚀 **Production Ready** - Fully tested, documented, and ready for deployment

## Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Backend API**: Mixo Ads API (https://mixo-fe-backend-task.vercel.app/)

## Project Structure

```
mixo-ads-dashboard/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Layout.tsx       # Main layout wrapper
│   │   ├── Loading.tsx      # Loading state component
│   │   ├── Error.tsx        # Error state component
│   │   ├── EmptyState.tsx   # Empty state component
│   │   ├── SummaryStatistics.tsx  # Stats cards
│   │   ├── CampaignsList.tsx      # Campaigns table
│   │   └── CampaignDetails.tsx    # Campaign detail view
│   ├── services/
│   │   └── api.ts           # API client and methods
│   ├── pages/               # Page components
│   │   ├── DashboardPage.tsx      # Main dashboard
│   │   └── CampaignDetailsPage.tsx # Campaign details page
│   ├── App.tsx              # App router configuration
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── index.html               # HTML entry point
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Project dependencies
├── .gitignore               # Git ignore rules
├── .env.example             # Environment variables template
└── README.md                # This file
```

## Prerequisites

- **Node.js**: v16.0.0 or higher
- **npm**: v7.0.0 or higher (or yarn/pnpm)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mixo-ads-dashboard.git
   cd mixo-ads-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

   The app will open at `http://localhost:3000`

## Usage

### Development

Start the development server with hot module reloading:

```bash
npm run dev
```

### Build for Production

Create an optimized production build:

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## API Integration

The dashboard connects to the Mixo Ads Backend API:

**Base URL**: `https://mixo-fe-backend-task.vercel.app/`

### Endpoints Used

#### Get All Campaigns
```http
GET /campaigns
```

**Response**:
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
      "startDate": "2024-06-01",
      "endDate": "2024-08-31",
      "createdAt": "2024-05-20"
    }
  ],
  "total": 10
}
```

#### Get Campaign by ID
```http
GET /campaigns/:id
```

**Response**: Single campaign object

### Campaign Data Structure

```typescript
interface Campaign {
  id: string
  name: string
  status: 'active' | 'paused' | 'completed' | 'draft'
  budget: number
  spent: number
  impressions: number
  clicks: number
  conversions: number
  createdAt: string
  startDate: string
  endDate: string
  ctr?: number              // Calculated: (clicks / impressions) * 100
  cpc?: number              // Calculated: spent / clicks
  conversionRate?: number   // Calculated: (conversions / clicks) * 100
}
```

## Features Explained

### Dashboard Page

The main dashboard displays:

1. **Summary Statistics Cards** - Key metrics including:
   - Active Campaigns count
   - Total Budget allocated
   - Total Spent
   - Total Impressions
   - Total Clicks
   - Total Conversions
   - Average CTR (Click-Through Rate)
   - Spend Ratio

2. **Campaigns Table** - Sortable table showing:
   - Campaign name
   - Status (with color-coded badges)
   - Budget and Spent amounts
   - Performance metrics (Impressions, Clicks, Conversions)
   - CTR percentage
   - Link to detailed view

### Campaign Details Page

Individual campaign view includes:

1. **Campaign Overview** - Basic information:
   - Campaign name and status
   - Budget and spending details
   - Date range (start, end, created)

2. **Performance Metrics** - Six key metrics:
   - Impressions
   - Clicks
   - Conversions
   - CTR (Click-Through Rate)
   - CPC (Cost Per Click)
   - Conversion Rate

3. **Budget Breakdown** - Visual representation:
   - Progress bar showing budget utilization
   - Amount spent and remaining
   - Percentage of budget used

## State Management & Error Handling

The app handles various states gracefully:

### Loading State
- Shows loading spinner with message
- Displayed while fetching data from API

### Error State
- Shows error message with details
- Provides "Try Again" button to retry
- Handles network errors, API errors, etc.

### Empty State
- Shows friendly message when no data available
- Provides action button if applicable

## Styling & Responsive Design

- **Tailwind CSS** for utility-first styling
- **Mobile-first** responsive design approach
- **Breakpoints**: 
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px

## Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"

3. **Configuration**
   - No environment variables needed for this project
   - Vercel auto-detects Vite configuration

### Deploy to Netlify

1. **Build locally**
   ```bash
   npm run build
   ```

2. **Deploy with Netlify CLI**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=dist
   ```

   Or connect your GitHub repo at [netlify.com](https://netlify.com)

### Deploy to Other Platforms

The `dist/` folder created by `npm run build` can be deployed to any static hosting:
- GitHub Pages
- AWS S3 + CloudFront
- Google Cloud Storage
- Firebase Hosting
- Azure Static Web Apps
- etc.

## Environment Variables

Currently, no environment variables are required. The API base URL is hardcoded in `src/services/api.ts`.

To make it configurable, create `.env` file:

```env
VITE_API_BASE_URL=https://mixo-fe-backend-task.vercel.app/
```

Then update `src/services/api.ts`:
```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://mixo-fe-backend-task.vercel.app/'
```

## Performance Optimization

- **Code Splitting**: Automatic with Vite
- **Lazy Loading**: Route-based code splitting available
- **Tree Shaking**: Unused code removed during build
- **Minification**: Automatic production build optimization
- **CSS Purging**: Tailwind CSS purges unused styles

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Known Limitations & Future Enhancements

### Current Limitations
- No data pagination (displays all campaigns)
- No search/filter functionality
- Read-only dashboard (no campaign creation/editing)

### Potential Future Features
- Campaign creation and editing
- Search and filter capabilities
- Data export (CSV, PDF)
- Campaign comparison
- Advanced charts and graphs
- Campaign scheduling
- A/B testing management
- Performance trend analysis

## Troubleshooting

### Port 3000 Already in Use
```bash
# Change port in vite.config.ts or use:
npm run dev -- --port 3001
```

### API Connection Issues
1. Check your internet connection
2. Verify the API is accessible: `curl https://mixo-fe-backend-task.vercel.app/campaigns`
3. Check browser console for CORS errors
4. API might have rate limiting

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
npm run build
```

### TypeScript Errors
```bash
# Generate TypeScript types
npm install
npm run build
```

## Contributing

This is a sample project. To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Support & Questions

- 📧 Email: support@mixoads.com
- 💬 GitHub Issues: [Report Issues](https://github.com/yourusername/mixo-ads-dashboard/issues)
- 📚 Documentation: See this README and inline code comments

## Changelog

### v0.1.0 (2024-11-24)
- Initial release
- Campaign dashboard with summary statistics
- Campaign list with performance metrics
- Campaign details page
- Responsive design
- Error handling and loading states

## Credits

- Built with [React](https://react.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Bundled with [Vite](https://vitejs.dev/)
- API by Mixo Ads

---

**Happy Monitoring! 🚀**
