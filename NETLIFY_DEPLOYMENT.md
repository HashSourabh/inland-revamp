# Netlify Deployment Instructions

## Manual Deployment (without GitHub)

1. **Build your project locally**
   ```bash
   npm run build
   ```

2. **Install Netlify CLI**
   ```bash
   npm install netlify-cli -g
   ```

3. **Login to Netlify**
   ```bash
   netlify login
   ```

4. **Initialize Netlify site**
   ```bash
   netlify init
   ```
   - Choose "Create & configure a new site"
   - Select your team
   - Provide a site name (optional)

5. **Deploy the site**
   ```bash
   netlify deploy --prod
   ```
   - When prompted for the publish directory, enter `out` (not `.next`)

## Environment Variables

Make sure to add these environment variables in the Netlify dashboard:
- `NEXT_PUBLIC_UNSPLASH_ACCESS_KEY` (Required for Unsplash API)

## Configuration Details

The `netlify.toml` file in the project root contains the necessary configuration:
- Build command: `npm run build`
- Publish directory: `out` (changed from `.next` for static export)
- Using the Next.js plugin for optimal performance

## Troubleshooting

- If you see 404 errors for client-side routing, check that the `public/_redirects` file is present with `/* /index.html 200`
- If images aren't working, make sure `unoptimized: true` is set in the Next.js image configuration
- If environment variables are not working, verify they are set correctly in the Netlify dashboard 