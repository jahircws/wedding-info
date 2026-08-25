import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    create: {
      id: "singleton",
      weddingDayOne: new Date("2026-09-27T17:00:00+02:00"),
      weddingDayTwo: new Date("2026-09-28T13:00:00+02:00"),
      venueName: "Real Alcázar Gardens",
      venueAddress: "Patio de Banderas, s/n, 41004 Seville, Spain",
      ceremonyTime: "5:00 PM",
      receptionTime: "8:00 PM",
      mapUrl: "https://maps.google.com/?q=Real+Alcazar+Seville",
    },
    update: {},
  });
  console.log("Seeded default site settings.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
