import Card from "@/components/ui/Card";

interface PowerCardProps {
  power: {
    plugTypes: string[];
    voltage: string;
    frequency: string;
  };
  delay?: number;
}

export default function PowerCard({ power, delay }: PowerCardProps) {
  return (
    <Card icon="🔌" title="Power & Plugs" delay={delay}>
      <div className="space-y-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            Plug Types
          </p>
          <div className="mt-1 flex gap-2">
            {power.plugTypes.map((type) => (
              <span
                key={type}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-sm font-bold text-indigo-700"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
        <div className="flex gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              Voltage
            </p>
            <p className="mt-0.5 text-lg font-semibold text-gray-900">
              {power.voltage}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              Frequency
            </p>
            <p className="mt-0.5 text-lg font-semibold text-gray-900">
              {power.frequency}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
