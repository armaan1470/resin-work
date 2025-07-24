"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const GradientTextSection = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const segmentsRef = useRef([]);

  const text =
    "Precision, reliability, and innovation are the cornerstones that define RESINWORK. Proudly developed in Germany, each formulation is the result of extensive in-house. Where cutting-edge technology meets our state-of-the-art manufacturing process. Trusted by professionals across industries like Dental, Engineering, Jewellery and more. We enable you to achieve outstanding results, pushing the boundaries of what's possible in 3D Printing.";

  const segments = text.split(/(?<=\.)/g);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const totalSegments = segments.length;
      const progressObj = { value: 0 };

      // 🟢 Slow upward scroll animation
      gsap.to(textRef.current, {
        y: -100, // scroll upward by 100px over full duration
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${totalSegments * 600}vh`, // taller scroll area
          scrub: true,
          markers: false,
        },
      });

      // 🔵 Highlight animation
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
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="relative min-h-[500vh]" // 👈 very tall section to allow slow scroll
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ amount: 0.8 }}
          transition={{ duration: 1, ease: "easeOut" }}
          ref={textRef}
          className="h-screen flex items-center justify-center sticky top-0"
        >
          <p className="text-5xl leading-[4.5rem] tracking-normal px-48 mx-auto">
            {segments.map((segment, index) => (
              <span
                key={index}
                ref={(el) => (segmentsRef.current[index] = el)}
                className={`font-semibold text-black dark:text-white opacity-30 transition-colors duration-1000 ease-in-out`}
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

export default GradientTextSection;
