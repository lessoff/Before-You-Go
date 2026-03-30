interface CardProps {
  icon: string;
  title: string;
  children: React.ReactNode;
  delay?: number;
}

export default function Card({ icon, title, children, delay = 0 }: CardProps) {
  return (
    <div
      className="animate-fade-in-up rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="mb-4 flex items-center gap-2">
        <span className="text-2xl">{icon}</span>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="text-gray-600">{children}</div>
    </div>
  );
}
