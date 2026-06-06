<div align="center">

# 🤝 Contributing to Git Config Master Toolkit

> Thank you for your interest in contributing! Whether you're fixing a bug, adding Reactor questions, improving docs, or proposing a new feature — every contribution matters.

[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-10B981?style=for-the-badge)](https://github.com/TheOrionGD/GitConfigMaster-Toolkit/pulls)
[![License](https://img.shields.io/badge/License-MIT-22C55E?style=for-the-badge)](LICENSE)

</div>

---

## 📋 Table of Contents

- [Code of Conduct](#-code-of-conduct)
- [Getting Started](#-getting-started)
- [Development Setup](#-development-setup)
- [Branch Naming Conventions](#-branch-naming-conventions)
- [Commit Message Format](#-commit-message-format)
- [Contribution Guidelines](#-contribution-guidelines)
- [Adding Reactor Questions](#-adding-reactor-questions)
- [Pull Request Process](#-pull-request-process)
- [Reporting Bugs](#-reporting-bugs)
- [Suggesting Features](#-suggesting-features)
- [Repository Metadata (Forks)](#-github-cli-setup-for-repository-metadata)

---

## 🛡️ Code of Conduct

This project follows a simple standard: **be respectful, be constructive, be kind**. We welcome contributors of all experience levels. Harassment of any kind will not be tolerated.

---

## 🚀 Getting Started

**1. Fork the repository:**

Click the **Fork** button on the [GitHub repository page](https://github.com/TheOrionGD/GitConfigMaster-Toolkit), then clone your fork locally:

```bash
git clone https://github.com/YOUR_USERNAME/GitConfigMaster-Toolkit.git
cd GitConfigMaster-Toolkit
```

**2. Add the upstream remote** so you can keep your fork in sync:

```bash
git remote add upstream https://github.com/TheOrionGD/GitConfigMaster-Toolkit.git
```

**3. Create a feature branch:**

```bash
# Use descriptive branch names
git switch -c feature/add-rebase-questions
git switch -c fix/reactor-timer-cleanup
git switch -c docs/update-installation-guide
```

---

## 🛠️ Development Setup

### Prerequisites

| Requirement | Minimum Version | Recommended |
|-------------|----------------|-------------|
| **Node.js** | 18.0.0 | 20.x LTS |
| **npm** | 9.0.0 | 10.x |
| **Browser** | Chrome 90+ / Firefox 90+ / Safari 15+ | Chrome latest |
| **Git** | 2.28+ | Latest |

### Install & Run

```bash
# Install dependencies
npm install

# Start the development server (http://localhost:3000)
npm run dev

# Check for TypeScript errors
npm run lint
```

Hot Module Replacement (HMR) is enabled — changes to `.tsx`, `.ts`, and `.css` files reflect instantly without a full reload.

---

## 🌿 Branch Naming Conventions

| Prefix | Purpose | Example |
|--------|---------|---------|
| `feature/` | New features | `feature/add-reflog-questions` |
| `fix/` | Bug fixes | `fix/reactor-timer-memory-leak` |
| `docs/` | Documentation changes | `docs/update-deployment-guide` |
| `style/` | Visual / formatting changes | `style/landing-hero-spacing` |
| `refactor/` | Code restructuring | `refactor/extract-badge-logic` |
| `chore/` | Build config, dependencies | `chore/upgrade-vite-7` |

---

## ✍️ Commit Message Format

Follow the **Conventional Commits** specification:

```
type(scope): short description

[optional body]

[optional footer]
```

**Examples:**

```bash
git commit -m "feat(reactor): add 10 rebase-focused questions to quiz bank"
git commit -m "fix(audio): resolve AudioContext leak on component unmount"
git commit -m "docs(readme): add Docker deployment section"
git commit -m "style(landing): adjust hero title responsive breakpoints"
git commit -m "refactor(badges): centralize criteria evaluation logic"
git commit -m "chore(deps): upgrade @vitejs/plugin-react to 5.1.0"
```

**Commit Types:**

| Type | Usage |
|------|-------|
| `feat` | New feature or capability |
| `fix` | Bug fix |
| `docs` | Documentation changes only |
| `style` | Formatting, whitespace (no logic change) |
| `refactor` | Code restructuring without behavior change |
| `test` | Adding or updating tests |
| `chore` | Dependency updates, build config changes |

---

## 📐 Contribution Guidelines

### TypeScript

- **All new code must be fully typed.** No `any` types without documented justification in a comment.
- Run `npm run lint` before every commit. Zero TypeScript errors are required.

### Component Architecture

- **New UI features belong in separate files** under `components/`. Keep component files focused on a single responsibility.
- Avoid adding logic to `App.tsx` unless it's genuinely shared state across multiple modules.
- Follow the existing prop-passing pattern: `App.tsx` owns all state and exposes handler callbacks as props.

### Accessibility

- Use semantic HTML elements (`<button>`, `<nav>`, `<section>`, `<article>`, etc.)
- Interactive elements must have descriptive `aria-label` attributes where visual context is insufficient.
- Ensure keyboard navigability for all interactive components.

### Responsive Design

All UI additions must be tested at these three breakpoints:

| Breakpoint | Width | Tailwind Prefix |
|-----------|-------|-----------------|
| Mobile | 375px | (default) |
| Tablet | 768px | `md:` |
| Desktop | 1280px | `xl:` |

### Sound Integration

New user interactions should call `triggerSound()` with an appropriate type for tactile feedback:

```typescript
triggerSound('click');    // Button / navigation interactions
triggerSound('success');  // Positive outcomes, completions
triggerSound('error');    // Failed operations, empty states
triggerSound('levelup'); // Milestone achievements
```

### Documentation

Update the [README.md](README.md) for significant additions — especially new components, configuration options, or changed workflows.

---

## ❓ Adding Reactor Questions

The Conflict Reactor draws from a 30-question bank in `App.tsx`. To expand it, add entries to the `ALL_30_QUESTIONS` array:

```typescript
{
  q: "Your question text here — be specific and unambiguous.",
  opts: [
    "A) Correct answer option",
    "B) Plausible but incorrect option",
    "C) Common misconception option",
    "D) Another incorrect option"
  ],
  ans: 0  // Index of the correct answer (0 = option A)
}
```

**Question Quality Guidelines:**

- Questions must cover Git configuration or core workflow concepts directly
- All four options should be plausible — avoid obviously wrong answers that anyone could eliminate instantly
- The correct answer must be verifiable against [official Git documentation](https://git-scm.com/doc)
- Avoid questions requiring knowledge of third-party tools or platform-specific behaviour
- Preferred topics: scope priority rules, config file paths, `git config` commands, environment variable overrides, merge/conflict resolution

---

## 🔃 Pull Request Process

1. **Ensure your branch is up to date** with `upstream/main`:

   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run the full local verification suite:**

   ```bash
   npm install      # Ensure lockfile is consistent
   npm run lint     # Zero TypeScript errors required
   npm run dev      # Manually verify your changes
   ```

3. **Open a Pull Request** on GitHub targeting the `main` branch.

4. **Fill in the PR template** — describe the problem, your solution, and any testing you performed.

5. **Wait for review.** A maintainer will review the PR and either merge it, request changes, or close it with an explanation.

**PR Checklist:**

- [ ] TypeScript compiles with zero errors (`npm run lint`)
- [ ] Tested at mobile (375px), tablet (768px), and desktop (1280px)
- [ ] New features are documented (inline comments + README update if significant)
- [ ] Commits follow Conventional Commits format
- [ ] No sensitive data, API keys, or credentials are included

---

## 🐛 Reporting Bugs

Open a [GitHub Issue](https://github.com/TheOrionGD/GitConfigMaster-Toolkit/issues) with the following information:

```markdown
**Bug Description**
A clear and concise description of what the bug is.

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What you expected to happen.

**Actual Behavior**
What actually happened.

**Environment**
- Browser: [e.g. Chrome 124]
- OS: [e.g. Windows 11]
- Node version (if running locally): [e.g. v20.11.0]

**Screenshots / Console Output**
If applicable, add screenshots or paste console errors.
```

---

## 💡 Suggesting Features

Open a [GitHub Issue](https://github.com/TheOrionGD/GitConfigMaster-Toolkit/issues) with the label `enhancement`. Include:

- **Problem statement** — What friction does this solve for learners?
- **Proposed solution** — A concrete description of how it would work
- **Alternatives considered** — Other approaches you thought of
- **Scope** — Is this a small change (new question) or a large one (new module)?

---

## 🔧 GitHub CLI Setup for Repository Metadata

After forking and customizing, set your repository description and topics using the GitHub CLI:

```bash
# Install GitHub CLI if not already installed
# https://cli.github.com/

# Authenticate
gh auth login

# Set repository description
gh repo edit YOUR_USERNAME/GitConfigMaster-Toolkit \
  --description "Interactive gamified Git configuration learning toolkit — master scopes, precedence, pipelines & conflict resolution"

# Set repository topics
gh repo edit YOUR_USERNAME/GitConfigMaster-Toolkit \
  --add-topic "git" \
  --add-topic "git-configuration" \
  --add-topic "react" \
  --add-topic "typescript" \
  --add-topic "vite" \
  --add-topic "gamification" \
  --add-topic "interactive-learning" \
  --add-topic "developer-tools" \
  --add-topic "education" \
  --add-topic "git-tutorial" \
  --add-topic "web-audio-api" \
  --add-topic "dark-theme" \
  --add-topic "tailwindcss" \
  --add-topic "learning-platform"

# Verify changes
gh repo view YOUR_USERNAME/GitConfigMaster-Toolkit
```

---

<div align="center">

### Built with 💚 by the Orion-OS Platform Team

**Godfrey** · **Prithiviiraj**

*"The best way to learn Git is to feel it — not just read about it."*

</div>
