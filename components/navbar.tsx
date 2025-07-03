"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { Search, Menu, ChevronRight } from "lucide-react";
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
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const navItems: NavItem[] = navData.navItems;

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

  return (
    <header className="fixed top-0 z-50 w-full">
      <nav className="border-b border-white/30 bg-black/50 backdrop-blur-[3rem] shadow-sm">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-17">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <Image
                  src="/logo.svg"
                  alt="Resin Work"
                  width={240}
                  height={48}
                  quality={100}
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-14 px-6">
              <div className="flex space-x-4">
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

                    {/* Submenu */}
                    {item.hasSubmenu && item.products && (
                      <div
                        className={`fixed left-0 right-0 bg-black/70 backdrop-blur-lg h-screen shadow-lg transition-all duration-500 z-50 ${
                          openSubmenu === item.name
                            ? "opacity-100 translate-y-0 pointer-events-auto"
                            : "opacity-0 -translate-y-3 pointer-events-none"
                        }`}
                        // style={{ top: "100%" }}
                      >
                        <div className="w-full mx-auto px-16 py-16 bg-[var(--bg-primary)]">
                          <div className="grid grid-cols-12 gap-4">
                            {/* Product Image */}
                            <div className="col-span-4 flex justify-start items-center">
                              {item.image && (
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  width={400}
                                  height={300}
                                  quality={100}
                                  className="rounded-lg w-full h-full object-cover"
                                />
                              )}
                            </div>

                            {/* Products Grid */}
                            <div className="col-span-8 grid grid-cols-3 grid-rows-2 gap-2">
                              {item.products.slice(0, 6).map((product) => (
                                <Link
                                  key={product.id}
                                  href={`${item.href}#${product.navic_id}`}
                                  className="block h-full"
                                  onClick={handleNavClick}
                                >
                                  <div className="bg-[var(--bg-accent)] rounded-2xl h-full p-8 cursor-pointer hover:opacity-80 transition">
                                    <h3 className="text-[var(--color-primary)] text-[1.62rem] font-semibold">
                                      {product.name}
                                    </h3>
                                    {product.description && (
                                      <p className="text-[13px] leading-[23px] text-[#848484] line-clamp-3">
                                        {product.description}
                                      </p>
                                    )}
                                  </div>
                                </Link>
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

              {/* Right side actions - Desktop */}
              <div className="flex items-center space-x-4">
                {/* Language Selector */}
                <Button
                  variant="ghost"
                  className="p-0 cursor-pointer text-2xl hover:bg-transparent"
                >
                  🇺🇸
                </Button>

                {/* Search Icon */}
                <Button
                  variant="ghost"
                  className="p-0 cursor-pointer text-white hover:bg-transparent"
                >
                  <Search className="size-5" />
                </Button>

                <Button className="text-xs cursor-pointer bg-brand text-white px-4 py-2 rounded-md border border-brand transition-colors hover:bg-transparent hover:border-white">
                  Partner with us
                </Button>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="lg:hidden flex items-center space-x-2">
              {/* Mobile Search Icon */}
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
              >
                <Search className="size-5" />
              </Button>

              {/* Mobile Menu Sheet */}
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
                  className="w-full h-auto bg-black/60 backdrop-blur-[3rem] border-b border-white/20 text-white shadow-2xl"
                >
                  {/* Professional Header with Logo */}
                  <SheetHeader className="border-b border-white/10 pb-6 mb-8">
                    <SheetTitle className="sr-only">Resin Work</SheetTitle>
                    <div className="flex items-center justify-center">
                      <Link href="/" onClick={handleNavClick}>
                        <Image
                          src="/logo.svg"
                          alt="Resin Work"
                          width={200}
                          height={40}
                          className="opacity-90 hover:opacity-100 transition-opacity"
                        />
                      </Link>
                    </div>
                  </SheetHeader>

                  {/* Navigation Content */}
                  <div className="px-2 pb-8">
                    {/* Navigation Links */}
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

                    {/* Language & Settings */}
                    <div className="mb-8">
                      <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider px-4 mb-4">
                        Settings
                      </h3>
                      <div className="flex items-center justify-between px-4 py-2 hover:bg-white/5 rounded-xl transition-colors">
                        <span className="text-lg font-medium text-white">
                          Language
                        </span>
                        <Button
                          variant="ghost"
                          className="p-0 text-2xl hover:bg-transparent hover:scale-110 transition-transform"
                        >
                          🇺🇸
                        </Button>
                      </div>
                    </div>

                    <Separator className="my-8 bg-white/20" />

                    {/* Call to Action */}
                    <div className="px-4">
                      <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4">
                        Get Started
                      </h3>
                      <Button
                        className="w-full bg-brand hover:bg-brand/90 text-white font-semibold py-6 px-4 rounded-md transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                        onClick={handleNavClick}
                      >
                        Partner with us
                      </Button>
                    </div>

                    {/* Bottom Padding for Professional Spacing */}
                    <div className="h-8"></div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
