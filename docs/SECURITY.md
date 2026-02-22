# Security Policy

## Supported Versions

| Version | Supported |
| ------- | :-------: |
| 1.0.x   |     ✅     |

---

## Security Posture

Biolink AI is a **static frontend application** with no server-side logic. This significantly reduces the attack surface:

- **No API endpoints** — No server to exploit
- **No database** — No SQL injection or data breach risk
- **No authentication** — No credential storage
- **No file uploads** — No remote code execution risk
- **No cookies** — No session hijacking

### Implemented Security Measures

- `rel="noopener noreferrer"` on all external links
- Content Security Policy ready (`index.html`)
- Environment variables prefixed with `VITE_` (public by design)
- `.env` files excluded from version control via `.gitignore`
- Dependency audit via `npm audit` in CI/CD pipeline
- `C_Error_Boundary` prevents error details from leaking to UI

---

## Reporting a Vulnerability

If you discover a security vulnerability:

1. **Do NOT** open a public GitHub issue
2. Email: **info.beydahsaglam@gmail.com**
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### Response Timeline

| Action             | Timeline                |
| ------------------ | ----------------------- |
| Acknowledgment     | Within 48 hours         |
| Initial assessment | Within 5 business days  |
| Fix release        | Within 14 business days |

---

## Dependency Management

- Dependencies are locked via `package-lock.json`
- `npm audit` runs on every CI pipeline execution
- Peer dependency conflicts are documented in `.npmrc`
