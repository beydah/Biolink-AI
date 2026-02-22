# Naming Conventions

This document defines the **mandatory** naming rules for the Biolink AI project. No deviation is allowed.

---

## File & Folder Naming

| Element      | Convention        | Example                      |
| ------------ | ----------------- | ---------------------------- |
| Source files | snake_case        | `hero_section.tsx`           |
| Folders      | snake_case        | `frontend/atoms/`            |
| User docs    | SNAKE_CASE        | `CONTRIBUTING.md`            |
| Config files | Framework default | `vite.config.ts` (exception) |

### Framework Exceptions

These files cannot be renamed due to tooling requirements:

`vite.config.ts`, `tsconfig.json`, `package.json`, `eslint.config.js`, `index.html`, `netlify.toml`, `package-lock.json`

---

## Code Naming

| Element                | Convention   | Example              |
| ---------------------- | ------------ | -------------------- |
| Functions (components) | F_Snake_Case | `F_Hero_Section`     |
| Classes                | C_Snake_Case | `C_Error_Boundary`   |
| Constants              | SNAKE_CASE   | `ANIMATION_DURATION` |
| Global variables       | Snake_Case   | `Root_Element`       |
| Local variables        | snake_case   | `prefers_reduced`    |
| Parameters             | p_snake_case | `p_variant`          |

---

## Region Rules

Every file must contain **5–10** region blocks. First region must be `HEADER`.

### Required Regions

```
HEADER        (always first)
LIBRARIES     (imports)
VARIABLES     (interfaces, local state)
CONSTANTS     (constant values)
FUNCTIONS     (business logic, components)
EXPORTS       (module exports)
```

### Optional Regions

```
CLASSES       (class definitions)
ROUTES        (route config)
MIDDLEWARE    (middleware logic)
UTILITIES     (helper functions)
```

### Syntax

```tsx
// #region HEADER
// Module: filename
// Brief description
// #endregion HEADER
```

For CSS files, use `/* #region NAME */` syntax.

---

## Comment Rules

| Rule                 | Violation                       |
| -------------------- | ------------------------------- |
| Single-line only     | ~~`/* multi-line */`~~ in JS/TS |
| English only         | ~~Comments in other languages~~ |
| Under regions only   | ~~`const x = 1 // inline`~~     |
| Under classes only   | Allowed                         |
| Under functions only | Allowed                         |
| No random comments   | ~~Comments between code lines~~ |

---

## Quick Reference

```tsx
// ✅ Correct
// #region FUNCTIONS
// Renders the avatar image with border styling
const F_Avatar: FC<AvatarProps> = ({ size: p_size = 'md' }) => {
  const is_loaded = true
  return <img />
}
// #endregion FUNCTIONS

// ❌ Wrong
const Avatar = ({ size }) => { // renders avatar
  const isLoaded = true
  return <img />
}
```
