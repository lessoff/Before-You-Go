interface SectionProps {
  icon: string;
  title: string;
  accent: string;
  children: React.ReactNode;
  delay?: number;
}

export default function Section({ icon, title, accent, children, delay = 0 }: SectionProps) {
  return (
    <div
      className="animate-fade-in-up w-full overflow-hidden rounded-2xl"
      style={{
        animationDelay: `${delay}ms`,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Accent top bar */}
      <div style={{ height: "2px", background: `linear-gradient(90deg, ${accent}, transparent)` }} />

      {/* Header */}
      <div
        className="flex items-center gap-3 px-6 py-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-lg"
          style={{ background: `${accent}22` }}
        >
          {icon}
        </div>
        <h3 className="text-sm font-semibold uppercase tracking-widest text-white/50">
          {title}
        </h3>
      </div>

      {/* Content */}
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}
