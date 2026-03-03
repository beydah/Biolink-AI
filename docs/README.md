<div align="center">

# ⚡ Biolink-AI

<p align="center">
  <strong>A high-end, persona-driven AI chatbot and link management platform.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Gemini_API-8E75B2?style=for-the-badge&logo=googlebard&logoColor=white" alt="Gemini API" />
</p>

</div>

---

## 📖 Overview

**Biolink-AI** is a modern, performance-oriented bio-link application (similar to Linktree) but upgraded with a highly interactive, context-aware AI chatbot. Powered by Google's Gemini API, the platform allows users to deploy a digital representation of themselves that can answer questions, recount professional experiences, and engage visitors intelligently—all wrapped in a premium UI featuring glassmorphism and Framer Motion animations.

## ✨ Core Features

- **🧠 Persona-Driven AI**: The chatbot adopts strictly defined behavior, context, and tone from a centralized `persona.md` document, ensuring an accurate digital representation of the user.
- **📱 Mobile-First Design**: Smooth, app-like "card flip" overlays on mobile devices, transitioning to a split-pane "side-by-side" interactive layout on desktop screens.
- **🛡️ Rate-Limited Interactions**: Actively manages client-side API abuse by limiting each visitor to exactly **5 questions per day**, securely tracked via IndexedDB state mechanisms.
- **🌙 Dark Theme Aesthetics**: High-end UI consisting of deep blacks (`#050505`), custom scrollbars, gradient glows, and reactive atomic components leveraging Tailwind CSS.

## 🏗️ Architecture Stack

### Project Structure
The project follows a clean, flat architecture with clear separation of concerns.

```
src/
├── app.tsx              # Root application component
├── main.tsx             # Entry point
├── index.css            # Global styles & Tailwind directives
├── app.css              # App-specific styles
├── components/          # Reusable UI components
│   ├── button.tsx       # Atomic Button component
│   └── typography.tsx   # Heading/typography component
└── services/            # Business logic, API & persistence
    ├── ai_chat.tsx      # Gemini-powered AI chat interface
    ├── card_container.tsx # Card flip animation wrapper
    ├── gemini_api_service.ts  # Gemini API proxy calls
    └── indexed_db_service.ts  # IndexedDB persistence layer
```

* `src/components/` — Reusable, stateless UI building blocks (buttons, typography).
* `src/services/` — All business logic, AI chat interface, API integrations, and IndexedDB persistence.

### Database & Persistence
- **Client-Side Storage**: IndexedDB is exclusively used for session resilience. It retains the daily chat history and the timeout countdowns for the API limits.
- **Local JSON Storage**: Quick, file-based configuration (`data.json`) loads the user's links, full name, position, and metadata instantly.

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.x or newer recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/biolink-ai.git
   cd biolink-ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment:**
   Duplicate the `.env.example` file to create a local `.env` and insert your API key:
   ```bash
   cp .env.example .env
   ```
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Customize Content:**
   - Add your data links to `public/data.json`.
   - Update the AI's identity instruction set in `public/persona.md`.
   - Place your profile picture at `public/avatar.jpg`.

5. **Run the Development Server:**
   ```bash
   npm run dev
   ```

6. **Build for Production:**
   ```bash
   npm run build
   ```

---

<p align="center">
  <br />
  See <strong><a href="./docs/CONTRIBUTING.md">CONTRIBUTING.md</a></strong> for our enterprise code standard guidelines and <a href="./docs/SECURITY.md">SECURITY.md</a> for vulnerability & environment configuration.
</p>
