// src/components/home-secions/CombinedSection.jsx
"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LogoAnimationSection from "./logo-animation-section";
import GradientTextSection from "./gradient-text-section";

gsap.registerPlugin(ScrollTrigger);

const CombinedSection = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const tweenRef = useRef(null); // track gsap tween

  useEffect(() => {
    const video = videoRef.current;
    if (!video || typeof window === "undefined") return;

    const handleMetadata = () => {
      video.pause();
      video.currentTime = 0;

      const duration = video.duration;

      let currentTime = 0;
      let targetTime = 0;

      const updateVideo = (self) => {
        targetTime = self.progress * duration;

        if (tweenRef.current) tweenRef.current.kill(); // kill previous tween

        tweenRef.current = gsap.to(video, {
          currentTime: targetTime,
          duration: 0.3,
          ease: "power2.out",
          overwrite: true,
        });
      };

      const scrollTrigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=1500",
        scrub: 1,
        onUpdate: updateVideo,
        markers: false,
      });

      return () => {
        scrollTrigger.kill();
        gsap.killTweensOf(video);
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    };

    if (video.readyState >= 1) {
      handleMetadata();
    } else {
      video.addEventListener("loadedmetadata", handleMetadata);
    }

    return () => {
      video.removeEventListener("loadedmetadata", handleMetadata);
    };
  }, []);

  return (
    <div className="relative overflow-hidden" ref={containerRef}>
      {/* Scroll-Scrubbed Background Video */}
      <div className="absolute inset-0 w-full h-full z-1 pointer-events-none will-change-transform">
        <video
          ref={videoRef}
          src="/video/gradient-video_smooth.mp4"
          className="object-cover w-full h-full will-change-transform"
          muted
          playsInline
          preload="auto"
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
