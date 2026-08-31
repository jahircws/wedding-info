"use client";

import { motion } from "framer-motion";
import FloatingButterfly from "@/components/ui/FloatingButterfly";
import SectionOrnament from "@/components/ui/SectionOrnament";

const days = [
  {
    label: "Welcome Evening",
    date: "Sunday, 27 September 2026",
    venue: "Casa de Pilatos",
    dressCode: "Cocktail attire",
    items: [
      { time: "8:00 PM", title: "Welcome drinks & live flamenco (outdoor courtyard)" },
      { time: "Until 11:00 PM", title: "The evening continues indoors" },
    ],
  },
  {
    label: "The Wedding",
    date: "Monday, 28 September 2026",
    venue: "Hacienda La Soledad",
    dressCode: "Black tie",
    items: [
      { time: "5:00 PM", title: "Arrival & welcome drink" },
      { time: "5:30 PM", title: "Ceremony" },
      { time: "6:30 PM", title: "Cocktail hour with live music" },
      { time: "8:10 PM", title: "Dinner" },
      { time: "11:15 PM", title: "First dance, then dancing until late" },
      { time: "Late night", title: "Snacks served for those who stay" },
    ],
  },
];

export default function Schedule() {
  return (
    <section id="schedule" className="relative overflow-hidden bg-ivory px-6 py-24 md:py-32" aria-label="Wedding schedule">
      <FloatingButterfly className="absolute right-12 top-16" delay={0.8} size={26} color="#8a9a76" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mx-auto mb-14 max-w-2xl text-center"
      >
        <p className="section-heading mb-3">Two Days to Celebrate</p>
        <h2 className="font-script tracking-wide text-4xl text-blush-500 md:text-5xl">The Schedule</h2>
        <SectionOrnament className="mt-6" />
      </motion.div>

      <div className="relative z-10 mx-auto grid max-w-4xl grid-cols-1 gap-10 md:grid-cols-2">
        {days.map((day, dayIdx) => (
          <motion.div
            key={day.label}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: dayIdx * 0.1 }}
            className="rounded-2xl border border-sage-300/60 bg-sage-100/40 p-8"
          >
            <p className="font-heading text-xs uppercase tracking-[0.25em] text-sage-700">
              {day.label}
            </p>
            <h3 className="mt-1 font-body text-xl italic text-ink">{day.date}</h3>
            <p className="mt-1 font-heading text-sm text-ink/70">{day.venue}</p>

            <ul className="mt-6 space-y-4">
              {day.items.map((item) => (
                <li key={item.title} className="flex items-baseline gap-4">
                  <span className="w-28 shrink-0 font-heading text-xs uppercase tracking-wider text-gold">
                    {item.time}
                  </span>
                  <span className="font-body text-base text-ink/85">{item.title}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 border-t border-sage-300/50 pt-4 font-heading text-xs uppercase tracking-widest text-ink/60">
              Dress code &middot; {day.dressCode}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="relative z-10 mx-auto mt-10 max-w-2xl text-center font-body text-sm text-ink/70"
      >
        Getting home on Monday: shuttle buses run back to Seville every 30 minutes
        from 12:30 AM until 3:00 AM.
      </motion.p>
    </section>
  );
}