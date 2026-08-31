"use client";

import { motion } from "framer-motion";
import SectionOrnament from "@/components/ui/SectionOrnament";

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
      className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-ink px-6 py-24"
      aria-label="Wedding venues"
    >
      <div
        className="absolute inset-0 bg-[url('/chapel.jpg')] bg-cover bg-center"
        role="img"
        aria-label="A traditional Andalusian estate near Seville, Spain, where the wedding will be held"
      />
      <div className="absolute inset-0 bg-ink/45" />

      <div className="relative z-10 mx-auto grid w-full max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
        {venues.map((v, i) => (
          <motion.div
            key={v.venueName}
            initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.12 }}
            className="frosted-card relative mx-auto w-full max-w-lg rounded-2xl p-8 text-center shadow-xl md:p-10"
          >
            {/* Fine gold corner accents, echoing an invitation card */}
            <span className="pointer-events-none absolute left-3 top-3 h-8 w-8 rounded-tl-lg border-l border-t border-gold/50" />
            <span className="pointer-events-none absolute bottom-3 right-3 h-8 w-8 rounded-br-lg border-b border-r border-gold/50" />

            <p className="section-heading mb-3 text-ink/70">{v.label}</p>
            <h2 className="font-script tracking-wide text-3xl text-blush-500 md:text-4xl">{v.venueName}</h2>
            <SectionOrnament className="mt-4" />
            <p className="mt-5 font-body text-base text-ink/90">{v.venueAddress}</p>

            <div className="mt-6 flex flex-col gap-2 font-heading text-sm uppercase tracking-widest text-ink/80">
              <span>{v.dateLabel}</span>
              <span>{v.timeLabel}</span>
            </div>

            <a
              href={v.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-full border border-gold px-8 py-3 font-heading text-xs uppercase tracking-[0.2em] text-gold transition-colors duration-300 ease-out hover:bg-gold hover:text-ivory"
            >
              Get Directions
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}