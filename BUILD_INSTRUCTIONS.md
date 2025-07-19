# 🚀 AutoamTax PWA - Build Instructions

## 📋 Prerequisites

- **Node.js**: 18.x or higher
- **npm**: 9.x or higher
- **Git**: Latest version
- **Firebase Account**: For backend services
- **Android Studio**: For mobile development (optional)

## ⚡ Quick Start

### 1. Environment Setup
```bash
# Clone the repository
git clone <repository-url>
cd taxi-app

# Copy environment template
cp .env.example .env

# Edit .env with your Firebase credentials
nano .env
```

### 2. Install Dependencies
```bash
# Install project dependencies
npm install

# Verify installation
npm run type-check
```

### 3. Development Server
```bash
# Start development server
npm run dev

# App will be available at http://localhost:3000
```

### 4. Build for Production
```bash
# Build optimized version
npm run build

# Preview production build
npm run preview
```

## 📱 Mobile Development

### Android Setup
```bash
# Build for Android
npm run android

# Development with live reload
npm run android:dev

# Sync Capacitor
npm run sync
```

### iOS Setup (macOS only)
```bash
# Build for iOS
npm run ios

# Sync Capacitor
npm run sync
```

## 🧪 Testing

### Unit Tests
```bash
# Run unit tests
npm run test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test -- --watch
```

### E2E Tests
```bash
# Run E2E tests
npm run test:e2e

# Run specific test
npm run test:e2e -- tests/login.spec.ts
```

### Performance Tests
```bash
# Run Lighthouse CI
npm run lighthouse

# Analyze bundle size
npm run analyze
```

## 🔧 Development Workflow

### Code Quality
```bash
# Lint code
npm run lint

# Format code
npm run format

# Type checking
npm run type-check
```

### PWA Features
```bash
# Test PWA functionality
npm run build
npm run preview

# Check manifest
# Navigate to /manifest.json in browser

# Test service worker
# Open DevTools > Application > Service Workers
```

## 🚀 Deployment

### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Netlify Deployment
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

### Firebase Hosting
```bash
# Install Firebase CLI
npm i -g firebase-tools

# Login to Firebase
firebase login

# Initialize hosting
firebase init hosting

# Deploy
firebase deploy
```

## 🔐 Security Setup

### Firebase Security
1. **Secure API Keys**: Move to environment variables
2. **Firestore Rules**: Configure proper security rules
3. **Authentication**: Set up email/password authentication

### Content Security Policy
The app includes CSP headers in `index-new.html`. Adjust as needed for your domain.

## 📊 Performance Optimization

### Bundle Analysis
```bash
# Analyze bundle size
npm run analyze

# Check for unused dependencies
npx depcheck

# Update dependencies
npm update
```

### Lighthouse Metrics
Target scores:
- Performance: >90
- Accessibility: >95
- Best Practices: >90
- SEO: >90
- PWA: 100

## 🛠️ Troubleshooting

### Common Issues

**Build fails with TypeScript errors:**
```bash
npm run type-check
# Fix type errors before building
```

**Capacitor sync fails:**
```bash
npx cap clean
npm run build
npx cap sync
```

**PWA not installing:**
- Check manifest.json validity
- Ensure HTTPS in production
- Verify service worker registration

**Firebase connection issues:**
- Verify .env variables
- Check Firebase project settings
- Ensure proper CORS configuration

### Debug Mode
```bash
# Enable debug logging
export VITE_DEBUG_MODE=true
npm run dev
```

## 📁 Project Structure

```
src/
├── components/          # Reusable Vue components
│   ├── ui/             # Base UI components
│   ├── layout/         # Layout components
│   └── features/       # Feature-specific components
├── views/              # Page-level components
├── stores/             # Pinia stores
├── services/           # API and external services
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
├── assets/             # Static assets
└── styles/             # Global styles
```

## 🔄 Version Management

### Semantic Versioning
- **Major**: Breaking changes
- **Minor**: New features
- **Patch**: Bug fixes

### Release Process
1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create git tag
4. Deploy to production

## 🎯 Performance Targets

### Web Vitals
- **LCP**: <2.5s
- **FID**: <100ms
- **CLS**: <0.1

### Bundle Size
- Initial: <500KB
- Total: <2MB
- Chunks: <200KB each

### Accessibility
- WCAG 2.1 AA: 100%
- Screen reader support: Full
- Keyboard navigation: Complete

---

## 🆘 Support

For questions or issues:
1. Check existing GitHub issues
2. Create new issue with detailed description
3. Include error logs and environment info

Remember to never commit sensitive information like API keys to version control!