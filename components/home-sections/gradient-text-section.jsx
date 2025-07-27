"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
gsap.registerPlugin(ScrollTrigger);

const GradientTextSection = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [previousIndex, setPreviousIndex] = useState(-1);
  const containerRef = useRef(null);
  const animationFrame = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const t = useTranslations("GradientText");

  const text = t("text");

  const segments = text.split(/(?<=\.)/g);

  useEffect(() => {
    // Check if mobile on component mount and on resize
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Common breakpoint for mobile
    };

    checkIfMobile(); // Initial check
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }

      animationFrame.current = requestAnimationFrame(() => {
        if (!containerRef.current) return;

        // Use 0.5 for mobile, 0.7 for desktop
        const triggerPosition = window.innerHeight * (isMobile ? 0.3 : 0.7);
        const segments = document.querySelectorAll(".text-segment");
        const scrollPosition = window.scrollY + triggerPosition;

        // Get container's bottom position
        const containerRect = containerRef.current.getBoundingClientRect();
        const containerBottom = window.scrollY + containerRect.bottom;

        // Check if we're near the container's bottom (within 100px)
        const vhToPixels = (vh) => window.innerHeight * (vh / 100);
        const triggerOffset = vhToPixels(36); // 30vh in pixels

        if (scrollPosition >= containerBottom - triggerOffset) {
          if (activeIndex !== segments.length - 1) {
            setPreviousIndex(activeIndex);
            setActiveIndex(segments.length - 1);
          }
          return;
        }

        let newActiveIndex = -1;
        let closestDistance = Infinity;

        segments.forEach((segment, index) => {
          const rect = segment.getBoundingClientRect();
          const segmentMiddle = window.scrollY + rect.top + rect.height / 2;
          const distance = Math.abs(segmentMiddle - scrollPosition);

          if (distance < closestDistance) {
            closestDistance = distance;
            newActiveIndex = index;
          }
        });

        if (newActiveIndex !== activeIndex) {
          setPreviousIndex(activeIndex);
          setActiveIndex(newActiveIndex);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [activeIndex, isMobile]); // Add isMobile to dependencies

  // ... rest of your component remains the same
  const getTransitionClass = (index) => {
    return "duration-1000 ease-out";
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 0%",
        end: "bottom -200%",
        pin: true,
        pinSpacing: true,
        markers: false,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative  ">
      <div className="sticky top-0 h-screen flex items-center z-[30] px-[1rem] md:px-[12rem]">
        <p className="text-[2rem] md:text-[3rem] md:leading-[4.6rem] leading-[120%]">
          {segments.map((segment, index) => (
            <span
              key={index}
              className={`text-segment font-semibold transition-colors ${getTransitionClass(
                index
              )} ${
                index === activeIndex
                  ? "text-[var(--scroll-text-active)]"
                  : index === previousIndex
                  ? "text-[var(--scroll-text-active)]/60"
                  : "text-[var(--scroll-text-inactive)]"
              }`}
            >
              {segment}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default GradientTextSection;
