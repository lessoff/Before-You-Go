import Section from "@/components/ui/Section";

const ACCENT = "#facc15";

interface PowerSectionProps {
  power: { plugTypes: string[]; voltage: string; frequency: string };
  delay?: number;
}

export default function PowerSection({ power, delay }: PowerSectionProps) {
  return (
    <Section icon="🔌" title="Power & Plug Types" accent={ACCENT} delay={delay}>
      <div className="flex flex-wrap items-center gap-6">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/30">Plug Types</p>
          <div className="flex gap-2">
            {power.plugTypes.map((t) => (
              <div
                key={t}
                className="flex h-11 w-11 items-center justify-center rounded-xl text-base font-extrabold"
                style={{ background: `${ACCENT}18`, color: ACCENT, border: `1px solid ${ACCENT}30` }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-white/30">Voltage</p>
          <p className="text-2xl font-bold text-white">{power.voltage}</p>
        </div>
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-white/30">Frequency</p>
          <p className="text-2xl font-bold text-white">{power.frequency}</p>
        </div>
      </div>
    </Section>
  );
}
