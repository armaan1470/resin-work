// src/components/home-secions/LogoAnimationSection.jsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextHighlightSection from "./combined-section/text-highlight-section";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const LogoAnimationSection = () => {
  const sectionRef = useRef();
  const rRef = useRef();
  const bRef = useRef();
  const lRef = useRef();
  const containerLogoRef = useRef();
  const textContainerRef = useRef();
  const pinRef = useRef();

  useEffect(() => {
    // Set initial states with will-change for better performance
    gsap.set([rRef.current, bRef.current, lRef.current], {
      willChange: "transform, opacity",
      force3D: true,
    });

    // Logo animations with performance optimizations
    // const logoTL = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: containerLogoRef.current,
    //     start: "top 10%",
    //     end: "bottom -260%",
    //     scrub: 1,
    //     pin: false,
    //     anticipatePin: 1,
    //   },
    // });

    // // R animation
    // logoTL
    //   .to(rRef.current, {
    //     x: "50vw",
    //     y: "-30vh",
    //     rotate: 75,
    //     zIndex: 1,
    //     opacity: 0.5,
    //     ease: "power1.inOut",
    //   })
    //   .to(rRef.current, {
    //     x: "+=30vw",
    //     y: "240vh",
    //     rotate: 190,
    //     zIndex: 10,
    //     opacity: 0.2,
    //     ease: "power1.inOut",
    //   })
    //   .to(rRef.current, {
    //     x: "100vw",
    //     ease: "power1.inOut",
    //   });

    // // B animation
    // const bTL = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: containerLogoRef.current,
    //     start: "top 10%",
    //     end: "bottom -200%",
    //     scrub: 1,
    //     pin: false,
    //     anticipatePin: 1,
    //   },
    // });

    // bTL
    //   .to(bRef.current, {
    //     x: "130%",
    //     rotate: -60,
    //     y: "30vh",
    //     zIndex: 2,
    //     opacity: 0.1,
    //     ease: "power1.inOut",
    //   })
    //   .to(bRef.current, {
    //     x: "130%",
    //     y: "240vh",
    //     rotate: -140,
    //     zIndex: 5,
    //     ease: "power1.inOut",
    //   })
    //   .to(bRef.current, {
    //     x: "230%",
    //     y: "240vh",
    //     rotate: -140,
    //     zIndex: 5,
    //     ease: "power1.inOut",
    //   });

    // // L animation
    // const lTL = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: containerLogoRef.current,
    //     start: "top 10%",
    //     end: "bottom -270%",
    //     scrub: 1,
    //     pin: false,
    //     anticipatePin: 1,
    //   },
    // });

    // lTL
    //   .to(lRef.current, {
    //     x: "-35%",
    //     rotate: -30,
    //     // y: "20vh",
    //     opacity: 0.1,
    //     zIndex: 13,
    //     ease: "power1.inOut",
    //   })
    //   .to(lRef.current, {
    //     x: "-30%",
    //     rotate: -70,
    //     y: "50vh",
    //     opacity: 0.8,
    //     ease: "power1.inOut",
    //     // duration: 1,
    //   })
    //   .to(lRef.current, {
    //     scale: 60,
    //     rotate: -100,
    //     x: "230%",
    //     y: "-140vh",
    //     opacity: 1,
    //     ease: "power4.inOut",
    //     duration: 2.5,
    //   })
    //   .to(lRef.current, {
    //     scale: 100,
    //     x: "500%",
    //     y: "-140vh",
    //     opacity: 1,
    //     ease: "power2.inOut",
    //     duration: 1,
    //   });

    // Pinning with performance optimization
    ScrollTrigger.create({
      trigger: pinRef.current,
      start: "top 40%",
      end: "end end",
      pin: true,
      anticipatePin: 1,
      scrub: 0.5,
      pinSpacing: false,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative hidden md:block">
      <div className="grid grid-cols-2 relative py-[16rem] z-[10]">
        <div className="">
          <div
            ref={containerLogoRef}
            className="flex items-center justify-center w-full h-full"
          >
            <div
              ref={pinRef}
              className="relative w-full h-full logo-animation z-[20]"
            >
              {/* Animation Step Indicator */}
              <img
                ref={rRef}
                src="/logo-animation/logo-part-1.svg"
                alt="logo-part-1"
                className="absolute top-1/2 left-1/2 w-full h-full opacity-60 object-contain transform -translate-x-1/2 -translate-y-1/2 z-[99]"
              />
              <img
                ref={lRef}
                src="/logo-animation/logo-part-2.png"
                alt="logo-part-2"
                className="absolute top-1/2 left-1/2 w-full h-full opacity-60 object-contain transform -translate-x-1/2 -translate-y-1/2 z-20"
              />
              <img
                ref={bRef}
                src="/logo-animation/logo-part-3.svg"
                alt="logo-part-3"
                className="absolute top-1/2 left-1/2 w-full h-full opacity-60 object-contain transform -translate-x-1/2 -translate-y-1/2 z-10"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center flex-col gap-y-[1rem] pe-[6rem] z-[5]">
          <h2 className="text-[3.6rem] text-[var(--header-text)] font-normal">
            Fast, efficient, reliable 3 D
            <span className="font-semibold"> Printing Solutions </span>
          </h2>
          <p className="text-[var(--header-text)]/60">
            At Resinwork, we provide cutting - edge 3 D printing resins designed
            to deliver high - quality, precise results with speed and
            consistency.Whether you 're in manufacturing, prototyping, or
            product development, our solutions are engineered to meet the
            demands of any industry - helping you innovate faster and more
            efficiently.
          </p>
        </div>
      </div>
      <TextHighlightSection />
    </div>
  );
};

export default LogoAnimationSection;
