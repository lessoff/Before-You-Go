interface SectionProps {
  icon?: string;
  title: string;
  accent?: string;
  children: React.ReactNode;
  delay?: number;
}

export default function Section({ title, children, delay = 0 }: SectionProps) {
  return (
    <div
      className="animate-fade-in-up flex h-full flex-col"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Section header */}
      <div className="mb-3 flex items-center gap-3">
        <div
          className="h-5 w-0.5 rounded-full shrink-0"
          style={{ background: "var(--accent)" }}
        />
        <h3
          className="font-display text-sm font-bold uppercase tracking-[0.12em]"
          style={{ color: "var(--text-primary)" }}
        >
          {title}
        </h3>
        <div className="h-px flex-1" style={{ background: "var(--border)" }} />
      </div>

      {/* Content */}
      <div
        className="flex-1 rounded-xl px-6 py-5"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
