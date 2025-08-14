"use client";

import BentoCardsSection from "@/components/home-sections/bento-cards-section";
import BlogsSection from "@/components/home-sections/blogs-section";
import CombinedSection from "@/components/home-sections/combined-section";
import HeroSection from "@/components/home-sections/hero-section";
import MobileTimelineSection from "@/components/home-sections/mobile-timeline-section";
import HomeSection3 from "@/components/home-sections/OldAnimation";
import SolutionsSection from "@/components/home-sections/solutions-section";
import TimelineSection from "@/components/home-sections/timeline-section";
import TimelineSectionSample from "@/components/home-sections/timeline-section-sample";
import VideoTabSection from "@/components/home-sections/video-tab-section";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function Home() {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen">
      <HeroSection />

      {/* <TimelineSectionSample /> */}

      {isMobile ? <MobileTimelineSection /> : <TimelineSection />}

      {/* <CombinedSection /> */}
      {/* <CombinedSection /> */}
      <HomeSection3 />

      <SolutionsSection />

      <BentoCardsSection />

      <VideoTabSection />

      <BlogsSection />
    </div>
  );
}
