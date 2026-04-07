import { NextRequest, NextResponse } from "next/server";
import { fetchCountryData } from "@/lib/api/restcountries";
import { fetchWeather } from "@/lib/api/openmeteo";
import { fetchAIContent } from "@/lib/api/gemini";
import { fetchExchangeRate } from "@/lib/api/exchangerate";
import { fetchPublicHolidays } from "@/lib/api/holidays";
import { getPowerInfo } from "@/lib/powerdata";
import { rateLimit, getIP } from "@/lib/ratelimit";
import type { BriefingResponse } from "@/lib/types";

// 10 requests per minute per IP — hits 4 external APIs including Groq
const LIMIT = 10;
const WINDOW_MS = 60_000;

export async function GET(request: NextRequest) {
  const { allowed, remaining, retryAfterSecs } = rateLimit(getIP(request), LIMIT, WINDOW_MS);
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please wait before trying again." },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfterSecs),
          "X-RateLimit-Limit": String(LIMIT),
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  const country = request.nextUrl.searchParams.get("country")?.trim().slice(0, 100) ?? null;

  if (!country) {
    return NextResponse.json(
      { error: "Missing country parameter" },
      { status: 400 }
    );
  }

  // Step 1: Fetch country data (needed for capital, timezone, etc.)
  let countryData;
  try {
    countryData = await fetchCountryData(country);
  } catch {
    return NextResponse.json(
      { error: `Country not found: "${country}". Please check the spelling.` },
      { status: 404 }
    );
  }

  const groqKey = process.env.GROQ_API_KEY;

  // Step 2: Fetch weather, AI content, exchange rate, and holidays in parallel
  const destCurrencyCode = countryData.currency?.code ?? null;
  const currentYear = new Date().getFullYear();
  const [weatherResult, aiResult, exchangeRateResult, holidaysResult] = await Promise.allSettled([
    fetchWeather(countryData.capital),
    groqKey
      ? fetchAIContent(countryData.name, countryData.capital, groqKey)
      : Promise.reject("No API key"),
    destCurrencyCode && destCurrencyCode !== "USD"
      ? fetchExchangeRate("USD", destCurrencyCode)
      : Promise.resolve(destCurrencyCode === "USD" ? 1 : null),
    fetchPublicHolidays(countryData.cca2, currentYear),
  ]);

  const weather =
    weatherResult.status === "fulfilled" ? weatherResult.value : null;
  const aiContent =
    aiResult.status === "fulfilled" ? aiResult.value : null;
  const exchangeRateValue =
    exchangeRateResult.status === "fulfilled" ? exchangeRateResult.value : null;
  const holidays =
    holidaysResult.status === "fulfilled" && holidaysResult.value.length > 0
      ? holidaysResult.value
      : null;

  // Step 3: Build response
  const timezone = countryData.timezones[0] ?? "UTC";
  const power = getPowerInfo(countryData.cca2);

  const briefing: BriefingResponse = {
    country: countryData.name,
    capital: countryData.capital,
    region: countryData.region,
    flag: countryData.flag,
    time: {
      timezone,
      utcOffset: timezone,
    },
    safety: aiContent?.safety ?? null,
    weather: weather
      ? {
          current: weather.current,
          forecast: weather.forecast,
        }
      : null,
    languages: countryData.languages,
    phrases: aiContent?.phrases ?? null,
    customs: aiContent?.customs ?? null,
    dishes: aiContent?.dishes ?? null,
    currency: countryData.currency,
    exchangeRate:
      countryData.currency && exchangeRateValue !== null
        ? { from: "USD", to: countryData.currency.code, rate: exchangeRateValue }
        : null,
    power,
    transport: aiContent?.transport ?? null,
    bestMonths: aiContent?.bestMonths ?? null,
    emergency: aiContent?.emergency ?? null,
    holidays,
  };

  return NextResponse.json(briefing, {
    headers: { "X-RateLimit-Remaining": String(remaining) },
  });
}
