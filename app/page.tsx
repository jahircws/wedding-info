import { prisma } from "@/lib/prisma";
import JsonLd from "@/components/JsonLd";
import EnvelopeIntro from "@/components/sections/EnvelopeIntro";
import CouplePortraits from "@/components/sections/CouplePortraits";
import Venue from "@/components/sections/Venue";
import OurStory from "@/components/sections/OurStory";
import Schedule from "@/components/sections/Schedule";
import RsvpForm from "@/components/sections/RsvpForm";
import GuestListModal from "@/components/sections/GuestListModal";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";

// Site settings are admin-editable and read fresh on every request so
// changes in /admin/dashboard reflect on the live site without a redeploy.
export const dynamic = "force-dynamic";

const FALLBACK_SETTINGS = {
  weddingDayOne: new Date("2026-09-27T17:00:00+02:00"),
  weddingDayTwo: new Date("2026-09-28T13:00:00+02:00"),
  venueName: "Real Alcázar Gardens",
  venueAddress: "Patio de Banderas, s/n, 41004 Seville, Spain",
  ceremonyTime: "5:00 PM",
  receptionTime: "8:00 PM",
  mapUrl: "https://maps.google.com/?q=Real+Alcazar+Seville",
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

  const dateLabel = "27 \u2013 28 September 2026";

  return (
    <main>
      <JsonLd
        startDate={settings.weddingDayOne.toISOString()}
        endDate={settings.weddingDayTwo.toISOString()}
        venueName={settings.venueName}
        venueAddress={settings.venueAddress}
      />
      <EnvelopeIntro />
      <CouplePortraits />
      <Venue
        venue={{
          venueName: settings.venueName,
          venueAddress: settings.venueAddress,
          ceremonyTime: settings.ceremonyTime,
          receptionTime: settings.receptionTime,
          mapUrl: settings.mapUrl,
          dateLabel,
        }}
      />
      <OurStory />
      <Schedule />
      <RsvpForm />
      <GuestListModal />
      <FAQ />
      <Footer />
    </main>
  );
}
