"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import DentalHeroSection from "./components/dental-hero-section";
import DentalProductSection from "./components/dental-product-section";
import MobileDentalProductSection from "./components/mobile-dental-product-section";

export default function DentalPage() {
  const isMobile = useIsMobile();

  return (
    <div className="bg-primary">
      <DentalHeroSection />

      {isMobile ? <MobileDentalProductSection /> : <DentalProductSection />}
    </div>
  );
}
