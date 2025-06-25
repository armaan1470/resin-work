import Image from "next/image";
import React from "react";
import slider1 from "../../public/hero-section/slider1.png";
import slider2 from "../../public/hero-section/slider2.png";
import slider3 from "../../public/hero-section/slider3.png";

const HeroSection = () => {
  const slides = [
    {
      image: slider1,
      heading: "Engineered for Precision, Designed for Dentistry!",
      text: "Our resins are the trusted choice for dental professionals who demand accuracy and reliability. Delivering high-performance solutions for every dental application.",
      buttonText: "Explore More",
    },
    {
      image: slider2,
      heading: "Smooth, Accurate, and Ready to Cast",
      text: "From intricate details to smooth surface finishes, our Resins ensures that your jewellery designs are brought to life with exceptional clarity and precision, ready for casting. ",
      buttonText: "Discover Products",
    },
    {
      image: slider3,
      heading: "Engineered for Precision, Designed for Dentistry!",
      text: "Our resins are the trusted choice for dental professionals who demand accuracy and reliability. Delivering high-performance solutions for every dental application.",
      buttonText: "Learn More",
    },
  ];
  return (
    <section className="bg-primary py-20 min-h-screen relative">
      {/* {slides.map((slide, index) => (
        <Image
          src={slide.image}
          alt={`Slide ${index + 1}`}
          width={300}
          height={300}

        />
      ))} */}
      <div className="w-full flex justify-center rounded-b-4xl">
        <Image
          src={slider1}
          alt={`Slide 1`}
          quality={100}
          className="absolute -top-24 w-[92%] h-[95%] max-w-[1800px] max-h-[950px] rounded-b-4xl object-cover"
        />
      </div>
    </section>
  );
};

export default HeroSection;
