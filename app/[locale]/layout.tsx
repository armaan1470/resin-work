import type { Metadata } from "next";
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
import Script from "next/script";

// Generate static params for all locales
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  // Await params if using Next.js 15+
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  // Access nested metadata properties correctly
  const metadata = messages.metadata as any;

  return {
    title: metadata?.title || "Resin Work - Professional Resin Solutions",
    description:
      metadata?.description ||
      "Leading provider of high-quality resin solutions",
    keywords: metadata?.keywords || "resin, dental resin, jewellery resin",
    // Add Open Graph metadata for better social sharing
    openGraph: {
      title: metadata?.title || "Resin Work - Professional Resin Solutions",
      description:
        metadata?.description ||
        "Leading provider of high-quality resin solutions",
      type: "website",
      locale: locale,
    },
    // Add Twitter Card metadata
    twitter: {
      card: "summary_large_image",
      title: metadata?.title || "Resin Work - Professional Resin Solutions",
      description:
        metadata?.description ||
        "Leading provider of high-quality resin solutions",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Await params if using Next.js 15+
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <Script id="zoho-init" strategy="beforeInteractive">
          {`
            window.$zoho=window.$zoho || {};
            $zoho.salesiq=$zoho.salesiq||{ready:function(){}}
          `}
        </Script>
        <Script
          id="zsiqscript"
          src="https://salesiq.zohopublic.in/widget?wc=siqdf0a2d378d98ce250c5ed02dd748fdb10571bacd1b57a741ac0c8bc8ed5749c9"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${satoshi.variable} font-satoshi antialiased bg-primary text-text min-h-screen scrollbar-hidden`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
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
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
