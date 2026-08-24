import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type RsvpPayload = {
  fullName?: string;
  email?: string;
  attending?: string;
  guestCount?: string;
  mealChoice?: string;
  dietary?: string;
  hotelName?: string;
  checkIn?: string;
  checkOut?: string;
  notes?: string;
};

export async function POST(req: NextRequest) {
  let payload: RsvpPayload;

  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!payload.fullName || !payload.email || !payload.attending) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const submittedAt = new Date().toISOString();
  const record = { ...payload, submittedAt };

  const results = await Promise.allSettled([
    forwardToGoogleSheet(record),
    sendEmailNotification(record),
  ]);

  const sheetResult = results[0];
  const emailResult = results[1];

  const sheetOk = sheetResult.status === "fulfilled" && sheetResult.value;
  const emailOk = emailResult.status === "fulfilled" && emailResult.value;

  // If neither destination is configured/working, log to the server console
  // so the response is never silently lost during setup or a misconfiguration.
  if (!sheetOk && !emailOk) {
    console.log("RSVP submission (no destination configured):", record);
  }

  return NextResponse.json({ ok: true });
}

async function forwardToGoogleSheet(record: Record<string, unknown>) {
  const url = process.env.GOOGLE_SCRIPT_URL;
  if (!url) return false;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(record),
  });

  return res.ok;
}

async function sendEmailNotification(record: Record<string, unknown>) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !to || !from) return false;

  const lines = Object.entries(record)
    .map(([key, value]) => `<tr><td style="padding:4px 12px 4px 0;color:#6B5548;font-family:sans-serif;font-size:13px;text-transform:uppercase;letter-spacing:0.05em;">${key}</td><td style="padding:4px 0;font-family:sans-serif;font-size:14px;">${value ?? ""}</td></tr>`)
    .join("");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject: `New RSVP from ${record.fullName ?? "a guest"}`,
      html: `<table>${lines}</table>`,
    }),
  });

  return res.ok;
}
