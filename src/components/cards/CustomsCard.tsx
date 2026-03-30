import Card from "@/components/ui/Card";

interface CustomsCardProps {
  customs: {
    title: string;
    description: string;
    type: "do" | "dont";
  }[] | null;
  delay?: number;
}

export default function CustomsCard({ customs, delay }: CustomsCardProps) {
  if (!customs) {
    return (
      <Card icon="🎭" title="Customs & Taboos" delay={delay}>
        <p className="text-sm text-gray-400">Customs data unavailable</p>
      </Card>
    );
  }

  const dos = customs.filter((c) => c.type === "do");
  const donts = customs.filter((c) => c.type === "dont");

  return (
    <Card icon="🎭" title="Customs & Taboos" delay={delay}>
      <div className="space-y-3">
        {dos.length > 0 && (
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-green-600">
              Do
            </p>
            {dos.map((item, i) => (
              <div key={i} className="flex items-start gap-2 py-1 text-sm">
                <span className="text-green-500">✓</span>
                <div>
                  <span className="font-medium">{item.title}</span>
                  <span className="text-gray-500"> — {item.description}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        {donts.length > 0 && (
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-red-600">
              Don&apos;t
            </p>
            {donts.map((item, i) => (
              <div key={i} className="flex items-start gap-2 py-1 text-sm">
                <span className="text-red-500">✗</span>
                <div>
                  <span className="font-medium">{item.title}</span>
                  <span className="text-gray-500"> — {item.description}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
