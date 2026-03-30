import { NextRequest, NextResponse } from "next/server";
import { fetchCountryData } from "@/lib/api/restcountries";
import { fetchWeather } from "@/lib/api/openweathermap";
import { fetchAIContent } from "@/lib/api/gemini";
import { fetchExchangeRate } from "@/lib/api/exchangerate";
import { getPowerInfo } from "@/lib/powerdata";
import type { BriefingResponse } from "@/lib/types";

export async function GET(request: NextRequest) {
  const country = request.nextUrl.searchParams.get("country");

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

  const owmKey = process.env.OPENWEATHERMAP_API_KEY;
  const groqKey = process.env.GROQ_API_KEY;

  // Step 2: Fetch weather, AI content, and exchange rate in parallel
  const destCurrencyCode = countryData.currency?.code ?? null;
  const [weatherResult, aiResult, exchangeRateResult] = await Promise.allSettled([
    owmKey ? fetchWeather(countryData.capital, owmKey) : Promise.reject("No API key"),
    groqKey
      ? fetchAIContent(countryData.name, countryData.capital, groqKey)
      : Promise.reject("No API key"),
    destCurrencyCode && destCurrencyCode !== "USD"
      ? fetchExchangeRate("USD", destCurrencyCode)
      : Promise.resolve(destCurrencyCode === "USD" ? 1 : null),
  ]);

  const weather =
    weatherResult.status === "fulfilled" ? weatherResult.value : null;
  const aiContent =
    aiResult.status === "fulfilled" ? aiResult.value : null;
  const exchangeRateValue =
    exchangeRateResult.status === "fulfilled" ? exchangeRateResult.value : null;

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
  };

  return NextResponse.json(briefing);
}
