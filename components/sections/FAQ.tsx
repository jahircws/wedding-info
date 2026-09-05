"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const faqs: { q: string; a?: string; linkLabel?: string; linkHref?: string }[] = [
  {
    q: "When should I RSVP?",
    a: "Please reconfirm by Friday, 11 September, so we can have a final headcount.",
  },
  {
    q: "What should I wear?",
    a: "Welcome Evening: Cocktail attire. Monday 28: Black tie. The Hacienda has gravel paths and grass, so wedges or block heels are strongly recommended over stilettos.",
  },
  {
    q: "Dietary requirements?",
    a: "Please let us know when you RSVP, and we'll take care of it.",
  },
  {
    q: "How do I get to Seville?",
    a: "Seville Airport (SVQ) is about 20 minutes from downtown by taxi. Direct trains also run from Madrid (about 2.5 hours) and Málaga (about 2 hours). There are direct flights from Geneva on Friday and Sunday as well.",
  },
  {
    q: "How do I get to the Hacienda on Monday 28th?",
    a: "Shuttle buses will leave from Hotel Alfonso XIII, Hotel Villapanés and Only You Hotel at 5PM. If you'd rather take a taxi, book ahead: it's about 25 minutes from downtown, and the Hacienda is outside the city.",
  },
  {
    q: "How do I get back?",
    a: "Shuttles back run every 30 minutes from 12:30 AM to 3:00 AM and drop off downtown.",
  },
  {
    q: "What's the weather like?",
    a: "Late September in Seville is still warm — around 28–32°C in the day and 18–20°C at night. The ceremony and cocktails are outdoors, so you may want to bring a light layer for the evening.",
  },
  {
    q: "Can I bring a plus-one?",
    a: "Please let us know if your partner will be joining you and doesn't feature on your invitation, we would love to have them join us.",
  },
  {
    q: "Things to eat in Seville?",
    linkLabel: "Our Google Maps List",
    linkHref:
      "https://www.google.com/maps/@/data=!3m1!4b1!4m3!11m2!2seiLLbbbV47V9sSPKmR7qmZjPh2iGIA!3e3?entry=tts&g_ep=EgoyMDI2MDUwNi4wKgBIAVAD&skid=509943ab-7f7a-4ee0-89c3-5fd2cc8880c7",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative scroll-mt-24 overflow-hidden bg-cream-100 px-6 py-24 md:py-32" aria-label="Frequently asked questions">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="relative z-10 mx-auto mb-12 max-w-2xl text-center"
      >
        <img src="/icons/heart-ribbon.svg" alt="" aria-hidden="true" className="mx-auto mb-10 h-6 w-auto text-honey" />
        <h2 className="section-title font-heading text-clay-600">Questions</h2>
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
                className="copy-caps flex w-full items-center justify-between text-left text-clay-700"
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
                {item.a && <p className="copy-caps pt-3 text-clay-700/80">{item.a}</p>}
                {item.linkHref && (
                  <a
                    href={item.linkHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="copy-caps mt-3 inline-flex items-center gap-1 border-b border-clay-600/60 pt-3 text-clay-700/80 transition-colors duration-200 ease-in-out hover:text-clay-900"
                  >
                    {item.linkLabel}
                    <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
                  </a>
                )}
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}