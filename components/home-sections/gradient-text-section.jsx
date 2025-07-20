"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const GradientTextSection = () => {
  const containerRef = useRef(null);
  const segmentsRef = useRef([]);

  const text =
    "Precision, reliability, and innovation are the cornerstones that define RESINWORK. Proudly developed in Germany, each formulation is the result of extensive in-house. Where cutting-edge technology meets our state-of-the-art manufacturing process. Trusted by professionals across industries like Dental, Engineering, Jewellery and more. We enable you to achieve outstanding results, pushing the boundaries of what's possible in 3D Printing.";

  const segments = text.split(/(?<=\.)/g);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const totalSegments = segments.length;
      const progressObj = { value: 0 };

      gsap.to(progressObj, {
        value: totalSegments - 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${totalSegments * 750}vh`,
          scrub: true,
          pin: true,
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
                gsap.to(el, { opacity, duration: 0.3, overwrite: "auto" });
              }
            });
          },
          // onUpdate: (self) => {
          //   const progress = progressObj.value;
          //   segmentsRef.current.forEach((el, i) => {
          //     // Calculate opacity: 1 at active, 0.3 at inactive, crossfade in between
          //     const diff = Math.abs(progress - i);
          //     let opacity = 0.3;
          //     if (diff < 1) {
          //       // Crossfade region
          //       opacity = 0.3 + 0.6 * (1 - diff);
          //     }
          //     el && (el.style.opacity = opacity);
          //   });
          // },
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div ref={containerRef} className="relative">
        <div className="sticky top-0 h-screen flex items-center z-30  px-48 mx-auto">
          <p className="text-5xl leading-[4.5rem] tracking-normal">
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
        </div>
      </div>
      <div className="h-[40vh]"></div>
    </>
  );
};

export default GradientTextSection;
