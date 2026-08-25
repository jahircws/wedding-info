"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";

type Props = {
  className?: string;
  size?: number;
  /** Unused with the illustrated asset (it ships with its own black & gold
   * palette) — kept so existing callers don't need to change their props. */
  color?: string;
  delay?: number; // seconds, to de-sync multiple butterflies
  driftDuration?: number;
};

/** Renders the black & gold butterfly illustration (public/butterfly.svg)
 * with a soft wing-flutter pulse (scaleX) plus a slow drifting float path.
 * Both loops are driven by Tailwind's `animate-flap-wing` / `animate-drift`
 * keyframes (see tailwind.config.ts) so they respect
 * `prefers-reduced-motion` globally via globals.css. */
export default function FloatingButterfly({
  className = "",
  size = 48,
  delay = 0,
  driftDuration = 6,
}: Props) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={`pointer-events-none select-none ${shouldReduceMotion ? "" : "animate-drift"} ${className}`}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${driftDuration}s`,
        width: size,
        height: size,
      }}
      aria-hidden="true"
    >
      <div
        className={shouldReduceMotion ? "" : "animate-flap-wing"}
        style={{
          transformOrigin: "center",
          animationDelay: `${delay}s`,
          width: size,
          height: size,
        }}
      >
        <Image
          src="/butterfly.svg"
          alt=""
          role="presentation"
          width={size}
          height={size}
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  );
}