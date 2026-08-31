// A single wax-seal-style monogram combining both initials inside one
// hand-drawn laurel wreath ring — one shared crest instead of two
// separate portraits or two separate initial-badges, so the couple's
// identity is established once, not repeated. Leaves are generated from
// polar coordinates so the ring stays perfectly symmetric; the small
// gold diamonds at the base echo the flourish already used in
// SectionOrnament, so this reads as part of the same visual language
// rather than a new motif.

type Leaf = { x: number; y: number; scale: number; rotate: number; key: string };

const CENTER = 100;
const RING_RADIUS = 74;
const LEAVES_PER_BRANCH = 10;
const GAP_HALF_WIDTH = 22; // degrees of open space at the bottom, for the "tied" base

function polar(radius: number, degrees: number) {
  const rad = (degrees * Math.PI) / 180;
  return { x: CENTER + radius * Math.cos(rad), y: CENTER + radius * Math.sin(rad) };
}

// theta convention: 0deg = 3 o'clock, 90deg = 6 o'clock (bottom),
// 180deg = 9 o'clock, 270deg = 12 o'clock (top). Both branches start
// at the bottom gap and sweep up to meet at the top (270deg).
function branchLeaves(side: "left" | "right"): Leaf[] {
  const startDeg = 90 - GAP_HALF_WIDTH; // 68deg, just past the bottom gap
  const span = (360 - GAP_HALF_WIDTH * 2) / 2; // 158deg: each branch covers half of the non-gap circle, ending at the top (270deg)
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

const LEAF_PATH = "M0,-8 Q3.6,0 0,8 Q-3.6,0 0,-8 Z";

export default function CoupleMonogram({
  initials,
  className = "",
}: {
  /** [first, second] — rendered as "first & second". */
  initials: [string, string];
  className?: string;
}) {
  const leaves = [...branchLeaves("left"), ...branchLeaves("right")];
  const [first, second] = initials;

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 200 200" className="h-full w-full text-gold" aria-hidden="true">
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
          <rect x="96" y="170" width="8" height="8" rx="1.5" transform="rotate(45 100 174)" opacity={0.9} />
          <rect x="75" y="174" width="6" height="6" rx="1.5" transform="rotate(45 78 177)" opacity={0.5} />
          <rect x="119" y="174" width="6" height="6" rx="1.5" transform="rotate(45 122 177)" opacity={0.5} />
        </g>
      </svg>
      <span className="absolute flex items-baseline gap-2 font-script text-3xl text-blush-500 md:text-4xl">
        <span>{first}</span>
        <span className="font-body text-base italic text-ink/40 md:text-lg">&amp;</span>
        <span>{second}</span>
      </span>
    </div>
  );
}