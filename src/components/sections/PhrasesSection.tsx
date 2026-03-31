import Section from "@/components/ui/Section";

interface PhrasesSectionProps {
  phrases: { english: string; local: string; pronunciation: string }[] | null;
  delay?: number;
}

export default function PhrasesSection({ phrases, delay }: PhrasesSectionProps) {
  if (!phrases) {
    return (
      <Section title="Useful Phrases" delay={delay}>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>Phrase data unavailable</p>
      </Section>
    );
  }

  return (
    <Section title="Useful Phrases" delay={delay}>
      <div className="divide-y" style={{ borderColor: "var(--border-mid)" }}>
        {phrases.map((p, i) => (
          <div key={i} className="flex items-baseline justify-between gap-4 py-3 first:pt-0 last:pb-0">
            <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{p.english}</span>
            <div className="text-right shrink-0">
              <p
                className="font-display text-base font-medium"
                style={{ color: "var(--accent)" }}
              >
                {p.local}
              </p>
              <p className="text-xs italic" style={{ color: "var(--text-muted)" }}>
                {p.pronunciation}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
