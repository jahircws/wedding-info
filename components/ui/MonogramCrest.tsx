// A hand-drawn laurel wreath encircling a single initial — used in place
// of a portrait photo (the couple asked not to appear as real photos on
// the site). Leaves are generated from polar coordinates so the ring
// stays perfectly symmetric; the small gold diamonds at the base echo
// the flourish already used in SectionOrnament, so this reads as part
// of the same visual language rather than a new motif.

type Leaf = { x: number; y: number; scale: number; rotate: number; key: string };

const CENTER = 100;
const RING_RADIUS = 68;
const LEAVES_PER_BRANCH = 9;
const GAP_HALF_WIDTH = 25; // degrees of open space at the bottom, for the "tied" base

function polar(radius: number, degrees: number) {
  const rad = (degrees * Math.PI) / 180;
  return { x: CENTER + radius * Math.cos(rad), y: CENTER + radius * Math.sin(rad) };
}

// theta convention: 0deg = 3 o'clock, 90deg = 6 o'clock (bottom),
// 180deg = 9 o'clock, 270deg = 12 o'clock (top). Both branches start
// at the bottom gap and sweep up to meet at the top (270deg).
function branchLeaves(side: "left" | "right"): Leaf[] {
  const startDeg = 90 - GAP_HALF_WIDTH; // 65deg, just past the bottom gap
  const span = (360 - GAP_HALF_WIDTH * 2) / 2; // 155deg: each branch covers half of the non-gap circle, ending at the top (270deg)
  const leaves: Leaf[] = [];
  for (let i = 0; i < LEAVES_PER_BRANCH; i++) {
    const t = i / (LEAVES_PER_BRANCH - 1); // 0 at the base (gap), 1 at the tip (top)
    const deg = side === "right" ? startDeg - t * span : 90 + GAP_HALF_WIDTH + t * span;
    const wobble = i % 2 === 0 ? 4 : -4;
    const { x, y } = polar(RING_RADIUS + wobble, deg);
    const scale = 1.15 - t * 0.4; // fuller near the base, tapering toward the tip
    const splay = i % 2 === 0 ? 8 : -8;
    leaves.push({ x, y, scale, rotate: deg + 90 + splay, key: `${side}-${i}` });
  }
  return leaves;
}

const LEAF_PATH = "M0,-7.5 Q3.4,0 0,7.5 Q-3.4,0 0,-7.5 Z";

export default function MonogramCrest({
  initial,
  className = "",
}: {
  initial: string;
  className?: string;
}) {
  const leaves = [...branchLeaves("left"), ...branchLeaves("right")];

  return (
    <div className={`relative flex items-center justify-center ${className}`} aria-hidden="true">
      <svg viewBox="0 0 200 200" className="h-full w-full text-gold">
        <g fill="currentColor" opacity={0.85}>
          {leaves.map((leaf) => (
            <path
              key={leaf.key}
              d={LEAF_PATH}
              transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.rotate}) scale(${leaf.scale})`}
            />
          ))}
        </g>
        {/* Small diamonds at the base, echoing SectionOrnament's flourish */}
        <g fill="currentColor">
          <rect x="96" y="163" width="8" height="8" rx="1.5" transform="rotate(45 100 167)" opacity={0.9} />
          <rect x="77" y="166" width="6" height="6" rx="1.5" transform="rotate(45 80 169)" opacity={0.5} />
          <rect x="117" y="166" width="6" height="6" rx="1.5" transform="rotate(45 120 169)" opacity={0.5} />
        </g>
      </svg>
      <span className="absolute font-script text-4xl leading-none text-blush-500 md:text-5xl">
        {initial}
      </span>
    </div>
  );
}