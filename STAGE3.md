# Stage 3 — AI connectivity and conversation backup

## New capabilities
- Optional server-side OpenAI chat API. Never put the API key in VITE_ variables or frontend source.
- Local demo mode remains the default; no AI API key required.
- Full conversation JSON backup and validated restore (up to 5 MB).
- Corrected chat subscription to avoid unstable Zustand selector patterns.
- Chat stop cancels in-flight network requests.

## Run
1. `npm install`
2. `npm run dev` (demo mode)
3. For live mode create `.env.local` containing `VITE_AI_MODE=live`, restart Vite.
4. In a separate terminal set `OPENAI_API_KEY` as an environment variable and run `npm run api`.
5. Optionally configure `OPENAI_MODEL` and `FRONTEND_ORIGIN` for the API process.

## Security caveats
The server is a local development reference, not a production-ready public endpoint. Before deploying, add server-side authentication, per-user quotas, rate limiting, audit logging without message contents, and production-grade origin / CSRF controls. LocalStorage conversations are not encrypted. Attachments are UI previews only and are not transmitted to AI.
