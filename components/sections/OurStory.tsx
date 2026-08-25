"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const milestones = [
  { year: "2019", text: "Sara and Atef meet through mutual friends in Madrid." },
  { year: "2021", text: "A first trip together to Seville sparks a shared love of the city." },
  { year: "2024", text: "Atef proposes at sunset, ring hidden among white roses." },
  { year: "2026", text: "We say 'I do' — and we'd love for you to be there." },
];

export default function OurStory() {
  return (
    <section id="our-story" className="bg-blush-50 px-6 py-24 md:py-32" aria-label="Our story">
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-xl shadow-lg md:mx-0 mx-auto"
        >
          <Image
            src="/rings_on_flower.jpg"
            alt="Detail shot of the couple's wedding rings resting on flowers"
            fill
            sizes="(min-width: 768px) 24rem, 90vw"
            className="object-cover"
          />
        </motion.div>

        <div>
          <p className="section-heading mb-3">Our Story</p>
          <h2 className="mb-8 font-script text-4xl text-blush-500 md:text-5xl">
            How it began
          </h2>
          <ol className="space-y-6 border-l border-gold/40 pl-6">
            {milestones.map((m, i) => (
              <motion.li
                key={m.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.08 }}
                className="relative"
              >
                <span className="absolute -left-[1.95rem] top-1 h-3 w-3 rounded-full bg-gold" />
                <p className="font-heading text-xs uppercase tracking-widest text-gold">{m.year}</p>
                <p className="mt-1 font-body text-base text-ink/85 md:text-lg">{m.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
