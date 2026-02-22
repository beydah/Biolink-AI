# Biolink AI

> Personal biolink page built with React, TypeScript, Tailwind CSS, and Vite.

[![Netlify Status](https://api.netlify.com/api/v1/badges/placeholder/deploy-status)](https://app.netlify.com/)

---

## ⚡ Tech Stack

| Layer     | Technology            |
| --------- | --------------------- |
| Framework | React 19 + TypeScript |
| Bundler   | Vite 7                |
| Styling   | Tailwind CSS v4       |
| Animation | Framer Motion         |
| SEO       | react-helmet-async    |
| Deploy    | Netlify               |

---

## 📂 Project Structure

```
src/
├── components/
│   ├── atoms/          → Button, Avatar, Heading, QRCode
│   ├── molecules/      → ProfileHeader, LinkButton
│   ├── organisms/      → HeroSection, Footer
│   ├── templates/      → BiolinkLayout
│   └── pages/          → HomePage
├── services/
│   ├── config/         → profile.ts, types.ts, constants.ts
│   └── seo/            → meta.ts, types.ts
├── App.tsx
├── main.tsx
└── index.css
```

**Architecture:** Atomic Design (UI) + Service-Based Monolith (Logic)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
npm run build
```

Output: `dist/`

---

## 🌐 Deploy to Netlify

1. Push to GitHub
2. Connect repo in [Netlify](https://app.netlify.com/)
3. Settings auto-detected from `netlify.toml`:
   - Build: `npm run build`
   - Publish: `dist`
4. Add environment variables in **Netlify → Site Settings → Environment Variables**

---

## 🔧 Configuration

### Profile Data

Edit [`src/services/config/profile.ts`](src/services/config/profile.ts) to update:
- Name, title, avatar
- Social links
- QR code image

### SEO

Edit [`src/services/seo/meta.ts`](src/services/seo/meta.ts) for page title, description, and OpenGraph tags.

### Environment Variables

| Variable         | Description    |
| ---------------- | -------------- |
| `VITE_APP_TITLE` | Page title     |
| `VITE_APP_URL`   | Production URL |

---

## 📱 Features

- ✅ Mobile-first responsive design
- ✅ Smooth Framer Motion animations
- ✅ SEO with OpenGraph support
- ✅ Accessible (semantic HTML, ARIA labels)
- ✅ Performance optimized (lazy loading, Tailwind purge)
- ✅ Type-safe environment variables
- ✅ Clean Atomic Design architecture

---

## 📄 License

[MIT](LICENSE)
