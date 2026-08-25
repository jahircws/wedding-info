import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const parties = await prisma.party.findMany({
    orderBy: { createdAt: "desc" },
    include: { guests: true },
  });

  return NextResponse.json({ parties });
}
