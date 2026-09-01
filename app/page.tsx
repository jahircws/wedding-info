import { prisma } from "@/lib/prisma";
import JsonLd from "@/components/JsonLd";
import EnvelopeIntro from "@/components/sections/EnvelopeIntro";
import CouplePortraits from "@/components/sections/CouplePortraits";
import Venue from "@/components/sections/Venue";
import OurStory from "@/components/sections/OurStory";
import Schedule from "@/components/sections/Schedule";
import Gifts from "@/components/sections/Gifts";
import RsvpForm from "@/components/sections/RsvpForm";
import GuestListModal from "@/components/sections/GuestListModal";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";

// Site settings are admin-editable and read fresh on every request so
// changes in /admin/dashboard reflect on the live site without a redeploy.
export const dynamic = "force-dynamic";

const FALLBACK_SETTINGS = {
  weddingDayOne: new Date("2026-09-27T20:00:00+02:00"),
  weddingDayTwo: new Date("2026-09-28T17:00:00+02:00"),
  venueName: "Hacienda La Soledad",
  venueAddress: "A-8026, 41500 Alcalá de Guadaíra, Sevilla, Spain",
  ceremonyTime: "5:30 PM",
  receptionTime: "8:10 PM",
  mapUrl: "https://maps.google.com/?cid=16296625564652064420",
};

async function getSettings() {
  try {
    const settings = await prisma.siteSettings.findUnique({ where: { id: "singleton" } });
    return settings ?? FALLBACK_SETTINGS;
  } catch {
    // DB not yet provisioned (e.g. first local run before `npm run db:push`)
    return FALLBACK_SETTINGS;
  }
}

export default async function HomePage() {
  const settings = await getSettings();

  return (
    <main>
      <JsonLd
        startDate={settings.weddingDayOne.toISOString()}
        endDate={settings.weddingDayTwo.toISOString()}
        venueName={settings.venueName}
        venueAddress={settings.venueAddress}
      />
      <Hero />
      <Venue
        venue={{
          label: "The Wedding",
          venueName: settings.venueName,
          venueAddress: settings.venueAddress,
          timeLabel: `Ceremony \u00b7 ${settings.ceremonyTime}`,
          mapUrl: settings.mapUrl,
          dateLabel: "Monday, 28 September 2026",
        }}
      />
      <Schedule />
      <Gifts />
      <RsvpForm />
      <GuestListModal />
      <FAQ />
      <Footer />
    </main>
  );
}