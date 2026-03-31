import Section from "@/components/ui/Section";

interface LanguagesSectionProps {
  languages: { code: string; name: string }[];
  delay?: number;
}

export default function LanguagesSection({ languages, delay }: LanguagesSectionProps) {
  return (
    <Section title="Official Languages" delay={delay}>
      <div className="flex flex-wrap gap-2">
        {languages.map((lang) => (
          <div
            key={lang.code}
            className="rounded-lg px-3 py-2"
            style={{
              background: "var(--bg-raised)",
              border: "1px solid var(--border-mid)",
            }}
          >
            <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
              {lang.name}
            </p>
            <p
              className="text-[10px] font-medium uppercase tracking-wider"
              style={{ color: "var(--text-muted)" }}
            >
              {lang.code}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
