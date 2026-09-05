"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export type ScheduleVenue = {
  venueName: string;
  venueAddress: string;
  mapUrl: string;
};

const WELCOME_VENUE: ScheduleVenue = {
  venueName: "Casa de Pilatos",
  venueAddress: "Plaza de Pilatos 1, 41003 Sevilla, Spain",
  mapUrl: "https://maps.google.com/?cid=722524835013631915",
};

function buildDays(weddingVenue: ScheduleVenue) {
  return [
    {
      label: "Welcome Evening",
      date: "Sunday, 27 September 2026",
      venue: WELCOME_VENUE,
      dressCode: "Cocktail attire",
      items: [{ time: "8:00 PM – 11:00 PM", title: "Cocktail reception (outdoor courtyard)" }],
    },
    {
      label: "The Wedding",
      date: "Monday, 28 September 2026",
      venue: weddingVenue,
      dressCode: "Black tie",
      items: [
        { time: "5:30 PM", title: "Arrival & welcome drink" },
        { time: "6:00 PM", title: "Ceremony" },
        { time: "7:00 PM", title: "Cocktail hour" },
        { time: "8:30 PM", title: "Dinner followed by dancing" },
      ],
    },
  ];
}

export default function Schedule({ weddingVenue }: { weddingVenue: ScheduleVenue }) {
  const days = buildDays(weddingVenue);

  return (
    <section id="schedule" className="relative scroll-mt-24 overflow-hidden bg-cream-50 px-6 py-24 md:py-32" aria-label="Wedding schedule">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="mx-auto mb-14 max-w-2xl text-center"
      >
        <img src="/icons/cake.svg" alt="" className="mx-auto mb-10 h-20 w-auto text-honey" />
        <h2 className="section-title font-heading text-clay-600">The Schedule</h2>
      </motion.div>

      <div className="relative z-10 mx-auto grid max-w-4xl grid-cols-1 gap-10 md:grid-cols-2">
        {days.map((day, dayIdx) => (
          <motion.div
            key={day.label}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeInOut", delay: dayIdx * 0.1 }}
            className="rounded-none bg-cream-50 p-8"
          >
            <p className="copy-caps text-honey">{day.label}</p>
            <h3 className="mt-1 font-body copy-caps text-clay-700">{day.date}</h3>

            <p className="mt-3 copy-caps text-clay-700/80">{day.venue.venueName}</p>
            <p className="mt-1 copy-caps text-clay-700/60">{day.venue.venueAddress}</p>
            <a
              href={day.venue.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="copy-caps mt-2 inline-flex items-center gap-1 border-b border-clay-600/60 text-clay-700/80 transition-colors duration-200 ease-in-out hover:text-clay-900"
            >
              Get Directions
              <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
            </a>

            <ul className="mt-6 space-y-4">
              {day.items.map((item) => (
                <li key={item.title} className="flex items-baseline gap-4">
                  <span className="copy-caps w-32 shrink-0 text-honey">{item.time}</span>
                  <span className="copy-caps text-clay-700/85">{item.title}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 border-t border-clay-600/20 pt-4 copy-caps text-clay-700/60">
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
        className="copy-caps relative z-10 mx-auto mt-10 max-w-2xl text-center text-clay-700/70"
      >
        Getting home on Monday: shuttle buses run back to Seville every 30 minutes
        from 12:30 AM until 3:00 AM.
      </motion.p>
    </section>
  );
}