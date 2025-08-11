"use client";

import React, { useState } from "react";
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
import { useLocale, useTranslations } from "next-intl";

// Animate entire block with entry delay
const contentVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
      delay: 0.5, // ⏸️ Pause before text appears
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.2,
      ease: easeIn,
    },
  },
};

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();
  const locale = useLocale();
  const t = useTranslations("Slides");

  const desktopImage =
    locale === "en"
      ? "/hero-section/slider4.jpg"
      : "/hero-section/slider4-de.jpg";
  const mobileImage =
    locale === "en"
      ? "/hero-section/slider5.jpg"
      : "/hero-section/slider5-de.jpg";
  const slideOneImage = isMobile ? mobileImage : desktopImage;

  const slides = [
    {
      image: slideOneImage,
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
    <section className="relative flex justify-center -top-36 md:-top-24 bg-primary min-h-screen w-full">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, Keyboard, EffectFade]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        // effect="fade"
        speed={800}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        navigation={{
          nextEl: ".custom-swiper-next",
          prevEl: ".custom-swiper-prev",
        }}
        keyboard={{ enabled: true, onlyInViewport: true }}
        className="relative w-full flex justify-center h-[100vh] md:h-full"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx} className="flex justify-center">
            <div className="relative flex justify-center mx-auto w-[96vw] h-[90vh] sm:h-[100vh] text-white rounded-4xl md:rounded-b-[3rem] overflow-clip">
              <img
                src={slide.image}
                alt={slide.heading || "Slider Image"}
                // fill
                className="z-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
                // priority
                // quality={100}
              />
              {/* Animate text only for active slide
              <AnimatePresence mode="wait">
                {activeIndex === idx && (
                  <motion.div
                    key={idx}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={contentVariants}
                    className="absolute left-6 bottom-6 md:left-16 lg:left-24 md:bottom-1/5 max-w-[80%] lg:max-w-[40%] xl:max-w-[30%] z-10"
                  >
                    <h2
                      dangerouslySetInnerHTML={{ __html: slide.heading || "" }}
                      className="text-2xl lg:text-4xl font-bold mb-3 md:mb-4 text-wrap font-family-satoshi"
                    ></h2>
                    <p className="text-sm">{slide.text}</p>

                    <Button
                      size="lg"
                      className="hidden md:flex md:mt-8 cursor-pointer px-8 py-6 text-base bg-brand text-white rounded-md border-1 border-brand transition-colors hover:bg-transparent hover:border-1 hover:border-white"
                    >
                      {slide.buttonText}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence> */}
            </div>
          </SwiperSlide>
        ))}
        <AnimatePresence mode="wait">
          {activeIndex > 0 && slides[activeIndex]?.heading && (
            <motion.div
              className="absolute bottom-28 md:bottom-48 left-6 md:left-16 lg:left-24 max-w-[80%] lg:max-w-[40%] xl:max-w-[30%] z-10"
              key={activeIndex}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={contentVariants}
            >
              <h2
                dangerouslySetInnerHTML={{
                  __html: t(`slide${activeIndex}.heading`),
                }}
                className="text-2xl lg:text-4xl font-bold mb-3 md:mb-4 text-white text-wrap font-family-satoshi"
              />
              <p className="text-white">{t(`slide${activeIndex}.text`)}</p>
              {/* button hidden temporarily */}
              {/* <Button
                      size="lg"
                      className="hidden md:flex md:mt-8 cursor-pointer px-8 py-6 text-base bg-brand text-white rounded-md border-1 border-brand transition-colors hover:bg-transparent hover:border-1 hover:border-white"
                    >
                      {slide.buttonText}
                    </Button> */}
            </motion.div>
          )}
        </AnimatePresence>
      </Swiper>
      <div className="hidden lg:flex absolute z-20 w-full justify-between items-center h-full px-4 pointer-events-none">
        <button
          className="custom-swiper-prev cursor-pointer pointer-events-auto backdrop-blur-sm border border-white/20 bg-black/20 hover:bg-black/40 dark:bg-white/10  dark:hover:bg-white/20 text-white rounded-full p-4 transition"
          aria-label="Previous"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          className="custom-swiper-next cursor-pointer pointer-events-auto backdrop-blur-sm border border-white/20 bg-black/20 hover:bg-black/40 dark:bg-white/10  dark:hover:bg-white/20 text-white rounded-full p-4 transition"
          aria-label="Next"
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
