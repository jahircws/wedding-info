"use client";

import { motion } from "framer-motion";
import SectionOrnament from "@/components/ui/SectionOrnament";

const days = [
  {
    label: "Welcome Evening",
    date: "Sunday, 27 September 2026",
    venue: "Casa de Pilatos",
    dressCode: "Cocktail attire",
    items: [
      { time: "8:00 PM", title: "Cocktail reception (outdoor courtyard)" },
      { time: "11:00 PM", title: "The evening ends" },
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
    <section id="schedule" className="relative overflow-hidden bg-cream-100 px-6 py-24 md:py-32" aria-label="Wedding schedule">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="mx-auto mb-14 max-w-2xl text-center"
      >
        <img src="/icons/cake.svg" alt="" className="mx-auto mb-10 h-20 w-auto text-honey" />
        <h2 className="mt-5 font-heading text-4xl leading-[5rem] text-clay-500 md:break-normal md:text-5xl md:leading-tight">The Schedule</h2>
        
      </motion.div>

      <div className="relative z-10 mx-auto grid max-w-4xl grid-cols-1 gap-10 md:grid-cols-2">
        {days.map((day, dayIdx) => (
          <motion.div
            key={day.label}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeInOut", delay: dayIdx * 0.1 }}
            className="rounded-none border border-clay-600/25 bg-cream-50/60 p-8"
          >
            <p className="font-body text-xs italic uppercase tracking-[0.25em] text-honey">
              {day.label}
            </p>
            <h3 className="mt-1 font-body text-xl italic text-clay-700">{day.date}</h3>
            <p className="mt-1 font-body text-sm text-clay-700/70">{day.venue}</p>

            <ul className="mt-6 space-y-4">
              {day.items.map((item) => (
                <li key={item.title} className="flex items-baseline gap-4">
                  <span className="w-28 shrink-0 font-body text-xs italic uppercase tracking-wider text-honey">
                    {item.time}
                  </span>
                  <span className="font-body text-base text-clay-700/85">{item.title}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 border-t border-clay-600/20 pt-4 font-body text-xs italic uppercase tracking-widest text-clay-700/60">
              Dress code &middot; <span className="font-bold text-clay-700">{day.dressCode}</span>
            </p>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2 }}
        className="relative z-10 mx-auto mt-10 max-w-2xl text-center font-body text-sm text-clay-700/70"
      >
        Getting home on Monday: shuttle buses run back to Seville every 30 minutes
        from 12:30 AM until 3:00 AM.
      </motion.p>
    </section>
  );
}