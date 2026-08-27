"use client";

import { useEffect, useRef, useState } from "react";
import WhiteFlower from "@/components/ui/WhiteFlower";
import TulipFlower from "@/components/ui/TulipFlower";

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

export default function FlowerField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<boolean[]>(() => FIELD.map(() => false));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const timers: number[] = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
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
      className={`relative m-0 h-36 w-full overflow-hidden p-0 sm:h-44 md:h-52 ${className}`}
      aria-hidden="true"
    >
      {FIELD.map((flower, i) => {
        const Flower = flower.type === "white" ? WhiteFlower : TulipFlower;
        return (
          <div
            key={i}
            className="absolute bottom-0"
            style={{ left: `${flower.left}%`, transform: "translateX(-50%)" }}
          >
            <Flower bloom={active[i]} size={flower.size} />
          </div>
        );
      })}
    </div>
  );
}