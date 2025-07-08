// src/components/home-secions/BentoCardsSection.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const BentoCardsSection = () => {
  const containerRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // Check if desktop on mount and resize
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkDesktop();
    window.addEventListener("resize", checkDesktop);

    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  // Use scroll progress for animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Transform values based on scroll progress
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, isDesktop ? 0.7 : 0.8]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);

  const firstRow = [
    {
      title:
        "Premium Quality Materials Uncompromising Standards for Superior Results",
      desc: "Our 3D printing resins are crafted with the highest quality standards to ensure durability, precision, and optimal performance in every print.",
      icon: "/home-section/1.svg",
    },
    {
      title: "Fast Turnaround Times Accelerating Your Time to Market",
      desc: "With our fast-curing resins and efficient production processes, we help you meet tight deadlines and deliver products on time, every time",
      icon: "/home-section/2.svg",
    },
    {
      title:
        "Tailored Solutions for Every Industry Versatile Resins for Every Application",
      desc: "With our fast-curing resins and efficient production processes, we help you meet tight deadlines and deliver products on time, every time",
      icon: "/home-section/3.svg",
    },
  ];

  const secondRow = [
    {
      title: "Reliable Performance Consistency You Can Count On",
      desc: "Our 3D printing resins are crafted with the highest quality standards to ensure durability, precision, and optimal performance in every print.",
      icon: "/home-section/4.svg",
    },
    {
      title: "Fast Turnaround Times Accelerating Your Time to Market",
      desc: "With our fast-curing resins and efficient production processes, we help you meet tight deadlines and deliver products on time, every time",
      icon: "/home-section/5.svg",
    },
  ];

  return (
    <div className="relative">
      {/* Spacer div to create scroll distance */}
      <div className="">
        <motion.div
          ref={containerRef}
          className="sticky top-0 bg-[var(--bg-primary)] z-[30] container-f h-screen overflow-hidden"
          style={{
            scale,
            opacity,
            transformOrigin: "center center",
          }}
        >
          <div className="relative z-[12] h-full flex items-center">
            <div className="p-[1rem] md:p-[4rem] max-w-7xl mx-auto home-sec5 w-full">
              <motion.h2
                className="text-[1.8rem] md:text-[2.53rem] text-[var(--color-primary)] text-center font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Fast, efficient, reliable 3D Printing Solutions
              </motion.h2>

              <motion.p
                className="text-[0.9rem] hidden md:block md:text-[1rem] t1 opacity-70 text-center px-[1rem] md:px-[14rem] mt-[1rem]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                At Resinwork, we provide cutting-edge 3D printing resins
                designed to deliver high-quality, precise results with speed and
                consistency. Whether you're in manufacturing, prototyping, or
                product development, our solutions are engineered to meet the
                demands of any industry-helping you innovate faster and more
                efficiently.
              </motion.p>

              {/* Desktop Layout */}
              <div className="hidden md:block">
                {/* First Row - Full width */}
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-3 gap-[1rem] mt-[2rem] md:mt-[3rem] overflow-hidden"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {firstRow.map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex gap-[.51rem] bg-[var(--service-box)] p-[1rem] rounded-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
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
                    </motion.div>
                  ))}
                </motion.div>

                {/* Second Row Alternative */}
                <motion.div
                  className="relative flex flex-col md:flex-row gap-[1rem] mt-[1rem] md:transform md:translate-x-[15%] mx-auto"
                  style={{ width: "fit-content" }}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  {secondRow.map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex gap-[.51rem] w-full md:w-[34%] bg-[var(--service-box)] p-[1rem] rounded-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
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
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Mobile Layout */}
              <div className="md:hidden mt-[2rem]">
                <motion.div
                  className="grid grid-cols-2 gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <motion.div className="flex flex-col items-center gap-[.51rem] bg-[var(--service-box)] p-[1rem] rounded-lg">
                    <div className="flex items-start pt-[.61rem]">
                      <img
                        src={secondRow[0].icon}
                        alt={secondRow[0].title}
                        className="w-[3rem] md:w-[6rem]"
                      />
                    </div>
                    <div>
                      <h3 className="t1 text-[.81rem] md:text-[1.1rem] font-bold text-center text-[#878787]">
                        {secondRow[0].title}
                      </h3>
                    </div>
                  </motion.div>
                  <motion.div className="flex flex-col items-center gap-[.51rem] bg-[var(--service-box)] p-[1rem] rounded-lg">
                    <div className="flex items-start pt-[.61rem]">
                      <img
                        src={firstRow[1].icon}
                        alt={firstRow[1].title}
                        className="w-[3rem] md:w-[6rem]"
                      />
                    </div>
                    <div>
                      <h3 className="t1 text-[.81rem] md:text-[1.1rem] font-bold text-center text-[#878787]">
                        {firstRow[1].title}
                      </h3>
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="grid my-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <motion.div className="flex flex-col items-center gap-[.51rem] bg-[var(--service-box)] p-[1rem] rounded-lg">
                    <div className="flex items-start pt-[.61rem]">
                      <img
                        src={firstRow[0].icon}
                        alt={firstRow[0].title}
                        className="w-[3rem] md:w-[6rem]"
                      />
                    </div>
                    <div>
                      <h3 className="t1 text-[.81rem] md:text-[1.1rem] font-bold text-center text-[#878787]">
                        {firstRow[0].title}
                      </h3>
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="grid my-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <motion.div className="flex flex-col items-center gap-[.51rem] bg-[var(--service-box)] p-[1rem] rounded-lg">
                    <div className="flex items-start pt-[.61rem]">
                      <img
                        src={firstRow[2].icon}
                        alt={firstRow[2].title}
                        className="w-[3rem] md:w-[6rem]"
                      />
                    </div>
                    <div>
                      <h3 className="t1 text-[.81rem] md:text-[1.1rem] font-bold text-center text-[#878787]">
                        {firstRow[2].title}
                      </h3>
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="grid grid-cols-2 gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                >
                  <motion.div className="flex flex-col items-center gap-[.51rem] bg-[var(--service-box)] p-[1rem] rounded-lg">
                    <div className="flex items-start pt-[.61rem]">
                      <img
                        src={secondRow[1].icon}
                        alt={secondRow[1].title}
                        className="w-[2.7rem] md:w-[6rem]"
                      />
                    </div>
                    <div>
                      <h3 className="t1 text-[.81rem] md:text-[1.1rem] font-bold text-center text-[#878787]">
                        {secondRow[1].title}
                      </h3>
                    </div>
                  </motion.div>
                  <motion.div className="flex flex-col items-center gap-[.51rem] bg-[var(--service-box)] p-[1rem] rounded-lg">
                    <div className="flex items-start pt-[.61rem]">
                      <img
                        src={firstRow[1].icon}
                        alt={firstRow[1].title}
                        className="w-[3rem] md:w-[6rem]"
                      />
                    </div>
                    <div>
                      <h3 className="t1 text-[.81rem] md:text-[1.1rem] font-bold text-center text-[#878787]">
                        {firstRow[1].title}
                      </h3>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BentoCardsSection;
