import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import MobileNav from "@/components/ui/MobileNav";

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

const ogImageUrl = `${siteUrl}/og-image.png`;

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
    images: [
      {
        url: ogImageUrl,
        secureUrl: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Sara & Atef — 27–28 September 2026, Seville, Spain",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sara & Atef are getting married",
    description: "27–28 September 2026, Seville, Spain.",
    images: [ogImageUrl],
  },
  alternates: { canonical: siteUrl },
  icons: {
    icon: [
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/icons/site.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-body antialiased">
        <MobileNav />
        {children}
      </body>
    </html>
  );
}