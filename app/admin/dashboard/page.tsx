import { prisma } from "@/lib/prisma";
import RsvpTable from "@/components/admin/RsvpTable";
import SettingsPanel from "@/components/admin/SettingsPanel";
import LogoutButton from "@/components/admin/LogoutButton";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [parties, settings] = await Promise.all([
    prisma.party.findMany({ orderBy: { createdAt: "desc" }, include: { guests: true } }),
    prisma.siteSettings.findUnique({ where: { id: "singleton" } }),
  ]);

  return (
    <main className="min-h-screen bg-ivory px-6 py-12 md:px-12">
      <div className="mx-auto max-w-6xl space-y-12">
        <header className="flex items-center justify-between">
          <h1 className="font-script text-4xl text-blush-500">Wedding Admin</h1>
          <LogoutButton />
        </header>

        <SettingsPanel
          initialSettings={
            settings
              ? {
                  weddingDayOne: settings.weddingDayOne.toISOString().slice(0, 16),
                  weddingDayTwo: settings.weddingDayTwo.toISOString().slice(0, 16),
                  venueName: settings.venueName,
                  venueAddress: settings.venueAddress,
                  ceremonyTime: settings.ceremonyTime,
                  receptionTime: settings.receptionTime,
                  mapUrl: settings.mapUrl,
                }
              : null
          }
        />

        <RsvpTable
          initialParties={parties.map((p) => ({
            id: p.id,
            mainName: p.mainName,
            email: p.email,
            hotel: p.hotel,
            foodNotes: p.foodNotes,
            attending: p.attending,
            status: p.status as "PENDING" | "APPROVED" | "DECLINED",
            guests: p.guests.map((g) => ({
              id: g.id,
              fullName: g.fullName,
              age: g.age,
              gender: g.gender,
              foodNotes: g.foodNotes,
              status: g.status as "PENDING" | "APPROVED" | "DECLINED",
            })),
          }))}
        />
      </div>
    </main>
  );
}
