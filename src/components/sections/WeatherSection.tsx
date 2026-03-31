import Section from "@/components/ui/Section";

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
      <Section title="Weather & Forecast" delay={delay}>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>Weather data unavailable</p>
      </Section>
    );
  }

  return (
    <Section title="Weather & Forecast" delay={delay}>
      <div className="space-y-5">
        {/* Current */}
        <div className="flex items-center gap-4">
          <img src={iconUrl(weather.current.icon)} alt="" className="h-14 w-14 opacity-90" />
          <div>
            <p
              className="font-display text-5xl font-semibold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              {weather.current.temp}°
            </p>
            <p className="mt-0.5 text-sm capitalize" style={{ color: "var(--text-secondary)" }}>
              {weather.current.description}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px" style={{ background: "var(--border-mid)" }} />

        {/* Forecast */}
        {weather.forecast.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {weather.forecast.map((day) => (
              <div
                key={day.date}
                className="flex min-w-[72px] shrink-0 flex-col items-center rounded-lg py-3"
                style={{
                  background: "var(--bg-raised)",
                  border: "1px solid var(--border-mid)",
                }}
              >
                <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                  {fmtDay(day.date)}
                </span>
                <img src={iconUrl(day.icon)} alt="" className="my-1 h-9 w-9 opacity-80" />
                <span className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>
                  {day.tempMax}°
                </span>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {day.tempMin}°
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
