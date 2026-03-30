import Section from "@/components/ui/Section";
import PlugIcon from "@/components/ui/PlugIcon";

const ACCENT = "#facc15";

interface PowerSectionProps {
  power: { plugTypes: string[]; voltage: string; frequency: string };
  delay?: number;
}

// Short description for each plug type shown below the icon
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
    <Section icon="🔌" title="Power & Plug Types" accent={ACCENT} delay={delay}>
      <div className="space-y-6">
        {/* Plug type illustrations */}
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/55">
            Plug Types
          </p>
          <div className="flex flex-wrap gap-5">
            {power.plugTypes.map((t) => (
              <div key={t} className="flex flex-col items-center gap-2">
                {/* Icon + letter badge */}
                <div className="relative">
                  <PlugIcon type={t} size={72} />
                  <span
                    className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full text-xs font-black"
                    style={{ background: ACCENT, color: "#000" }}
                  >
                    {t}
                  </span>
                </div>
                {/* Description label */}
                <p className="max-w-[88px] text-center text-[10px] leading-tight text-white/60">
                  {plugLabels[t.toUpperCase()] ?? ""}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Voltage & Frequency */}
        <div
          className="flex gap-8 rounded-xl px-5 py-4"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/55">Voltage</p>
            <p className="mt-1 text-2xl font-bold text-white">{power.voltage}</p>
          </div>
          <div
            className="w-px self-stretch"
            style={{ background: "rgba(255,255,255,0.07)" }}
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/55">Frequency</p>
            <p className="mt-1 text-2xl font-bold text-white">{power.frequency}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
