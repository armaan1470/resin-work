import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

const OldLogoAnimation: React.FC = () => {
  const t = useTranslations("LogoAnimation");

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const rRef = useRef<HTMLImageElement | null>(null);
  const bRef = useRef<HTMLImageElement | null>(null);
  const lRef = useRef<HTMLImageElement | null>(null);
  const containerLogoRef = useRef<HTMLDivElement | null>(null);
  const textContainerRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);

  // Keep track of matchMedia instance
  const mmRef = useRef<gsap.MatchMedia | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Clean up any existing animations
    if (mmRef.current) {
      mmRef.current.kill();
    }

    const mm = gsap.matchMedia();
    mmRef.current = mm;

    // Add a small delay to ensure DOM is ready
    const setupAnimations = () => {
      mm.add("(min-width: 768px)", () => {
        // --- Desktop Animation ---
        createAnimations({
          rX1: "50vw",
          rY1: "-50vh",
          rRotate1: 75,
          rX2: "+=100vw",
          rY2: "-50vh",
          rRotate2: 190,

          bX1: "130%",
          bRotate1: -60,
          bX2: "430%",
          bY2: "50vh",
          bRotate2: -140,

          lX1: "-30%",
          lY1: "-20vh",
          lRotate1: -30,
          lX2: "-30%",
          lRotate2: -90,
          lX3: "-220%",
          lY3: "104%",

          logoStart: "top center",
          logoEnd: "bottom top",
        });
      });

      mm.add("(max-width: 767px)", () => {
        // --- Mobile Animation (smaller distances so it actually plays) ---
        createAnimations({
          rX1: "30vw",
          rY1: "-30vh",
          rRotate1: 60,
          rX2: "+=60vw",
          rY2: "-30vh",
          rRotate2: 150,

          bX1: "130%",
          bRotate1: -60,
          bX2: "230%",
          bY2: "100vh",
          bRotate2: -140,

          lX1: "-30%",
          lY1: "-20vh",
          lRotate1: -30,
          lX2: "-100%",
          lRotate2: -90,
          lX3: "-220%",
          lY3: "104%",

          logoStart: "top center+=20%",
          logoEnd: "bottom top+=30%",
        });
      });

      // Force a refresh after setup
      ScrollTrigger.refresh();
    };

    // Setup animations with a small delay
    setTimeout(setupAnimations, 100);

    return () => {
      if (mmRef.current) {
        mmRef.current.kill();
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Helper function to build timelines
  function createAnimations(opts: any) {
    // Reset elements to initial state before creating new animations
    gsap.set([rRef.current, bRef.current, lRef.current], {
      x: 0,
      y: 0,
      rotate: 0,
      opacity: 0.6,
    });

    const logoTL = gsap.timeline({
      scrollTrigger: {
        trigger: containerLogoRef.current,
        start: opts.logoStart, // Use dynamic start point
        end: opts.logoEnd, // Use dynamic end point
        scrub: 1,
        refreshPriority: -1, // Lower priority for refresh
      },
    });

    logoTL
      .to(rRef.current, {
        x: opts.rX1,
        y: opts.rY1,
        rotate: opts.rRotate1,
        opacity: 0.5,
      })
      .to(rRef.current, {
        x: opts.rX2,
        y: opts.rY2,
        rotate: opts.rRotate2,
        opacity: 0.2,
      });

    const bTL = gsap.timeline({
      scrollTrigger: {
        trigger: containerLogoRef.current,
        start: opts.logoStart, // Use dynamic start point
        end: opts.logoEnd, // Use dynamic end point
        scrub: 1,
        refreshPriority: -1,
      },
    });

    bTL
      .to(bRef.current, { x: opts.bX1, rotate: opts.bRotate1, opacity: 0.1 })
      .to(bRef.current, {
        x: opts.bX2,
        y: opts.bY2,
        rotate: opts.bRotate2,
      });

    const lTL = gsap.timeline({
      scrollTrigger: {
        trigger: containerLogoRef.current,
        start: opts.logoStart, // Use dynamic start point
        end: opts.logoEnd, // Use dynamic end point
        scrub: 1,
        refreshPriority: -1,
      },
    });

    lTL
      .to(lRef.current, {
        x: opts.lX1,
        y: opts.lY1,
        rotate: opts.lRotate1,
        opacity: 0.1,
      })
      .to(lRef.current, { x: opts.lX2, rotate: opts.lRotate2, opacity: 0.1 })
      .to(lRef.current, { x: opts.lX3, y: opts.lY3 });
  }

  return (
    <div className="relative min-h-[100vh] md:h-[100vh]" ref={sectionRef}>
      <div className="flex flex-col md:grid md:grid-cols-2 relative py-8 md:py-[16rem] z-[10]">
        {/* Logo Section - First on mobile, left on desktop */}
        <div className="order-1 md:order-1 mb-6 md:mb-0">
          <div
            ref={containerLogoRef}
            className="flex items-center justify-center w-full h-[200px] md:h-full"
          >
            <div
              ref={pinRef}
              className="relative w-full h-full logo-animation z-[5] md:z-[20] max-w-[200px] max-h-[200px] md:max-w-[500px] md:max-h-[500px]"
            >
              <img
                ref={rRef}
                src="/logo-animation/logo-part-1.svg"
                alt="r"
                className="absolute top-1/2 left-1/2 w-[clamp(120px,20vw,200px)] h-[clamp(120px,20vw,200px)] md:w-[clamp(200px,30vw,400px)] md:h-[clamp(200px,30vw,400px)] opacity-60 object-contain transform -translate-x-1/2 -translate-y-1/2 z-[3] md:z-[99]"
              />
              <img
                ref={lRef}
                src="/logo-animation/logo-part-2.png"
                alt="l"
                className="absolute top-1/2 left-1/2 w-[clamp(120px,20vw,200px)] h-[clamp(120px,20vw,200px)] md:w-[clamp(200px,30vw,400px)] md:h-[clamp(200px,30vw,400px)] opacity-60 object-contain transform -translate-x-1/2 -translate-y-1/2 z-[2] md:z-20"
              />
              <img
                ref={bRef}
                src="/logo-animation/logo-part-3.svg"
                alt="b"
                className="absolute top-1/2 left-1/2 w-[clamp(120px,20vw,200px)] h-[clamp(120px,20vw,200px)] md:w-[clamp(200px,30vw,400px)] md:h-[clamp(200px,30vw,400px)] opacity-60 object-contain transform -translate-x-1/2 -translate-y-1/2 z-[1] md:z-10"
              />
            </div>
          </div>
        </div>

        {/* Text Section - Second on mobile, right on desktop */}
        <div
          className="flex items-center justify-center flex-col gap-y-[1rem] px-5 md:px-0 md:pe-[6rem] z-[10] order-2 md:order-2 pt-8 md:pt-0"
          ref={textContainerRef}
        >
          <h2 className="text-[clamp(1.5rem,4vw,3.6rem)] text-[var(--header-text)] font-normal text-center md:text-left">
            {t("heading")}
            <span className="font-semibold"> {t("subHeading")} </span>
          </h2>
          <p className="text-[var(--header-text)]/60 text-center md:text-left">
            {t("content")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OldLogoAnimation;
