<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/1d75dccf-28f1-4ae2-bbb8-ce12e803a827

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Set the `MISTRAL_API_KEY` in [.env.local](.env.local) to your Mistral API key (Mistral Small 3.2 via `mistral-small-2603`, hosted at https://api.mistral.ai)
   (the server also loads a plain `.env` file as a fallback)
3. Run the app:
   `npm run dev`
4. Open http://localhost:3000

## Build & Host

This app ships a tiny Express server (`server.ts`) that serves both the API and
the built frontend, so it works on Node servers like Cloud Run, Render, Railway,
or Fly.io.

1. Build the frontend + bundle the server:
   `npm run build`
2. Start the production server (serves `dist/` and honors the `PORT` env var):
   `npm start`

> Tip: If your host runs a static-only pipeline (`vite build` by itself), don't
> worry — the `sparkle_db.json` seed file used by the client fallback is checked
> into the repo.

## Demo / Sandbox Mode

The Login screen includes a **"Continue in Demo Mode"** button that works on any
host, even when Supabase Auth hasn't been enabled for your domain yet. Demo
progress is stored in the browser's `localStorage`. To use real accounts,
configure Supabase and add your hosting domain to the authorized list.

## Regenerating the seed snapshot

The client fallback reads content from `sparkle_db.json`. If you edit the seed
data in `src/server/db.ts`, regenerate the snapshot with:

`npm run db:generate`

(This also runs automatically when you `npm run dev`.)
