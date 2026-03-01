---
trigger: always_on
---

# Biolink Project Rules & Standards

You are an expert AI specializing in React, Vite, Tailwind CSS (shadcn/ui), Netlify, and GitHub. This document serves as the project's foundation and must be followed strictly.

## 1. Project Overview & Architecture
Biolink is a persona-driven AI chatbot and link management platform (Linktree-style).

### Architecture
- **UI Components**: Follow **Atomic Design** principles. Place them in `src/components/ui/` within subfolders: `atoms/`, `molecules/`, and `organisms/`.
- **Functional Components**: Follow **Feature-based** architecture. Place them in `src/features/`.
- **Services**: All API and persistence logic (Gemini, IndexedDB) must be in `src/services/`.

## 2. Naming Conventions (Strict)
- `snake_case`: Folders, files, and local variables (e.g., `user_card.tsx`, `const my_var = 1`).
- `Snake_Case`: Global variables.
- `SNAKE_CASE`: Global constants and public documentation files (e.g., `README.md`, `const MAX_LIMIT = 5`).
- `F_Snake_Case`: Functions (e.g., `const F_Get_User_Data = () => {}`).
- `C_Snake_Case`: Classes (e.g., `class C_Db_Manager {}`).
- `p_snake_case`: Function parameters (e.g., `function F_Set_Name(p_user_name: string) {}`).

## 3. Coding Standards
- **Clean Code**: Prioritize readability, modularity, and DRY principles.
- **Regions**: Every code file MUST have between 1 and 5 global `#region` markers (or equivalent comments) to organize code (e.g., `// #region library`, `// #region functions`).
- **Language**: All code, variable names, and comments MUST be in **English**.
- **Comments**: 
  - NO comments in the middle of code blocks.
  - Comments are ONLY allowed on the line immediately following a region definition OR as the first line inside a function body.
- **State Management**: Use **IndexedDB** for persistent state (chat history, daily limits, dark mode).

## 4. UI/UX & Design
- **Mobile-First**: Design primarily for mobile, then scale to Tablet/Desktop.
- **Visuals**: Dark Mode support is mandatory and stored in IndexedDB.
- **Animations**: Use **Framer Motion** for all transitions, especially the "card flip" and chat opening.
- **Typography**: Focus on the most readable digital fonts and sizes.

## 5. Metadata & Data Handling
- **Data Sources**: Priority: `.env` (API Keys, Personas) > `data.json` (Links, Bio) > `data/` (Assets).
- **AI Persona**: Gemini API responses must be filtered and limited to the persona defined in `.env`.
- **Daily Limit**: Enforce a strict 5-question limit per day using IndexedDB for tracking and countdowns.

## 6. Documentation & Maintenance
- All core documentation resides in `docs/`: `README.md`, `CONTRIBUTING.md`, `SECURITY.md`, `LICENSE.md`.
- After every significant update, ensure these files are updated to reflect the current status.
