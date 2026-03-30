import Card from "@/components/ui/Card";

interface SafetyCardProps {
  safety: {
    level: "low" | "moderate" | "high" | "extreme";
    summary: string;
    tips: string[];
  } | null;
  delay?: number;
}

const levelConfig = {
  low: { color: "bg-green-100 text-green-800", label: "Low Risk" },
  moderate: { color: "bg-yellow-100 text-yellow-800", label: "Moderate Risk" },
  high: { color: "bg-orange-100 text-orange-800", label: "High Risk" },
  extreme: { color: "bg-red-100 text-red-800", label: "Extreme Risk" },
};

export default function SafetyCard({ safety, delay }: SafetyCardProps) {
  if (!safety) {
    return (
      <Card icon="🛡️" title="Safety" delay={delay}>
        <p className="text-sm text-gray-400">Safety data unavailable</p>
      </Card>
    );
  }

  const config = levelConfig[safety.level];

  return (
    <Card icon="🛡️" title="Safety" delay={delay}>
      <div className="space-y-3">
        <span
          className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${config.color}`}
        >
          {config.label}
        </span>
        <p className="text-sm leading-relaxed">{safety.summary}</p>
        <ul className="space-y-1">
          {safety.tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span className="mt-0.5 text-indigo-400">•</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
