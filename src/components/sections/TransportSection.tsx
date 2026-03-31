import Section from "@/components/ui/Section";

interface TransportSectionProps {
  transport: {
    name: string;
    description: string;
    type: "rideshare" | "transit" | "bike" | "other";
  }[] | null;
  delay?: number;
}

const typeLabels = {
  rideshare: "Rideshare",
  transit:   "Transit",
  bike:      "Bike",
  other:     "Other",
};

export default function TransportSection({ transport, delay }: TransportSectionProps) {
  if (!transport) {
    return (
      <Section title="Transport Apps" delay={delay}>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>Transport data unavailable</p>
      </Section>
    );
  }

  return (
    <Section title="Transport Apps" delay={delay}>
      <div className="divide-y" style={{ borderColor: "var(--border-mid)" }}>
        {transport.map((app, i) => (
          <div key={i} className="flex items-start gap-4 py-3 first:pt-0 last:pb-0">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                  {app.name}
                </p>
                <span
                  className="rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                  style={{
                    color: "var(--accent)",
                    background: "var(--accent-dim)",
                    border: "1px solid var(--accent-border)",
                  }}
                >
                  {typeLabels[app.type]}
                </span>
              </div>
              <p className="mt-0.5 text-sm" style={{ color: "var(--text-secondary)" }}>
                {app.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
