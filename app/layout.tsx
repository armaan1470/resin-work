import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ThemeToggle from "../components/theme-toggle";
import ScrollToTop from "../components/scroll-to-top";
import { ThemeProvider } from "../components/theme-provider";
import SmoothScroll from "@/components/smooth-scroll";
import { satoshi } from "@/lib/fonts";

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
      <body
        className={`${satoshi.variable} font-satoshi antialiased bg-primary text-text min-h-screen scrollbar-hidden`}
      >
        <SmoothScroll>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className="pt-16">{children}</main>
            <Footer />
            <ThemeToggle />
            <ScrollToTop />
          </ThemeProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
