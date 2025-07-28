"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Search,
  Menu,
  ChevronRight,
  Globe,
  Check,
  Loader2,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import navData from "@/data/nav-links.json";
import { useNavigation } from "@/hooks/useNavigation";
import SearchOverlay from "./search-overlay";
import { useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

interface Product {
  id: number;
  name: string;
  navic_id: string;
  description: string;
}

interface NavItem {
  name: string;
  href: string;
  hasSubmenu: boolean;
  image?: string;
  products?: Product[];
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [isChangingLanguage, setIsChangingLanguage] = useState(false);
  const navItems: NavItem[] = navData.navItems;
  const router = useRouter();

  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const toggleLocale = locale === "en" ? "de" : "en";
  const changeLocale = async () => {
    setIsChangingLanguage(true);
    try {
      // preserve current path and query parameters
      const query = Object.fromEntries(searchParams.entries());
      await router.push({ pathname, query }, { locale: toggleLocale });
    } catch (error) {
      console.error("Language change failed:", error);
    } finally {
      // Reset loading state after a short delay to ensure smooth transition
      setTimeout(() => setIsChangingLanguage(false), 500);
    }
  };

  const { handleSectionClick, isNavigating } = useNavigation({
    debug: process.env.NODE_ENV === "development",
  });

  const handlePartnerWithUs = () => {
    handleNavClick();
    window.open(
      "https://outlook.office.com/book/Resinwork@3akchemie.com/?ismsaljsauthenabled",
      "_blank"
    );
  };

  const handleNavClick = () => {
    setIsOpen(false);
    setOpenSubmenu(null);
  };

  const handleSubmenuEnter = (itemName: string) => {
    setOpenSubmenu(itemName);
  };

  const handleSubmenuLeave = () => {
    setOpenSubmenu(null);
  };

  const handleProductClick = (basePath: string, sectionId: string) => {
    handleNavClick();
    handleSectionClick(
      basePath,
      sectionId,
      () => {
        console.log(`🚀 Navigating to ${basePath}#${sectionId}`);
      },
      () => {
        console.log(`✅ Navigation complete`);
      }
    );
  };

  const handleSearch = (query: string) => {
    router.push(`/products/${encodeURIComponent(query)}`);
  };

  return (
    <header className="fixed top-0 z-50 w-full">
      <nav className="border-b border-white/30 bg-black/50 backdrop-blur-[3rem] shadow-sm">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-17">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <Image
                  src="/logo2.svg"
                  alt="Resin Work"
                  width={200}
                  height={48}
                  quality={100}
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-14 px-6">
              <div className="flex space-x-2 xl:space-x-4">
                {navItems.map((item) => (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() =>
                      item.hasSubmenu && handleSubmenuEnter(item.name)
                    }
                    onMouseLeave={() => item.hasSubmenu && handleSubmenuLeave()}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center text-white hover:text-brand px-3 py-2 rounded-md text-sm transition-colors group"
                    >
                      {item.name}
                      {item.hasSubmenu && (
                        <ChevronRight
                          className={`ml-1 h-3 w-3 transition-transform duration-300 ${
                            openSubmenu === item.name ? "rotate-90" : "rotate-0"
                          }`}
                        />
                      )}
                    </Link>
                    {item.hasSubmenu && item.products && (
                      <div
                        className={`fixed left-0 right-0 bg-black/70 backdrop-blur-lg h-screen shadow-lg transition-all duration-500 z-50 ${
                          openSubmenu === item.name
                            ? "opacity-100 translate-y-0 pointer-events-auto"
                            : "opacity-0 -translate-y-3 pointer-events-none"
                        }`}
                      >
                        <div className="w-full mx-auto px-16 py-16 bg-[var(--bg-primary)]">
                          <div className="grid grid-cols-12 gap-8">
                            <div className="col-span-4 flex justify-start items-center">
                              {item.image && (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="rounded-lg w-full h-full object-cover"
                                />
                              )}
                            </div>
                            <div className="col-span-8 grid grid-cols-3 grid-rows-2 gap-6">
                              {item.products.slice(0, 6).map((product) => (
                                <div
                                  key={product.id}
                                  onClick={() =>
                                    handleProductClick(
                                      item.href,
                                      product.navic_id
                                    )
                                  }
                                  className={`block h-full cursor-pointer transition-all duration-200 ${
                                    isNavigating
                                      ? "opacity-50 pointer-events-none scale-95"
                                      : "hover:opacity-80 hover:scale-105"
                                  }`}
                                >
                                  <div className="bg-[var(--bg-accent)] rounded-2xl h-full p-8 transition-all duration-200">
                                    <h3 className="text-[var(--color-primary)] text-[1.62rem] font-semibold">
                                      {product.name}
                                    </h3>
                                    {product.description && (
                                      <p className="text-[13px] leading-[23px] text-[#848484] line-clamp-3">
                                        {product.description}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div
                          onMouseEnter={handleSubmenuLeave}
                          className="h-full w-full"
                        ></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Right side - Desktop */}
              <div className="flex items-center space-x-3 xl:space-x-4">
                <div className="relative group">
                  <Button
                    variant="ghost"
                    className={`flex items-center gap-2 px-3 py-2 text-white hover:text-brand hover:bg-white/10 rounded-lg transition-all duration-200 border border-white/20 hover:border-brand/50 backdrop-blur-sm ${
                      isChangingLanguage ? "opacity-75 cursor-not-allowed" : ""
                    }`}
                    onClick={changeLocale}
                    disabled={isChangingLanguage}
                    aria-label={`Switch language to ${
                      toggleLocale === "en" ? "English" : "Deutsch"
                    }`}
                  >
                    {isChangingLanguage ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Globe className="size-4" />
                    )}
                    <span className="text-sm font-medium">
                      {locale === "en" ? "EN" : "DE"}
                    </span>
                    {!isChangingLanguage && (
                      <div className="flex items-center gap-1">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            locale === "en"
                              ? "bg-blue-500"
                              : "bg-transparent border border-white/40"
                          }`}
                        />
                        <div
                          className={`w-2 h-2 rounded-full ${
                            locale === "de"
                              ? "bg-red-500"
                              : "bg-transparent border border-white/40"
                          }`}
                        />
                      </div>
                    )}
                  </Button>

                  {/* Tooltip - Now appears from bottom */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-black/80 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap backdrop-blur-sm z-50">
                    {isChangingLanguage
                      ? "Switching language..."
                      : `Switch to ${
                          toggleLocale === "en" ? "English" : "Deutsch"
                        }`}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-black/80" />
                  </div>
                </div>
                <Button
                  variant="ghost"
                  className="p-0 cursor-pointer text-white hover:bg-transparent"
                  onClick={() => setSearchOpen(true)}
                  aria-label="Open search"
                >
                  <Search className="size-5" />
                </Button>
                <Button
                  onClick={handlePartnerWithUs}
                  className="text-xs cursor-pointer bg-brand text-white px-4 py-2 rounded-md border border-brand transition-colors hover:bg-transparent hover:border-white"
                >
                  Partner with us
                </Button>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="lg:hidden flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="size-5" />
              </Button>
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10"
                  >
                    <Menu className="size-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="top"
                  className="w-full h-screen bg-black/60 backdrop-blur-[3rem] border-b border-white/20 text-white shadow-2xl"
                >
                  <SheetHeader className="border-b border-white/10 px-6 py-5">
                    <SheetTitle className="sr-only">Resin Work</SheetTitle>
                    <div className="flex items-center justify-start">
                      <Link href="/" onClick={handleNavClick}>
                        <Image
                          src="/logo2.svg"
                          alt="Resin Work"
                          width={200}
                          height={48}
                          quality={100}
                          className="opacity-90 hover:opacity-100 transition-opacity"
                        />
                      </Link>
                    </div>
                  </SheetHeader>
                  <div className="px-2 py-8 overflow-y-scroll">
                    <div className="space-y-2 mb-8">
                      <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider px-4 mb-4">
                        Navigation
                      </h3>
                      {navItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={handleNavClick}
                          className="flex items-center px-4 py-4 text-lg font-medium text-white hover:text-brand hover:bg-white/10 rounded-xl transition-all duration-200 group"
                        >
                          <span className="group-hover:translate-x-1 transition-transform duration-200">
                            {item.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                    <Separator className="my-8 bg-white/20" />
                    <div className="mb-8">
                      <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider px-4 mb-4">
                        Settings
                      </h3>
                      <div
                        className={`flex items-center justify-between px-4 py-3 hover:bg-white/5 rounded-xl transition-all duration-200 cursor-pointer group ${
                          isChangingLanguage
                            ? "opacity-75 cursor-not-allowed"
                            : ""
                        }`}
                        onClick={isChangingLanguage ? undefined : changeLocale}
                      >
                        <div className="flex items-center gap-3">
                          {isChangingLanguage ? (
                            <Loader2 className="size-5 text-brand animate-spin" />
                          ) : (
                            <Globe className="size-5 text-white/70 group-hover:text-brand transition-colors" />
                          )}
                          <span className="text-lg font-medium text-white group-hover:text-brand transition-colors">
                            {isChangingLanguage ? "Switching..." : "Language"}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                                locale === "en"
                                  ? "bg-blue-500 scale-110"
                                  : "bg-white/30"
                              }`}
                            />
                            <span
                              className={`text-sm font-medium transition-colors ${
                                locale === "en"
                                  ? "text-blue-400"
                                  : "text-white/60"
                              }`}
                            >
                              EN
                            </span>
                          </div>
                          <div className="w-px h-4 bg-white/20" />
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                                locale === "de"
                                  ? "bg-red-500 scale-110"
                                  : "bg-white/30"
                              }`}
                            />
                            <span
                              className={`text-sm font-medium transition-colors ${
                                locale === "de"
                                  ? "text-red-400"
                                  : "text-white/60"
                              }`}
                            >
                              DE
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Separator className="my-8 bg-white/20" />
                    <div className="px-4">
                      <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4">
                        Get Started
                      </h3>
                      <Button
                        className="w-full bg-brand hover:bg-brand/90 text-white font-semibold py-6 px-4 rounded-md transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                        onClick={handlePartnerWithUs}
                      >
                        Partner with us
                      </Button>
                    </div>
                    <div className="h-8"></div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Overlay */}
      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSearch={handleSearch}
      />
    </header>
  );
}
