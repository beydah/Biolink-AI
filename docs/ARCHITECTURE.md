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
│  │  │  │  C_Error_Boundary        │    │    │   │
│  │  │  │  ┌──────────────────┐    │    │    │   │
│  │  │  │  │  F_Home_Page     │    │    │    │   │
│  │  │  │  └──────────────────┘    │    │    │   │
│  │  │  └──────────────────────────┘    │    │   │
│  │  └──────────────────────────────────┘    │   │
│  └──────────────────────────────────────────┘   │
│                                                  │
├──────────────────┬──────────────────────────────┤
│   Frontend Layer │       Services Layer          │
│                  │                               │
│  atoms/          │  config/                      │
│  molecules/      │    constants.ts               │
│  organisms/      │    profile.ts                 │
│  templates/      │    types.ts                   │
│  pages/          │  seo/                         │
│                  │    meta.ts, types.ts           │
│                  │  utils/                        │
│                  │    env.ts, logger.ts           │
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
pages → services (config, seo)
organisms → services (config)
```

No component imports from a higher level. No circular dependencies.

### Service-Based Monolith (Services Layer)

| Module    | Responsibility                            |
| --------- | ----------------------------------------- |
| `config/` | Profile data, app constants, shared types |
| `seo/`    | SEO metadata configuration                |
| `utils/`  | Environment validation, logging           |

---

## Data Flow

```
Profile Data (services/config/profile.ts)
    ↓
F_Home_Page (pages/)
    ↓
F_Hero_Section (organisms/)
    ├── F_Profile_Header (molecules/) → F_Avatar + F_Heading (atoms/)
    ├── F_Link_Button (molecules/) → F_Button (atoms/)
    └── F_QR_Code (atoms/)
```

All data is **static and compile-time**. No runtime API calls, no state management library needed.

---

## Error Handling Strategy

| Layer           | Mechanism                                                  |
| --------------- | ---------------------------------------------------------- |
| **Build-time**  | TypeScript strict mode catches type errors                 |
| **Runtime**     | `C_Error_Boundary` catches unhandled React errors          |
| **Logging**     | `F_Log` utility with structured levels (info, warn, error) |
| **Environment** | `F_Validate_Env` checks required variables before mount    |
