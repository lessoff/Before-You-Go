import Section from "@/components/ui/Section";

interface DishesSectionProps {
  dishes: { name: string; description: string }[] | null;
  delay?: number;
}

export default function DishesSection({ dishes, delay }: DishesSectionProps) {
  if (!dishes) {
    return (
      <Section title="Must-Try Dishes" delay={delay}>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>Dishes data unavailable</p>
      </Section>
    );
  }

  return (
    <Section title="Must-Try Dishes" delay={delay}>
      <div className="divide-y" style={{ borderColor: "var(--border-mid)" }}>
        {dishes.map((dish, i) => (
          <div key={i} className="flex items-start gap-4 py-3 first:pt-0 last:pb-0">
            <span
              className="mt-0.5 shrink-0 font-display text-base font-medium tabular-nums"
              style={{ color: "var(--text-muted)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                {dish.name}
              </p>
              <p className="mt-0.5 text-sm" style={{ color: "var(--text-secondary)" }}>
                {dish.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
