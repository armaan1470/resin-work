// src/components/category/DentalHeroSection.jsx
import React from "react";

const DentalHeroSection = () => {
  return (
    <div>
      <div className="md:hidden">
        <div>
          <p className="text-[var(--text-subheading)] opacity-55  ps-5 pt-4 text-[18px] md:text-[20px]  font-light flex items-center gap-2 flex-wrap">
            <span>Home</span>
            <span className="mx-1">›</span>
            <span>Dental</span>
            <span className="mx-1">›</span>
            <span className="text-amber-400">Products</span>
          </p>
          <div className="w-full relative mt-4 ">
            {/* Image */}
            <img
              src="/category-home/7.png"
              alt="Dental-Hero-Poster"
              className="h-[50vh] w-[90vw] mx-auto rounded-2xl object-cover"
            />

            {/* Gradient Overlay */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="w-[90vw] h-[50vh] mx-auto rounded-2xl bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
            </div>

            {/* Text content */}
            <div className="absolute top-6 px-8">
              <h1 className="text-white text-[36px] sm:text-4xl md:text-5xl lg:text-[60px] font-bold max-w-4xl mt-4 leading-tight">
                The Next Big Thing in Digital Dentistry
              </h1>
              <h3 className="text-white text-[16px] max-w-3xl mt-4 leading-[130%]">
                In-office dental 3D printing helps improve the efficiency of
                forward-thinking practices all over the world.
              </h3>
            </div>

            <div className="absolute bottom-5 px-8">
              {/* optional footer content */}
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <div className="relative overflow-hidden px-[1rem] min-h-screen ">
          <div
            className="grid grid-cols-12 mt-[1rem] bg-cover bg-no-repeat bg-center py-[3rem] min-h-[80vh] rounded-2xl overflow-hidden"
            style={{ backgroundImage: `url("/category-home/7.png")` }}
          >
            <div className="col-span-8 flex items-center">
              <div className="containe mx-auto lg:px-[4rem] px-4 sm:px-6 md:px-8  xl:px-12  ">
                {/* Breadcrumb */}
                <p className="text-white text-[18px] md:text-[20px]  font-light flex items-center gap-2 flex-wrap">
                  <span>Home</span>
                  <span className="mx-1">›</span>
                  <span>Dental</span>
                  <span className="mx-1">›</span>
                  <span className="text-amber-400">Products</span>
                </p>

                {/* Main Heading */}
                <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[60px] font-bold max-w-4xl mt-4 leading-tight">
                  The Next Big Thing in Digital Dentistry
                </h1>

                {/* Subheading */}
                <h3 className="text-white text-lg sm:text-xl md:text-[24px] max-w-3xl mt-4 leading-snug">
                  In-office dental 3D printing helps improve the efficiency of
                  forward-thinking practices all over the world.
                </h3>

                {/* Description */}
                <p className="text-white/80 text-[16px] sm:text-[18px] md:text-[20px] lg:text-[1rem] max-w-3xl mt-6 font-light leading-relaxed">
                  By leveraging existing technologies that exist in digital
                  dentistry, 3D printing enables better responsiveness to
                  patient needs, significantly reduces manufacturing times, and
                  opens up new treatment options. With low operating costs,
                  minimal maintenance, and user-friendly design, Resinwork
                  products make it easy to bring digital dentistry and 3D
                  printing together in your practice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DentalHeroSection;
