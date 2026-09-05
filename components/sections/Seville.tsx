"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ATTRACTIONS = [
  {
    name: "Royal Alcázar of Seville",
    description:
      "UNESCO Heritage Site blending Islamic and European history and one of Spain's most beautiful landmarks.",
    image: "/royal-alcazar-of-seville.png",
  },
  {
    name: "Palacio de las Dueñas",
    description:
      "Palace built in the late 15th century in the Renaissance style with Gothic and Moorish influences.",
    image: "/palacio-las-duenas.png",
  },
  {
    name: "Plaza de España",
    description:
      "Seville landmark square with a large water feature, seats with painted ceramic tiles & an ornate pavilion.",
    image: "/plaza-de-espana.png",
  },
  {
    name: "Cathedral of Seville",
    description:
      "UNESCO Heritage Site and largest gothic Cathedral in the world, which is also the resting place of Christopher Columbus.",
    image: "/cathedral of-seville.png",
  },
];

export default function Seville() {
  return (
    <section id="seville" className="relative scroll-mt-24 overflow-hidden bg-cream-100 px-6 py-24 md:py-32" aria-label="Things to visit in Seville">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="relative z-10 mx-auto mb-14 max-w-2xl text-center"
      >
        <img src="/icons/compass.svg" alt="" aria-hidden="true" className="mx-auto mb-10 h-20 w-auto text-honey" />
        <h2 className="section-title font-heading text-clay-600">Things to Visit</h2>
      </motion.div>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col gap-10">
        {ATTRACTIONS.map((place, i) => (
          <motion.div
            key={place.name}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeInOut", delay: i * 0.1 }}
            className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8"
          >
            <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-sm sm:aspect-square sm:w-48 md:w-56">
              <Image
                src={place.image}
                alt={place.name}
                fill
                sizes="(max-width: 640px) 100vw, 224px"
                className="object-cover"
              />
            </div>

            <div className="border-l-2 border-clay-600/30 pl-5 sm:border-l-0 sm:pl-0">
              <p className="copy-caps text-clay-700">{place.name}</p>
              <p className="copy-caps mt-2 text-clay-700/70">{place.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}