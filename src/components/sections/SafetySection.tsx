import Section from "@/components/ui/Section";

const ACCENT = "#f43f5e";

interface SafetySectionProps {
  safety: {
    level: "low" | "moderate" | "high" | "extreme";
    summary: string;
    tips: string[];
  } | null;
  delay?: number;
}

const levelConfig = {
  low: { label: "Low Risk", color: "#22c55e", bg: "#22c55e18" },
  moderate: { label: "Moderate Risk", color: "#f59e0b", bg: "#f59e0b18" },
  high: { label: "High Risk", color: "#f97316", bg: "#f9731618" },
  extreme: { label: "Extreme Risk", color: "#f43f5e", bg: "#f43f5e18" },
};

export default function SafetySection({ safety, delay }: SafetySectionProps) {
  if (!safety) {
    return (
      <Section icon="🛡️" title="Safety Status" accent={ACCENT} delay={delay}>
        <p className="text-sm text-white/30">Safety data unavailable</p>
      </Section>
    );
  }

  const cfg = levelConfig[safety.level];

  return (
    <Section icon="🛡️" title="Safety Status" accent={ACCENT} delay={delay}>
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <span
            className="mt-0.5 flex-shrink-0 rounded-xl px-3 py-1.5 text-sm font-bold"
            style={{ color: cfg.color, background: cfg.bg }}
          >
            {cfg.label}
          </span>
          <p className="text-sm leading-relaxed text-white/60">{safety.summary}</p>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {safety.tips.map((tip, i) => (
            <div
              key={i}
              className="rounded-xl p-3 text-xs text-white/50"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <span className="mr-2 text-rose-400">→</span>
              {tip}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
