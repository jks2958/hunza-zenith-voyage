type Point = { left: number; top: number };

/** one continuous smooth path through the seven stops */
function smoothPath(points: Point[]) {
  if (points.length < 2) return "";
  const p = points.map((q) => [q.left, q.top] as const);
  let d = `M ${p[0]![0]} ${p[0]![1]}`;
  for (let i = 0; i < p.length - 1; i++) {
    const cur = p[i]!;
    const next = p[i + 1]!;
    const prev = p[i - 1] ?? cur;
    const after = p[i + 2] ?? next;
    const c1x = cur[0] + (next[0] - prev[0]) / 6;
    const c1y = cur[1] + (next[1] - prev[1]) / 6;
    const c2x = next[0] - (after[0] - cur[0]) / 6;
    const c2y = next[1] - (after[1] - cur[1]) / 6;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${next[0]} ${next[1]}`;
  }
  return d;
}

export function JourneyRoute({ points }: { points: Point[] }) {
  const d = smoothPath(points);
  return (
    <svg className="pointer-events-none absolute inset-0 z-10 h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="nv-route" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.85 0.14 75)" stopOpacity="0.9" />
          <stop offset="55%" stopColor="oklch(0.72 0.16 240)" stopOpacity="0.85" />
          <stop offset="100%" stopColor="oklch(0.7 0.18 255)" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      <path d={d} fill="none" stroke="url(#nv-route)" strokeWidth={7} opacity={0.18} strokeLinecap="round" />
      <path
        d={d}
        fill="none"
        stroke="url(#nv-route)"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeDasharray="7 9"
        className="nv-route-dash"
      />
    </svg>
  );
}
