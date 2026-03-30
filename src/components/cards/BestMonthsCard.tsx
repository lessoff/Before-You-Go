import Card from "@/components/ui/Card";

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

interface BestMonthsCardProps {
  bestMonths: string[];
  delay?: number;
}

export default function BestMonthsCard({ bestMonths, delay }: BestMonthsCardProps) {
  return (
    <Card icon="📅" title="Best Months to Visit" delay={delay}>
      <div className="flex flex-wrap gap-2">
        {bestMonths.map((month) => {
          const emoji = MONTH_EMOJI[month] ?? "🗓️";
          return (
            <span
              key={month}
              className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-700"
            >
              {emoji} {month}
            </span>
          );
        })}
      </div>
    </Card>
  );
}
