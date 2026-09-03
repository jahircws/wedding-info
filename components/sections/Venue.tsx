"use client";

import { motion } from "framer-motion";
import SectionOrnament from "@/components/ui/SectionOrnament";
import DirectionsSketch from "@/components/ui/DirectionsSketch";

export type VenueInfo = {
  label: string;
  dateLabel: string;
  venueName: string;
  venueAddress: string;
  mapUrl: string;
  timeLabel: string;
};

const WELCOME_VENUE: VenueInfo = {
  label: "Welcome Evening",
  dateLabel: "Sunday, 27 September 2026",
  venueName: "Casa de Pilatos",
  venueAddress: "Plaza de Pilatos 1, 41003 Sevilla, Spain",
  mapUrl: "https://maps.google.com/?cid=722524835013631915",
  timeLabel: "From 8:00 PM",
};

export default function Venue({ venue }: { venue: VenueInfo }) {
  const venues = [WELCOME_VENUE, venue];

  return (
    <section
      id="venue"
      className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-clay-800 px-6 py-24"
      aria-label="Wedding venues"
    >
      <div
        className="absolute inset-0  bg-[url('/bg-venue-mobile.png')] md:bg-[url('/bg-venue-desktop.png')] bg-cover bg-center"
        role="img"
        aria-label="A traditional Andalusian estate near Seville, Spain, where the wedding will be held"
      />
      <div className="absolute inset-0 bg-clay-800/55" />

      <div className="relative z-10 mx-auto w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <DirectionsSketch className="mx-auto h-20 w-20 text-cream-100/80" />
          <h2 className="mt-3 font-heading text-4xl text-cream-50 leading-[5rem] md:break-normal md:text-5xl md:leading-tight">The Venues</h2>
          <SectionOrnament className="mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {venues.map((v, i) => (
            <motion.div
              key={v.venueName}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: i * 0.12 }}
              className="relative mx-auto flex w-full max-w-lg flex-col items-center p-8 text-center"
            >
              <p className="text-xs italic uppercase tracking-[0.22em] text-honey md:text-sm">{v.label}</p>
            <h3 className="mt-2 font-body text-2xl text-cream-50 [text-shadow:0_2px_14px_rgba(0,0,0,0.6)] md:text-3xl">
              {v.venueName}
            </h3>
            <p className="mt-5 font-body text-base text-cream-50/90 [text-shadow:0_1px_10px_rgba(0,0,0,0.55)]">
              {v.venueAddress}
            </p>

            <div className="mt-6 flex flex-col gap-2 font-body text-sm italic uppercase tracking-widest text-cream-50/80">
              <span>{v.dateLabel}</span>
              <span>{v.timeLabel}</span>
            </div>

            <a
              href={v.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block border border-cream-50/50 px-8 py-3 font-body text-xs italic uppercase tracking-[0.2em] text-cream-50 transition-colors duration-300 ease-in-out hover:bg-cream-50 hover:text-clay-800"
            >
              Get Directions
            </a>
          </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}