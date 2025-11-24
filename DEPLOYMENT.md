# Deployment Guides

## Quick Links
- [Vercel Deployment](#vercel-deployment)
- [Netlify Deployment](#netlify-deployment)
- [GitHub Pages Deployment](#github-pages-deployment)
- [Traditional Hosting](#traditional-hosting)

## Vercel Deployment

Vercel is recommended for this project as it's optimized for Vite applications.

### Steps:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/mixo-ads-dashboard.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Visit https://vercel.com/new
   - Import your GitHub repository
   - Vercel will auto-detect Vite settings
   - Click "Deploy"

3. **No Environment Variables Needed** - The API is public

4. **Your app will be live at**: `https://mixo-ads-dashboard-[random].vercel.app/`

## Netlify Deployment

### Option 1: Connect GitHub (Recommended)

1. Push to GitHub (see Vercel steps above)
2. Visit https://app.netlify.com/signup
3. Connect your GitHub account
4. Click "New site from Git"
5. Select your repository
6. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
7. Click "Deploy site"

### Option 2: Manual Deployment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build project
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

## GitHub Pages Deployment

GitHub Pages serves static files for free, but requires a workaround for SPAs.

### Steps:

1. **Update vite.config.ts**
   ```typescript
   export default defineConfig({
     plugins: [react()],
     base: '/mixo-ads-dashboard/', // Add your repo name here
     // ... rest of config
   })
   ```

2. **Build**
   ```bash
   npm run build
   ```

3. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for GitHub Pages"
   git push
   ```

4. **Enable GitHub Pages**
   - Go to repo settings
   - Scroll to "GitHub Pages"
   - Select "Deploy from a branch"
   - Select "main" branch and "dist" folder
   - Click Save

5. Your site will be available at: `https://yourusername.github.io/mixo-ads-dashboard/`

## Traditional Hosting

For any static file hosting (cPanel, FTP, etc.):

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Upload `dist` folder contents** to your hosting provider's public directory

3. **Configure SPA routing**
   - Create a `.htaccess` file (Apache) or equivalent for your host
   - Ensure all routes redirect to `index.html`

### Apache .htaccess Example:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Nginx Configuration:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## Post-Deployment Checklist

- [ ] Test dashboard on deployed URL
- [ ] Verify API calls work (check network tab)
- [ ] Test all routes (dashboard, campaign details)
- [ ] Check error handling with network throttling
- [ ] Verify responsive design on mobile
- [ ] Check that favicon loads correctly
- [ ] Monitor for console errors
- [ ] Performance audit with Lighthouse

## Environment Variables

If you want to make the API URL configurable:

1. Create `.env` files:
   ```bash
   # .env (development)
   VITE_API_BASE_URL=https://mixo-fe-backend-task.vercel.app

   # .env.production (production)
   VITE_API_BASE_URL=https://mixo-fe-backend-task.vercel.app
   ```

2. Update `src/services/api.ts`:
   ```typescript
   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://mixo-fe-backend-task.vercel.app'
   ```

## Troubleshooting Deployment

### 404 errors on page refresh
- Ensure your hosting provider supports SPA routing
- Check that `index.html` is served for all non-file routes
- Use the `.htaccess` or Nginx configuration above

### API calls failing after deployment
- Check CORS settings on API
- Verify the API URL is accessible
- Check browser console for errors
- Use network tab to inspect requests

### Build failing on deployment
- Check that all dependencies are in `package.json`
- Ensure Node.js version compatibility (v16+)
- Clear cache and retry: `npm install && npm run build`

### Slow page loads
- Check bundle size: Run `npm run build` and check console output
- Check Network tab in DevTools for slow assets
- Enable Gzip compression on your server
- Consider CDN for static assets

## Monitoring & Analytics (Optional)

To add analytics to your deployed app:

1. **Vercel Analytics** (built-in)
   - Automatic for Vercel deployments
   - View at vercel.com/analytics

2. **Google Analytics**
   Add to `src/main.tsx`:
   ```typescript
   // Google Analytics script tag
   ```

3. **Sentry** (error tracking)
   - Great for production error monitoring

## Custom Domain

### For Vercel:
1. Go to project settings
2. Domains section
3. Add your custom domain
4. Update your domain's DNS records

### For Netlify:
1. Go to Domain management
2. Add custom domain
3. Update DNS records at your domain provider

---

**Questions?** Check the main README.md or create an issue on GitHub.
