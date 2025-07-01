"use client";

import { dentalProducts as productData } from "../../../public/data/dental";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FileText } from "lucide-react";

interface ProductImage {
  id: number;
  img: string;
  color?: string;
  colorName?: string;
}

interface ProductFeature {
  id: number;
  title: string;
  description: string;
}

interface Product {
  id: number;
  navic_id: string;
  name: string;
  subTitle: string;
  description: string;
  features: ProductFeature[];
  images: ProductImage[];
}

gsap.registerPlugin(ScrollTrigger);

interface MainImageState {
  [key: string]: {
    image: ProductImage;
    source: "thumbnail" | "color";
  };
}

interface IndexState {
  [key: string]: number | null;
}

interface ColorState {
  [key: string]: number | null;
}

const MobileDentalProductSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sections = useRef<(HTMLElement | null)[]>([]);
  const imageContainerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [autoCycling, setAutoCycling] = useState<boolean>(true);
  const [userSelectedColor, setUserSelectedColor] = useState<boolean | null>(
    null
  );

  const [mainImages, setMainImages] = useState<MainImageState>(() => {
    return productData.reduce((acc: MainImageState, product: Product) => {
      acc[String(product.id)] = {
        image: product.images[0],
        source: "thumbnail",
      };
      return acc;
    }, {} as MainImageState);
  });

  const [activeThumbnailIndices, setActiveThumbnailIndices] =
    useState<IndexState>(() => {
      return productData.reduce((acc: IndexState, product: Product) => {
        const firstThumbnailIndex = product.images.findIndex(
          (img: ProductImage) => !img.color
        );
        acc[String(product.id)] =
          firstThumbnailIndex >= 0 ? firstThumbnailIndex : null;
        return acc;
      }, {} as IndexState);
    });

  const [activeColors, setActiveColors] = useState<ColorState>(() => {
    return productData.reduce((acc: ColorState, product: Product) => {
      const colorImage = product.images.find((img: ProductImage) => img.color);
      acc[String(product.id)] = colorImage ? colorImage.id : null;
      return acc;
    }, {} as ColorState);
  });

  const [activeIndices, setActiveIndices] = useState<IndexState>(() => {
    return productData.reduce((acc: IndexState, product: Product) => {
      acc[String(product.id)] = null;
      return acc;
    }, {} as IndexState);
  });

  const toggleAccordion = (productId: number, index: number) => {
    setActiveIndices((prev) => ({
      ...prev,
      [productId]: prev[productId] === index ? null : index,
    }));

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 350);
  };

  const handleImageChange = (
    productId: number,
    image: ProductImage,
    sourceType: "thumbnail" | "color",
    imageIndex?: number
  ) => {
    setMainImages((prev) => ({
      ...prev,
      [productId]: {
        image: image,
        source: sourceType,
      },
    }));

    if (sourceType === "thumbnail" && typeof imageIndex === "number") {
      setActiveThumbnailIndices((prev) => ({
        ...prev,
        [productId]: imageIndex,
      }));
    }

    if (image.color) {
      setActiveColors((prev) => ({
        ...prev,
        [productId]: image.id,
      }));
      setAutoCycling(false);
      setUserSelectedColor(true);
    } else {
      setActiveColors((prev) => ({
        ...prev,
        [productId]: null,
      }));
      setAutoCycling(true);
      setUserSelectedColor(false);
    }
  };

  useEffect(() => {
    ScrollTrigger.getAll().forEach((instance) => instance.kill());

    sections.current.forEach((section, index) => {
      if (!section) return;

      const imageContainer = imageContainerRefs.current[index];
      if (!imageContainer) return;

      const isLastSection = index === sections.current.length - 1;

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: isLastSection ? "bottom bottom" : "bottom top",
        pin: imageContainer,
        pinSpacing: false,
      });

      if (!isLastSection) {
        ScrollTrigger.create({
          trigger: sections.current[index + 1],
          start: "top top",
          onEnter: () =>
            gsap.to(imageContainer, { opacity: 0, duration: 0.000003 }),
          onLeaveBack: () =>
            gsap.to(imageContainer, { opacity: 1, duration: 0.0000003 }),
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((instance) => instance.kill());
    };
  }, [activeIndex]);

  useEffect(() => {
    if (!autoCycling) return;

    const intervals = productData.map((product: Product) => {
      const nonColorImages = product.images.filter(
        (img: ProductImage) => !img.color
      );
      if (nonColorImages.length <= 1) return null;

      return window.setInterval(() => {
        if (userSelectedColor) return;

        setActiveThumbnailIndices((prev) => {
          const currentIndex = prev[String(product.id)] ?? 0;
          const nextIndex = (currentIndex + 1) % nonColorImages.length;

          setMainImages((prevImages) => ({
            ...prevImages,
            [String(product.id)]: {
              image: nonColorImages[nextIndex],
              source: "thumbnail",
            },
          }));

          return {
            ...prev,
            [String(product.id)]: nextIndex,
          };
        });
      }, 5000);
    });

    return () => {
      intervals.forEach((interval: number | null) => {
        if (interval !== null) clearInterval(interval);
      });
    };
  }, [autoCycling, userSelectedColor]);

  return (
    <div>
      <div className="relative pb-[10rem] pt-4 md:hidden" ref={containerRef}>
        {productData.map((product: Product, index: number) => (
          <section
            key={product.id}
            ref={(el) => {
              sections.current[index] = el;
            }}
            className="min-h-screen grid grid-cols-1   relative pb-[20rem] last:pb-0 px-[1rem] md:px-[5rem]"
          >
            <div className="py-5  md:py-10  order-2 md:order-1">
              <div className="space-y-2 mt-26 pe-0 md:pe-[4rem] px-4">
                {product.description
                  .split(".")
                  .filter((sentence: string) => sentence.trim().length > 0)
                  .map((sentence: string, idx: number) => (
                    <p
                      key={idx}
                      className="text-gray-500 shadow-2xl bg-white p-[1rem] rounded-lg my-[.6rem] text-[0.9rem] md:text-[1rem] lg:text-[1rem] xl:text-[1.3rem]"
                    >
                      {sentence.trim()}
                      {idx < product.description.split(".").length - 2
                        ? "."
                        : ""}
                    </p>
                  ))}
              </div>

              <div className="grid grid-cols-12 mt-4 me-0 md:me-[3rem]">
                <div className="col-span-12">
                  {product.features.map(
                    (feature: ProductFeature, idx: number) => (
                      <div key={`feature-${feature.id}`} className="my-[1rem]">
                        <div className="grid grid-cols-12 w-full">
                          <div className="col-span-12">
                            <div
                              className={`w-full overflow-hidden ${
                                activeIndices[product.id] === idx
                                  ? "border-[#5D5D5D]"
                                  : "border-[#5D5D5D]"
                              }`}
                            >
                              {/* Title/Header section */}
                              <div
                                className="flex items-center justify-between cursor-pointer p-[1rem] transition-colors duration-150"
                                onClick={() => toggleAccordion(product.id, idx)}
                              >
                                <div className="flex items-center space-x-3">
                                  <div className="w-4 h-4 bg-[var(--color-primary)] rounded-full"></div>
                                  <h4 className="text-[1.1rem] md:text-[1.4rem] xl:text-[2rem] font-medium text-[var(--text-subheading1)]">
                                    {feature.title}
                                  </h4>
                                </div>

                                {/* SVG Icon */}
                                <svg
                                  className={`w-5 h-5 text-[var(--text-subheading)] transition-all duration-300 ${
                                    activeIndices[product.id] === idx
                                      ? "scale-110"
                                      : ""
                                  }`}
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  {/* Always render horizontal line (minus line) */}
                                  <line x1="5" y1="12" x2="19" y2="12" />

                                  {/* Render vertical line (to form plus) only when NOT hovered */}
                                  {activeIndices[product.id] !== idx && (
                                    <line x1="12" y1="5" x2="12" y2="19" />
                                  )}
                                </svg>
                              </div>

                              {/* Content Section */}
                              <div
                                className={`${
                                  activeIndices[product.id] === idx
                                    ? "max-h-[500px] opacity-100 pb-4 px-4"
                                    : "max-h-0 opacity-0"
                                }`}
                                style={{
                                  overflow: "hidden",
                                  willChange: "max-height",
                                }}
                              >
                                <p className="text-[var(--text-subheading)] text-[0.9rem] md:text-[1rem] ps-[1rem] md:ps-[2rem] pe-[1rem] md:pe-[2rem]">
                                  {feature.description}
                                </p>
                              </div>

                              <div className="bg-[#5D5D5D] h-[.5px] w-[90%]"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="bg-[var(--bg-primary)]">
                <button className="text-[var(--text-subheading)]  px-4 rounded-md py-[1rem] md:py-[2rem] flex space-x-2 items-center cursor-pointer">
                  <span>Download Product Data Sheet</span>
                  <FileText />
                </button>
              </div>
            </div>

            {/* Right side - image */}
            <div
              ref={(el) => {
                imageContainerRefs.current[index] = el;
              }}
              className="order-1 md:order-2 sticky top-[5vh]   bg-[var(--bg-primary)]  md:top-[1rem] h-[50vh] md:h-screen flex-col flex items-start justify-center"
            >
              {/* active index title and descrption display */}
              <section
                key={product.id}
                ref={(el) => {
                  sections.current[index] = el;
                }}
                className=" grid grid-cols-1  px-4 mt-4 pt-[10%] relative  bg-[var(--bg-primary)] "
              >
                <div className="py-2 md:py-10  order-2 md:order-1">
                  <h2 className="w-full md:w-[90%] py-[.4rem] pop font-semibold rounded-lg border border-[var(--color-primary)] text-[var(--text-primary)] text-[1.5rem] md:text-[1.8rem] ps-[1rem] lg:text-[2rem] xl:text-[2.6rem]">
                    {product.name}
                  </h2>
                  <h3 className="text-[var(--text-subheading)] text-[1rem] md:text-[1.5rem]  mt-[.61rem] me-0 md:me-[3rem]">
                    {product.subTitle}
                  </h3>
                </div>
              </section>
              <div className="h-full w-full flex items-start justify-center">
                <div className="w-full   relative  bg-[var(--bg-primary)] px-3 ">
                  {/* Main Image Display */}
                  <div className="relative">
                    <img
                      src={
                        mainImages[product.id]?.image?.img ||
                        product.images[0].img
                      }
                      alt={product.name}
                      className="w-full md:w-[34rem] h-[25vh] md:h-[22rem] mx-auto rounded-lg shadow-md object-cover transition-opacity duration-500"
                      key={
                        mainImages[product.id]?.image?.id ||
                        product.images[0].id
                      }
                    />
                  </div>

                  <div className="flex  md:flex-row justify-between items-center bg-[var(--bg-primary)] pt-3">
                    {/* Thumbnail Images */}
                    <div className="flex space-x-1 px-2  py-3 md:mt-4 col-span-6 items-center h-full ms-0 md:ms-3 overflow-x-auto w-full md:w-auto">
                      {product.images
                        .filter((image: ProductImage) => !image.color)
                        .map((image: ProductImage, thumbIndex: number) => {
                          const isActive =
                            activeThumbnailIndices[product.id] === thumbIndex &&
                            mainImages[product.id]?.source === "thumbnail";
                          return (
                            <button
                              key={`thumb-${product.id}-${thumbIndex}`}
                              onClick={() =>
                                handleImageChange(
                                  product.id,
                                  image,
                                  "thumbnail",
                                  thumbIndex
                                )
                              }
                              className={`rounded-lg overflow-hidden transition-all flex-shrink-0 ${
                                isActive
                                  ? "ring-2 ring-[var(--color-primary)] p-[2px]"
                                  : "border-2 ring-2 ring-transparent p-[2px] border-transparent hover:border-gray-300"
                              }`}
                            >
                              <img
                                src={image.img}
                                alt={`${product.name} thumbnail`}
                                className="w-[2rem] h-[2rem] rounded-lg object-cover"
                              />
                            </button>
                          );
                        })}
                    </div>

                    {/* Color Swatches */}
                    {product.images.some(
                      (image: ProductImage) => image.color
                    ) && (
                      <div className=" mt-2 md:mt-4 flex justify-between  space-x-2 h-full w-fit md:w-auto">
                        {/* <h2 className='text-[.9rem] t1'>Colours</h2> */}
                        <div className="flex flex-nowrap gap-2 md:gap-4 overflow-x-auto w-full py-2 px-1  pb-2">
                          {product.images
                            .filter((image: ProductImage) => image.color)
                            .map((image: ProductImage, colorIndex) => {
                              const isSelected =
                                mainImages[product.id]?.image?.id === image.id;
                              return (
                                <div
                                  key={`color-${product.id}-${colorIndex}`}
                                  className="relative flex flex-col items-center flex-shrink-0"
                                >
                                  <button
                                    onClick={() =>
                                      handleImageChange(
                                        product.id,
                                        image,
                                        "color"
                                      )
                                    }
                                    className={`w-[1.5rem] h-[1.5rem] rounded-full transition-all ${
                                      isSelected
                                        ? "ring-2 ring-offset-1 ring-[var(--color-primary)]"
                                        : "border border-gray-300 hover:border-gray-400"
                                    }`}
                                    style={{ backgroundColor: image.color }}
                                    aria-label={`Select ${image.colorName} color`}
                                  />
                                  {isSelected && (
                                    <span className="absolute top-[1.8rem] text-[0.7rem] t1 opacity-70 whitespace-nowrap">
                                      {image.colorName}
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default MobileDentalProductSection;
