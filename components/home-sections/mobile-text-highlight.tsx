"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

const MobileTextHighlightSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const segmentsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const t = useTranslations("GradientText");
  const text = t("text");
  const segments = text.split(/(?<=\.)/g);

  useEffect(() => {
    // Add delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const totalSegments = segments.length;
        const progressObj = { value: 0 };

        // Mobile-optimized settings
        const scrollMultiplier = 200; // Shorter scroll distance for mobile
        const startOffset = 30; // Smaller start offset for mobile
        const yOffset = -20; // Minimal movement for mobile

        gsap.to(textRef.current, {
          y: yOffset,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: `+=${totalSegments * scrollMultiplier}vh`,
            scrub: 1,
            refreshPriority: -1,
            invalidateOnRefresh: true,
          },
        });

        gsap.to(progressObj, {
          value: totalSegments - 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: `+=${startOffset}vh`,
            end: `+=${totalSegments * scrollMultiplier}vh`,
            scrub: 1,
            refreshPriority: -1,
            invalidateOnRefresh: true,
            onUpdate: () => {
              const progress = progressObj.value;
              segmentsRef.current.forEach((el, i) => {
                if (!el) return;

                const diff = Math.abs(progress - i);
                let opacity = 0.3;
                if (diff < 1) {
                  opacity = 0.3 + 0.7 * (1 - diff); // Higher contrast for mobile
                }

                // Direct style setting for better mobile performance
                el.style.opacity = opacity.toString();
              });
            },
          },
        });

        // Force refresh after setup
        ScrollTrigger.refresh();
      }, containerRef);

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, [segments.length]);

  // Handle orientation changes on mobile
  useEffect(() => {
    const handleOrientationChange = () => {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
    };

    window.addEventListener("orientationchange", handleOrientationChange);
    return () =>
      window.removeEventListener("orientationchange", handleOrientationChange);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[230vh]"
      style={{
        // Hardware acceleration
        transform: "translateZ(0)",
        willChange: "transform",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ amount: 0.2 }}
        transition={{ duration: 1, ease: "easeOut" }}
        ref={textRef}
        className="flex items-center justify-center sticky top-32"
        style={{
          // Hardware acceleration
          transform: "translateZ(0)",
          willChange: "transform",
        }}
      >
        <p className="text-3xl leading-6 sm:text-xl sm:leading-7 px-4 tracking-normal">
          {segments.map((segment, index) => (
            <span
              key={index}
              ref={(el) => {
                segmentsRef.current[index] = el;
              }}
              className="font-semibold leading-9 text-black dark:text-white transition-colors duration-1000 ease-in-out"
              style={{
                opacity: 0.3,
                // Hardware acceleration
                transform: "translateZ(0)",
                willChange: "opacity",
              }}
            >
              {segment}
            </span>
          ))}
        </p>
      </motion.div>
    </div>
  );
};

export default MobileTextHighlightSection;
