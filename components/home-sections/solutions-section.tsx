// src/components/home-secions/SolutionsSection.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SolutionItem {
  id: number;
  title: string;
  image: string;
  description: string;
}

const SolutionsSection: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const backgroundImages: string[] = [
    "/our-solution/1.png",
    "/our-solution/2.png",
    "/our-solution/3.png",
    "/our-solution/4.png",
    "/our-solution/5.png",
  ];

  const data: SolutionItem[] = [
    {
      id: 1,
      title: "Dental",
      image: "/our-solution/1.png",
      description:
        "Custom dental models, appliances and aligners produced with medical-grade materials for perfect patient fit.",
    },
    {
      id: 2,
      title: "Funtionality",
      image: "/our-solution/2.png",
      description:
        "Precision-engineered parts for mechanical applications with exceptional durability.",
    },
    {
      id: 3,
      title: "DIY",
      image: "/our-solution/3.png",
      description:
        "State-of-the-art printing technology with precise extrusion control for complex geometries.",
    },
    {
      id: 4,
      title: "Jewellery",
      image: "/our-solution/4.png",
      description:
        "High-detail character models and prototypes for entertainment and gaming industries.",
    },
    {
      id: 5,
      title: "Filaments",
      image: "/our-solution/5.png",
      description:
        "Specialized resins and filaments for unique applications with custom properties.",
    },
  ];

  useEffect(() => {
    const content = contentRef.current;
    const container = containerRef.current;

    if (!content || !container) return;

    gsap.fromTo(
      content,
      { y: 100 },
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
    const container = containerRef.current;
    if (!container) return;

    gsap.fromTo(
      container,
      { opacity: 0 },
      {
        x: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: container,
          start: "top 35%",
          end: "top 10%",
          scrub: 1,
        },
      }
    );
  }, []);

  useEffect(() => {
    backgroundImages.forEach((img) => {
      const preloadedImage = new Image();
      preloadedImage.src = img;
    });
  }, []);

  return (
    <div>
      {/* Mobile View */}
      <div className="hidden max-sm:block overflow-hidden  w-screen max-h-screen">
        <div className="grid grid-cols-12 bg-[#d9d9d9]">
          <div className="transform mt-[-15rem] rotate-[-90deg] col-span-2 flex items-center justify-start text-[1.5rem]">
            <h2 className="whitespace-nowrap text-[2.4rem] font-black text-[#848383]">
              OUR SOLUTIONS
            </h2>
          </div>
          <div className="col-span-10 space-y-2 pe-2 pb-2">
            <div className="relative">
              <img src="/our-solution/1.png" alt="" />
              <h3 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[32px] text-white z-2 inter font-bold">
                Dental
              </h3>
              <div className="absolute bg-black/30 inset-0"></div>
            </div>
            <div className="relative">
              <img
                src="/our-solution/2.png"
                alt=""
                className="h-[271px] object-cover w-full"
              />
              <h3 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[32px] text-white z-2 inter font-bold">
                Jewellery
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
                  DIY
                </h3>
                <div className="absolute bg-black/30 inset-0"></div>
              </div>
              <div className="relative">
                <img src="/our-solution/4.png" alt="" />
                <h3 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[24px] text-white z-2 inter font-bold">
                  Filaments
                </h3>
                <div className="absolute bg-black/30 inset-0"></div>
              </div>
            </div>
            <div className="relative">
              <img src="/our-solution/5.png" alt="" />
              <h3 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[32px] text-white z-2 inter font-bold">
                Engineering
              </h3>
              <div className="absolute bg-black/30 inset-0"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div
        ref={containerRef}
        className="max-sm:hidden relative z-[30] mt-[-199vh] min-h-screen py-[3rem] pt-[10rem] px-[15rem]"
      >
        <div ref={contentRef} className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div>
              <h2 className="text-[4rem] font-semibold text-gray-500 mb-4 text-nowrap">
                OUR SOLUTIONS
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-10 gap-3 min-h-screen">
            {data.map((item, index) => {
              let gridClasses = "";
              if (index === 0) gridClasses = "col-span-8 row-span-4";
              else if (index === 1) gridClasses = "col-span-4 row-span-3";
              else if (index === 2) gridClasses = "col-span-4 row-span-5";
              else if (index === 3) gridClasses = "col-span-5 row-span-4";
              else if (index === 4) gridClasses = "col-span-3 row-span-4";

              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    cardsRef.current[index] = el;
                  }}
                  className={`cards ${gridClasses} relative group overflow-hidden rounded-lg transition-all duration-500`}
                  onMouseEnter={() => setHoveredCard(item.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                    style={{
                      backgroundImage: `url(${backgroundImages[index]})`,
                    }}
                  ></div>

                  <div
                    className="absolute inset-0 bg-black/5 transition-opacity duration-500"
                    style={{ opacity: hoveredCard === item.id ? 0.3 : 0 }}
                  ></div>

                  <div
                    className={`
                      absolute bottom-0 left-0 right-0
                      bg-black/40 backdrop-blur-md
                      text-white px-6 overflow-hidden
                      transition-all duration-[800ms] 
                      ${
                        hoveredCard === item.id
                          ? "py-1 max-h-[400px]"
                          : "py-1 max-h-[80px]"
                      }
                    `}
                  >
                    <h3 className="text-xl font-bold md:text-2xl">
                      {item.title}
                    </h3>
                    <div
                      className={`
                        mt-2 text-white/90 text-sm leading-relaxed
                        transition-all duration-[500ms] 
                        ${hoveredCard === item.id ? "block" : "hidden"}
                      `}
                    >
                      {item.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionsSection;
