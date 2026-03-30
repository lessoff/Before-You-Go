import Card from "@/components/ui/Card";

interface LanguagesCardProps {
  languages: { code: string; name: string }[];
  delay?: number;
}

export default function LanguagesCard({ languages, delay }: LanguagesCardProps) {
  return (
    <Card icon="🗣️" title="Languages" delay={delay}>
      <div className="flex flex-wrap gap-2">
        {languages.map((lang) => (
          <span
            key={lang.code}
            className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700"
          >
            {lang.name}
          </span>
        ))}
      </div>
    </Card>
  );
}
