import type { Metadata } from "next";
import { Afacad, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"; // if using 'sonner'
// import Footer from "@/components/Footer";
// import Navbar from "@/components/Navbar";
import SessionProviderWrapper from "./providers/SessionProviderWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Orpamax",
  description: "Small to Care, Big in Delivery",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
          {/* <Navbar/> */}
          {children}
          <Toaster richColors />
          {/* <Footer/> */}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
