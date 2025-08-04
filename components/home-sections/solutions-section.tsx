// src/components/home-secions/SolutionsSection.jsx
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useTranslations } from "next-intl";
gsap.registerPlugin(ScrollTrigger);

const SolutionsSection = () => {
  const t = useTranslations("Solution");
  const [hoveredCard, setHoveredCard] = useState<number | null>(0);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const mobileContainerRef = useRef(null);
  const backgroundImages = [
    "/our-solution/1.png",
    "/our-solution/2.png",
    "/our-solution/3.png",
    "/our-solution/5.png",
    "/our-solution/5.png",
    "/our-solution/4.png",
  ];

  const data = [
    {
      id: 1,
      title: t("data.1.title"),
      image: "/our-solution/1.png",
      navigate: "/dental",
      description: t("data.1.description"),
    },
    {
      id: 2,
      title: t("data.2.title"),
      image: "/our-solution/2.png",
      description: t("data.2.description"),
    },
    {
      id: 3,
      title: t("data.3.title"),
      image: "/our-solution/3.png",
      description: t("data.3.description"),
    },
    {
      id: 4,
      title: t("data.4.title"),
      image: "/our-solution/5.png",
      description: t("data.4.description"),
    },
    {
      id: 5,
      title: t("data.5.title"),
      image: "/our-solution/4.png",
      description: t("data.5.description"),
    },
  ];

  useEffect(() => {
    const content = contentRef.current;
    const container = containerRef.current;

    gsap.fromTo(
      content,
      { y: 0 },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: container,
          start: "top 45%",
          end: "top 20%",
          scrub: 1,
        },
      }
    );
  }, []);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 1, y: 0 },
      {
        x: 0,
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 95%",
          end: "top 80%",
          scrub: 1,
        },
      }
    );
  }, []);

  useEffect(() => {
    backgroundImages.forEach((img) => {
      new Image().src = img;
    });
  }, []);

  return (
    <div>
      <div
        ref={mobileContainerRef}
        className="max-sm:block hidden w-screen md:mt-[-30%] relative"
      >
        <div className="grid grid-cols-12 relative bg-[#d9d9d9]">
          <div className="col-span-2">
            <div className="sticky top-20 mb-20">
              <h2 className="mt-[3rem] text-[2.4rem] font-black text-[#848383] flex flex-col items-center leading-[81%]">
                {[...t("heading")].reverse().map((char, index) => (
                  <span
                    key={index}
                    className={`-rotate-90 text-[40px] ${
                      index === 8 ? "mb-6" : "" // adds extra gap after 'R'
                    }`}
                  >
                    {char}
                  </span>
                ))}
              </h2>
            </div>
          </div>
          <div className="col-span-10 space-y-2 pe-2 pb-2">
            <Link href="/dental">
              {" "}
              <div className="relative">
                <img src="/our-solution/1.png" alt="" />
                <h3 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[32px] text-white z-2 inter font-bold">
                  {t("data.1.title")}
                </h3>
                <div className="absolute bg-black/30 inset-0"></div>
              </div>
            </Link>
            <div className="relative">
              <img
                src="/our-solution/5.png"
                alt=""
                className="h-[271px] object-cover w-full"
              />
              <h3 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[32px] text-white z-2 inter font-bold">
                {t("data.4.title")}
              </h3>
              <div className="absolute bg-black/30 inset-0"></div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="relative">
                <img
                  src="/our-solution/3.png"
                  alt=""
                  className="object-cover w-full h-full"
                />
                <h3 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[24px] text-white z-2 inter font-bold">
                  {t("data.3.title")}
                </h3>
                <div className="absolute bg-black/30 inset-0"></div>
              </div>
              <div className="relative">
                <img src="/our-solution/4.png" alt="" />
                <h3 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[24px] text-white z-2 inter font-bold">
                  {t("data.5.title")}
                </h3>
                <div className="absolute bg-black/30 inset-0"></div>
              </div>
            </div>
            <div className="relative">
              <img src="/our-solution/2.png" alt="" />
              <h3 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[32px] text-white z-2 inter font-bold">
                {t("data.2.title")}
              </h3>
              <div className="absolute bg-black/30 inset-0"></div>
            </div>
          </div>
        </div>
      </div>
      <div
        ref={containerRef}
        className="max-sm:hidden  relative z-[30] bg-white 
        mt-[-23%]  min-h-screen py-[3rem] pt-[1rem] px-[15rem]"
      >
        <div ref={contentRef} className="max-w-7xl  mx-auto mt-[1%]">
          {/* Header */}
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div>
              <h2 className="text-[4rem] font-semibold  text-gray-500 mb-4 text-nowrap">
                {t("heading")}
              </h2>
            </div>
          </div>
          {/* Cards */}

          <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-10 gap-3 min-h-screen">
            {data.map((item, index) => {
              let gridClasses = "";
              if (index === 0) gridClasses = "col-span-8 row-span-4";
              else if (index === 1) gridClasses = "col-span-4 row-span-3";
              else if (index === 2) gridClasses = "col-span-4 row-span-5";
              else if (index === 3) gridClasses = "col-span-5 row-span-4";
              else if (index === 4) gridClasses = "col-span-3 row-span-4";

              const cardContent = (
                <div
                  key={item.id}
                  ref={(el) => {
                    cardsRef.current[index] = el;
                  }}
                  className={`cards ${gridClasses} relative group overflow-hidden rounded-lg transition-all duration-500`}
                  onMouseEnter={() => setHoveredCard(item.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] "
                    style={{
                      backgroundImage: `url(${backgroundImages[index]})`,
                    }}
                  ></div>

                  {/* Dark Overlay */}
                  <div
                    className="absolute inset-0 bg-black/5 transition-opacity duration-500"
                    style={{ opacity: hoveredCard === item.id ? 0.3 : 0 }}
                  ></div>

                  {/* Content with Smooth Expand */}
                  <div
                    className={`
            absolute bottom-0 left-0 right-0
            bg-black/40 backdrop-blur-md
            text-white px-6 overflow-hidden
            transition-all duration-700 ease-in-out
            ${
              hoveredCard === item.id
                ? "py-4 max-h-[400px]"
                : "py-2 max-h-[80px]"
            }
          `}
                  >
                    <h3 className="text-xl font-bold md:text-2xl">
                      {item.title}
                    </h3>
                    <div
                      className={`
              mt-2 text-white/90 text-sm leading-relaxed
              transition-all duration-700 ease-in-out
              ${
                hoveredCard === item.id
                  ? "opacity-100 translate-y-0 max-h-[300px]"
                  : "opacity-0 translate-y-2 max-h-0"
              }
            `}
                      style={{ overflow: "hidden" }}
                    >
                      {item.description}
                    </div>
                  </div>
                </div>
              );

              return index === 0 ? (
                <Link href="/dental" key={item.id} className="contents">
                  {cardContent}
                </Link>
              ) : (
                cardContent
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionsSection;
