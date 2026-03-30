import Card from "@/components/ui/Card";

interface WeatherCardProps {
  weather: {
    current: { temp: number; description: string; icon: string };
    forecast: {
      date: string;
      tempMin: number;
      tempMax: number;
      description: string;
      icon: string;
    }[];
  } | null;
  delay?: number;
}

function weatherIconUrl(icon: string) {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

export default function WeatherCard({ weather, delay }: WeatherCardProps) {
  if (!weather) {
    return (
      <Card icon="🌤️" title="Weather" delay={delay}>
        <p className="text-sm text-gray-400">Weather data unavailable</p>
      </Card>
    );
  }

  return (
    <Card icon="🌤️" title="Weather" delay={delay}>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <img
            src={weatherIconUrl(weather.current.icon)}
            alt={weather.current.description}
            className="h-14 w-14"
          />
          <div>
            <p className="text-3xl font-bold text-gray-900">
              {weather.current.temp}°C
            </p>
            <p className="text-sm capitalize">{weather.current.description}</p>
          </div>
        </div>
        {weather.forecast.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {weather.forecast.map((day) => (
              <div
                key={day.date}
                className="flex min-w-[80px] flex-col items-center rounded-xl bg-gray-50 p-2 text-xs"
              >
                <span className="font-medium text-gray-600">
                  {formatDate(day.date)}
                </span>
                <img
                  src={weatherIconUrl(day.icon)}
                  alt={day.description}
                  className="my-1 h-8 w-8"
                />
                <span className="text-gray-900">
                  {day.tempMax}° / {day.tempMin}°
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
