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
    heading: "Engineered for Precision, Designed for Dentistry!",
    text: "Our resins are the trusted choice for dental professionals who demand accuracy and reliability. Delivering high-performance solutions for every dental application.",
    buttonText: "Explore More",
  },
  {
    image: "/hero-section/slider2.png",
    heading: "Smooth, Accurate, and Ready to Cast",
    text: "From intricate details to smooth surface finishes, our Resins ensures that your jewellery designs are brought to life with exceptional clarity and precision, ready for casting.",
    buttonText: "Discover Products",
  },
  {
    image: "/hero-section/slider3.png",
    heading: "Engineered for Precision, Designed for Dentistry!",
    text: "Our resins are the trusted choice for dental professionals who demand accuracy and reliability. Delivering high-performance solutions for every dental application.",
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
    <section className="relative flex justify-center -top-24 bg-primary min-h-screen w-full">
      <div className="w-[96vw] lg:w-[92vw] h-[80vh] sm:h-[95vh] overflow-hidden rounded-b-4xl">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          // effect="fade"
          speed={800}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="relative w-full h-full flex justify-center"
        >
          {slides.map((slide, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative w-full h-full text-white">
                <Image
                  src={slide.image}
                  alt={slide.heading}
                  fill
                  className="object-cover z-0 transition-opacity duration-1000 ease-in-out"
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
                      className="absolute left-6 bottom-12 md:left-16 lg:left-24 md:bottom-1/5 max-w-[80%] lg:max-w-[40%] xl:max-w-[30%] z-10"
                    >
                      <h2 className="text-4xl font-bold mb-4 text-wrap font-family-satoshi">
                        {slide.heading}
                      </h2>
                      <p className="mb-8">{slide.text}</p>
                      <Button
                        size="lg"
                        className="cursor-pointer px-8 py-6 text-base bg-brand text-white rounded-md border-1 border-brand transition-colors hover:bg-transparent hover:border-1 hover:border-white"
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
      </div>
    </section>
  );
};

export default HeroSection;
