import Section from "@/components/ui/Section";

const ACCENT = "#38bdf8";

interface WeatherSectionProps {
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

function iconUrl(icon: string) {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}

function fmtDay(d: string) {
  return new Date(d + "T12:00:00").toLocaleDateString("en-US", { weekday: "short", day: "numeric" });
}

export default function WeatherSection({ weather, delay }: WeatherSectionProps) {
  if (!weather) {
    return (
      <Section icon="🌤️" title="Weather & Forecast" accent={ACCENT} delay={delay}>
        <p className="text-sm text-white/30">Weather data unavailable</p>
      </Section>
    );
  }

  return (
    <Section icon="🌤️" title="Weather & Forecast" accent={ACCENT} delay={delay}>
      <div className="space-y-5">
        {/* Current */}
        <div className="flex items-center gap-4">
          <img src={iconUrl(weather.current.icon)} alt="" className="h-16 w-16 drop-shadow-lg" />
          <div>
            <p className="text-5xl font-bold text-white">{weather.current.temp}°</p>
            <p className="mt-0.5 text-sm capitalize text-white/40">{weather.current.description}</p>
          </div>
        </div>

        {/* Forecast row */}
        {weather.forecast.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {weather.forecast.map((day) => (
              <div
                key={day.date}
                className="flex min-w-[76px] flex-shrink-0 flex-col items-center rounded-xl py-3"
                style={{ background: `${ACCENT}10`, border: `1px solid ${ACCENT}22` }}
              >
                <span className="text-xs font-medium text-white/40">{fmtDay(day.date)}</span>
                <img src={iconUrl(day.icon)} alt="" className="my-1 h-9 w-9" />
                <span className="text-xs font-semibold text-white">{day.tempMax}°</span>
                <span className="text-xs text-white/30">{day.tempMin}°</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
