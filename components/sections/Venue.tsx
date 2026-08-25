"use client";

import { motion } from "framer-motion";

export type VenueInfo = {
  venueName: string;
  venueAddress: string;
  ceremonyTime: string;
  receptionTime: string;
  mapUrl: string;
  dateLabel: string;
};

export default function Venue({ venue }: { venue: VenueInfo }) {
  return (
    <section
      id="venue"
      className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-ink px-6 py-24"
      aria-label="Wedding venue"
    >
      <div
        className="absolute inset-0 bg-[url('/chapel.jpg')] bg-cover bg-center"
        role="img"
        aria-label="The chapel in Seville, Spain where the ceremony will be held"
      />
      <div className="absolute inset-0 bg-ink/45" />

      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="frosted-card relative z-10 mx-auto w-full max-w-lg rounded-2xl p-8 text-center shadow-xl md:p-12"
      >
        <p className="section-heading mb-3 text-ink/70">The Venue</p>
        <h2 className="font-script text-4xl text-blush-500 md:text-5xl">{venue.venueName}</h2>
        <p className="mt-4 font-body text-base text-ink/90 md:text-lg">{venue.venueAddress}</p>

        <div className="mt-6 flex flex-col gap-2 font-heading text-sm uppercase tracking-widest text-ink/80">
          <span>{venue.dateLabel}</span>
          <span>Ceremony &middot; {venue.ceremonyTime}</span>
          <span>Reception &middot; {venue.receptionTime}</span>
        </div>

        <a
          href={venue.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-full border border-gold px-8 py-3 font-heading text-xs uppercase tracking-[0.2em] text-gold transition-colors duration-300 ease-out hover:bg-gold hover:text-ivory"
        >
          Get Directions
        </a>
      </motion.div>
    </section>
  );
}
