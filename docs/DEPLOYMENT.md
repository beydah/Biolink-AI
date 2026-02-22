# Deployment Guide

## Environments

| Environment | URL                     | Config File        |
| ----------- | ----------------------- | ------------------ |
| Development | `http://localhost:5173` | `.env.example`     |
| Production  | Your deployed URL       | `public/data.json` |

---

## Environment Setup

### 1. Configure Site Content

Modify `public/data.json` to update your profile, links, and SEO settings:

```json
{
  "app_url": "https://your-site.netlify.app",
  "app_title": "My Biolink",
  "profile": {
    "name": "Your Name",
    "links": [...]
  }
}
```

### 2. Environment Variables (.env)

| Variable       | Required | Description                                     |
| -------------- | :------: | ----------------------------------------------- |
| `VITE_APP_URL` |    ✅     | Base URL for absolute OG image paths (fallback) |

Note: Most configuration is now centralized in `data.json`.

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
  NODE_VERSION = "22"
```

4. Set `VITE_APP_URL` in **Site Settings → Environment Variables**.

---

## CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/ci.yml`) runs on every push and PR:

| Step       | Command         | Purpose                  |
| ---------- | --------------- | ------------------------ |
| Install    | `npm ci`        | Clean dependency install |
| Lint       | `npm run lint`  | Code quality check       |
| Type Check | `npx tsc -b`    | TypeScript validation    |
| Build      | `npm run build` | Production bundle        |

---

## Customization

### Design Tokens

Edit `src/index.css` to modify colors and fonts:

```css
@theme {
  --color-primary: #330867;
  --color-secondary: #30cfd0;
  --font-poppins: 'Poppins', sans-serif;
}
```

### Content Updates

Simply edit `public/data.json`. The site will fetch the new values at runtime without needing a full code rebuild (unless hosted on CDNs that cache JSON aggressively).
