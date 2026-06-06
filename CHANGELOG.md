# 📋 Changelog

All notable changes to **Git Config Master Toolkit** are documented in this file.

This project adheres to [Semantic Versioning](https://semver.org/) and the [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format.

---

## [Unreleased]

> Changes staged for the next release. See [Future Vision](README.md#-future-vision) in the README for the planned roadmap.

### Planned
- Multi-player Arena Mode — real-time competitive quiz sessions
- AI Config Advisor — natural language `git config` queries via Gemini integration
- Git Graph Visualizer — DAG renderer showing live branch history
- Extended Reactor bank — 30 → 100+ questions covering reflog, bisect, worktrees
- VS Code Extension — embedded learning modules inside the developer's editor
- Backend Leaderboard — persistent global rankings with authenticated user profiles

---

## [1.0.0] — 2026-06-06

### 🎉 Initial Release — Git Biosphere v1

First public release of the Git Config Master Toolkit — a fully client-side, gamified learning environment for mastering Git configuration scopes, command precedence, staging pipelines, and conflict resolution.

### Added

#### Core Application Shell
- `App.tsx` root orchestrator with complete state machine (XP, levels, badges, pipeline, reactor, team)
- `sessionStorage` synchronization for full learning state persistence across page refreshes
- `handleLogout()` with complete `sessionStorage.clear()` and state reset
- Web Audio API synthesizer integration via `audio.ts` (5 distinct sound profiles: click, success, levelup, error, reactor)

#### UI Modules (14 Components)
- **`LandingPage.tsx`** — Cinematic mission briefing with live simulated telemetry (operators online, latency, arena zone), animated console widget, campaign tracks grid, leaderboard, and level progression roadmap
- **`GlossaryView.tsx`** — Dual-panel interactive terminal with holographic command visualizations and 80+ command database across 15 categories
- **`CheatsheetView.tsx`** — Compact, printable quick-reference command grid with copy-to-clipboard
- **`ScopesView.tsx`** — Configuration scope hierarchy visualizer with draggable pointer-event priority wheel
- **`CampaignsView.tsx`** — Five structured learning missions with live state-driven step verification and XP rewards
- **`BadgesView.tsx`** — Six achievement credential seals with live criteria diagnostics and one-click claim verification
- **`ReactorView.tsx`** — Timed conflict resolution quiz engine; 30-question randomized bank, temperature mechanics, 45-second countdown
- **`RegistryEditorView.tsx`** — Live `git config` command simulator with scope-aware key/value management
- **`TeamWorkspaceView.tsx`** — Multi-seat team workspace with Admin / Developer / Security roles and activity kiosk feed
- **`DiagnosticsView.tsx`** — Real-time system health HUD (CPU, memory, audio engine, SSL)
- **`SandboxPipeline.tsx`** — Animated four-stage Git workflow: Working Directory → Staging Index → Local Commits → Remote Commits
- **`DigitalCanopy.tsx`** — Ambient background organism representing the Git repository tree
- **`CertificateCard.tsx`** — Print-ready academy completion certificate generated on mission mastery

#### Gamification System
- XP award schedule: `git add` (+30), `git commit` (+50), `git push` (+80), badge unlock (+60), Reactor victory (+250)
- Five progression levels: Beginner → Intermediate → Advanced → Professional → Repository Master
- Six achievement badges: arborist, oxygenizer, carbon, canopy, precedence, reactor
- Live criteria checker — badges become claimable the instant conditions are met

#### Git Configuration Reference
- Full scope hierarchy (system → global → local → env vars → CLI `-c` flag)
- 10+ documented core configuration keys with example values
- Interactive precedence diagram (rendered as Mermaid in README)

#### Design System
- Emerald Green (`#10b981`) primary accent; amber warning; red error; cyan SSL
- Custom CSS design tokens via `index.css` mapped through TailwindCSS `extend` config
- Google Fonts: Inter (body) + Fira Code (monospace terminal)
- Six animation classes: `animate-fadeIn`, `animate-pulse-slow`, shake, bounce, spin, ping

#### Developer Experience
- Vite 6.2.0 build tooling with HMR on port 3000 (LAN-accessible via `host: '0.0.0.0'`)
- TypeScript 5.8.2 strict mode — zero `any` types, full interface contracts in `types.ts`
- TailwindCSS via CDN with console-warning suppression script wrapper
- Path alias `@` → project root for clean imports

### Security
- Zero external API calls with user data — fully self-contained
- `sessionStorage` only (never `localStorage`) — data cleared on tab close
- No authentication surface — eliminates credential theft, CSRF, session hijacking vectors
- No `dangerouslySetInnerHTML` usage anywhere in the codebase
- Input validation on Registry Editor — empty keys rejected before state update

---

## Version History Summary

| Version | Date | Milestone |
|---------|------|-----------|
| `1.0.0` | 2026-06-06 | Initial public release — 14 components, 6 badges, 5 missions, Reactor game |

---

[Unreleased]: https://github.com/TheOrionGD/GitConfigMaster-Toolkit/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/TheOrionGD/GitConfigMaster-Toolkit/releases/tag/v1.0.0
