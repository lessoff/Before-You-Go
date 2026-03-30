import Card from "@/components/ui/Card";

interface PhrasesCardProps {
  phrases: {
    english: string;
    local: string;
    pronunciation: string;
  }[] | null;
  delay?: number;
}

export default function PhrasesCard({ phrases, delay }: PhrasesCardProps) {
  if (!phrases) {
    return (
      <Card icon="💬" title="Useful Phrases" delay={delay}>
        <p className="text-sm text-gray-400">Phrase data unavailable</p>
      </Card>
    );
  }

  return (
    <Card icon="💬" title="Useful Phrases" delay={delay}>
      <div className="space-y-3">
        {phrases.map((phrase, i) => (
          <div key={i} className="rounded-xl bg-gray-50 p-3">
            <p className="text-sm font-medium text-gray-900">
              {phrase.english}
            </p>
            <p className="mt-1 text-sm font-semibold text-indigo-600">
              {phrase.local}
            </p>
            <p className="mt-0.5 text-xs italic text-gray-400">
              {phrase.pronunciation}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
