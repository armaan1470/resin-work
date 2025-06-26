"use client";

import React, { useState, useRef, useEffect, RefObject } from "react";

const VideoTabSection = () => {
  const videoTab = [
    { title: "General Purpose", video: "/video/video1.mp4" },
    { title: "Water Washable", video: "/video/video2.mp4" },
    { title: "Castable", video: "/video/video3.mp4" },
    { title: "Waxable", video: "/video/video4.mp4" },
    { title: "Supertough", video: "/video/video5.mp4" },
    { title: "Flexible", video: "/video/video6.mp4" },
    { title: "ABS Like", video: "/video/video1.mp4" },
    { title: "Hard", video: "/video/video2.mp4" },
  ];

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const desktopVideoRef = useRef<HTMLVideoElement | null>(null);
  const mobileVideoRef = useRef<HTMLVideoElement | null>(null);

  // Handle video change for both desktop and mobile
  const handleTabClick = (index: number) => {
    setActiveIndex(index);
  };

  // Reset video playback when changing videos
  useEffect(() => {
    const videos: HTMLVideoElement[] = [
      desktopVideoRef.current,
      mobileVideoRef.current,
    ].filter((v): v is HTMLVideoElement => v !== null);

    videos.forEach((video) => {
      video.load();
      video.play().catch((e) => console.log("Autoplay prevented:", e));
    });
  }, [activeIndex]);

  return (
    <div>
      {/* Desktop Version */}
      <div className="hidden md:block p-8 z-[40] relative bg-[var(--bg-primary)] shadow-2xl overflow-hidden">
        <div className="w-full mx-auto grid grid-cols-12 gap-8 p-[2rem] md:p-[5rem] relative z-[12]">
          <h4 className="col-span-12 md:col-span-4 t1 text-[1.62rem] ">
            Next-gen 3D printing materials for Every Application, Every
            Innovation
          </h4>

          <div className="col-span-12 md:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
              {videoTab.map((item, index) => (
                <button
                  key={`desktop-tab-${index}`} // Added unique key
                  onClick={() => handleTabClick(index)}
                  className={`border rounded-lg p-2 cursor-pointer transition-colors duration-300 ${
                    index === activeIndex
                      ? "border-[var(--color-primary)] "
                      : "border-gray-600 hover:border-gray-400"
                  }`}
                >
                  <h6 className="t1 text-center select-none text-sm md:text-base">
                    {item.title}
                  </h6>
                </button>
              ))}
            </div>
          </div>
          <div className="col-span-4"></div>
          <div className="col-span-8 mt-8 flex justify-end">
            <div className="relative flex w-full justify-end aspect-video rounded-xl overflow-hidden">
              <video
                ref={desktopVideoRef}
                src={videoTab[activeIndex].video}
                className="w-[100%] h-full object-cover"
                muted
                autoPlay
                loop
                playsInline
                preload="auto"
                controls={false}
              >
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 flex items-center justify-center">
                {!desktopVideoRef.current?.readyState && (
                  <div className="text-white/5">Loading video...</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-0 left-[-4rem] h-full w-[16rem] blur-[8rem] rounded-full bg-[var(--color-primary)]/40 "></div>
      </div>

      {/* Mobile Version */}
      <div className="md:hidden bg-[#5E5E5E] py-8 pb-[4rem] ">
        <div className="text-center mb-6">
          <h2 className="text-[2rem] text-white font-bold">NEXT-GEN</h2>
          <p className="text-[1.2rem] text-white">
            3D printing materials for
            <br />
            Every Application, Every Innovation
          </p>
        </div>

        {/* Scrollable tabs */}
        <div className="overflow-x-auto pb-4 hide-scrollbar ps-2">
          <div
            className="flex gap-3"
            style={{ width: `${videoTab.length * 120}px` }}
          >
            {videoTab.map((item, index) => (
              <button
                key={`mobile-tab-${index}`} // Added unique key
                onClick={() => handleTabClick(index)}
                className={`px-4 py-4 rounded-lg whitespace-nowrap border text-sm font-medium text-[#545454] transition-colors ${
                  index === activeIndex
                    ? "border-[var(--color-primary)] bg-white "
                    : "bg-white border-gray-600 hover:border-gray-400"
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>

        {/* Video container */}
        <div className="mt-6 rounded-xl overflow-hidden shadow-lg mx-[1rem]">
          <div className="relative aspect-video">
            <video
              ref={mobileVideoRef}
              src={videoTab[activeIndex].video}
              className="w-full h-full object-cover"
              muted
              autoPlay
              loop
              playsInline
              preload="auto"
            >
              Your browser does not support the video tag.
            </video>
            {!mobileVideoRef.current?.readyState && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                <div className="text-gray-600">Loading video...</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default VideoTabSection;
