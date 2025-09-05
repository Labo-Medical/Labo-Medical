# 🚀 DEPLOYMENT GUIDE

This guide provides instructions for deploying the Labo-Medical application to various platforms.

## 📋 Pre-Deployment Checklist

### Code Quality
- [ ] All TypeScript errors resolved
- [ ] ESLint warnings addressed
- [ ] All translations tested in each language
- [ ] RTL functionality verified for Arabic
- [ ] Responsive design tested on multiple devices

### Configuration
- [ ] Production environment variables set
- [ ] Debug mode disabled in production (`debug: false` in i18n config)
- [ ] API endpoints configured correctly
- [ ] Asset paths verified

### Testing
- [ ] Build process completes successfully
- [ ] Preview build tested locally
- [ ] All language switches work correctly
- [ ] RTL layout displays properly
- [ ] All routes accessible

## 🏗 Build Process

### 1. Production Build
```bash
# Install dependencies
npm install

# Create production build
npm run build

# Test production build locally
npm run preview
```

### 2. Build Output
The build process creates a `dist/` folder containing:
```
dist/
├── index.html          # Main HTML file
├── assets/             # Optimized CSS and JS files
│   ├── index-[hash].js # Main JavaScript bundle
│   ├── index-[hash].css # Compiled CSS styles
│   └── ...            # Other optimized assets
└── public/            # Static assets (images, documents, etc.)
```

## 🌐 Deployment Options

### Option 1: Netlify (Recommended)

#### Automatic Deployment from Git
1. **Connect Repository**
   - Go to [Netlify](https://www.netlify.com/)
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Build Settings**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

3. **Environment Variables** (if needed)
   ```
   VITE_API_URL=your-api-url
   VITE_ENV=production
   ```

#### Manual Deployment
```bash
# Build the project
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

### Option 2: Vercel

#### Automatic Deployment
1. **Import Project**
   - Go to [Vercel](https://vercel.com/)
   - Click "Import Project"
   - Connect your repository

2. **Build Configuration**
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   ```

#### Manual Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Build and deploy
npm run build
vercel --prod
```

### Option 3: GitHub Pages

#### Setup GitHub Actions
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

### Option 4: Traditional Web Hosting

#### FTP/SFTP Upload
1. **Build the project**
   ```bash
   npm run build
   ```

2. **Upload dist/ contents**
   - Upload all files from `dist/` folder to your web server's public directory
   - Ensure `index.html` is in the root directory

#### Server Configuration
For proper routing, configure your server:

**Apache (.htaccess)**
```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QR,L]
```

**Nginx**
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## ⚙️ Production Configuration

### 1. Environment Variables

Create `.env.production`:
```env
VITE_ENV=production
VITE_API_URL=https://your-api-domain.com
VITE_DEBUG_I18N=false
```

### 2. Update i18n Configuration

For production, disable debug mode in `src/i18n/index.ts`:
```typescript
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'es',
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false,
    },
    debug: false, // Set to false for production
  });
```

### 3. Asset Optimization

The Vite build process automatically:
- ✅ Minifies JavaScript and CSS
- ✅ Optimizes images
- ✅ Generates unique file hashes for caching
- ✅ Creates source maps (optional)

## 🔧 Custom Domain Setup

### Netlify Custom Domain
1. Go to Site settings → Domain management
2. Add custom domain
3. Configure DNS records:
   ```
   Type: CNAME
   Name: www
   Value: your-site.netlify.app
   ```

### Vercel Custom Domain
1. Go to Project settings → Domains
2. Add domain
3. Configure DNS:
   ```
   Type: CNAME
   Name: @
   Value: cname.vercel-dns.com
   ```

## 📊 Performance Optimization

### Bundle Analysis
```bash
# Analyze bundle size
npm run build -- --mode=analyze

# Or use bundle analyzer
npx vite-bundle-analyzer dist
```

### Performance Checklist
- [ ] Images optimized (WebP format when possible)
- [ ] Unused dependencies removed
- [ ] Code splitting implemented
- [ ] Lazy loading for components
- [ ] Service worker for caching (optional)

## 🔍 Post-Deployment Testing

### Functionality Testing
- [ ] All pages load correctly
- [ ] Language switching works
- [ ] RTL layout displays properly for Arabic
- [ ] Forms submit successfully
- [ ] Links work correctly
- [ ] Mobile responsiveness

### Performance Testing
- [ ] Page load speed (aim for <3 seconds)
- [ ] Core Web Vitals scores
- [ ] Mobile performance
- [ ] SEO metadata

### Browser Testing
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers

## 📱 PWA Setup (Optional)

To make the app installable:

### 1. Add Manifest
Create `public/manifest.json`:
```json
{
  "name": "Labo-Medical",
  "short_name": "Labo-Medical",
  "description": "Medical Laboratory Management System",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#7b1621",
  "icons": [
    {
      "src": "/favicon.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

### 2. Add Service Worker
```bash
npm install workbox-webpack-plugin
```

## 🔐 Security Considerations

### Headers Configuration
Configure security headers on your server:
```
Content-Security-Policy: default-src 'self'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

### HTTPS
- [ ] SSL certificate installed
- [ ] HTTP redirects to HTTPS
- [ ] HSTS header configured

## 📈 Monitoring & Analytics

### Error Tracking
Consider adding error tracking:
- Sentry
- LogRocket
- Bugsnag

### Analytics
Consider adding analytics:
- Google Analytics
- Plausible
- Fathom

## 🆘 Troubleshooting

### Common Issues

#### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### Routing Issues
- Ensure server is configured for SPA routing
- Check base URL configuration in Vite config

#### Translation Issues
- Verify all translation keys exist in all languages
- Check browser console for i18n errors
- Test with debug mode enabled

#### RTL Issues
- Verify CSS RTL styles are included
- Check document direction switching logic
- Test with Arabic language selected

### Getting Help

If you encounter issues:
1. Check the browser console for errors
2. Verify all dependencies are up to date
3. Test the production build locally first
4. Review the comprehensive documentation in README.md

---

## 🎉 Deployment Success

Once deployed successfully, your multi-language medical laboratory management system will be available with:

- ✅ **4 Languages**: Spanish (default), French, English, Arabic
- ✅ **RTL Support**: Proper Arabic right-to-left layout
- ✅ **Responsive Design**: Works on all device sizes
- ✅ **Modern Performance**: Fast loading and smooth interactions
- ✅ **SEO Optimized**: Proper meta tags and structure

**Your application is now ready to serve users worldwide!** 🌍
