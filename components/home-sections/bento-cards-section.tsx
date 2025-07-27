// src/components/home-secions/BentoCardsSection.jsx
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";

const BentoCardsSection = () => {
  const stickySection = useRef(null);
  const mobileSection = useRef(null);
  const t = useTranslations("BentoCards");
  // Framer Motion scroll animations for mobile
  const { scrollYProgress } = useScroll({
    target: mobileSection,
    offset: ["start start", "end start"],
  });

  const mobileScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);
  const mobileOpacity = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    [1, 0.7, 0.3]
  );

  useEffect(() => {
    const container = stickySection.current;
    if (!container) return;

    // Check if screen width is above md breakpoint (768px)
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    if (mediaQuery.matches) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=120%",
          scrub: true,
        },
      });

      // Scale animation (starts immediately)
      tl.to(container, {
        scale: 0.7,
        transformOrigin: "center center",
        ease: "power2.out",
      });

      // Opacity animation (starts after 50% of scroll progress)
      tl.to(
        container,
        {
          opacity: 0,
          ease: "power2.in",
          startAt: { opacity: 1 },
        },
        0.5
      );

      // Cleanup function to kill the animation if screen size changes
      return () => {
        tl.kill();
        ScrollTrigger.getAll().forEach((instance) => {
          if (instance.trigger === container) {
            instance.kill();
          }
        });
      };
    }
  }, []);

  const firstRow = [
    {
      title: t("data.1.title"),
      desc: t("data.1.desc"),
      icon: "/home-section/1.svg",
    },
    {
      title: t("data.2.title"),
      desc: t("data.2.desc"),
      icon: "/home-section/2.svg",
    },
    {
      title: t("data.3.title"),
      desc: t("data.3.desc"),
      icon: "/home-section/3.svg",
    },
  ];
  const secondRow = [
    {
      title: t("data.4.title"),
      desc: t("data.4.desc"),
      icon: "/home-section/4.svg",
    },
    {
      title: t("data.5.title"),
      desc: t("data.5.desc"),
      icon: "/home-section/5.svg",
    },
  ];

  return (
    <>
      {/* Desktop Version with GSAP */}
      <div
        ref={stickySection}
        className="hidden md:block sticky top-0 bg-[var(--bg-primary)] z-[30] container-f"
      >
        <div className="relative z-[12]">
          <div className="p-[1rem] md:p-[4rem] max-w-7xl mx-auto home-sec5">
            <h2 className="text-[1.8rem] md:text-[2.53rem] text-[var(--color-primary)] text-center font-medium">
              {t("heading")}
            </h2>
            <p className="text-[0.9rem] hidden md:block md:text-[1rem] t1 opacity-70 text-center px-[1rem] md:px-[14rem] mt-[1rem]">
              {t("details")}
            </p>
            <div className="hidden md:block">
              {/* First Row - Full width */}
              <div className=" grid grid-cols-1 md:grid-cols-3 gap-[1rem] mt-[2rem] md:mt-[3rem] overflow-hidden">
                {firstRow.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-[.51rem] bg-[var(--service-box)] p-[1rem] rounded-lg"
                  >
                    <div className="flex items-start pt-[.61rem]">
                      <img
                        src={item.icon}
                        alt={item.title}
                        className="w-[4rem] md:w-[6rem]"
                      />
                    </div>
                    <div>
                      <h3 className="t1 text-[1rem] md:text-[1.1rem] font-medium">
                        {item.title}
                      </h3>
                      <p className="t1 opacity-70 text-[0.65rem] md:text-[.7rem]">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Second Row Alternative */}
              <div
                className="relative flex flex-col md:flex-row gap-[1rem] mt-[1rem] md:transform md:translate-x-[15%] mx-auto"
                style={{ width: "fit-content" }}
              >
                {secondRow.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-[.51rem] w-full md:w-[34%] bg-[var(--service-box)] p-[1rem] rounded-lg"
                  >
                    <div className="flex items-start pt-[.61rem]">
                      <img
                        src={item.icon}
                        alt={item.title}
                        className="w-[4rem] md:w-[5rem]"
                      />
                    </div>
                    <div>
                      <h3 className="t1 text-[1rem] md:text-[1.1rem] font-medium">
                        {item.title}
                      </h3>
                      <p className="t1 opacity-70 text-[0.65rem] md:text-[.7rem]">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Version with Framer Motion */}
      <motion.div
        ref={mobileSection}
        style={{
          scale: mobileScale,
          opacity: mobileOpacity,
        }}
        className="md:hidden bg-[var(--bg-primary)] z-[30] container-f"
      >
        <div className="relative z-[12]">
          <div className="p-[1rem] max-w-7xl mx-auto home-sec5">
            <h2 className="text-[1.8rem] text-[var(--color-primary)] text-center font-medium">
              {t("heading")}
            </h2>
            <p className="text-[0.9rem] t1 opacity-70 text-center px-[1rem] mt-[1rem]">
              {t("details")}
            </p>
            <div className="mt-[2rem]">
              <motion.div
                className="grid grid-cols-2 gap-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="flex flex-col items-center gap-[.51rem] bg-[var(--service-box)] p-[1rem] rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-start pt-[.61rem]">
                    <img
                      src={secondRow[0].icon}
                      alt={secondRow[0].title}
                      className="w-[3rem]"
                    />
                  </div>
                  <div>
                    <h3 className="t1 text-[.81rem] font-bold text-center text-[#878787]">
                      {secondRow[0].title}
                    </h3>
                  </div>
                </motion.div>
                <motion.div
                  className="flex flex-col items-center gap-[.51rem] bg-[var(--service-box)] p-[1rem] rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-start pt-[.61rem]">
                    <img
                      src={firstRow[1].icon}
                      alt={firstRow[1].title}
                      className="w-[3rem]"
                    />
                  </div>
                  <div>
                    <h3 className="t1 text-[.81rem] font-bold text-center text-[#878787]">
                      {firstRow[1].title}
                    </h3>
                  </div>
                </motion.div>
              </motion.div>
              <motion.div
                className="grid my-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="flex flex-col items-center gap-[.51rem] bg-[var(--service-box)] p-[1rem] rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-start pt-[.61rem]">
                    <img
                      src={firstRow[0].icon}
                      alt={secondRow[0].title}
                      className="w-[3rem]"
                    />
                  </div>
                  <div>
                    <h3 className="t1 text-[.81rem] font-bold text-center text-[#878787]">
                      {firstRow[0].title}
                    </h3>
                  </div>
                </motion.div>
              </motion.div>
              <motion.div
                className="grid my-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="flex flex-col items-center gap-[.51rem] bg-[var(--service-box)] p-[1rem] rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-start pt-[.61rem]">
                    <img
                      src={firstRow[2].icon}
                      alt={firstRow[2].title}
                      className="w-[3rem]"
                    />
                  </div>
                  <div>
                    <h3 className="t1 text-[.81rem] font-bold text-center text-[#878787]">
                      {firstRow[2].title}
                    </h3>
                  </div>
                </motion.div>
              </motion.div>
              <motion.div
                className="grid grid-cols-2 gap-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="flex flex-col items-center gap-[.51rem] bg-[var(--service-box)] p-[1rem] rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-start pt-[.61rem]">
                    <img
                      src={secondRow[1].icon}
                      alt={secondRow[1].title}
                      className="w-[2.7rem]"
                    />
                  </div>
                  <div>
                    <h3 className="t1 text-[.81rem] font-bold text-center text-[#878787]">
                      {secondRow[1].title}
                    </h3>
                  </div>
                </motion.div>
                <motion.div
                  className="flex flex-col items-center gap-[.51rem] bg-[var(--service-box)] p-[1rem] rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-start pt-[.61rem]">
                    <img
                      src={firstRow[1].icon}
                      alt={firstRow[1].title}
                      className="w-[3rem]"
                    />
                  </div>
                  <div>
                    <h3 className="t1 text-[.81rem] font-bold text-center text-[#878787]">
                      {firstRow[1].title}
                    </h3>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default BentoCardsSection;
