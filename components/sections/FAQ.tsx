"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const faqs = [
  {
    q: "What's the dress code?",
    a: "Garden formal. Think soft, breathable fabrics in warm neutrals — Seville in September is beautiful but warm. Please avoid all-white.",
  },
  {
    q: "Are you registered anywhere?",
    a: "Your presence is truly the gift. If you'd like to contribute to our next chapter, a small note about a honeymoon fund will be shared closer to the date.",
  },
  {
    q: "Any travel tips for Seville?",
    a: "Late September evenings are warm and lovely; days can still be hot, so plan accordingly. We'll share a short list of recommended hotels and neighborhoods with confirmed guests.",
  },
  {
    q: "Can I bring a plus-one or children?",
    a: "Please add any additional guests directly in the RSVP form below, including their names and ages, so we can plan seating and catering accurately.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-blush-50 px-6 py-24 md:py-32" aria-label="Frequently asked questions">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mx-auto mb-12 max-w-2xl text-center"
      >
        <p className="section-heading mb-3">Good to Know</p>
        <h2 className="font-script text-4xl text-blush-500 md:text-5xl">FAQ</h2>
      </motion.div>

      <div className="mx-auto max-w-2xl divide-y divide-gold/30">
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
    </section>
  );
}
