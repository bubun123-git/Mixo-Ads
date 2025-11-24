# Quick Start Guide

Get the Mixo Ads Dashboard up and running in minutes!

## Prerequisites

- **Node.js** v16.0.0 or higher
- **npm** v7.0.0 or higher (or yarn/pnpm)
- **Git** (for cloning the repository)

## Installation (5 minutes)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/mixo-ads-dashboard.git
cd mixo-ads-dashboard
```

### 2. Install Dependencies

```bash
npm install
```

This installs all required packages including:
- React & React DOM
- React Router (for navigation)
- Axios (HTTP client)
- Tailwind CSS (styling)
- TypeScript
- Vite (build tool)

### 3. Start Development Server

```bash
npm run dev
```

Output:
```
  VITE v5.4.21  ready in 377 ms

  ➜  Local:   http://localhost:3000/
```

**Open your browser to `http://localhost:3000/`**

The app is now running! You should see:
- 📊 Campaign dashboard with summary statistics
- 📊 Table of all campaigns
- Click on any campaign to see detailed metrics

## Usage

### View Dashboard
- Navigate to `/` (home page)
- See summary statistics cards
- Browse campaigns in the table
- Click "View Details" for individual campaigns

### View Campaign Details
- Click "View Details" on any campaign
- See comprehensive metrics including:
  - Campaign info (name, status, dates)
  - Performance metrics (impressions, clicks, conversions)
  - Budget breakdown with visual progress bar

### Going Back
- Click "Back to Dashboard" link to return to main view

## Development Workflow

### Edit Code
- Edit files in `src/` folder
- Changes auto-reload in browser (hot module reloading)
- No need to restart server

### Key Files to Edit

| File | Purpose |
|------|---------|
| `src/pages/DashboardPage.tsx` | Dashboard layout |
| `src/components/CampaignsList.tsx` | Campaign table |
| `src/components/SummaryStatistics.tsx` | Stats cards |
| `src/components/CampaignDetails.tsx` | Detail view |
| `src/index.css` | Global styles |
| `tailwind.config.js` | Tailwind configuration |

### Project Structure

```
src/
├── components/          # Reusable components
│   ├── Layout.tsx       # Main layout wrapper
│   ├── Loading.tsx      # Loading state
│   ├── Error.tsx        # Error state
│   ├── EmptyState.tsx   # Empty state
│   ├── SummaryStatistics.tsx
│   ├── CampaignsList.tsx
│   └── CampaignDetails.tsx
├── pages/               # Full page components
│   ├── DashboardPage.tsx
│   └── CampaignDetailsPage.tsx
├── services/
│   └── api.ts           # API integration
├── App.tsx              # App router
├── main.tsx             # Entry point
└── index.css            # Global styles
```

## Building for Production

### Create Optimized Build

```bash
npm run build
```

Output will be in `dist/` folder:
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].css
│   └── index-[hash].js
```

### Preview Production Build

```bash
npm run preview
```

This starts a local server serving the production build.

## Deployment

### Deploy to Vercel (Recommended)

1. **Create GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/mixo-ads-dashboard.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to https://vercel.com/new
   - Click "Import Git Repository"
   - Select your GitHub repo
   - Click "Deploy"
   - Your app is live! 🎉

### Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

### Other Hosting Options
- GitHub Pages
- Firebase Hosting
- AWS S3 + CloudFront
- Any static file hosting

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed guides.

## Troubleshooting

### Port 3000 Already in Use

```bash
npm run dev -- --port 3001
```

### Dependencies Installation Issues

```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
```

### Build Errors

```bash
# Clear everything and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### API Connection Issues

1. **Check API is accessible**
   ```bash
   curl https://mixo-fe-backend-task.vercel.app/campaigns
   ```

2. **Check browser console for errors**
   - Open DevTools (F12)
   - Check Console tab for error messages
   - Check Network tab to see API requests

3. **Verify internet connection**

### Module Not Found Errors

- Make sure all files are in correct locations
- Check file extensions (.ts, .tsx)
- Verify import paths are correct

### TypeScript Errors

```bash
# Rebuild TypeScript
npm run build

# Check specific errors
npm run build 2>&1 | grep error
```

## Common Tasks

### Add New Component

1. Create file in `src/components/MyComponent.tsx`
2. Write component code:
   ```typescript
   export default function MyComponent() {
     return <div>My Component</div>
   }
   ```
3. Import in needed pages
4. Use in JSX

### Modify API Calls

Edit `src/services/api.ts`:
```typescript
export const getCampaigns = async () => {
  // Your API call here
}
```

### Change Styling

- Global styles: Edit `src/index.css`
- Component styles: Use Tailwind classes in JSX
- Colors: Edit `tailwind.config.js`

### Update Dashboard Layout

Edit `src/pages/DashboardPage.tsx` and reorganize components.

## Performance Tips

- Use React DevTools for component inspection
- Check bundle size: `npm run build` shows file sizes
- Monitor Network tab for slow requests
- Use Lighthouse audit (Chrome DevTools)

## Next Steps

1. ✅ Run the app locally
2. ✅ Explore the codebase
3. ✅ Customize styling
4. ✅ Add features or modify components
5. ✅ Deploy to production

## Documentation

- **README.md** - Full documentation
- **API.md** - API reference
- **DEPLOYMENT.md** - Deployment guides
- **CONTRIBUTING.md** - Contribution guidelines
- Inline code comments - Implementation details

## Support

- 📚 Check README.md
- 🔍 Search GitHub Issues
- 💬 Create new Issue for bugs
- 📧 Contact project maintainers

## Key Shortcuts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview build |
| `Ctrl+C` | Stop server |
| `F12` | DevTools |
| `Ctrl+Shift+I` | DevTools (alternate) |

---

**Happy Coding! 🚀**

For more details, see the [README.md](./README.md)
