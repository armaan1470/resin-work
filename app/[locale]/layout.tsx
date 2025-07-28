import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import ThemeToggle from "../../components/theme-toggle";
import ScrollToTop from "../../components/scroll-to-top";
import { ThemeProvider } from "../../components/theme-provider";
import SmoothScroll from "@/components/smooth-scroll";
import { satoshi } from "@/lib/fonts";
import { Toaster } from "@/components/ui/sonner";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const messages = await getMessages(); // loads locale JSON
  return {
    title: messages["metadata.title"],
    description: messages["metadata.description"],
    keywords: messages["metadata.keywords"],
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const message = await getMessages();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${satoshi.variable} font-satoshi antialiased bg-primary text-text min-h-screen scrollbar-hidden`}
      >
        <NextIntlClientProvider messages={message}>
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
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
