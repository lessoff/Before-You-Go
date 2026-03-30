import Section from "@/components/ui/Section";

const ACCENT = "#818cf8";

interface TransportSectionProps {
  transport: {
    name: string;
    description: string;
    type: "rideshare" | "transit" | "bike" | "other";
  }[] | null;
  delay?: number;
}

const typeColors = {
  rideshare: { color: "#38bdf8", label: "Rideshare" },
  transit:   { color: "#34d399", label: "Transit" },
  bike:      { color: "#fbbf24", label: "Bike" },
  other:     { color: "#a1a1aa", label: "Other" },
};

export default function TransportSection({ transport, delay }: TransportSectionProps) {
  if (!transport) {
    return (
      <Section icon="🚗" title="Transport Apps" accent={ACCENT} delay={delay}>
        <p className="text-sm text-white/30">Transport data unavailable</p>
      </Section>
    );
  }

  return (
    <Section icon="🚗" title="Transport Apps" accent={ACCENT} delay={delay}>
      <div className="space-y-2">
        {transport.map((app, i) => {
          const tc = typeColors[app.type];
          return (
            <div
              key={i}
              className="flex items-center gap-4 rounded-xl px-4 py-3"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-white">{app.name}</p>
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                    style={{ color: tc.color, background: `${tc.color}18` }}
                  >
                    {tc.label}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-white/40">{app.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
