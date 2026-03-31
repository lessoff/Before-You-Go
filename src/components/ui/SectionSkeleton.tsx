export default function SectionSkeleton() {
  return (
    <div className="space-y-4">
      {/* Country header skeleton */}
      <div className="pb-6" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="flex items-center gap-6">
          <div className="h-14 w-14 rounded-lg shimmer" />
          <div className="space-y-2">
            <div className="h-10 w-56 rounded-lg shimmer" />
            <div className="h-3 w-32 rounded shimmer" />
          </div>
        </div>
      </div>

      {/* Bento grid skeleton */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">

        {/* Row 1: col-1, col-2, col-1 */}
        <SkeletonCard className="lg:col-span-1" lines={2} height="h-28" />
        <SkeletonCard className="lg:col-span-2" lines={3} height="h-28" />
        <SkeletonCard className="lg:col-span-1" lines={2} height="h-28" />

        {/* Row 2: col-1, col-2, col-1 */}
        <SkeletonCard className="lg:col-span-1" lines={2} height="h-32" />
        <SkeletonCard className="lg:col-span-2" lines={3} height="h-32" />
        <SkeletonCard className="lg:col-span-1" lines={2} height="h-32" />

        {/* Row 3: full width */}
        <SkeletonCard className="lg:col-span-4" lines={4} height="h-36" />

        {/* Row 4: col-2, col-2 */}
        <SkeletonCard className="lg:col-span-2" lines={3} height="h-40" />
        <SkeletonCard className="lg:col-span-2" lines={3} height="h-40" />

        {/* Row 5: full width */}
        <SkeletonCard className="lg:col-span-4" lines={3} height="h-32" />

        {/* Row 6: col-3, col-1 */}
        <SkeletonCard className="lg:col-span-3" lines={4} height="h-40" />
        <SkeletonCard className="lg:col-span-1" lines={2} height="h-40" />

      </div>
    </div>
  );
}

function SkeletonCard({ className, lines, height }: { className?: string; lines: number; height: string }) {
  return (
    <div className={className}>
      {/* Section header */}
      <div className="mb-3 flex items-center gap-3">
        <div className="h-5 w-0.5 rounded-full shimmer" />
        <div className="h-3 w-28 rounded shimmer" />
        <div className="h-px flex-1 shimmer" />
      </div>
      {/* Card */}
      <div
        className={`rounded-xl px-6 py-5 space-y-3 ${height}`}
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
      >
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="h-3 rounded shimmer"
            style={{ width: `${100 - i * 15}%` }}
          />
        ))}
      </div>
    </div>
  );
}
