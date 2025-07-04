"use client";

import { dentalProducts as productData } from "../../../public/data/dental";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FileText } from "lucide-react";
import { useHashNavigation } from "@/hooks/useHashNavigation";

gsap.registerPlugin(ScrollTrigger);

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

const DentalProductSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sections = useRef<(HTMLElement | null)[]>([]);
  const imageContainerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [autoCycling, setAutoCycling] = useState<boolean>(true);
  const [userSelectedColor, setUserSelectedColor] = useState<boolean | null>(
    null
  );

  // Use the generic hash navigation hook with longer delay for GSAP animations
  const { isPageReady } = useHashNavigation({
    scrollDelay: 0, // No delay
    offset: 0, // No offset
    debug: process.env.NODE_ENV === "development",
    onHashNavigation: (hash) => {
      console.log("🎯 Navigated to dental section:", hash);
    },
  });

  const [mainImages, setMainImages] = useState<MainImageState>(() => {
    return productData.reduce((acc, product) => {
      acc[String(product.id)] = {
        image: product.images[0],
        source: "thumbnail",
      };
      return acc;
    }, {} as MainImageState);
  });

  const [activeThumbnailIndices, setActiveThumbnailIndices] =
    useState<IndexState>(() => {
      return productData.reduce((acc, product) => {
        const firstThumbnailIndex = product.images.findIndex(
          (img) => !img.color
        );
        acc[String(product.id)] =
          firstThumbnailIndex >= 0 ? firstThumbnailIndex : null;
        return acc;
      }, {} as IndexState);
    });

  const [activeColors, setActiveColors] = useState<ColorState>(() => {
    return productData.reduce((acc, product) => {
      const colorImage = product.images.find((img) => img.color);
      acc[String(product.id)] = colorImage ? colorImage.id : null;
      return acc;
    }, {} as ColorState);
  });

  const [activeIndices, setActiveIndices] = useState<IndexState>(() => {
    return productData.reduce((acc, product) => {
      acc[String(product.id)] = null;
      return acc;
    }, {} as IndexState);
  });

  // const toggleAccordion = (productId: number, index: number) => {
  //   setActiveIndices((prev) => ({
  //     ...prev,
  //     [productId]: prev[productId] === index ? null : index,
  //   }));
  //   setTimeout(() => {
  //     ScrollTrigger.refresh();
  //   }, 350);
  // };

  const hoverTimers = useRef<Record<string, NodeJS.Timeout | null>>({});

  const handleAccordionHover = (
    productId: number,
    index: number,
    isEntering: boolean
  ) => {
    const key = `${productId}-${index}`;

    // Clear any existing timer
    if (hoverTimers.current[key]) {
      clearTimeout(hoverTimers.current[key]!);
      hoverTimers.current[key] = null;
    }

    // Set new timer based on enter/leave
    hoverTimers.current[key] = setTimeout(
      () => {
        setActiveIndices((prev) => ({
          ...prev,
          [productId]: isEntering ? index : null,
        }));
        ScrollTrigger.refresh();
      },
      isEntering ? 200 : 150
    ); // adjust delay as needed
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

  // Initialize GSAP ScrollTrigger animations only after page is ready
  useEffect(() => {
    if (!isPageReady) {
      if (process.env.NODE_ENV === "development") {
        console.log(
          "⏳ Waiting for page to be ready before initializing GSAP..."
        );
      }
      return;
    }

    if (process.env.NODE_ENV === "development") {
      console.log("🎬 Initializing GSAP ScrollTrigger animations...");
    }

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
  }, [isPageReady, activeIndex]);

  useEffect(() => {
    if (!autoCycling) return;
    const intervals = productData.map((product) => {
      const nonColorImages = product.images.filter((img) => !img.color);
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
      intervals.forEach((interval) => {
        if (interval !== null) clearInterval(interval);
      });
    };
  }, [autoCycling, userSelectedColor]);

  return (
    <div>
      <div className="hidden md:block relative pb-[10rem]" ref={containerRef}>
        {productData.map((product, index) => (
          <section
            key={product.id}
            id={product.navic_id} // This must match the hash in your header links
            ref={(el) => {
              sections.current[index] = el;
            }}
            className="min-h-screen grid grid-cols-2 relative pb-[20rem] last:pb-0 px-[5rem]"
          >
            {/* Left side - content */}
            <div className="py-10 pt-[6.8rem]">
              <h2 className="w-[90%] pop font-semibold rounded-lg border border-[var(--color-primary)] text-[var(--text-primary)] text-[1.8rem] ps-[1rem] lg:text-[2rem] xl:text-[2.6rem]">
                {product.name}
              </h2>
              <h3 className="text-[var(--text-subheading)] text-[1.5rem] font-bold my-[1rem] me-[3rem]">
                {product.subTitle}
              </h3>
              <div className="space-y-2 pe-[4rem]">
                {product.description
                  .split(".")
                  .filter((sentence) => sentence.trim().length > 0)
                  .map((sentence, idx) => (
                    <p
                      key={idx}
                      className="text-gray-500 shadow-2xl text-justify bg-white p-[1rem] rounded-lg my-[.6rem] lg:text-[1rem] xl:text-[1.3rem]"
                    >
                      {sentence.trim()}
                      {idx < product.description.split(".").length - 2
                        ? "."
                        : ""}
                    </p>
                  ))}
              </div>
              <div className="grid grid-cols-12 mt-4 me-[3rem]">
                <div className="col-span-12">
                  {product.features.map((feature, idx) => (
                    <div key={`feature-${feature.id}`} className="my-[1rem]">
                      <div className="grid grid-cols-12 w-full">
                        <div className="col-span-12">
                          <div
                            className={`w-full overflow-hidden  ${
                              activeIndices[product.id] === idx
                                ? "border-[#5D5D5D]"
                                : "border-[#5D5D5D]"
                            }`}
                          >
                            {/* Title/Header section */}
                            <div
                              className="flex items-center justify-between cursor-pointer p-[1rem] transition-colors duration-150"
                              onMouseEnter={() =>
                                handleAccordionHover(product.id, idx, true)
                              }
                              onMouseLeave={() =>
                                handleAccordionHover(product.id, idx, false)
                              }
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-4 h-4 bg-[var(--color-primary)] rounded-full"></div>
                                <h4 className="lg:text-[1.4rem] xl:text-[2rem] font-medium text-[var(--text-subheading1)]">
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
                              <p className="text-[var(--text-subheading)] text-justify text-[1rem] ps-[2rem] pe-[2rem]">
                                {feature.description}
                              </p>
                            </div>
                            <div className="bg-[#5D5D5D] h-[.5px] w-[90%]"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Right side - image */}
            <div
              ref={(el) => {
                imageContainerRefs.current[index] = el;
              }}
              className="sticky lg:top-[1rem] xl:top-[4rem] h-screen flex items-start justify-center"
            >
              <div className="h-screen flex items-start justify-center ">
                <div className="w-full py-10 relative">
                  {/* Main Image Display */}
                  <div className="relative">
                    <img
                      src={
                        mainImages[product.id]?.image?.img ||
                        product.images[0].img ||
                        "/placeholder.svg"
                      }
                      alt={product.name}
                      className="xl:w-[34rem] xl:h-[22rem] mx-auto lg:w-[21] lg:h-[20rem] rounded-lg shadow-md object-cover transition-opacity duration-500"
                      key={
                        mainImages[product.id]?.image?.id ||
                        product.images[0].id
                      }
                    />
                  </div>
                  <div className="flex justify-between items-center bg-[var(--bg-primary)]">
                    {/* Thumbnail Images */}
                    <div className="flex space-x-1 mt-4 col-span-6 items-center h-full ms-3">
                      {product.images
                        .filter((image) => !image.color)
                        .map((image, thumbIndex) => {
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
                                  thumbIndex // Pass the thumbnail index
                                )
                              }
                              className={`rounded-lg overflow-hidden transition-all ${
                                isActive
                                  ? "ring-2 ring-[var(--color-primary)] p-[2px]"
                                  : "border-2 ring-2 ring-transparent p-[2px] border-transparent hover:border-gray-300"
                              }`}
                            >
                              <img
                                src={image.img || "/placeholder.svg"}
                                alt={`${product.name} thumbnail`}
                                className="w-[3rem] h-[3rem] rounded-lg object-cover"
                              />
                            </button>
                          );
                        })}
                    </div>
                    {/* Color Swatches */}
                    {product.images.some((image) => image.color) && (
                      <div className="col-span-5 mt-4 flex items-center space-x-2 h-full">
                        <h2 className="text-[.9rem] t1">Colours</h2>
                        <div className="flex flex-wrap gap-4 items-center">
                          {product.images
                            .filter((image) => image.color)
                            .map((image, colorIndex) => {
                              const isSelected =
                                mainImages[product.id]?.image?.id === image.id;
                              return (
                                <div
                                  key={`color-${product.id}-${colorIndex}`}
                                  className="relative flex flex-col items-center"
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
                                    <span className="absolute top-[2rem] text-[0.7rem] t1 opacity-70 whitespace-nowrap">
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
                  <div className="bg-[var(--bg-primary)]">
                    <button className="text-[var(--text-subheading)] px-4 rounded-md py-[2rem] flex space-x-2 items-center cursor-pointer">
                      <span>Download product data sheet</span>
                      <FileText />
                    </button>
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

export default DentalProductSection;
