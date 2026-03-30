import { NextRequest, NextResponse } from "next/server";
import { fetchCountryData } from "@/lib/api/restcountries";
import { fetchWeather } from "@/lib/api/openweathermap";
import { fetchAIContent } from "@/lib/api/gemini";
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
  const geminiKey = process.env.GEMINI_API_KEY;

  // Step 2: Fetch weather and AI content in parallel
  const [weatherResult, aiResult] = await Promise.allSettled([
    owmKey ? fetchWeather(countryData.capital, owmKey) : Promise.reject("No API key"),
    geminiKey
      ? fetchAIContent(countryData.name, countryData.capital, geminiKey)
      : Promise.reject("No API key"),
  ]);

  const weather =
    weatherResult.status === "fulfilled" ? weatherResult.value : null;
  const aiContent =
    aiResult.status === "fulfilled" ? aiResult.value : null;

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
    power,
    transport: aiContent?.transport ?? null,
  };

  return NextResponse.json(briefing);
}
