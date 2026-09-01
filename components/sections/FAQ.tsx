"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionOrnament from "@/components/ui/SectionOrnament";

const faqs = [
  {
    q: "When should I RSVP?",
    a: "Please let us know by Friday 4 September so we can finalise numbers with the venues.",
  },
  {
    q: "How do I get to Seville?",
    a: "Seville Airport (SVQ) is about 20 minutes from the centre by taxi. There are also direct trains from Madrid (approx. 2h30) and Málaga (approx. 2h).",
  },
  {
    q: "How do I get to the Hacienda on Monday 28th?",
    a: "Shuttle buses will leave from Hotel Alfonso XIII and Hotel Villapanés — exact time to follow. If you prefer a taxi, allow about 25 minutes from the centre and book in advance, as the Hacienda is outside town.",
  },
  {
    q: "How do I get back?",
    a: "Return shuttles run every 30 minutes from 12:30 AM to 3:00 AM, dropping off in the centre of Seville — exact stop to follow.",
  },
  {
    q: "What's the weather like?",
    a: "Late September in Seville is still warm — typically 28–32°C in the afternoon and around 18–20°C at night. The ceremony and cocktail are outdoors, so bring a light layer for later in the evening.",
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
    a: "We'd love you to be present with us during the ceremony and leave the photos to our photographer. Afterwards, snap away — and please share them with us!",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative overflow-hidden bg-cream-50 px-6 py-24 md:py-32" aria-label="Frequently asked questions">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="relative z-10 mx-auto mb-12 max-w-2xl text-center"
      >
        <p className="text-xs italic uppercase tracking-[0.22em] text-honey md:text-sm">Good to Know</p>
        <h2 className="mt-2 font-montecarlo text-4xl text-clay-500 md:text-5xl">F A Q</h2>
        <SectionOrnament className="mt-6" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-2xl divide-y divide-clay-600/25">
        {faqs.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={item.q} className="py-4">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                className="flex w-full items-center justify-between text-left font-body text-sm italic uppercase tracking-wide text-clay-700 md:text-base"
              >
                {item.q}
                <span className="ml-4 text-honey">{isOpen ? "−" : "+"}</span>
              </button>
              <motion.div
                id={`faq-panel-${i}`}
                initial={false}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="pt-3 font-body text-base text-clay-700/80">{item.a}</p>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}