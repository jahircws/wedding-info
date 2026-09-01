import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rsvpSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = rsvpSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Please check the form for errors.", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const {
    mainName,
    email,
    phone,
    attendingSunday,
    attendingMonday,
    hotel,
    shuttleToHacienda,
    shuttleBack,
    shuttleBackTime,
    menuChoice,
    foodNotes,
    songRequest,
    notes,
    guests,
  } = parsed.data;

  try {
    const party = await prisma.party.create({
      data: {
        mainName,
        email,
        phone: phone || null,
        attendingSunday,
        attendingMonday,
        hotel: hotel || null,
        shuttleToHacienda,
        shuttleBack,
        shuttleBackTime: shuttleBack ? shuttleBackTime || null : null,
        menuChoice: menuChoice || null,
        foodNotes: foodNotes || null,
        songRequest: songRequest || null,
        notes: notes || null,
        guests: {
          create: guests.map((g) => ({
            fullName: g.fullName,
            attendingSunday: g.attendingSunday,
            attendingMonday: g.attendingMonday,
            shuttleToHacienda: g.shuttleToHacienda,
            shuttleBack: g.shuttleBack,
            shuttleBackTime: g.shuttleBack ? g.shuttleBackTime || null : null,
            menuChoice: g.menuChoice || null,
            foodNotes: g.foodNotes || null,
          })),
        },
      },
      include: { guests: true },
    });

    return NextResponse.json({ message: "RSVP received", partyId: party.id }, { status: 201 });
  } catch (err) {
    console.error("Failed to save RSVP", err);
    return NextResponse.json(
      { message: "We couldn't save your RSVP. Please try again." },
      { status: 500 }
    );
  }
}