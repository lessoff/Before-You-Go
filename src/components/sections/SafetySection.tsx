import Section from "@/components/ui/Section";

interface SafetySectionProps {
  safety: {
    level: "low" | "moderate" | "high" | "extreme";
    summary: string;
    tips: string[];
  } | null;
  delay?: number;
}

const levelConfig = {
  low:      { label: "Low Risk",      color: "var(--safe)" },
  moderate: { label: "Moderate Risk", color: "var(--warn)" },
  high:     { label: "High Risk",     color: "#c97d50" },
  extreme:  { label: "Extreme Risk",  color: "var(--danger)" },
};

export default function SafetySection({ safety, delay }: SafetySectionProps) {
  if (!safety) {
    return (
      <Section title="Safety Status" delay={delay}>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>Safety data unavailable</p>
      </Section>
    );
  }

  const cfg = levelConfig[safety.level];

  return (
    <Section title="Safety Status" delay={delay}>
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <span
            className="mt-0.5 shrink-0 rounded px-2.5 py-1 text-xs font-semibold uppercase tracking-wider"
            style={{
              color: cfg.color,
              background: `color-mix(in srgb, ${cfg.color} 12%, transparent)`,
              border: `1px solid color-mix(in srgb, ${cfg.color} 25%, transparent)`,
            }}
          >
            {cfg.label}
          </span>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-primary)" }}>
            {safety.summary}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {safety.tips.map((tip, i) => (
            <div
              key={i}
              className="rounded-lg p-3 text-sm"
              style={{
                background: "var(--bg-raised)",
                border: "1px solid var(--border-mid)",
                color: "var(--text-secondary)",
              }}
            >
              <span className="mr-2 font-light" style={{ color: "var(--accent)" }}>—</span>
              {tip}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
