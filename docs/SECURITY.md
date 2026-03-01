# Security Protocol

Security is a primary concern for **Biolink-AI**. Since this platform utilizes advanced Third-Party APIs (Google Gemini) and interacts directly with users as a virtual persona, protecting API tokens and user data is critical.

## 🔴 Supported Versions

Security updates are only applied to the latest `main` branch deployed version.

| Version | Supported          |
| ------- | ------------------ |
| v1.0.x  | :white_check_mark: |
| < v1.0  | :x:                |

## 📝 Reporting a Vulnerability

If you discover any security vulnerabilities, please **do not create a public issue**.
Instead, report it immediately by sending a private email to the project maintainers or by utilizing the GitHub 'Report a Vulnerability' feature located under the "Security" tab of this repository.

Please provide:
1. A clear description of the vulnerability.
2. Steps required to reproduce.
3. (Optional) Suggested mitigation.

We strive to acknowledge all reports within 48 hours and resolve critical issues within 5 business days.

## 🔐 Environment Variables & API Keys

The most critical asset in this application is the **`VITE_GEMINI_API_KEY`**.

1. **NEVER** commit your `.env` or `.env.local` files to version control. These have been added to the `.gitignore` globally, but it remains the developer's responsibility to verify.
2. If an API key is ever accidentally leaked or committed, **rotate (revoke and regenerate) the key immediately** from your Google Cloud Console.

## 🗄️ Data Storage Safety

Biolink-AI actively implements a strict **5-question daily limit** logic.
- To prevent abuse without requiring user authentication, session state, chat history, and timestamp limitations are managed locally via **IndexedDB**.
- Because this relies on client-side constraints, it is inherently susceptible to local tampering. However, since the API requests are securely proxied/limited on the client, it satisfies our primary objective: casual abuse reduction without a heavyweight backend database (like PostgreSQL/Supabase).

*Always ensure security patches align with the strict coding structures outlined in `CONTRIBUTING.md`.*
