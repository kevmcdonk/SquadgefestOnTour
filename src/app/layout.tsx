import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Squadgefest 2026 — Suffolk's Best Backyard Festival",
  description:
    "Squadgefest is a backyard festival in Suffolk, UK, happening on the same glorious weekend as Latitude. Music, talks, food, crafts, and brilliant people.",
  openGraph: {
    title: "Squadgefest 2026",
    description: "Suffolk's best backyard festival. Same weekend as Latitude.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-festival-bg">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
