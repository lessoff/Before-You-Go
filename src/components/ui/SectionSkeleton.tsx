export default function SectionSkeleton() {
  return (
    <div className="space-y-4">
      {/* Country header skeleton */}
      <div
        className="mb-8 rounded-3xl p-8 text-center"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="mx-auto h-16 w-16 rounded-full shimmer" />
        <div className="mx-auto mt-3 h-8 w-48 rounded-xl shimmer" />
        <div className="mx-auto mt-2 h-4 w-32 rounded shimmer" />
      </div>

      {[
        "#06b6d4", "#f43f5e", "#38bdf8",
        "#c084fc", "#fbbf24", "#34d399",
        "#fb923c", "#facc15", "#818cf8",
      ].map((accent, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-2xl"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div style={{ height: "2px", background: `linear-gradient(90deg, ${accent}, transparent)` }} />
          <div className="flex items-center gap-3 px-6 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="h-9 w-9 rounded-xl shimmer" />
            <div className="h-4 w-28 rounded shimmer" />
          </div>
          <div className="space-y-2 px-6 py-5">
            <div className="h-4 w-full rounded shimmer" />
            <div className="h-4 w-3/4 rounded shimmer" />
            <div className="h-4 w-1/2 rounded shimmer" />
          </div>
        </div>
      ))}
    </div>
  );
}
