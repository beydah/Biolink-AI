# Contributing to Biolink-AI

Welcome to the **Biolink-AI** project! We are building a high-end, intelligent link management platform.
Because of our focus on enterprise scalability and maintainability, we adhere to **strict coding and naming standards**. Please carefully review this document before submitting any Pull Requests.

---

## 🛠️ Pull Request Workflow

1. **Fork the Repository**: Create your own fork and clone it locally.
2. **Branching**: Create a branch specific to your feature or fix (e.g., `feature/add-dark-mode` or `fix/header-alignment`).
3. **Commit Messages**: Write clear, descriptive commit messages.
4. **Push**: Push to your fork and submit a PR to the `main` branch.
5. **Review**: Ensure your code passes all local linting (`npm run lint`) and that you have strictly followed the rules below.

---

## 📏 1. Strict Naming Conventions

All files, folders, and variables must follow the specified conventions. The system uses a strict casing methodology to identify the purpose of a symbol instantly.

| Element Type             | Format         | Example(s)                                    |
| ------------------------ | -------------- | --------------------------------------------- |
| **Folders & Files**      | `snake_case`   | `user_card.tsx`, `ai_chat.tsx`, `index.css`   |
| **Local Variables**      | `snake_case`   | `const my_var = 1`, `let is_loading = false`  |
| **Global Variables**     | `Snake_Case`   | `const Default_Theme = "dark"`                |
| **Global Constants**     | `SNAKE_CASE`   | `const MAX_DAILY_LIMIT = 5`                   |
| **Public Documentation** | `SNAKE_CASE`   | `README.md`, `CONTRIBUTING.md`, `SECURITY.md` |
| **Methods / Functions**  | `F_Snake_Case` | `const F_Get_User_Data = () => {}`            |
| **Classes**              | `C_Snake_Case` | `class C_Db_Manager {}`                       |
| **Function Parameters**  | `p_snake_case` | `function F_Set_Name(p_user_name: string) {}` |

---

## 🏗️ 2. Architectural Structure

Biolink-AI leverages **Feature-based architecture** and **Atomic Design** principles.

1. **UI Components (`src/components/ui/`)**: Everything must be categorized atomically.
   - `/atoms`: Typography, Buttons, Icons, standard Inputs.
   - `/molecules`: Form groups, complex cards, isolated widgets.
   - `/organisms`: Complete sidebars, headers, large functional blocks.

2. **Features (`src/features/`)**: High-level, stateful domains. E.g., the Gemini AI chat interface logic must be built in `src/features/ai_chat/`. No business logic mixed directly into page roots.

3. **Services (`src/services/`)**: API integrations or persistence layers. This is explicitly where the `Gemini API` hooks and `IndexedDB` managers live.

---

## ✍️ 3. Coding & Formatting Standards

- **Language**: English only. Code structure, variable names, and comments *must* be in English.
- **Regions (`#region`)**: Every code file **must** be broken down logically using `#region` blocks (e.g., `// #region library`, `// #region global variable`, `// #region functions`). You must have between **1 and 5** regions per file.
- **Strict Comment Location**:
  - Do **not** place comments in the middle of code blocks.
  - Comments are allowed **only**:
    1. Immediately on the line following a `#region` definition.
    2. As the very first line inside a function body.
- **State Management**: IndexedDB is our persistence engine. Do not arbitrarily introduce Redux or Zustand. The daily AI chat limits, dark mode state, and chat history must utilize the existing IndexedDB service files.
- **Styling**: `Tailwind CSS` combined with `lucide-react` for iconography. Ensure modern, high-end aesthetics (e.g., use sleek dark modes, gradients). Use `Framer Motion` for animations.

Thank you for contributing to Biolink-AI!
