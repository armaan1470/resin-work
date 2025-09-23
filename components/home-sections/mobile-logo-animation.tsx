import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

const MobileLogoAnimation: React.FC = () => {
  const t = useTranslations("LogoAnimation");
  const pinRef = useRef<HTMLDivElement | null>(null);

  const containerLogoRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const rRef = useRef<HTMLImageElement | null>(null);
  const bRef = useRef<HTMLImageElement | null>(null);
  const lRef = useRef<HTMLImageElement | null>(null);
  const textContainerRef = useRef<HTMLDivElement | null>(null);
  const position = {
    start: "top 40%",
    end: "bottom top",
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    // Logo split animation optimized for mobile
    const logoTL = gsap.timeline({
      scrollTrigger: {
        trigger: containerLogoRef.current,
        start: position.start,
        end: position.end,
        scrub: 1,
      },
    });

    // R part animation - moves to top right
    logoTL
      .to(rRef.current, {
        x: "30vw",
        y: "-30vh",
        rotate: 45,
        zIndex: 1,
        opacity: 0.4,
      })
      .to(rRef.current, {
        x: "+=50vw",
        y: "-30vh",
        rotate: 120,
        zIndex: 10,
        opacity: 0.2,
      });

    // B part animation - moves to bottom right
    const bTL = gsap.timeline({
      scrollTrigger: {
        trigger: containerLogoRef.current,
        start: position.start,
        end: position.end,
        scrub: 1,
      },
    });

    bTL
      .to(bRef.current, {
        x: "80%",
        y: "20vh",

        rotate: -45,
        zIndex: 2,
        opacity: 0.3,
      })
      .to(bRef.current, {
        x: "150%",
        y: "-20vh",
        rotate: -100,
        zIndex: 5,
        opacity: 0.1,
      });

    // L part animation - moves to left
    const lTL = gsap.timeline({
      scrollTrigger: {
        trigger: containerLogoRef.current,
        start: position.start,
        end: position.end,
        scrub: 1,
      },
    });

    lTL
      .to(lRef.current, {
        x: "-80%",
        rotate: -20,
        y: "-15vh",
        opacity: 0.3,
        zIndex: 13,
      })
      .to(lRef.current, {
        x: "-220%",
        y: "20vh",
        rotate: -60,
        opacity: 0.2,
      });

    // Pin the logo section during animation
    ScrollTrigger.create({
      trigger: pinRef.current,
      start: "top 40%",
      end: "+=200",
      pin: true,
      anticipatePin: 1,
      scrub: 0.5,
      pinSpacing: false,
    });

    // Fade in animation for the section

    // Optimize performance
    gsap.set([pinRef.current], {
      willChange: "transform",
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative min-h-[100vh] md:h-[100vh] " ref={sectionRef}>
      <div className="flex flex-col md:grid md:grid-cols-2 relative py-8 md:py-[16rem] z-[10] overflow-x-hidden">
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

export default MobileLogoAnimation;
