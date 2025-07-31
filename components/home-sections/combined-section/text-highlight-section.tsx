"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

const TextHighlightSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const segmentsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const t = useTranslations("GradientText");

  const text = t("text");

  const segments = text.split(/(?<=\.)/g);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const totalSegments = segments.length;
      const progressObj = { value: 0 };

      gsap.to(textRef.current, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${totalSegments * 600}vh`,
          scrub: true,
          markers: false,
        },
      });

      gsap.to(progressObj, {
        value: totalSegments - 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "+=300vh",
          end: `+=${totalSegments * 600}vh`,
          scrub: true,
          markers: false,
          onUpdate: () => {
            const progress = progressObj.value;
            segmentsRef.current.forEach((el, i) => {
              const diff = Math.abs(progress - i);
              let opacity = 0.3;
              if (diff < 1) {
                opacity = 0.3 + 0.6 * (1 - diff);
              }
              if (el) {
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
    }, containerRef);

    return () => ctx.revert();
  }, [segments.length]);

  return (
    <>
      <div ref={containerRef} className="relative min-h-[600vh]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ amount: 0.8 }}
          transition={{ duration: 1, ease: "easeOut" }}
          ref={textRef}
          className="flex items-center justify-center sticky top-48"
        >
          <p className="text-2xl leading-8 md:text-3xl md:leading-[2.6rem] lg:text-4xl lg:leading-[2.8rem] xl:text-[42px] xl:leading-[4rem] 2xl:text-5xl 2xl:leading-[4.5rem] px-4 md:px-14 lg:px-26 xl:px-48 tracking-normal">
            {segments.map((segment, index) => (
              <span
                key={index}
                ref={(el) => {
                  segmentsRef.current[index] = el;
                }}
                className="font-semibold text-black dark:text-white opacity-30 transition-colors duration-1000 ease-in-out"
              >
                {segment}
              </span>
            ))}
          </p>
        </motion.div>
      </div>
      <div className="h-[40vh]" />
    </>
  );
};

export default TextHighlightSection;
