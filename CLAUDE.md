# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run lint     # ESLint via next lint
```

No test suite is configured.

## Environment Variables

Required in `.env.local`:
```
GEMINI_API_KEY=...
OPENWEATHERMAP_API_KEY=...
```

`frankfurter.app` (exchange rates) requires no key — it's called directly from the API route.

## Architecture

Single-page app: user types a country → `useBriefing` hook calls `/api/briefing` → response renders as a vertical list of sections.

**Data flow:**
1. `src/app/page.tsx` — client component, owns search + display state via `useBriefing`
2. `src/hooks/useBriefing.ts` — fetches `/api/briefing?country=...`, holds `data | loading | error`
3. `src/app/api/briefing/route.ts` — the only API route. Fans out to three sources in parallel:
   - **REST Countries** (`src/lib/api/restcountries.ts`) — country metadata, timezone, currency
   - **OpenWeatherMap** (`src/lib/api/openweathermap.ts`) — current weather + 5-day forecast
   - **Google Gemini** (`src/lib/api/gemini.ts`) — safety, phrases, customs, dishes, transport, bestMonths
   - **Frankfurter** (`src/lib/api/exchangerate.ts`) — USD → destination currency rate (fetched in the same parallel batch)
   - **Power data** (`src/lib/powerdata.ts`) — static lookup by ISO country code (cca2)
4. Response is shaped into `BriefingResponse` (Zod-validated in `src/lib/schemas.ts`) and returned as JSON
5. `src/components/BriefingList.tsx` — renders one `*Section` component per data category in order

**Schema contract:** `src/lib/schemas.ts` defines both `geminiResponseSchema` (what Gemini must return) and `briefingResponseSchema` (what the API returns to the client). When adding a new Gemini field, update both schemas and the prompt in `gemini.ts`.

**Two UI modes:** `BriefingList` (dark card list, used on the main page) and `BriefingGrid` (light card grid). Both exist and must be kept in sync when adding new sections. Each section has a matching `src/components/sections/*Section.tsx` and `src/components/cards/*Card.tsx`.

**Nullable fields:** Most AI-sourced and weather fields are `.nullable()` in the schema. Components must guard against null before rendering (pattern: `{data.field && <Section ... />}`).

**`"use client"` boundary:** Sections with interactivity (live clock, exchange rate calculator) are client components. The `Section` and `Card` wrapper UI primitives are server-safe.
