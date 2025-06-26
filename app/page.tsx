"use client";

import BentoCardsSection from "@/components/home-sections/bento-cards-section";
import BlogsSection from "@/components/home-sections/blogs-section";
import CombinedSection from "@/components/home-sections/combined-section";
import HeroSection from "@/components/home-sections/hero-section";
import SolutionsSection from "@/components/home-sections/solutions-section";
import TimelineSection from "@/components/home-sections/timeline-section";
import VideoTabSection from "@/components/home-sections/video-tab-section";
import Link from "next/link";

export default function Home() {
  const services = [
    {
      title: "Dental Solutions",
      description:
        "Professional dental resin materials for crowns, bridges, and restorations.",
      href: "/dental",
      color: "bg-success",
    },
    {
      title: "Jewellery",
      description:
        "High-quality resin materials for creating beautiful and durable jewellery pieces.",
      href: "/jewellery",
      color: "bg-warning",
    },
    {
      title: "Functional Applications",
      description:
        "Industrial-grade resin solutions for functional and structural applications.",
      href: "/functionality",
      color: "bg-info",
    },
    {
      title: "Filaments",
      description:
        "Premium 3D printing filaments for professional and hobbyist use.",
      href: "/filaments",
      color: "bg-danger",
    },
  ];

  return (
    <div className="min-h-screen">
      <HeroSection />

      <TimelineSection />

      <CombinedSection />

      <SolutionsSection />

      <BentoCardsSection />

      <VideoTabSection />

      <BlogsSection />
    </div>
  );
}
