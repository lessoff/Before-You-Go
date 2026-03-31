import Section from "@/components/ui/Section";
import PlugIcon from "@/components/ui/PlugIcon";

interface PowerSectionProps {
  power: { plugTypes: string[]; voltage: string; frequency: string };
  delay?: number;
}

const plugLabels: Record<string, string> = {
  A: "North America / Japan",
  B: "North America (grounded)",
  C: "Europe / Asia / South America",
  D: "India / Sri Lanka",
  E: "France / Belgium / Poland",
  F: "Europe (Schuko)",
  G: "UK / Ireland / Hong Kong",
  H: "Israel",
  I: "Australia / New Zealand / China",
  J: "Switzerland",
  K: "Denmark / Greenland",
  L: "Italy / Chile",
  M: "South Africa",
  N: "Brazil",
};

export default function PowerSection({ power, delay }: PowerSectionProps) {
  return (
    <Section title="Power & Plug Types" delay={delay}>
      <div className="space-y-6">
        {/* Plug type illustrations */}
        <div className="flex flex-wrap gap-6">
          {power.plugTypes.map((t) => (
            <div key={t} className="flex flex-col items-center gap-2">
              <div className="relative">
                <PlugIcon type={t} size={72} />
                <span
                  className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold"
                  style={{ background: "var(--accent)", color: "#0c0b08" }}
                >
                  {t}
                </span>
              </div>
              <p
                className="max-w-[84px] text-center text-[10px] leading-tight"
                style={{ color: "var(--text-muted)" }}
              >
                {plugLabels[t.toUpperCase()] ?? ""}
              </p>
            </div>
          ))}
        </div>

        {/* Voltage & Frequency */}
        <div
          className="flex gap-8 rounded-lg px-5 py-4"
          style={{
            background: "var(--bg-raised)",
            border: "1px solid var(--border-mid)",
          }}
        >
          <div>
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.2em]"
              style={{ color: "var(--text-muted)" }}
            >
              Voltage
            </p>
            <p
              className="mt-1 font-display text-2xl font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              {power.voltage}
            </p>
          </div>
          <div className="w-px self-stretch" style={{ background: "var(--border-mid)" }} />
          <div>
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.2em]"
              style={{ color: "var(--text-muted)" }}
            >
              Frequency
            </p>
            <p
              className="mt-1 font-display text-2xl font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              {power.frequency}
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
