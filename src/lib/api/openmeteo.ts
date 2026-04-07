// Open-Meteo — free, no API key, up to 16-day forecast
// Replaces OpenWeatherMap forecast (which is capped at 5 days on free tier)

interface WeatherResult {
  current: { temp: number; description: string; icon: string };
  forecast: {
    date: string;
    tempMin: number;
    tempMax: number;
    description: string;
    icon: string;
  }[];
}

// WMO weather code → OpenWeatherMap-compatible icon code
const WMO_ICON: Record<number, string> = {
  0: "01", 1: "02", 2: "03", 3: "04",
  45: "50", 48: "50",
  51: "09", 53: "09", 55: "09",
  61: "10", 63: "10", 65: "10",
  71: "13", 73: "13", 75: "13", 77: "13",
  80: "09", 81: "09", 82: "09",
  85: "13", 86: "13",
  95: "11", 96: "11", 99: "11",
};

const WMO_DESC: Record<number, string> = {
  0: "clear sky", 1: "mainly clear", 2: "partly cloudy", 3: "overcast",
  45: "fog", 48: "icy fog",
  51: "light drizzle", 53: "drizzle", 55: "heavy drizzle",
  61: "light rain", 63: "rain", 65: "heavy rain",
  71: "light snow", 73: "snow", 75: "heavy snow", 77: "snow grains",
  80: "light showers", 81: "showers", 82: "heavy showers",
  85: "snow showers", 86: "heavy snow showers",
  95: "thunderstorm", 96: "thunderstorm with hail", 99: "heavy thunderstorm",
};

function wmoIcon(code: number, isDay: boolean): string {
  const base = WMO_ICON[code] ?? "03";
  return `${base}${isDay ? "d" : "n"}`;
}

function wmoDesc(code: number): string {
  return WMO_DESC[code] ?? "unknown";
}

export async function fetchWeather(city: string): Promise<WeatherResult> {
  // Step 1: geocode the city
  const geoRes = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`,
    { next: { revalidate: 86400 } }
  );
  if (!geoRes.ok) throw new Error("Geocoding failed");
  const geoData = await geoRes.json();
  const loc = geoData.results?.[0];
  if (!loc) throw new Error(`City not found: ${city}`);

  // Step 2: fetch current + 7-day daily forecast
  const wxRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${loc.latitude}&longitude=${loc.longitude}` +
    `&current_weather=true` +
    `&daily=temperature_2m_max,temperature_2m_min,weathercode` +
    `&forecast_days=7&timezone=auto`,
    { next: { revalidate: 1800 } }
  );
  if (!wxRes.ok) throw new Error("Weather fetch failed");
  const wx = await wxRes.json();

  const cw = wx.current_weather;
  const current = {
    temp: Math.round(cw.temperature),
    description: wmoDesc(cw.weathercode),
    icon: wmoIcon(cw.weathercode, cw.is_day === 1),
  };

  const today = new Date().toISOString().split("T")[0];
  const forecast = (wx.daily.time as string[])
    .map((date: string, i: number) => ({
      date,
      tempMin: Math.round(wx.daily.temperature_2m_min[i]),
      tempMax: Math.round(wx.daily.temperature_2m_max[i]),
      description: wmoDesc(wx.daily.weathercode[i]),
      icon: wmoIcon(wx.daily.weathercode[i], true),
    }))
    .filter((d) => d.date !== today);

  return { current, forecast };
}
