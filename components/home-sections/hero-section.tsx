"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  EffectFade,
  Navigation,
  Keyboard,
} from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { easeOut, easeIn } from "framer-motion";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Button } from "../ui/button";
import "./hero-section.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

// Animate entire block with entry delay
const contentVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
      delay: 0.8, // ⏸️ Pause before text appears
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.5,
      ease: easeIn,
    },
  },
};

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();
  const swiperRef = useRef<any>(null);

  const slideOneImage = isMobile
    ? "/hero-section/slider5.png"
    : "/hero-section/slider4.png";

  const slides = [
    {
      image: slideOneImage,
      // heading: "Engineered for Precision, <br /> Designed for Dentistry!",
      // text: "Trusted by dental professionals for high-performance results.",
      // buttonText: "Learn More",
    },
    {
      image: "/hero-section/slider1.png",
      heading: "Engineered for Precision, <br /> Designed for Dentistry!",
      text: "Our resins are the trusted choice for dental professionals who demand accuracy and reliability.",
      buttonText: "Explore More",
    },
    {
      image: "/hero-section/slider2.png",
      heading: "Smooth, Accurate, <br />  & Ready to Cast",
      text: "Bring jewellery designs to life with clarity and precision, ready for casting.",
      buttonText: "Discover Products",
    },
    {
      image: "/hero-section/slider3.png",
      heading: "Engineered for Precision, <br /> Designed for Dentistry!",
      text: "Trusted by dental professionals for high-performance results.",
      buttonText: "Learn More",
    },
  ];

  return (
    <section className="relative -top-24 bg-primary min-h-screen w-full flex justify-center">
      <Swiper
        modules={[Autoplay, Navigation, Keyboard, EffectFade, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        speed={800}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            pagination: false,
          },
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        navigation={{
          nextEl: ".custom-swiper-next",
          prevEl: ".custom-swiper-prev",
        }}
        keyboard={{ enabled: true }}
        className="h-[100vh] md:h-full"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative flex justify-center mx-auto w-[96vw] h-[90vh] sm:h-[98vh] overflow-clip rounded-4xl md:rounded-b-[3rem]">
              <Image
                src={slide.image}
                alt="Slide image"
                fill
                className="object-cover transition-opacity duration-1000 ease-in-out"
                priority
                quality={100}
              />

              {/* TEXT CONTAINER */}
              <div className="absolute left-6 bottom-6 md:left-16 md:bottom-1/5 max-w-[80%] lg:max-w-[40%] xl:max-w-[30%] z-10">
                {/* 1) Your H2 */}
                <h2
                  className="text-2xl lg:text-4xl font-bold mb-3"
                  dangerouslySetInnerHTML={{ __html: slide.heading || "" }}
                />
                <p className="text-sm">{slide.text}</p>

                {/* 2) Custom bullets BELOW the H2 */}
                <div className="custom-bullets space-x-2 mt-4 hidden md:flex">
                  {slides.map((_, bidx) => (
                    <button
                      key={bidx}
                      onClick={() => swiperRef.current?.slideToLoop(bidx)}
                      className={
                        bidx === activeIndex
                          ? "w-4 h-4 rounded-full !bg-[var(--color-primary)] border opacity-100"
                          : "w-4 h-4 rounded-full border opacity-50"
                      }
                    />
                  ))}
                </div>

                {/* 3) Paragraph text */}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Prev / Next buttons */}
      <button className="custom-swiper-prev absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/20 text-white rounded-full z-20 hover:bg-black/40">
        <ChevronLeft size={24} />
      </button>
      <button className="custom-swiper-next absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/20 text-white rounded-full z-20 hover:bg-black/40">
        <ChevronRight size={24} />
      </button>
    </section>
  );
};

export default HeroSection;
