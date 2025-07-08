"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { easeOut, easeIn } from "framer-motion";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import { Button } from "../ui/button";
import "./hero-section.css";

const slides = [
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

  return (
    <section className="relative flex justify-center -top-24 bg-primary h-screen w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        effect="fade"
        speed={1000}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="relative w-[96vw] lg:w[92vw] max-w-[1800px] h-[80vh] lg:h-[95vh] max-h-[1000px] flex justify-center rounded-b-4xl"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-full h-full text-white">
              <Image
                src={slide.image}
                alt={slide.heading}
                fill
                className="object-cover z-0 transition-opacity duration-1000 ease-in-out rounded-b-4xl"
                priority
                quality={100}
              />

              {/* Animate text only for active slide */}
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
                      dangerouslySetInnerHTML={{ __html: slide.heading }}
                      className="text-2xl lg:text-4xl font-bold mb-3 md:mb-4 text-wrap font-family-satoshi"
                    ></h2>
                    <p className="md:mb-8 text-sm">{slide.text}</p>
                    <Button
                      size="lg"
                      className="hidden md:flex cursor-pointer px-8 py-6 text-base bg-brand text-white rounded-md border-1 border-brand transition-colors hover:bg-transparent hover:border-1 hover:border-white"
                    >
                      {slide.buttonText}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSection;
