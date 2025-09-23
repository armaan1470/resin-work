import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

const OldLogoAnimation: React.FC = () => {
  const t = useTranslations("LogoAnimation");

  const h4Refs = useRef<HTMLHeadingElement[]>([]);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const rRef = useRef<HTMLImageElement | null>(null);
  const bRef = useRef<HTMLImageElement | null>(null);
  const lRef = useRef<HTMLImageElement | null>(null);
  const containerLogoRef = useRef<HTMLDivElement | null>(null);
  const textContainerRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);

  const addToRefs = (el: HTMLHeadingElement | null) => {
    if (el && !h4Refs.current.includes(el)) {
      h4Refs.current.push(el);
    }
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.set(h4Refs.current, { color: `var(--scroll-text-inactive)` });

    const masterTL = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 15%",
        end: "bottom 70%",
        scrub: 1,
      },
    });

    const totalElements = h4Refs.current.length;
    h4Refs.current.forEach((el, index) => {
      const startPos = index / totalElements;
      const endPos = (index + 1) / totalElements;

      masterTL
        .to(
          el,
          {
            color: `var(--scroll-text-active)`,
            opacity: 1,
            duration: 0.1,
            ease: "power1.inOut",
          },
          startPos * 0.9
        )
        .to(
          el,
          {
            opacity: 0.41,
            duration: 0.1,
            ease: "power1.inOut",
          },
          endPos * 0.9
        );
    });

    const logoTL = gsap.timeline({
      scrollTrigger: {
        trigger: containerLogoRef.current,
        start: "top 30%",
        end: "bottom -70%",
        scrub: 1,
      },
    });

    logoTL
      .to(rRef.current, {
        x: "50vw",
        y: "-50vh",
        rotate: 75,
        zIndex: 1,
        opacity: 0.5,
      })
      .to(rRef.current, {
        x: "+=100vw",
        y: "-50vh",
        rotate: 190,
        zIndex: 10,
        opacity: 0.2,
      });

    const bTL = gsap.timeline({
      scrollTrigger: {
        trigger: containerLogoRef.current,
        start: "top 30%",
        end: "bottom -90%",
        scrub: 1,
      },
    });

    bTL
      .to(bRef.current, {
        x: "130%",
        rotate: -60,
        zIndex: 2,
        opacity: 0.1,
      })
      .to(bRef.current, {
        x: "230%",
        y: "100vh",
        rotate: -140,
        zIndex: 5,
      });

    const lTL = gsap.timeline({
      scrollTrigger: {
        trigger: containerLogoRef.current,
        start: "top 30%",
        end: "bottom -90%",
        scrub: 1,
      },
    });

    lTL
      .to(lRef.current, {
        x: "-30%",
        rotate: -30,
        y: "-20vh",
        opacity: 0.1,
        zIndex: 13,
      })
      .to(lRef.current, {
        x: "-30%",
        rotate: -90,
        opacity: 0.1,
      })
      .to(lRef.current, {
        x: "-220%",
        y: "204%",
        zIndex: 22,
      });

    ScrollTrigger.create({
      trigger: pinRef.current,
      start: "top 30%",
      end: "+=300",
      pin: true,
      anticipatePin: 1,
      scrub: 0.5,
      pinSpacing: false,
    });

    const anim = gsap.fromTo(
      sectionRef.current,
      { opacity: 0.1 },
      {
        opacity: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textContainerRef.current,
          start: "top 80%",
          end: "top 40%",
          scrub: true,
        },
      }
    );

    gsap.set([pinRef.current, ...h4Refs.current], {
      willChange: "transform, opacity",
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      anim.kill();
    };
  }, []);

  return (
    <div className="relative hidden md:block h-[100vh]" ref={sectionRef}>
      <div className="grid grid-cols-2 relative py-[16rem] z-[10]">
        <div>
          <div
            ref={containerLogoRef}
            className="flex items-center justify-center w-full h-full"
          >
            <div
              ref={pinRef}
              className="relative w-full h-full logo-animation z-[20]"
            >
              <img
                ref={rRef}
                src="/logo-animation/logo-part-1.svg"
                alt="r"
                className="absolute top-1/2 left-1/2 w-full h-full opacity-60 object-contain transform -translate-x-1/2 -translate-y-1/2 z-[99]"
              />
              <img
                ref={lRef}
                src="/logo-animation/logo-part-2.png"
                alt="l"
                className="absolute top-1/2 left-1/2 w-full h-full opacity-60 object-contain transform -translate-x-1/2 -translate-y-1/2 z-20"
              />
              <img
                ref={bRef}
                src="/logo-animation/logo-part-3.svg"
                alt="b"
                className="absolute top-1/2 left-1/2 w-full h-full opacity-60 object-contain transform -translate-x-1/2 -translate-y-1/2 z-10"
              />
            </div>
          </div>
        </div>
        <div
          className="flex items-center justify-center flex-col gap-y-[1rem] pe-[6rem] z-[5]"
          ref={textContainerRef}
        >
          <h2 className="text-[3.6rem] text-[var(--header-text)] font-normal">
            {t("heading")}
            <span className="font-semibold"> {t("subHeading")} </span>
          </h2>
          <p className="text-[var(--header-text)]/60">{t("content")}</p>
        </div>
      </div>
    </div>
  );
};

export default OldLogoAnimation;
