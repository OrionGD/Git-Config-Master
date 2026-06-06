# 🔒 Security Policy

## Overview

Git Config Master Toolkit is a **fully client-side, zero-backend** learning application. It collects no user data, makes no outbound requests with user information, and has no authentication system. This significantly reduces its attack surface compared to conventional web applications.

---

## 🛡️ Supported Versions

| Version | Supported |
|---------|-----------|
| `1.x.x` (latest) | ✅ Active |
| `< 1.0.0` | ❌ Not supported |

---

## 🔐 Security Architecture

### Data Handling Policy

| Data Type | Stored Where | Persistence | Transmitted |
|-----------|-------------|-------------|-------------|
| Configuration values | `sessionStorage` | Tab session only | **Never** |
| XP / Level / Badges | `sessionStorage` | Tab session only | **Never** |
| Team member emails | React state | Tab session only | **Never** |
| Quiz answers | React state | Not persisted | **Never** |
| Any personal data | — | — | **Never** |

### Security Practices Applied

**1. No External Data Transmission**
The application makes zero outbound HTTP requests with user data. External requests are limited to CDN resource loading (TailwindCSS, Google Fonts, React ESM modules) at initial page load — all via HTTPS.

**2. `sessionStorage` Isolation**
All application state is scoped to `sessionStorage`, which is isolated per-tab and per-origin. It cannot be accessed by other tabs, other domains, or browser extensions without elevated permissions. Data is automatically cleared when the tab or browser window is closed.

**3. No Authentication Surface**
There are no login forms, passwords, tokens, or authentication flows. This eliminates the largest class of web application vulnerabilities — credential theft, session hijacking, and CSRF.

**4. Input Validation**
The Registry Editor validates configuration key input before storing. Empty or malformed keys are rejected:

```typescript
const handleUpdateConfig = (key: string, val: string) => {
  if (!key.trim()) return; // Reject empty keys
  setConfigs(prev => ({ ...prev, [key]: val }));
};
```

**5. Minimal Dependency Footprint**
The project uses a small, well-maintained dependency tree:
- `react` + `react-dom`
- `vite` + `@vitejs/plugin-react`
- `typescript`
- `@types/node`

No runtime dependencies beyond React are included in the production bundle.

**6. No `dangerouslySetInnerHTML`**
Zero instances of `dangerouslySetInnerHTML` exist in the codebase. All user-provided values are stored in React state and rendered as text content, eliminating XSS via React rendering.

**7. Environment Variable Safety**
The `.env.local` file is listed in `.gitignore` and must never be committed. The current application version does not require API keys. The `GEMINI_API_KEY` variable slot is reserved for a future AI feature and is non-functional in v1.0.

---

## 🚨 Reporting a Vulnerability

If you discover a security vulnerability in Git Config Master Toolkit, please report it responsibly.

### How to Report

**Do NOT open a public GitHub Issue for security vulnerabilities.**

Instead, report privately via one of these channels:

1. **GitHub Security Advisory** (preferred):
   - Go to the [repository Security tab](https://github.com/TheOrionGD/GitConfigMaster-Toolkit/security)
   - Click **"Report a vulnerability"**
   - Fill in the advisory form with details

2. **Direct email**:
   - Contact the maintainers at `security@orion-os.org`
   - Use the subject line: `[SECURITY] GitConfigMaster-Toolkit — <brief description>`

### What to Include

Please provide as much of the following as possible:

```
**Vulnerability Type**
e.g. XSS, CSRF, dependency with known CVE, data exposure

**Affected Component**
e.g. RegistryEditorView.tsx, sessionStorage handling, dependency X

**Steps to Reproduce**
1. ...
2. ...

**Impact Assessment**
What could an attacker achieve with this vulnerability?

**Suggested Fix** (optional)
Your proposed remediation, if any.

**Environment**
Browser version, OS, Node.js version (if local build)
```

### Response Timeline

| Stage | Target Timeframe |
|-------|----------------|
| Initial acknowledgement | Within 48 hours |
| Preliminary assessment | Within 5 business days |
| Fix or mitigation | Within 30 days (severity dependent) |
| Public disclosure | After fix is released |

---

## 🔍 Dependency Auditing

To check for known vulnerabilities in project dependencies, run:

```bash
npm audit
```

To automatically apply non-breaking security fixes:

```bash
npm audit fix
```

For breaking fixes, review the changes before applying:

```bash
npm audit fix --dry-run
```

We recommend running `npm audit` periodically and whenever updating dependencies.

---

## 📋 Known Limitations

The following are known design constraints, not vulnerabilities:

| Limitation | Notes |
|-----------|-------|
| TailwindCSS loaded from CDN | Integrity hash not pinned; mitigated by HTTPS and browser SRI (add `integrity=` attr if deploying in high-security environments) |
| React loaded from ESM.sh CDN | Same as above |
| No CSP header configured | Application is served as static files; configure CSP at the hosting/CDN layer (Vercel, Netlify, Cloudflare) |
| `sessionStorage` accessible via DevTools | By design — not a vulnerability; users can inspect their own session data |

---

## 🙏 Responsible Disclosure

We commit to:
- Acknowledging all valid reports promptly
- Not taking legal action against researchers who follow responsible disclosure
- Crediting reporters in release notes (with permission)
- Fixing confirmed vulnerabilities as quickly as possible

Thank you for helping keep Git Config Master Toolkit secure. 💚

---

<div align="center">

**Godfrey & Prithiviiraj** — Orion-OS Platform Team

</div>
