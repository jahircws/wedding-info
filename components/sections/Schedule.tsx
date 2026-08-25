"use client";

import { motion } from "framer-motion";

const days = [
  {
    label: "Day One",
    date: "Sunday, 27 September 2026",
    items: [
      { time: "4:00 PM", title: "Guest Arrival & Welcome" },
      { time: "5:00 PM", title: "Ceremony" },
      { time: "6:30 PM", title: "Cocktail Hour" },
      { time: "8:00 PM", title: "Reception Dinner & Dancing" },
    ],
  },
  {
    label: "Day Two",
    date: "Monday, 28 September 2026",
    items: [
      { time: "11:00 AM", title: "Farewell Brunch" },
      { time: "1:00 PM", title: "Garden Send-off" },
    ],
  },
];

export default function Schedule() {
  return (
    <section id="schedule" className="bg-ivory px-6 py-24 md:py-32" aria-label="Wedding schedule">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mx-auto mb-14 max-w-2xl text-center"
      >
        <p className="section-heading mb-3">Two Days to Celebrate</p>
        <h2 className="font-script text-4xl text-blush-500 md:text-5xl">The Schedule</h2>
      </motion.div>

      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-10 md:grid-cols-2">
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
            <ul className="mt-6 space-y-4">
              {day.items.map((item) => (
                <li key={item.title} className="flex items-baseline gap-4">
                  <span className="w-20 shrink-0 font-heading text-xs uppercase tracking-wider text-gold">
                    {item.time}
                  </span>
                  <span className="font-body text-base text-ink/85">{item.title}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
