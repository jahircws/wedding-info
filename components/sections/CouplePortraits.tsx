"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import RotatingFlower from "@/components/ui/RotatingFlower";
import FloatingButterfly from "@/components/ui/FloatingButterfly";

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
        <h2 className="font-script text-4xl text-blush-500 md:text-5xl">Sara &amp; Atef</h2>
      </motion.div>

      <div className="relative z-10 mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
        <motion.figure
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="mx-auto w-full max-w-sm"
        >
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-full shadow-lg">
            <Image
              src="/bride.jpg"
              alt="Sara Altamimi, the bride"
              fill
              sizes="(min-width: 768px) 24rem, 90vw"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-4 text-center font-heading text-sm uppercase tracking-[0.25em] text-ink/70">
            Sara Altamimi
          </figcaption>
        </motion.figure>

        <motion.figure
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ ...fadeUp, show: { ...fadeUp.show, transition: { ...fadeUp.show.transition, delay: 0.15 } } }}
          className="mx-auto w-full max-w-sm"
        >
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-full shadow-lg">
            <Image
              src="/groom.jpg"
              alt="Atef Merhej, the groom"
              fill
              sizes="(min-width: 768px) 24rem, 90vw"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-4 text-center font-heading text-sm uppercase tracking-[0.25em] text-ink/70">
            Atef Merhej
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
