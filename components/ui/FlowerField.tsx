"use client";

import { useEffect, useRef, useState } from "react";
import WhiteFlower from "@/components/ui/WhiteFlower";
import TulipFlower from "@/components/ui/TulipFlower";
import GrassBed from "@/components/ui/GrassBed";

// Deterministic pseudo-random generator (mulberry32). Using a fixed seed
// instead of Math.random() means the "randomly scattered" layout is
// identical between the server render and the client hydration — avoids a
// hydration mismatch while still looking organic and non-uniform.
function mulberry32(seed: number) {
  return function random() {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type FlowerConfig = {
  type: "white" | "tulip";
  left: number; // percent across the strip
  size: number; // px, roughly the stem height — the "random height"
  delay: number; // seconds of stagger once the field scrolls into view
};

function buildField(count: number, seed: number): FlowerConfig[] {
  const rand = mulberry32(seed);
  const slot = 100 / count;
  const configs: FlowerConfig[] = [];
  for (let i = 0; i < count; i++) {
    configs.push({
      type: rand() > 0.5 ? "white" : "tulip",
      // Jitter within each slot so flowers don't land in a perfectly even
      // row, but still spread out across the full width.
      left: i * slot + slot * 0.2 + rand() * slot * 0.6,
      size: 92 + rand() * 78,
      delay: rand() * 1.3,
    });
  }
  return configs;
}

const FIELD = buildField(13, 7);
const MAX_CONFIGURED_SIZE = Math.max(...FIELD.map((f) => f.size));

// A handful of full grass-bed instances scattered along the strip —
// scattered rather than one-per-flower, since the original scene treats
// this as a single wide ground-cover composition (its leftmost/rightmost
// blades reach roughly ±1.5x its own size), not something tied to an
// individual flower.
type GrassConfig = { left: number; size: number; flip: boolean; variant: "green" | "teal" };
const GRASS: GrassConfig[] = [
  { left: 10, size: 100, flip: false, variant: "green" },
  { left: 46, size: 120, flip: true, variant: "teal" },
  { left: 82, size: 105, flip: false, variant: "green" },
];
const MAX_GRASS_SIZE = Math.max(...GRASS.map((g) => g.size));

// In div.flower, the bloom head (`.leafs`) sits in normal flow with zero
// height of its own — every petal inside it is absolutely positioned with
// `bottom: 0`, so the whole head renders ABOVE the stem's own box rather
// than inside it (this matches the original site exactly; it isn't a
// side effect of the port). That means a flower's true on-screen height
// is taller than its `size` (stem height) alone — this ratio is how much
// taller, tuned to clear the tallest petal/white-circle overshoot with a
// little room to spare.
const HEAD_ROOM_RATIO = 1.35;

// The grass bed's tallest blade (flower__g-right--2's leaf) reaches about
// 81 of the same "em" units the flower stem's 55em height is measured
// in — a taller overshoot than any flower, so it gets its own ratio.
const GRASS_HEAD_ROOM_RATIO = 1.5;

// Flowers are scaled down (not just the field container) on smaller
// screens, so the field stays proportionate rather than just cropping a
// desktop-sized field shorter.
type Tier = "mobile" | "tablet" | "laptop";
const SIZE_SCALE_BY_TIER: Record<Tier, number> = {
  mobile: 0.72,
  tablet: 0.88,
  laptop: 1,
};

function useResponsiveTier(): Tier {
  const [tier, setTier] = useState<Tier>("laptop");

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const tabletQuery = window.matchMedia("(min-width: 768px) and (max-width: 1023px)");

    function update() {
      if (mobileQuery.matches) setTier("mobile");
      else if (tabletQuery.matches) setTier("tablet");
      else setTier("laptop");
    }

    update();
    mobileQuery.addEventListener("change", update);
    tabletQuery.addEventListener("change", update);
    return () => {
      mobileQuery.removeEventListener("change", update);
      tabletQuery.removeEventListener("change", update);
    };
  }, []);

  return tier;
}

export default function FlowerField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<boolean[]>(() => FIELD.map(() => false));
  const [grassActive, setGrassActive] = useState(false);
  const tier = useResponsiveTier();
  const scale = SIZE_SCALE_BY_TIER[tier];
  // Computed from the actual tallest flower/grass-bed at this breakpoint's
  // scale, instead of a hand-picked height per breakpoint — so it's
  // always tall enough for whatever `size` ends up being, on any screen.
  const fieldHeight = Math.ceil(
    Math.max(MAX_CONFIGURED_SIZE * HEAD_ROOM_RATIO, MAX_GRASS_SIZE * GRASS_HEAD_ROOM_RATIO) * scale
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const timers: number[] = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setGrassActive(true);
        FIELD.forEach((flower, i) => {
          const t = window.setTimeout(() => {
            setActive((prev) => {
              const next = [...prev];
              next[i] = true;
              return next;
            });
          }, flower.delay * 1000);
          timers.push(t);
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`relative m-0 w-full overflow-hidden p-0 ${className}`}
      style={{ height: fieldHeight }}
      aria-hidden="true"
    >
      {GRASS.map((grass, i) => (
        <div
          key={i}
          className="absolute bottom-0"
          style={{ left: `${grass.left}%`, transform: "translateX(-50%)" }}
        >
          <GrassBed bloom={grassActive} size={grass.size * scale} flip={grass.flip} variant={grass.variant} />
        </div>
      ))}
      {FIELD.map((flower, i) => {
        const Flower = flower.type === "white" ? WhiteFlower : TulipFlower;
        return (
          <div
            key={i}
            className="absolute bottom-0"
            style={{ left: `${flower.left}%`, transform: "translateX(-50%)" }}
          >
            <Flower bloom={active[i]} size={flower.size * scale} />
          </div>
        );
      })}
    </div>
  );
}