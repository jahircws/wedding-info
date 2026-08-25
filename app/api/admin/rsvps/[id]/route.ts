import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { statusUpdateSchema } from "@/lib/validations";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const json = await request.json().catch(() => null);
  const parsed = statusUpdateSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
  }

  const { targetType, status } = parsed.data;
  const { id } = params;

  try {
    if (targetType === "party") {
      await prisma.party.update({ where: { id }, data: { status } });
    } else {
      await prisma.guest.update({ where: { id }, data: { status } });
    }
    return NextResponse.json({ message: "Updated" });
  } catch (err) {
    console.error("Failed to update status", err);
    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }
}
