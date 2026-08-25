import { NextRequest, NextResponse } from "next/server";
import { adminLoginSchema } from "@/lib/validations";
import { verifyAdminCredentials, createAdminSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const json = await request.json().catch(() => null);
  const parsed = adminLoginSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ message: "Email and password are required." }, { status: 400 });
  }

  const { email, password } = parsed.data;

  if (!verifyAdminCredentials(email, password)) {
    return NextResponse.json({ message: "Invalid credentials." }, { status: 401 });
  }

  await createAdminSession(email);
  return NextResponse.json({ message: "Logged in" });
}
