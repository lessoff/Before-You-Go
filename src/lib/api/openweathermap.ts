interface WeatherResult {
  current: {
    temp: number;
    description: string;
    icon: string;
  };
  forecast: {
    date: string;
    tempMin: number;
    tempMax: number;
    description: string;
    icon: string;
  }[];
}

export async function fetchWeather(
  city: string,
  apiKey: string
): Promise<WeatherResult> {
  // Weather is cached for 30 minutes — fresh enough for a travel briefing
  const [currentRes, forecastRes] = await Promise.all([
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`,
      { next: { revalidate: 1800 } }
    ),
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`,
      { next: { revalidate: 1800 } }
    ),
  ]);

  if (!currentRes.ok) {
    throw new Error(`Weather API error: ${currentRes.status}`);
  }

  const currentData = await currentRes.json();
  const current = {
    temp: Math.round(currentData.main.temp),
    description: currentData.weather[0].description,
    icon: currentData.weather[0].icon,
  };

  let forecast: WeatherResult["forecast"] = [];

  if (forecastRes.ok) {
    const forecastData = await forecastRes.json();
    // Group by day and pick one entry per day (noon or closest)
    const dailyMap = new Map<
      string,
      { temps: number[]; desc: string; icon: string }
    >();

    for (const item of forecastData.list) {
      const date = item.dt_txt.split(" ")[0];
      const existing = dailyMap.get(date);
      if (existing) {
        existing.temps.push(item.main.temp);
        // Prefer midday reading for description
        if (item.dt_txt.includes("12:00")) {
          existing.desc = item.weather[0].description;
          existing.icon = item.weather[0].icon;
        }
      } else {
        dailyMap.set(date, {
          temps: [item.main.temp],
          desc: item.weather[0].description,
          icon: item.weather[0].icon,
        });
      }
    }

    // Skip today, take up to 5 days
    const today = new Date().toISOString().split("T")[0];
    forecast = Array.from(dailyMap.entries())
      .filter(([date]) => date !== today)
      .slice(0, 5)
      .map(([date, data]) => ({
        date,
        tempMin: Math.round(Math.min(...data.temps)),
        tempMax: Math.round(Math.max(...data.temps)),
        description: data.desc,
        icon: data.icon,
      }));
  }

  return { current, forecast };
}
