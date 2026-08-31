"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import RotatingFlower from "@/components/ui/RotatingFlower";
import SectionOrnament from "@/components/ui/SectionOrnament";
import FlowerField from "@/components/ui/FlowerField";

const faqs = [
  {
    q: "When should I RSVP?",
    a: "Please let us know by Friday 4 September so we can finalise numbers with the venues.",
  },
  {
    q: "How do I get to Seville?",
    a: "Seville Airport (SVQ) is about 20 minutes from the centre by taxi. There are also direct trains from Madrid (approx. 2h30) and M\u00e1laga (approx. 2h).",
  },
  {
    q: "How do I get to the Hacienda on Monday 28th?",
    a: "Shuttle buses will leave from Hotel Alfonso XIII and Hotel Villapan\u00e9s \u2014 exact time to follow. If you prefer a taxi, allow about 25 minutes from the centre and book in advance, as the Hacienda is outside town.",
  },
  {
    q: "How do I get back?",
    a: "Return shuttles run every 30 minutes from 12:30 AM to 3:00 AM, dropping off in the centre of Seville \u2014 exact stop to follow.",
  },
  {
    q: "What's the weather like?",
    a: "Late September in Seville is still warm \u2014 typically 28\u201332\u00b0C in the afternoon and around 18\u201320\u00b0C at night. The ceremony and cocktail are outdoors, so bring a light layer for later in the evening.",
  },
  {
    q: "What should I wear?",
    a: "Sunday 27: cocktail attire. Monday 28: black tie. The Hacienda has gravel paths and lawns, so a block heel or wedge is easier than a stiletto.",
  },
  {
    q: "Can I bring a plus-one?",
    a: "Invitations are addressed to the named guests only. If your invitation includes a plus-one, they will be named.",
  },
  {
    q: "Dietary requirements?",
    a: "Please tell us when you RSVP and we'll make sure you're looked after.",
  },
  {
    q: "Can I take photos during the ceremony?",
    a: "We'd love you to be present with us during the ceremony and leave the photos to our photographer. Afterwards, snap away \u2014 and please share them with us!",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative overflow-hidden bg-blush-50 px-6 pt-24 md:pt-32" aria-label="Frequently asked questions">
      <RotatingFlower
        src="/white_rose_bouque.png"
        size={100}
        speed={65}
        reverse
        className="absolute -left-6 top-10 opacity-50"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 mx-auto mb-12 max-w-2xl text-center"
      >
        <p className="section-heading mb-3">Good to Know</p>
        <h2 className="font-script tracking-wide text-4xl text-blush-500 md:text-5xl">F A Q</h2>
        <SectionOrnament className="mt-6" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-2xl divide-y divide-gold/30">
        {faqs.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={item.q} className="py-4">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                className="flex w-full items-center justify-between text-left font-heading text-sm uppercase tracking-wide text-ink md:text-base"
              >
                {item.q}
                <span className="ml-4 text-gold">{isOpen ? "\u2212" : "+"}</span>
              </button>
              <motion.div
                id={`faq-panel-${i}`}
                initial={false}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="pt-3 font-body text-base text-ink/80">{item.a}</p>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Grassland of animated flowers, flush with the section's bottom
          edge — blooms staggered once this comes into view on scroll. */}
      <FlowerField className="mt-16" />
    </section>
  );
}