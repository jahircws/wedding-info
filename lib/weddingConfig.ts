// ─────────────────────────────────────────────────────────────────
// EDIT ME: everything guests see on the site is driven from here.
// Change text, dates, hotels, meal choices, or registry links below —
// no need to touch any component files for routine updates.
// ─────────────────────────────────────────────────────────────────

export const wedding = {
  coupleNames: {
    partnerOne: "Amara",
    partnerTwo: "Julian",
  },
  weddingDate: "2027-05-15", // ISO date, used for the countdown/date display
  displayDate: "May 15, 2027",
  rsvpDeadline: "March 1, 2027",
  venue: {
    ceremony: {
      name: "The Rusted Olive Estate",
      address: "412 Sierra Grove Road, Ojai, CA",
      time: "4:30 PM",
    },
    reception: {
      name: "The Rusted Olive Estate — Courtyard",
      time: "6:00 PM",
    },
  },
  hotels: [
    {
      name: "Ojai Valley Inn",
      note: "Room block available under 'Amara & Julian' — book by April 1, 2027.",
      link: "https://www.ojaivalleyinn.com",
    },
    {
      name: "The Emerald Iguana Inn",
      note: "Boutique option, a short drive from the venue.",
      link: "https://www.emeraldiguana.com",
    },
  ],
  registry: [
    {
      store: "Crate & Barrel",
      link: "https://www.crateandbarrel.com",
    },
    {
      store: "Our Honeymoon Fund",
      link: "https://www.honeyfund.com",
    },
  ],
  mealOptions: [
    "Herb-Roasted Chicken",
    "Pan-Seared Salmon",
    "Wild Mushroom Risotto (Vegetarian)",
    "Grilled Vegetable Plate (Vegan)",
  ],
} as const;
