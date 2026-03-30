interface PlugIconProps {
  type: string;
  size?: number;
}

// Each SVG shows the socket face (the wall outlet holes) for that plug type.
// All drawn on a 80×100 viewBox.
function SocketSVG({ size = 80, children }: { size: number; children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 80 100"
      width={size}
      height={size * 1.25}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outlet body */}
      <rect x="4" y="4" width="72" height="92" rx="10" fill="#1e2235" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
      {children}
    </svg>
  );
}

const SLOT = "rgba(255,255,255,0.85)";   // slot/hole fill
const SHADOW = "rgba(0,0,0,0.5)";         // inner shadow

// Slot shapes
const SlotRect = ({ x, y, w, h, rx = 2 }: { x: number; y: number; w: number; h: number; rx?: number }) => (
  <>
    <rect x={x} y={y} width={w} height={h} rx={rx} fill={SHADOW} />
    <rect x={x + 0.5} y={y + 0.5} width={w - 1} height={h - 1} rx={rx} fill={SLOT} />
  </>
);

const SlotCircle = ({ cx, cy, r }: { cx: number; cy: number; r: number }) => (
  <>
    <circle cx={cx} cy={cy} r={r} fill={SHADOW} />
    <circle cx={cx} cy={cy} r={r - 0.5} fill={SLOT} />
  </>
);

const SlotD = ({ cx, cy, r }: { cx: number; cy: number; r: number }) => (
  <>
    <circle cx={cx} cy={cy} r={r} fill={SHADOW} />
    <circle cx={cx} cy={cy} r={r - 0.5} fill={SLOT} />
  </>
);

// Diagonal slot (for Type I – Australia)
const SlotDiag = ({ cx, cy, w, h, angle }: { cx: number; cy: number; w: number; h: number; angle: number }) => (
  <g transform={`rotate(${angle}, ${cx}, ${cy})`}>
    <SlotRect x={cx - w / 2} y={cy - h / 2} w={w} h={h} rx={2} />
  </g>
);

const plugFaces: Record<string, React.ReactNode> = {
  // Type A — Two flat vertical slots (US/Japan, no ground)
  A: (
    <>
      <SlotRect x={25} y={30} w={8} h={30} rx={2} />
      <SlotRect x={47} y={30} w={8} h={30} rx={2} />
    </>
  ),

  // Type B — Two flat vertical slots + round ground pin
  B: (
    <>
      <SlotRect x={25} y={25} w={8} h={28} rx={2} />
      <SlotRect x={47} y={25} w={8} h={28} rx={2} />
      <SlotCircle cx={40} cy={71} r={5} />
    </>
  ),

  // Type C — Two round holes (Europlug)
  C: (
    <>
      <SlotCircle cx={28} cy={50} r={6} />
      <SlotCircle cx={52} cy={50} r={6} />
    </>
  ),

  // Type D — Three round holes in triangle (India)
  D: (
    <>
      <SlotCircle cx={40} cy={30} r={6} />
      <SlotCircle cx={24} cy={62} r={6} />
      <SlotCircle cx={56} cy={62} r={6} />
    </>
  ),

  // Type E — Two round holes + round hole for grounding pin (France)
  E: (
    <>
      <SlotCircle cx={28} cy={44} r={6} />
      <SlotCircle cx={52} cy={44} r={6} />
      <SlotCircle cx={40} cy={68} r={5} />
    </>
  ),

  // Type F — Two round holes with side grounding clips (Schuko, Germany)
  F: (
    <>
      <SlotCircle cx={28} cy={50} r={6} />
      <SlotCircle cx={52} cy={50} r={6} />
      {/* Side grounding clips */}
      <rect x={6}  y={43} width={5} height={14} rx={2} fill={SLOT} opacity={0.6} />
      <rect x={69} y={43} width={5} height={14} rx={2} fill={SLOT} opacity={0.6} />
    </>
  ),

  // Type G — Three rectangular slots (UK, Ireland)
  G: (
    <>
      {/* Top horizontal slot */}
      <SlotRect x={28} y={22} w={24} h={8} rx={2} />
      {/* Bottom-left vertical slot */}
      <SlotRect x={18} y={48} w={8} h={24} rx={2} />
      {/* Bottom-right vertical slot */}
      <SlotRect x={54} y={48} w={8} h={24} rx={2} />
    </>
  ),

  // Type H — Three slots in Y shape (Israel)
  H: (
    <>
      {/* Top vertical slot */}
      <SlotRect x={36} y={22} w={8} h={22} rx={2} />
      {/* Bottom-left diagonal */}
      <g transform="rotate(60, 40, 50)">
        <SlotRect x={36} y={29} w={8} h={22} rx={2} />
      </g>
      {/* Bottom-right diagonal */}
      <g transform="rotate(-60, 40, 50)">
        <SlotRect x={36} y={29} w={8} h={22} rx={2} />
      </g>
    </>
  ),

  // Type I — Two angled flat pins + ground (Australia, China variant)
  I: (
    <>
      <SlotDiag cx={28} cy={42} w={7} h={22} angle={-30} />
      <SlotDiag cx={52} cy={42} w={7} h={22} angle={30} />
      <SlotRect x={36} y={66} w={8} h={14} rx={2} />
    </>
  ),

  // Type J — Two round + D-shaped ground (Switzerland)
  J: (
    <>
      <SlotCircle cx={28} cy={44} r={6} />
      <SlotCircle cx={52} cy={44} r={6} />
      {/* D-shaped ground hole */}
      <SlotCircle cx={40} cy={68} r={5} />
    </>
  ),

  // Type K — Two round + U-shaped ground (Denmark)
  K: (
    <>
      <SlotCircle cx={28} cy={44} r={6} />
      <SlotCircle cx={52} cy={44} r={6} />
      {/* U-shaped ground */}
      <path d="M34 74 Q40 80 46 74" stroke={SLOT} strokeWidth="5" strokeLinecap="round" fill="none" />
    </>
  ),

  // Type L — Three round holes in a row (Italy)
  L: (
    <>
      <SlotCircle cx={20} cy={50} r={5} />
      <SlotCircle cx={40} cy={50} r={5} />
      <SlotCircle cx={60} cy={50} r={5} />
    </>
  ),

  // Type M — Three large round holes in triangle (South Africa)
  M: (
    <>
      <SlotCircle cx={40} cy={28} r={8} />
      <SlotCircle cx={22} cy={64} r={8} />
      <SlotCircle cx={58} cy={64} r={8} />
    </>
  ),

  // Type N — Two round + round ground (Brazil)
  N: (
    <>
      <SlotCircle cx={28} cy={44} r={6} />
      <SlotCircle cx={52} cy={44} r={6} />
      <SlotCircle cx={40} cy={68} r={6} />
    </>
  ),
};

export default function PlugIcon({ type, size = 72 }: PlugIconProps) {
  const face = plugFaces[type.toUpperCase()];

  if (!face) {
    // Fallback: just show the letter
    return (
      <div
        className="flex items-center justify-center rounded-xl text-lg font-black text-white/70"
        style={{
          width: size,
          height: size * 1.25,
          background: "#1e2235",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {type}
      </div>
    );
  }

  return (
    <SocketSVG size={size}>
      {face}
    </SocketSVG>
  );
}
