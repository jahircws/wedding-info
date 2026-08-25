import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { siteSettingsSchema } from "@/lib/validations";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const settings = await prisma.siteSettings.findUnique({ where: { id: "singleton" } });
  return NextResponse.json({ settings });
}

export async function PUT(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const json = await request.json().catch(() => null);
  const parsed = siteSettingsSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid settings payload" }, { status: 422 });
  }

  const data = parsed.data;

  const settings = await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    create: {
      id: "singleton",
      weddingDayOne: new Date(data.weddingDayOne),
      weddingDayTwo: new Date(data.weddingDayTwo),
      venueName: data.venueName,
      venueAddress: data.venueAddress,
      ceremonyTime: data.ceremonyTime,
      receptionTime: data.receptionTime,
      mapUrl: data.mapUrl,
    },
    update: {
      weddingDayOne: new Date(data.weddingDayOne),
      weddingDayTwo: new Date(data.weddingDayTwo),
      venueName: data.venueName,
      venueAddress: data.venueAddress,
      ceremonyTime: data.ceremonyTime,
      receptionTime: data.receptionTime,
      mapUrl: data.mapUrl,
    },
  });

  return NextResponse.json({ message: "Settings updated", settings });
}
