import Section from "@/components/ui/Section";

const ACCENT = "#34d399";

interface CustomsSectionProps {
  customs: { title: string; description: string; type: "do" | "dont" }[] | null;
  delay?: number;
}

export default function CustomsSection({ customs, delay }: CustomsSectionProps) {
  if (!customs) {
    return (
      <Section icon="🎭" title="Customs & Taboos" accent={ACCENT} delay={delay}>
        <p className="text-sm text-white/30">Customs data unavailable</p>
      </Section>
    );
  }

  const dos = customs.filter((c) => c.type === "do");
  const donts = customs.filter((c) => c.type === "dont");

  return (
    <Section icon="🎭" title="Customs & Taboos" accent={ACCENT} delay={delay}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Do column */}
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-400">Do ✓</p>
          <div className="space-y-2">
            {dos.map((item, i) => (
              <div
                key={i}
                className="rounded-xl p-3"
                style={{ background: "#22c55e0e", border: "1px solid #22c55e18" }}
              >
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="mt-0.5 text-sm text-white/65">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dont column */}
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-rose-400">Don&apos;t ✗</p>
          <div className="space-y-2">
            {donts.map((item, i) => (
              <div
                key={i}
                className="rounded-xl p-3"
                style={{ background: "#f43f5e0e", border: "1px solid #f43f5e18" }}
              >
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="mt-0.5 text-sm text-white/65">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
