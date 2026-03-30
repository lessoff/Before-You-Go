import Card from "@/components/ui/Card";

interface DishesCardProps {
  dishes: { name: string; description: string }[] | null;
  delay?: number;
}

export default function DishesCard({ dishes, delay }: DishesCardProps) {
  if (!dishes) {
    return (
      <Card icon="🍽️" title="Must-Try Dishes" delay={delay}>
        <p className="text-sm text-gray-400">Dishes data unavailable</p>
      </Card>
    );
  }

  return (
    <Card icon="🍽️" title="Must-Try Dishes" delay={delay}>
      <div className="space-y-2">
        {dishes.map((dish, i) => (
          <div key={i} className="rounded-xl bg-gray-50 p-3">
            <p className="text-sm font-semibold text-gray-900">{dish.name}</p>
            <p className="mt-0.5 text-xs text-gray-500">{dish.description}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
