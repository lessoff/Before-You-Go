import type { Metadata } from "next";
import { Nunito, DM_Sans, Space_Mono } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Before You Go — Destination Briefing",
  description:
    "Get vital travel information about any country: local time, safety, weather, phrases, customs, dishes, power plugs, and transport apps.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} ${dmSans.variable} ${spaceMono.variable}`}>{children}</body>
    </html>
  );
}
