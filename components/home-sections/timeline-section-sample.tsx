"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TimelineSectionSample = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=100%",
          scrub: true,
          pin: true,
        },
      });

      // Set initial state
      gsap.set(videoRef.current, {
        xPercent: -50,
        scale: 1.5,
      });

      gsap.set(textRef.current, {
        x: "-100%",
        opacity: 0,
      });

      tl.to(videoRef.current, {
        xPercent: 0,
        scale: 1,
        duration: 1,
        ease: "power2.out",
      }).to(
        textRef.current,
        {
          x: "0%",
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        },
        "<" // start at same time as video
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full max-w-[1400px] mx-auto min-h-screen flex items-center justify-center"
    >
      <div className="flex gap-6 w-full">
        <div ref={textRef} className="flex-1">
          <h1 className="text-3xl font-bold mb-4 leading-tight">
            Lorem ipsum dolor, laudantium?
          </h1>
          <p className="text-base leading-[1.6] opacity-80">
            Contract Development and Manufacturing Organization. With
            state-of-the-art manufacturing facilities, we deliver consistent,
            high-quality 3D printing resins at scale. Our production processes
            combine precision engineering with rigorous quality control,
            ensuring each batch meets the exacting standards demanded by
            industrial applications across diverse sectors.
          </p>
        </div>

        <div ref={videoRef} className="flex-1">
          <video
            muted
            autoPlay
            loop
            playsInline
            className="w-full h-auto object-contain"
          >
            <source src="/video/video1.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
};

export default TimelineSectionSample;
