import Section from "@/components/ui/Section";

const ACCENT = "#fbbf24";

interface PhrasesSectionProps {
  phrases: { english: string; local: string; pronunciation: string }[] | null;
  delay?: number;
}

export default function PhrasesSection({ phrases, delay }: PhrasesSectionProps) {
  if (!phrases) {
    return (
      <Section icon="💬" title="Useful Phrases" accent={ACCENT} delay={delay}>
        <p className="text-sm text-white/30">Phrase data unavailable</p>
      </Section>
    );
  }

  return (
    <Section icon="💬" title="Useful Phrases" accent={ACCENT} delay={delay}>
      <div className="space-y-2">
        {phrases.map((p, i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-4 rounded-xl px-4 py-3"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <span className="text-sm text-white/50">{p.english}</span>
            <div className="text-right">
              <p className="text-sm font-semibold" style={{ color: ACCENT }}>{p.local}</p>
              <p className="text-xs italic text-white/30">{p.pronunciation}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
