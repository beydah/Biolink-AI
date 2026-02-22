# Biolink AI

[![Build](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/beydah/Biolink-AI)
[![Version](https://img.shields.io/badge/version-1.0.0-blue)](https://github.com/beydah/Biolink-AI)
[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D20-339933)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6)](https://www.typescriptlang.org/)

> A modern, performant personal biolink page built with React 19, Vite 7, TypeScript, and Tailwind CSS v4.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [Documentation](#documentation)
- [License](#license)

---

## Features

- **Atomic Design** — UI built with atoms, molecules, organisms, templates, and pages
- **Enterprise Naming** — F_Snake_Case functions, C_Snake_Case classes, p_snake_case parameters
- **Region Comments** — Every file has 5+ structured `#region` blocks
- **SEO Optimized** — Dynamic meta tags via react-helmet-async, OpenGraph support
- **Accessible** — ARIA labels, `prefers-reduced-motion` support
- **Error Resilient** — Global `C_Error_Boundary` catches runtime errors
- **Environment Validated** — Runtime `.env` validation before app mounts
- **CI/CD Ready** — GitHub Actions pipeline for lint, type-check, and build

---

## Tech Stack

| Layer         | Technology               |
| ------------- | ------------------------ |
| **Framework** | React 19                 |
| **Build**     | Vite 7                   |
| **Language**  | TypeScript (strict mode) |
| **Styling**   | Tailwind CSS v4          |
| **Animation** | Framer Motion            |
| **SEO**       | react-helmet-async       |
| **CI/CD**     | GitHub Actions           |
| **Hosting**   | Netlify                  |

---

## Quick Start

### Prerequisites

- Node.js ≥ 20
- npm ≥ 10

### Installation

```bash
git clone https://github.com/beydah/Biolink-AI.git
cd Biolink-AI
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Folder Structure

```
biolink-ai/
├── public/                     Static files (avatar, icon, data.json)
├── src/
│   ├── frontend/               UI layer (Atomic Design)
│   │   ├── atoms/              Pure UI primitives
│   │   ├── molecules/          Composed atom groups
│   │   ├── organisms/          Feature-level sections
│   │   ├── templates/          Page layout wrappers
│   │   └── pages/              Route-level views
│   ├── backend/                Logic & Config layer
│   │   ├── config/             Context, types
│   │   └── utils/              Env validation, logger
│   ├── app.tsx                 Root component (fetches data.json)
│   ├── main.tsx                Entry point
│   ├── index.css               Design tokens
│   └── vite_env.d.ts           Env type declarations
├── docs/                       Project documentation
├── .github/workflows/          CI/CD pipeline
└── [config files]              tsconfig, vite, eslint, etc.
```

---

## Environment Variables

Create `.env.development` and `.env.production` in the project root:

```env
VITE_APP_URL=http://localhost:5173
```

For production, set `VITE_APP_URL` to your deployed URL (e.g., `https://biolink-ai.netlify.app`).

All environment variables are **validated at runtime** before the app mounts. Missing required variables will log a warning.

---

## Scripts

| Command           | Description                   |
| ----------------- | ----------------------------- |
| `npm run dev`     | Start dev server              |
| `npm run build`   | Type-check + production build |
| `npm run preview` | Preview production build      |
| `npm run lint`    | Run ESLint                    |

---

## Deployment

### Netlify (Recommended)

1. Connect your GitHub repository to Netlify
2. Build settings are auto-detected from `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node version:** 20
3. Set `VITE_APP_URL` in Netlify environment variables

For detailed instructions, see [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

---

## Documentation

| Document                                            | Description                             |
| --------------------------------------------------- | --------------------------------------- |
| [ARCHITECTURE.md](docs/ARCHITECTURE.md)             | System architecture and design patterns |
| [DEPLOYMENT.md](docs/DEPLOYMENT.md)                 | Deployment and environment setup guide  |
| [NAMING_CONVENTIONS.md](docs/NAMING_CONVENTIONS.md) | Naming rules reference                  |
| [CONTRIBUTING.md](docs/CONTRIBUTING.md)             | Contribution workflow                   |
| [SECURITY.md](docs/SECURITY.md)                     | Security policy                         |

---

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.
