# Free IQ Test (ICAR-based)

A Next.js (App Router) website modeled on your `sleep-test.org` stack, with MongoDB for results,
multilingual UI, and Vercel deployment.

## Quick start

```bash
npm i
npm run dev
```

## Configure

1. Copy `.env.example` to `.env.local` and set:
   - `MONGODB_URI` – your MongoDB Atlas connection string
   - `MONGODB_DB=iq_test`
   - `APP_URL` – your Vercel URL

2. Locales live in `public/i18n/*.json`.

## Data model

- **Attempt**: `{ _id, createdAt, locale, answers: { [itemId]: choiceId }, raw, iq }`

See API routes in `app/api/submit/route.ts` and `app/api/result/[id]/route.ts`.

## ICAR items

This repo includes a scaffold at `data/icar16.ts`. Replace placeholders with real ICAR
public‑domain items. See `LICENSES/ICAR_NOTICE.md`.

## Deploy

- Create a new GitHub repo and push this folder.
- Import the repo in Vercel → set the three env vars (`MONGODB_URI`, `MONGODB_DB`, `APP_URL`).
- Connect a MongoDB Atlas project (recommended region: EU North).
