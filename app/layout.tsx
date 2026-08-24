import type { Metadata } from "next";
import { wedding } from "@/lib/weddingConfig";
import "./globals.css";

export const metadata: Metadata = {
  title: `${wedding.coupleNames.partnerOne} & ${wedding.coupleNames.partnerTwo}`,
  description: `Wedding details, accommodations, and RSVP for ${wedding.coupleNames.partnerOne} & ${wedding.coupleNames.partnerTwo} — ${wedding.displayDate}`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
