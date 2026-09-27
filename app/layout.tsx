import type { Metadata } from "next";
import { Anybody, Azeret_Mono, Public_Sans } from "next/font/google";
import CoreDefs from "@/components/CoreDefs";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const anybody = Anybody({
  variable: "--font-anybody",
  subsets: ["latin"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

const azeretMono = Azeret_Mono({
  variable: "--font-azeret-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Creative Core — Design / Technology / Growth",
    template: "%s — Creative Core",
  },
  description:
    "Creative Core is a B2B creative technology studio: brand identity, digital products and growth, connected as one system.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${anybody.variable} ${publicSans.variable} ${azeretMono.variable}`}
    >
      <body>
        <CoreDefs />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
