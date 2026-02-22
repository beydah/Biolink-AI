# Architecture Overview

## System Type

**Frontend-only static site** — No backend, no database, no API server.

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────┐
│                    Browser                       │
├─────────────────────────────────────────────────┤
│                                                  │
│  ┌──────────────────────────────────────────┐   │
│  │              F_App (root)                 │   │
│  │  ┌──────────────────────────────────┐    │   │
│  │  │  HelmetProvider (SEO)            │    │   │
│  │  │  ┌──────────────────────────┐    │    │   │
│  │  │  │  ConfigProvider (Context)  │    │    │   │
│  │  │  │  ┌────────────────────┐    │    │    │   │
│  │  │  │  │  C_Error_Boundary  │    │    │    │   │
│  │  │  │  │  ┌──────────────┐  │    │    │    │   │
│  │  │  │  │  │ F_Home_Page  │  │    │    │    │   │
│  │  │  │  │  └──────────────┘  │    │    │    │   │
│  │  │  │  └────────────────────┘    │    │    │   │
│  │  │  └──────────────────────────┘    │    │   │
│  │  └──────────────────────────────────┘    │   │
│  └──────────────────────────────────────────┘   │
│                                                  │
├──────────────────┬──────────────────────────────┤
│   Frontend Layer │        Backend Layer          │
│                  │                               │
│  atoms/          │  config/                      │
│  molecules/      │    context.tsx                │
│  organisms/      │    types.ts                   │
│  templates/      │  utils/                       │
│  pages/          │    env.ts, logger.ts          │
└──────────────────┴──────────────────────────────┘
```

---

## Design Patterns

### Atomic Design (Frontend Layer)

| Level         | Purpose                | Example                             |
| ------------- | ---------------------- | ----------------------------------- |
| **Atoms**     | Smallest UI primitives | `F_Avatar`, `F_Button`, `F_Heading` |
| **Molecules** | Composed atom groups   | `F_Profile_Header`, `F_Link_Button` |
| **Organisms** | Feature-level sections | `F_Hero_Section`, `F_Footer`        |
| **Templates** | Page layout wrappers   | `F_Biolink_Layout`                  |
| **Pages**     | Route-level views      | `F_Home_Page`                       |

### Dependency Direction

```
pages → organisms → molecules → atoms
pages → backend (config, utils)
organisms → backend (config)
```

No component imports from a higher level. No circular dependencies.

### Unified Configuration (Backend Layer)

| Module    | Responsibility                  |
| --------- | ------------------------------- |
| `config/` | Config context, shared types    |
| `utils/`  | Environment validation, logging |

---

## Data Flow

```
public/data.json
    ↓ (fetched at runtime)
F_App (app.tsx)
    ↓ (provided via Context)
F_Home_Page (pages/)
    ↓
F_Hero_Section (organisms/)
    ├── F_Profile_Header (molecules/) → F_Avatar + F_Heading (atoms/)
    ├── F_Link_Button (molecules/) → F_Button (atoms/)
    └── F_QR_Code (atoms/) → Programmatic SVG
```

All data is **externalized to data.json** for easy modification without code changes.

---

## Error Handling Strategy

| Layer          | Mechanism                                                   |
| -------------- | ----------------------------------------------------------- |
| **Build-time** | TypeScript strict mode catches type errors                  |
| **Runtime**    | `C_Error_Boundary` catches unhandled React errors           |
| **Data**       | Loading/Error states in `F_Home_Page` handle fetch failures |
| **Logging**    | `F_Log` utility with structured levels (info, warn, error)  |
