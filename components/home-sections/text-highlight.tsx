"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

const TextHighlightSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const segmentsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  const t = useTranslations("GradientText");
  const text = t("text");
  const segments = text.split(/(?<=\.)/g);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Add delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Clear any existing ScrollTriggers first

        const totalSegments = segments.length;
        const progressObj = { value: 0 };

        // Mobile-specific adjustments
        const scrollMultiplier = isMobile ? 300 : 600; // Much smaller for mobile
        const startOffset = isMobile ? 50 : 100; // Smaller start offset for mobile
        const yOffset = isMobile ? -30 : -100; // Smaller movement for mobile

        gsap.to(textRef.current, {
          y: yOffset,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: `+=${totalSegments * scrollMultiplier}vh`,
            scrub: 1, // Smoother scrubbing
            markers: true, // Keep markers for debugging
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
            scrub: 1, // Smoother scrubbing
            markers: true, // Keep markers for debugging
            refreshPriority: -1,
            invalidateOnRefresh: true,
            onUpdate: () => {
              const progress = progressObj.value;
              segmentsRef.current.forEach((el, i) => {
                if (!el) return;

                const diff = Math.abs(progress - i);
                let opacity = 0.3;
                if (diff < 1) {
                  opacity = 0.3 + 0.6 * (1 - diff);
                }

                // Use direct style setting for better mobile performance
                if (isMobile) {
                  el.style.opacity = opacity.toString();
                } else {
                  gsap.to(el, {
                    opacity,
                    duration: 0.3,
                    overwrite: "auto",
                  });
                }
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
  }, [segments.length, isMobile]);

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
    <>
      <div
        ref={containerRef}
        className={`relative ${isMobile ? "min-h-[200vh]" : "min-h-[530vh]"}`}
        style={{
          // Hardware acceleration
          transform: "translateZ(0)",
          willChange: "transform",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ amount: isMobile ? 0.3 : 0.5 }}
          transition={{ duration: 1, ease: "easeOut" }}
          ref={textRef}
          className={`flex items-center justify-center sticky ${
            isMobile ? "top-24" : "top-48"
          }`}
          style={{
            // Hardware acceleration
            transform: "translateZ(0)",
            willChange: "transform",
          }}
        >
          <p className="text-xl leading-7 md:text-2xl md:leading-8 lg:text-3xl lg:leading-[2.6rem] xl:text-[42px] xl:leading-[4rem] 2xl:text-5xl 2xl:leading-[4.5rem] px-4 md:px-14 lg:px-26 xl:px-48 tracking-normal">
            {segments.map((segment, index) => (
              <span
                key={index}
                ref={(el) => {
                  segmentsRef.current[index] = el;
                }}
                className="font-semibold text-black dark:text-white transition-colors duration-1000 ease-in-out"
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
    </>
  );
};

export default TextHighlightSection;
