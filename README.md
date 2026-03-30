# Before You Go

A travel briefing web app. Enter any country and instantly get everything you need to know before your trip: local time, visa requirements, best months to visit, live exchange rates, safety, weather, useful phrases, customs, food, power plugs, and transport apps.

## Features

- **Local time and timezone** — live clock for the destination
- **Visa requirements** — enter your passport country and see instantly if a visa is needed, available on arrival, or requires an eVisa
- **Best months to visit** — AI-recommended travel months with seasonal indicators
- **Currency and exchange rate** — live USD conversion with an interactive calculator
- **Safety status** — risk level, summary, and practical tips
- **Weather and forecast** — current conditions and 5-day forecast
- **Official languages** — all spoken languages
- **Useful phrases** — 5 key phrases with local script and pronunciation
- **Customs and taboos** — what to do and avoid
- **Must-try dishes** — 5 local foods worth trying
- **Power and plug types** — voltage, frequency, and plug type illustrations
- **Transport apps** — popular rideshare, transit, and bike services

## Tech Stack

- **Framework** — Next.js (App Router)
- **Styling** — Tailwind CSS v4
- **Data sources**
  - [REST Countries](https://restcountries.com) — country metadata, timezone, currency
  - [OpenWeatherMap](https://openweathermap.org/api) — current weather and forecast
  - [Groq](https://groq.com) — AI content via Llama 3.3 70B (safety, phrases, customs, dishes, transport, best months, visa)
  - [Frankfurter](https://frankfurter.app) — live exchange rates, no key required
- **Validation** — Zod

## Getting Started

### Prerequisites

- Node.js 18+
- A free [OpenWeatherMap API key](https://openweathermap.org/api)
- A free [Groq API key](https://console.groq.com)

### Setup

```bash
git clone https://github.com/lessoff/Before-You-Go.git
cd Before-You-Go
npm install
```

Create a `.env.local` file in the project root:

```
OPENWEATHERMAP_API_KEY=your_key_here
GROQ_API_KEY=your_key_here
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
  app/
    api/
      briefing/   - Main data aggregation route
      visa/       - Visa requirement check route
    page.tsx      - Single-page client entry point
  components/
    sections/     - Full-width dark-theme section components (list view)
    cards/        - Light card components (grid view)
    ui/           - Shared primitives (Section, Card, SearchBar)
  hooks/
    useBriefing.ts
  lib/
    api/          - Data fetchers (restcountries, openweathermap, groq, exchangerate)
    schemas.ts    - Zod schemas for all API responses
    powerdata.ts  - Static plug/voltage lookup by ISO country code
```

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Deployment

The app is ready to deploy on [Vercel](https://vercel.com). Add `OPENWEATHERMAP_API_KEY` and `GROQ_API_KEY` as environment variables in the Vercel project settings.
