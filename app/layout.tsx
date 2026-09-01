import type { Metadata } from "next";
import "./globals.css";

// Both fonts the site uses (DM Serif Text + MonteCarlo) are loaded together
// via the single @import at the top of globals.css, per the approved
// courtyard design — no next/font Google Fonts and no extra <link> tags.

function getSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || "https://saraandatef.com";
  // Strip accidental wrapping quotes and a trailing slash in case the env
  // var was pasted with literal quote characters in it.
  const cleaned = raw.trim().replace(/^["']|["']$/g, "").replace(/\/$/, "");
  try {
    return new URL(cleaned).toString();
  } catch {
    return "https://saraandatef.com";
  }
}

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Sara & Atef | September 27–28, 2026 | Seville, Spain",
  description:
    "Join Sara Altamimi and Atef Merhej as they celebrate their wedding on 27–28 September 2026 in Seville, Spain. RSVP and find all the details here.",
  openGraph: {
    title: "Sara & Atef are getting married",
    description:
      "27–28 September 2026, Seville, Spain. RSVP and celebration details inside.",
    url: siteUrl,
    siteName: "Sara & Atef",
    images: [{ url: "/rings_on_flower.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sara & Atef are getting married",
    description: "27–28 September 2026, Seville, Spain.",
    images: ["/rings_on_flower.jpg"],
  },
  alternates: { canonical: siteUrl },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-cream-100 font-body text-clay-700 antialiased">{children}</body>
    </html>
  );
}