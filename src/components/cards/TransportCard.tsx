import Card from "@/components/ui/Card";

interface TransportCardProps {
  transport: {
    name: string;
    description: string;
    type: "rideshare" | "transit" | "bike" | "other";
  }[] | null;
  delay?: number;
}

const typeBadge = {
  rideshare: "bg-blue-50 text-blue-700",
  transit: "bg-green-50 text-green-700",
  bike: "bg-yellow-50 text-yellow-700",
  other: "bg-gray-100 text-gray-600",
};

export default function TransportCard({ transport, delay }: TransportCardProps) {
  if (!transport) {
    return (
      <Card icon="🚗" title="Transport Apps" delay={delay}>
        <p className="text-sm text-gray-400">Transport data unavailable</p>
      </Card>
    );
  }

  return (
    <Card icon="🚗" title="Transport Apps" delay={delay}>
      <div className="space-y-2">
        {transport.map((app, i) => (
          <div key={i} className="flex items-start gap-3 rounded-xl bg-gray-50 p-3">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-gray-900">{app.name}</p>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${typeBadge[app.type]}`}
                >
                  {app.type}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-gray-500">{app.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
