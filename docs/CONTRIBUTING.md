# Contributing to Biolink AI

Thank you for your interest in contributing! This guide will help you get started.

---

## Getting Started

### 1. Fork & Clone

```bash
git clone https://github.com/<your-username>/Biolink-AI.git
cd Biolink-AI
npm install
```

### 2. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

### 3. Develop

```bash
npm run dev
```

---

## Code Standards

### Naming Conventions

All code must follow the project's strict naming rules. See [NAMING_CONVENTIONS.md](./NAMING_CONVENTIONS.md) for the full reference.

| Element         | Convention   | Example              |
| --------------- | ------------ | -------------------- |
| Files           | snake_case   | `hero_section.tsx`   |
| Functions       | F_Snake_Case | `F_Hero_Section`     |
| Classes         | C_Snake_Case | `C_Error_Boundary`   |
| Constants       | SNAKE_CASE   | `ANIMATION_DURATION` |
| Parameters      | p_snake_case | `p_variant`          |
| Local variables | snake_case   | `prefers_reduced`    |

### Region Comments

Every file must contain 5–10 `#region` blocks. The first region must always be `HEADER`.

```tsx
// #region HEADER
// #region LIBRARIES
// #region VARIABLES
// #region FUNCTIONS
// #region EXPORTS
```

### Comment Rules

- Single-line comments only
- English only
- Allowed only under: regions, classes, or functions
- No inline comments, no multi-line comments

---

## Pull Request Process

1. Ensure your code follows all naming conventions
2. Ensure every file has 5+ region blocks
3. Run lint and build before submitting:

```bash
npm run lint
npm run build
```

4. Open a pull request against `main`
5. Provide a clear description of your changes
6. Link any related issues

---

## Reporting Issues

Use [GitHub Issues](https://github.com/beydah/Biolink-AI/issues) with:

- Clear title and description
- Steps to reproduce (if applicable)
- Expected vs actual behavior
- Browser/OS information
