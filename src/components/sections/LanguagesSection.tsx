import Section from "@/components/ui/Section";

const ACCENT = "#c084fc";

interface LanguagesSectionProps {
  languages: { code: string; name: string }[];
  delay?: number;
}

export default function LanguagesSection({ languages, delay }: LanguagesSectionProps) {
  return (
    <Section icon="🗣️" title="Official Languages" accent={ACCENT} delay={delay}>
      <div className="flex flex-wrap gap-2">
        {languages.map((lang) => (
          <span
            key={lang.code}
            className="rounded-xl px-4 py-2 text-sm font-semibold"
            style={{ background: `${ACCENT}18`, color: ACCENT, border: `1px solid ${ACCENT}30` }}
          >
            {lang.name}
          </span>
        ))}
      </div>
    </Section>
  );
}
