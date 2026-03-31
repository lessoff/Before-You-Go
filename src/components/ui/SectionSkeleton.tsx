export default function SectionSkeleton() {
  return (
    <div className="space-y-8">
      {/* Country header skeleton */}
      <div className="pb-8" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="flex items-end gap-6">
          <div className="h-14 w-14 rounded-lg shimmer" />
          <div className="space-y-2">
            <div className="h-10 w-56 rounded-lg shimmer" />
            <div className="h-3 w-32 rounded shimmer" />
          </div>
        </div>
      </div>

      {[180, 120, 200, 160, 140, 180, 120, 160, 200].map((w, i) => (
        <div key={i}>
          {/* Section header */}
          <div className="mb-4 flex items-center gap-4">
            <div className="h-2.5 rounded shimmer" style={{ width: `${w * 0.5}px` }} />
            <div className="h-px flex-1 shimmer" />
          </div>
          {/* Card */}
          <div
            className="rounded-xl px-6 py-5 space-y-3"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
          >
            <div className="h-4 w-full rounded shimmer" />
            <div className="h-4 w-4/5 rounded shimmer" />
            <div className="h-4 w-2/3 rounded shimmer" />
          </div>
        </div>
      ))}
    </div>
  );
}
