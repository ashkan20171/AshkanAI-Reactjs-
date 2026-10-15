# Ashkan AI — React Chat Workspace

A bilingual (Persian RTL / English LTR) AI-chat interface built with React, Vite, Material UI, Zustand and i18next.

> **Demo application:** Replies are generated locally by a mock responder. There is no real AI backend, account authentication server, payment processing or file analysis. Never enter sensitive information into the demo.

## Run locally

Requirements: Node.js 20+ and npm.

```bash
npm ci
npm run dev
```

Production build: `npm run build` and `npm run preview`.

## Improvements in this edition

- Removed duplicated legacy source trees, `.git` history and `node_modules` from the distribution.
- Fixed unstable Zustand selector returning a new object on each render in `App.jsx`.
- Replaced static chat placeholder with language-aware contextual mock answers.
- Added visible demo disclosure and updated regeneration behavior.

## Production roadmap

Implement a server-side AI proxy with authentication, per-user rate limiting, secrets stored only on the server, streaming cancellation, secure file handling, persistence, tests and accessibility checks before production deployment.

## Stack
React 18 · Vite 5 · Material UI 5 · Zustand · i18next

## Security
LocalStorage chat data is not encrypted. Do not use real customer data in this demonstration.

## Stage 2 — UI and reliability
- Stable language direction derived from reactive state (no function selector in Zustand).
- Responsive demo badge, updated violet/teal color palette and keyboard focus indicators.
- Client-side mobile navigation (no full page refresh).
- Demo-only attachment labels and reactive bilingual demo disclaimer.
- Reduced-motion support and consolidated global CSS.

**Important:** Chat replies remain simulated. Uploaded attachments are metadata-only and are not sent to a model. Authentication and pricing are demonstration features; do not use this build as a production service.
