import type { Metadata } from "next";
import { Geist } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const siteUrl = "https://sortirose.fr";
const siteTitle = "SortiRose — L'agenda culturel de Toulouse";
const siteDescription =
  "Toutes les sorties, concerts, expos et festivals de Toulouse au meme endroit. Gratuit, sans pub, alimente par l'Open Data de Toulouse Metropole.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "sorties Toulouse",
    "agenda culturel Toulouse",
    "evenements Toulouse",
    "concerts Toulouse",
    "que faire a Toulouse",
  ],
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "SortiRose",
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/images/hero-toulouse.png", width: 1024, height: 683 }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/images/hero-toulouse.png"],
  },
  icons: {
    icon: "/images/sortirose-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
