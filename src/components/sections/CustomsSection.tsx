import Section from "@/components/ui/Section";

interface CustomsSectionProps {
  customs: { title: string; description: string; type: "do" | "dont" }[] | null;
  delay?: number;
}

export default function CustomsSection({ customs, delay }: CustomsSectionProps) {
  if (!customs) {
    return (
      <Section title="Customs & Taboos" delay={delay}>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>Customs data unavailable</p>
      </Section>
    );
  }

  const dos = customs.filter((c) => c.type === "do");
  const donts = customs.filter((c) => c.type === "dont");

  return (
    <Section title="Customs & Taboos" delay={delay}>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Do column */}
        <div>
          <p
            className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em]"
            style={{ color: "var(--safe)" }}
          >
            Do
          </p>
          <div className="space-y-2">
            {dos.map((item, i) => (
              <div
                key={i}
                className="rounded-lg p-3"
                style={{
                  background: "color-mix(in srgb, var(--safe) 6%, transparent)",
                  borderLeft: "2px solid var(--safe)",
                }}
              >
                <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{item.title}</p>
                <p className="mt-0.5 text-sm" style={{ color: "var(--text-secondary)" }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dont column */}
        <div>
          <p
            className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em]"
            style={{ color: "var(--danger)" }}
          >
            Don&apos;t
          </p>
          <div className="space-y-2">
            {donts.map((item, i) => (
              <div
                key={i}
                className="rounded-lg p-3"
                style={{
                  background: "color-mix(in srgb, var(--danger) 6%, transparent)",
                  borderLeft: "2px solid var(--danger)",
                }}
              >
                <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{item.title}</p>
                <p className="mt-0.5 text-sm" style={{ color: "var(--text-secondary)" }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
