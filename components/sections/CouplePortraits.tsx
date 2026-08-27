"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import RotatingFlower from "@/components/ui/RotatingFlower";
import FloatingButterfly from "@/components/ui/FloatingButterfly";
import SectionOrnament from "@/components/ui/SectionOrnament";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

// Single heart outline, authored in a 0–1 unit square so it can be reused via
// objectBoundingBox clipping at any size — this is what guarantees the two
// portraits actually read as one heart rather than two shapes that merely
// happen to sit near each other.
const HEART_PATH =
  "M 0.5 0.95 C 0.5 0.95 0.05 0.62 0.05 0.32 C 0.05 0.13 0.2 0.02 0.37 0.02 C 0.46 0.02 0.5 0.11 0.5 0.11 C 0.5 0.11 0.54 0.02 0.63 0.02 C 0.8 0.02 0.95 0.13 0.95 0.32 C 0.95 0.62 0.5 0.95 0.5 0.95 Z";

export default function CouplePortraits() {
  return (
    <section
      id="couple"
      className="relative overflow-hidden bg-ivory px-6 py-24 md:py-32"
      aria-label="The bride and groom"
    >
      {/* Hidden defs: the shared heart clip-path, referenced twice below (once
          for the ivory frame, once — at a smaller inset — for the photos). */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <clipPath id="coupleHeart" clipPathUnits="objectBoundingBox">
            <path d={HEART_PATH} />
          </clipPath>
        </defs>
      </svg>

      {/* Decorative florals */}
      <RotatingFlower
        src="/white_rose_bouque.png"
        size={140}
        speed={50}
        className="absolute -left-8 top-8 opacity-70"
      />
      <RotatingFlower
        src="/white_rose_bouque.png"
        size={110}
        speed={60}
        reverse
        className="absolute -right-6 bottom-10 opacity-70"
      />

      {/* Decorative butterflies */}
      <FloatingButterfly className="absolute left-1/4 top-10" delay={0} />
      <FloatingButterfly className="absolute right-1/4 top-24" delay={1.2} size={28} color="#8a9a76" />
      <FloatingButterfly className="absolute bottom-16 left-1/3" delay={0.6} size={30} />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="mx-auto max-w-4xl text-center"
      >
        <p className="section-heading mb-3">The Happy Couple</p>
        <h2 className="font-script tracking-wide text-4xl text-blush-500 md:text-5xl">Sara &amp; Atef</h2>
        <SectionOrnament className="mt-6" />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={fadeUp}
        className="relative z-10 mx-auto mt-14 w-full max-w-md"
      >
        {/* Ivory "frame" heart, sized to the full box */}
        <div className="relative aspect-square w-full">
          <div className="absolute inset-0 bg-ivory shadow-xl" style={{ clipPath: "url(#coupleHeart)" }} />

          {/* Photo heart, inset from the frame by an even margin — the same
              clip-path re-fits itself to this smaller box automatically. */}
          <div className="absolute inset-3 overflow-hidden md:inset-4" style={{ clipPath: "url(#coupleHeart)" }}>
            <div className="relative h-full w-full">
              <div className="absolute inset-y-0 left-0 w-1/2">
                <Image
                  src="/bride.jpg"
                  alt="Sara Altamimi, the bride"
                  fill
                  sizes="(min-width: 768px) 12rem, 45vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-y-0 right-0 w-1/2">
                <Image
                  src="/groom.jpg"
                  alt="Atef Merhej, the groom"
                  fill
                  sizes="(min-width: 768px) 12rem, 45vw"
                  className="object-cover"
                />
              </div>
              {/* Soft seam down the middle where the two portraits meet */}
              <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-ivory/70" />
            </div>
          </div>
        </div>

        {/* Names, split left/right beneath their own half of the heart */}
        <div className="mx-auto mt-8 grid max-w-md grid-cols-2 gap-6 text-center">
          <div>
            <p className="font-script text-3xl tracking-wide text-blush-500">Sara</p>
            <p className="mt-2 font-body text-sm leading-relaxed text-ink/70">
              A florist at heart, forever chasing golden hour light.
            </p>
          </div>
          <div>
            <p className="font-script text-3xl tracking-wide text-blush-500">Atef</p>
            <p className="mt-2 font-body text-sm leading-relaxed text-ink/70">
              Always finds the playlist, the wine, and a reason to celebrate.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}