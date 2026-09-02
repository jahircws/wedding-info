"use client";

import { motion } from "framer-motion";
import RotatingFlower from "@/components/ui/RotatingFlower";
import FloatingButterfly from "@/components/ui/FloatingButterfly";
import SectionOrnament from "@/components/ui/SectionOrnament";
import CoupleMonogram from "@/components/ui/CoupleMonogram";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function CouplePortraits() {
  return (
    <section
      id="couple"
      className="relative overflow-hidden bg-ivory px-6 py-24 md:py-32"
      aria-label="The bride and groom"
    >
      {/* Decorative florals */}
      <RotatingFlower
        src="/bunch.png"
        size={140}
        speed={50}
        className="absolute -left-8 top-8 opacity-70"
      />
      <RotatingFlower
        src="/bunch.png"
        size={110}
        speed={60}
        reverse
        className="absolute -right-6 bottom-10 opacity-70"
      />

      {/* Decorative butterflies */}
      <FloatingButterfly className="absolute left-1/4 top-10" delay={0} />
      <FloatingButterfly className="absolute right-1/4 top-24" delay={1.2} size={28} color="#8a9a76" />
      <FloatingButterfly className="absolute bottom-16 left-1/3" delay={0.6} size={30} />

      {/* Eyebrow + a single short line — names aren't repeated here since
          the monogram and the bride/groom captions below already carry
          that. */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="relative z-10 mx-auto max-w-xl text-center"
      >
        <p className="section-heading mb-3">The Happy Couple</p>
        <p className="font-body text-lg italic text-ink/70 md:text-xl">This is us.</p>
        
      </motion.div>

      {/* One shared crest — both initials, one wreath — instead of two
          separate portraits or two separate badges. */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={fadeUp}
        className="relative z-10 mx-auto mt-10 flex justify-center"
        role="img"
        aria-label="Monogram of Sara and Atef: the initials S and A within a laurel wreath"
      >
        <CoupleMonogram initials={["S", "A"]} className="h-48 w-48 md:h-64 md:w-64" />
      </motion.div>

      {/* Bride / groom introduced by role, each name said exactly once. */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="relative z-10 mx-auto mt-14 grid max-w-2xl grid-cols-2 gap-6 md:gap-16"
      >
        <div className="text-center md:text-right">
          <p className="font-heading text-xs uppercase tracking-[0.25em] text-sage-700">The Bride</p>
          <p className="mt-2 font-script text-2xl text-blush-500 md:text-3xl">Sara</p>
          <p className="mt-2 font-body text-sm leading-relaxed text-ink/70">
            A florist at heart, forever chasing golden hour light.
          </p>
        </div>
        <div className="text-center md:text-left">
          <p className="font-heading text-xs uppercase tracking-[0.25em] text-sage-700">The Groom</p>
          <p className="mt-2 font-script text-2xl text-blush-500 md:text-3xl">Atef</p>
          <p className="mt-2 font-body text-sm leading-relaxed text-ink/70">
            Always finds the playlist, the wine, and a reason to celebrate.
          </p>
        </div>
      </motion.div>
    </section>
  );
}