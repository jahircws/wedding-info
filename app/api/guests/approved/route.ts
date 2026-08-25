import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [approvedParties, approvedGuests] = await Promise.all([
      prisma.party.findMany({
        where: { status: "APPROVED" },
        select: { id: true, mainName: true },
      }),
      prisma.guest.findMany({
        where: { status: "APPROVED" },
        select: { id: true, fullName: true },
      }),
    ]);

    const guests = [
      ...approvedParties.map((p) => ({ id: `party-${p.id}`, name: p.mainName })),
      ...approvedGuests.map((g) => ({ id: `guest-${g.id}`, name: g.fullName })),
    ].sort((a, b) => a.name.localeCompare(b.name));

    return NextResponse.json({ guests });
  } catch (err) {
    console.error("Failed to load approved guests", err);
    return NextResponse.json({ guests: [] }, { status: 200 });
  }
}
