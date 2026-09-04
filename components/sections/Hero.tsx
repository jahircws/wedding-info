"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

function scrollToRsvp() {
  document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  // The only motion on this section is a gentle onload fade + rise, staggered
  // per element — no parallax, no hover flourishes, no tap-to-open. The page
  // opens directly onto this.
  function riseIn(delay: number) {
    return shouldReduceMotion
      ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.01 } }
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1.1, ease: "easeInOut", delay },
        };
  }

  return (
    <section id="hero" className="hero-shell scroll-mt-24 pt-24 text-clay-700 md:pt-28">

      <motion.p className="hero-eyebrow uppercase text-honey" {...riseIn(0.2)}>
        We look forward to welcoming you
      </motion.p>

      <motion.div className="hero-stage" {...riseIn(0.4)}>
        <Image
          src="/church.png"
          alt="Illustration of a Spanish courtyard with a fountain, palms, and orange trees"
          width={1535}
          height={672}
          priority
          sizes="(max-width: 600px) 72vw, (max-width: 1024px) 60vw, 480px"
          className="h-auto w-full object-contain"
        />
      </motion.div>

      <motion.div
        className="hero-names mt-5 flex flex-row items-baseline gap-[0.15em] whitespace-nowrap font-heading text-clay-500 font-bold lg:text-[5.5rem]"
        {...riseIn(0.75)}
      >
        <span>Sara</span>
        <span className="hero-amp italic text-honey">&amp;</span>
        <span>Atef</span>
      </motion.div>

      {/* <motion.div
        className="hero-rule bg-clay-600"
        initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: shouldReduceMotion ? 0.01 : 1, ease: "easeInOut", delay: shouldReduceMotion ? 0 : 1 }}
      /> */}

      <motion.button
        type="button"
        onClick={scrollToRsvp}
        className="hero-rsvp rounded-sm border-b-2 border-clay-600 italic text-clay-500 transition-colors duration-300 ease-in-out hover:bg-clay-800 hover:text-cream-50"
        {...riseIn(1.25)}
      >
        RSVP
      </motion.button>

      <motion.p className="hero-date" {...riseIn(1.5)}>
        27th &amp; 28th of September 2026
      </motion.p>
      <motion.p className="hero-place uppercase text-honey" {...riseIn(1.65)}>
        Seville, Spain
      </motion.p>

      <motion.p className="hero-footnote italic opacity-[0.55]" {...riseIn(1.75)}>
        details, travel &amp; itinerary below
      </motion.p>
    </section>
  );
}