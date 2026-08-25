"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  src: string;
  size?: number;
  className?: string;
  speed?: number; // seconds per full rotation
  reverse?: boolean;
};

/** A decorative flower graphic that rotates slowly and continuously once its
 * section is in view. Rotation is disabled entirely under
 * prefers-reduced-motion. */
export default function RotatingFlower({
  src,
  size = 120,
  className = "",
  speed = 40,
  reverse = false,
}: Props) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`pointer-events-none select-none ${className}`}
      style={{ width: size, height: size }}
      animate={
        shouldReduceMotion
          ? {}
          : { rotate: reverse ? -360 : 360 }
      }
      transition={
        shouldReduceMotion
          ? {}
          : { repeat: Infinity, duration: speed, ease: "linear" }
      }
    >
      <Image
        src={src}
        alt=""
        role="presentation"
        width={size}
        height={size}
        className="h-full w-full object-contain opacity-90"
      />
    </motion.div>
  );
}
