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
import { Toaster } from "@/components/ui/sonner";

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
            <Toaster
              toastOptions={{
                unstyled: true,
                classNames: {
                  toast:
                    "bg-white text-gray-800 shadow-lg px-4 py-2 rounded-lg",
                  description: "text-sm text-gray-600",
                  actionButton: "text-blue-600 hover:text-blue-800",
                  closeButton: "text-gray-500 hover:text-gray-700",
                  loader: "bg-blue-600",
                  success: "bg-green-600 text-white",
                  error: "bg-red-600 text-white",
                  info: "bg-blue-500 text-white",
                  warning: "bg-yellow-500 text-white",
                },
              }}
            />
          </ThemeProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
