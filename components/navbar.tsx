"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { Button } from "./ui/button";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Dental", href: "/dental" },
    { name: "Jewellery", href: "/jewellery" },
    { name: "Functionality", href: "/functionality" },
    { name: "Filaments", href: "/filaments" },
    { name: "Company", href: "/company" },
  ];

  return (
    <header className="fixed top-0 z-50 w-full">
      <nav className="border-b border-white/30 bg-black/50 backdrop-blur-[3rem] shadow-sm">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-17">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <Image
                  src="/logo.svg"
                  alt="Resin Work"
                  width={240}
                  height={48}
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-14  px-6">
              <div className="flex space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-white hover:text-brand px-3 py-2 rounded-md text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Right side actions */}
              <div className="flex items-center space-x-4">
                {/* Language Selector */}
                <Button className="p-0 cursor-pointer text-2xl">🇺🇸</Button>
                {/* Search Icon */}
                <Button className="p-0 cursor-pointer text-white">
                  <Search className="size-5" />
                </Button>

                <Button className="p-0 cursor-pointer text-xs bg-brand text-white px-4 py-2 rounded-md border-1 border-brand transition-colors hover:bg-transparent hover:border-1 hover:border-white">
                  Partner with us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
