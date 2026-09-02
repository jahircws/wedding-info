"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionOrnament from "@/components/ui/SectionOrnament";

const faqs = [
  {
    q: "When should I RSVP?",
    a: "Please tell us by Friday, 4 September, so we can give the venues a final headcount.",
  },
  {
    q: "How do I get to Seville?",
    a: "Seville Airport (SVQ) is about 20 minutes from downtown by taxi. Direct trains also run from Madrid (about 2.5 hours) and Málaga (about 2 hours).",
  },
  {
    q: "How do I get to the Hacienda on Monday 28th?",
    a: "Shuttle buses will leave from Hotel Alfonso XIII and Hotel Villapanés — exact time coming soon. If you'd rather take a taxi, book ahead: it's about 25 minutes from downtown, and the Hacienda is outside the city.",
  },
  {
    q: "How do I get back?",
    a: "Shuttles back run every 30 minutes from 12:30 AM to 3:00 AM and drop off downtown — exact stop coming soon.",
  },
  {
    q: "What's the weather like?",
    a: "Late September in Seville is still warm — around 28–32°C in the day and 18–20°C at night. The ceremony and cocktails are outdoors, so bring a light layer for the evening.",
  },
  {
    q: "What should I wear?",
    a: "Sunday 27: cocktail attire. Monday 28: black tie. The Hacienda has gravel paths and grass, so wedges or block heels are easier than stilettos.",
  },
  {
    q: "Can I bring a plus-one?",
    a: "Only the guests named on your invitation are invited. If you have a plus-one, they'll be named there too.",
  },
  {
    q: "Dietary requirements?",
    a: "Let us know when you RSVP, and we'll take care of it.",
  },
  {
    q: "Can I take photos during the ceremony?",
    a: "We'd love for you to be fully present during the ceremony, so please leave the photos to our photographer. After that, take all the pictures you want — and share them with us!",
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
        <img src="/icons/heart-ribbon.svg" alt="" aria-hidden="true" className="mx-auto h-6 w-auto text-honey" />
        <h2 className="mt-5 font-heading text-4xl text-clay-500 md:text-5xl">Questions</h2>
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