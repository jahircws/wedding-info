import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    create: {
      id: "singleton",
      weddingDayOne: new Date("2026-09-27T17:00:00+02:00"),
      weddingDayTwo: new Date("2026-09-28T13:00:00+02:00"),
      venueName: "Hacienda La Soledad",
      venueAddress: "A-8026, 41500 Alcalá de Guadaíra, Sevilla, Spain",
      ceremonyTime: "5:30 PM",
      receptionTime: "8:10 PM",
      mapUrl: "https://share.google/EwlhDFQvPL2o2MvTz",
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