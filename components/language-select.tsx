"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { ChevronDown, Check, Loader2, Globe } from "lucide-react";

interface Language {
  code: string;
  name: string;
}

const LANGUAGES: Language[] = [
  { code: "en", name: "English" },
  { code: "de", name: "Deutsch" },
];

export default function LanguageSelect({
  isMobile = false,
}: {
  isMobile?: boolean;
}) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isChanging, setIsChanging] = useState(false);

  const currentLanguage =
    LANGUAGES.find((lang) => lang.code === locale) || LANGUAGES[0];

  const changeLanguage = async (newLocale: string) => {
    if (newLocale === locale) return;

    setIsChanging(true);
    try {
      const query = Object.fromEntries(searchParams.entries());
      await router.push({ pathname, query }, { locale: newLocale });
    } catch (err) {
      console.error("Failed to change language:", err);
    } finally {
      setTimeout(() => setIsChanging(false), 200);
    }
  };

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-between px-4 py-3 text-sm text-white hover:text-brand flex items-center gap-2 focus:outline-none cursor-pointer"
            disabled={isChanging}
          >
            <span className="text-white/70">Language</span>
            <div className="flex items-center gap-2">
              <Globe className="size-4" />
              <span className="w-8 text-center">
                {currentLanguage.code.toUpperCase()}
              </span>
              {isChanging ? (
                <Loader2 className="size-4 animate-spin text-brand" />
              ) : (
                <ChevronDown className="size-4" />
              )}
            </div>
          </Button>
        </DrawerTrigger>
        <DrawerContent className="bg-black/60 backdrop-blur-xl text-white border-t border-white/20 px-4 pb-12">
          {/* Grabber handle */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-10 h-1.5 bg-white/20 rounded-full mx-auto mb-4" />

          <DrawerHeader className="px-0 py-4">
            <DrawerTitle className="text-white text-base text-center">
              Select Language
            </DrawerTitle>
          </DrawerHeader>

          <div className="flex flex-col justify-center space-y-2">
            {LANGUAGES.map((lang) => (
              <Button
                key={lang.code}
                variant="ghost"
                className="w-full justify-between text-white text-sm px-3 py-3 hover:bg-white/10 rounded-md transition"
                onClick={() => changeLanguage(lang.code)}
                disabled={isChanging}
              >
                <span>
                  {lang.name} ({lang.code.toUpperCase()})
                </span>
                {locale === lang.code && (
                  <Check className="size-4 text-brand" />
                )}
              </Button>
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  // Desktop version — dropdown menu
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`flex items-center gap-1 cursor-pointer text-white text-sm px-3 py-2 rounded-lg border border-white/10 bg-transparent hover:text-white hover:backdrop-blur-sm focus:outline-none`}
          aria-label="Select language"
          disabled={isChanging}
        >
          <Globe className="size-4" />
          <span>{currentLanguage.code.toUpperCase()}</span>
          {isChanging ? (
            <Loader2 className="size-3 animate-spin text-brand" />
          ) : (
            <ChevronDown className="size-3" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-44 bg-black/50 backdrop-blur-md border border-white/10 text-white rounded-lg shadow-lg"
      >
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className="text-sm cursor-pointer hover:text-brand hover:bg-white/10 focus:bg-white/10 flex justify-between px-3 py-2"
            disabled={isChanging}
          >
            {lang.name} ({lang.code.toUpperCase()})
            {locale === lang.code && <Check className="size-4 text-brand" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
