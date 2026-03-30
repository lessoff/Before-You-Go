import Section from "@/components/ui/Section";

const ACCENT = "#fb923c";

interface DishesSectionProps {
  dishes: { name: string; description: string }[] | null;
  delay?: number;
}

export default function DishesSection({ dishes, delay }: DishesSectionProps) {
  if (!dishes) {
    return (
      <Section icon="🍽️" title="Must-Try Dishes" accent={ACCENT} delay={delay}>
        <p className="text-sm text-white/30">Dishes data unavailable</p>
      </Section>
    );
  }

  return (
    <Section icon="🍽️" title="Must-Try Dishes" accent={ACCENT} delay={delay}>
      <div className="space-y-2">
        {dishes.map((dish, i) => (
          <div
            key={i}
            className="flex items-center gap-4 rounded-xl px-4 py-3"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <span className="text-xl">{["🥘", "🍜", "🥗", "🍱", "🥙"][i % 5]}</span>
            <div>
              <p className="text-sm font-bold text-white">{dish.name}</p>
              <p className="text-xs text-white/40">{dish.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
