import Section from "@/components/ui/Section";

const SEASON_LABEL: Record<string, string> = {
  January: "Winter", February: "Winter", December: "Winter",
  March: "Spring", April: "Spring", May: "Spring",
  June: "Summer", July: "Summer", August: "Summer",
  September: "Autumn", October: "Autumn", November: "Autumn",
};

interface BestMonthsSectionProps {
  bestMonths: string[];
  delay?: number;
}

export default function BestMonthsSection({ bestMonths, delay }: BestMonthsSectionProps) {
  return (
    <Section title="Best Months to Visit" delay={delay}>
      <div className="flex flex-wrap gap-2">
        {bestMonths.map((month) => {
          const season = SEASON_LABEL[month] ?? "";
          return (
            <div
              key={month}
              className="rounded-lg px-4 py-2.5"
              style={{
                background: "var(--accent-dim)",
                border: "1px solid var(--accent-border)",
              }}
            >
              <p className="text-sm font-semibold" style={{ color: "var(--accent)" }}>
                {month}
              </p>
              {season && (
                <p className="text-[10px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                  {season}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
}
