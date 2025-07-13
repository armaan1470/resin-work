// src/components/home-secions/CombinedSection.jsx
"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LogoAnimationSection from "./logo-animation-section";
import GradientTextSection from "./gradient-text-section";

gsap.registerPlugin(ScrollTrigger);

const CombinedSection = () => {
  const backgroundImageRef = useRef();
  const containerRef = useRef();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Set initial state with will-change for better performance
      gsap.set(backgroundImageRef.current, {
        yPercent: 0,
        willChange: "transform",
      });

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 15%",
          end: "bottom 70%",
          scrub: 0.5, // Reduced scrub value for smoother animation
          markers: false,
          anticipatePin: 1, // Add anticipation to prevent jerk
          fastScrollEnd: true, // Optimize for fast scrolling
        },
      });

      scrollTimeline.to(
        backgroundImageRef.current,
        {
          yPercent: -190,
          ease: "power1.inOut", // Smoother easing
          duration: 1,
        },
        0
      );

      return () => {
        scrollTimeline.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, []);

  return (
    <div className="relative overflow-hidden" ref={containerRef}>
      <div
        ref={backgroundImageRef}
        className=" absolute inset-0 top-0 left-0 w-screen h-full z-[1] pointer-events-none"
      >
        <img
          src="/gradients/bg-gradient.svg"
          alt="gradient background"
          className="object-cover w-full"
        />
      </div>

      {/* Foreground Sections */}
      <LogoAnimationSection />

      {/* Sticky Content */}
      <div className="sticky top-0 z-[2]">
        <GradientTextSection />
      </div>
    </div>
  );
};

export default CombinedSection;
