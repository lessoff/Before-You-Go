import Section from "@/components/ui/Section";

interface Emergency {
  police: string;
  ambulance: string;
  fire: string;
  tourist?: string;
}

interface EmergencySectionProps {
  emergency: Emergency;
  delay?: number;
}

const services = [
  { key: "police",    label: "Police",    icon: "🚔" },
  { key: "ambulance", label: "Ambulance", icon: "🚑" },
  { key: "fire",      label: "Fire",      icon: "🚒" },
  { key: "tourist",   label: "Tourist Helpline", icon: "ℹ️" },
] as const;

export default function EmergencySection({ emergency, delay }: EmergencySectionProps) {
  const entries = services.filter(
    (s) => emergency[s.key as keyof Emergency]
  );

  return (
    <Section title="Emergency Contacts" delay={delay}>
      <div className="grid grid-cols-2 gap-3">
        {entries.map(({ key, label, icon }) => {
          const number = emergency[key as keyof Emergency];
          if (!number) return null;
          return (
            <div
              key={key}
              className="flex items-center gap-3 rounded-lg px-4 py-3"
              style={{
                background: "var(--bg-raised)",
                border: "1px solid var(--border)",
              }}
            >
              <span className="text-xl leading-none">{icon}</span>
              <div className="min-w-0">
                <p
                  className="text-[10px] font-semibold uppercase tracking-wider"
                  style={{ color: "var(--text-muted)" }}
                >
                  {label}
                </p>
                <p
                  className="font-mono text-lg font-bold leading-tight"
                  style={{ color: "var(--danger)" }}
                >
                  {number}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
