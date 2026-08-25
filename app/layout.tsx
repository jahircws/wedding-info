import type { Metadata } from "next";
import { Poppins, DM_Serif_Text } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// Poppins and DM Serif Text are available via next/font/google.
// Fleur De Leah is not bundled with next/font/google in every version, so we
// load it the same way as the brief's @import URL, via a <link> in <head>,
// while still exposing the --font-fleur CSS variable for Tailwind to use.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const dmSerif = DM_Serif_Text({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-dmserif",
  display: "swap",
});

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
    <html lang="en" className={`${poppins.variable} ${dmSerif.variable}`}>
      <head>
        {/* Fleur De Leah script font, loaded exactly as specified in the brief */}
        <link
          href="https://fonts.googleapis.com/css2?family=Fleur+De+Leah&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-ivory font-body text-ink antialiased">{children}</body>
    </html>
  );
}
