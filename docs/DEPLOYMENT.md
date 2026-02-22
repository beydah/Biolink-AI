# Deployment Guide

## Environments

| Environment | URL                     | Config File        |
| ----------- | ----------------------- | ------------------ |
| Development | `http://localhost:5173` | `.env.development` |
| Production  | Your deployed URL       | `.env.production`  |

---

## Environment Setup

### 1. Create Environment Files

```bash
# Development
echo "VITE_APP_URL=http://localhost:5173" > .env.development

# Production
echo "VITE_APP_URL=https://your-domain.netlify.app" > .env.production
```

### 2. Environment Variables Reference

| Variable       | Required | Description                          |
| -------------- | :------: | ------------------------------------ |
| `VITE_APP_URL` |    ✅     | Base URL for absolute OG image paths |

All `VITE_` prefixed variables are **public** and bundled into the client build. Never store secrets in `VITE_` variables.

---

## Netlify Deployment

### Automatic (Recommended)

1. Push your code to GitHub
2. Connect the repository in [Netlify Dashboard](https://app.netlify.com/)
3. Build settings are auto-detected from `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"
```

4. Set environment variables in **Site Settings → Environment Variables**:
   - `VITE_APP_URL` = your Netlify URL

### Manual Deploy

```bash
npm run build
npx netlify-cli deploy --prod --dir=dist
```

---

## CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/ci.yml`) runs on every push and PR:

| Step       | Command                        | Purpose                  |
| ---------- | ------------------------------ | ------------------------ |
| Install    | `npm ci`                       | Clean dependency install |
| Lint       | `npm run lint`                 | Code quality check       |
| Type Check | `npx tsc -b`                   | TypeScript validation    |
| Build      | `npm run build`                | Production bundle        |
| Audit      | `npm audit --audit-level=high` | Security check           |

---

## Customization

### Profile Data

Edit `src/services/config/profile.ts`:

```typescript
export const PROFILE: ProfileData = {
  name: 'Your Name',
  title: 'Your Title',
  avatarUrl: '/assets/avatar.jpg',
  qrCodeUrl: '/assets/qr-code.jpg',
  links: [
    { label: 'Website', url: 'https://yoursite.com/', isExternal: false },
    { label: 'GitHub', url: 'https://github.com/you', isExternal: true },
  ],
} as const
```

### SEO Metadata

Edit `src/services/seo/meta.ts` to update title, description, and OpenGraph tags.

### Design Tokens

Edit `src/index.css` to modify colors and fonts:

```css
@theme {
  --color-primary: #330867;
  --color-secondary: #30cfd0;
  --font-poppins: 'Poppins', sans-serif;
}
```
