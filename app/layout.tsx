import type { Metadata } from "next";
import { Afacad, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import SessionProviderWrapper from "./providers/SessionProviderWrapper";
import Head from "next/head";

// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const afacad = Afacad({
  variable: "--font-afacad",
  subsets: ["latin"],
});

// SEO metadata
export const metadata: Metadata = {
  title: "Orpamax | Translation & Cleaning Services",
  description: "Orpamax offers professional translation and commercial cleaning services. Small to care, big in delivery.",
  keywords: [
    "Orpamax",
    "Translation Services",
    "Cleaning Services",
    "Commercial Cleaning",
    "Multilingual Translation",
    "Professional Interpreters",
    "Office Cleaning",
    "Deep Cleaning",
    "Services",
    "Cleaning"
  ],
  authors: [{ name: "Patrick Bakajika", url: "https://orpamax.org" }],
  creator: "Orpamax",
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: "https://orpamax.org",
    title: "Orpamax | Translation & Cleaning Services",
    description: "Small to care, big in delivery.",
    siteName: "Orpamax",
    images: [
      {
        url: "https://orpamax.org/",
        width: 1200,
        height: 630,
        alt: "Orpamax Logo",
      },
    ],
  },
  icons: {
    icon: "./icononly.png",
    shortcut: "./icononly.png",
    apple: "./icononly.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${afacad.variable}`}>
      <Head>
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAP_API_KEY}&libraries=maps,marker`}
          async
          defer
        />
      </Head>
      <body>
        <SessionProviderWrapper>
          {/* <Navbar /> */}
          {children}
          <Toaster richColors />
          {/* <Footer /> */}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
