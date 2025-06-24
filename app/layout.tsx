import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ThemeToggle from "./components/ThemeToggle";
import ScrollToTop from "./components/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Resin Work - Professional Resin Solutions",
  description:
    "Leading provider of high-quality resin solutions for dental, jewellery, and functional applications.",
  keywords:
    "resin, dental resin, jewellery resin, functional resin, filaments, 3D printing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-primary text-text min-h-screen">
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
        <ThemeToggle />
        <ScrollToTop />
      </body>
    </html>
  );
}
