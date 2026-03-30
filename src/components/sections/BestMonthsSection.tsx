import Section from "@/components/ui/Section";

const ACCENT = "#34d399";

const MONTH_EMOJI: Record<string, string> = {
  January: "❄️",
  February: "❄️",
  March: "🌸",
  April: "🌸",
  May: "🌸",
  June: "☀️",
  July: "☀️",
  August: "☀️",
  September: "🍂",
  October: "🍂",
  November: "🍂",
  December: "❄️",
};

interface BestMonthsSectionProps {
  bestMonths: string[];
  delay?: number;
}

export default function BestMonthsSection({ bestMonths, delay }: BestMonthsSectionProps) {
  return (
    <Section icon="📅" title="Best Months to Visit" accent={ACCENT} delay={delay}>
      <div className="flex flex-wrap gap-3">
        {bestMonths.map((month) => {
          const emoji = MONTH_EMOJI[month] ?? "🗓️";
          return (
            <div
              key={month}
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold"
              style={{
                background: `${ACCENT}18`,
                border: `1px solid ${ACCENT}30`,
                color: ACCENT,
              }}
            >
              <span className="text-base leading-none">{emoji}</span>
              {month}
            </div>
          );
        })}
      </div>
    </Section>
  );
}
