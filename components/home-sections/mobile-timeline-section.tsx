"use client";

import React, { useState, useMemo, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-creative";

import { Play } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useTranslations } from "next-intl";

interface Tab {
  id: string;
  title: string;
  heading: string;
  content: string;
  video: string;
  display_video?: string;
  isYoutube: boolean;
}

const MobileTimelineSection = () => {
  const t = useTranslations("Timeline");

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentYoutubeUrl, setCurrentYoutubeUrl] = useState("");

  const tabs: Tab[] = useMemo(
    () => [
      {
        id: "tab1",
        title: "Research and Development",
        heading: "In-House R&D",
        content:
          "Our in-house R&D facility located in Germany & India is a hub of innovation, where advanced materials science meets industry-driven solutions to create groundbreaking 3D printing resins.",
        video: "/video/video1.mp4",
        isYoutube: false,
      },
      {
        id: "tab2",
        title: "Manufacturing",
        heading: "In-House Manufacturing",
        content:
          "With state-of-the-art manufacturing facilities, we deliver consistent, high-quality 3D printing resins at scale. Our production processes combine precision engineering with rigorous quality control.",
        video: "https://youtu.be/swD7peONcaE?si=an8lkJW_0q2KROLi",
        display_video: "/video/video2.mp4",
        isYoutube: true,
      },
      {
        id: "tab3",
        title: "CDMO",
        heading: "Contract Development and Manufacturing Organization",
        content:
          "Contract Development and Manufacturing Organization. With state-of-the-art manufacturing facilities, we deliver consistent, high-quality 3D printing resins at scale.",
        video: "https://youtu.be/DStoMEQx8DY?si=u0Ylj2T6XlRbxxOr",
        display_video: "/video/video3.mp4",
        isYoutube: true,
      },
      {
        id: "tab4",
        title: "Technology",
        heading: "Technology Innovation",
        content:
          "With state-of-the-art manufacturing facilities, we deliver consistent, high-quality 3D printing resins at scale. Our production processes combine precision engineering with rigorous quality control.",
        video: "https://youtu.be/ZLx9TeeG0bc?si=RWvS0yqlTVLPdU6p",
        display_video: "/video/video4.mp4",
        isYoutube: true,
      },
    ],
    []
  );

  // Modal
  const openModal = useCallback((url: string) => {
    setCurrentYoutubeUrl(url);
    setModalIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalIsOpen(false);
  }, []);

  // Extract YouTube ID
  const getYouTubeId = useCallback((url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  }, []);

  const youtubeId = getYouTubeId(currentYoutubeUrl);

  return (
    <div className="relative lg:hidden px-4 pt-0 pb-16 ">
      <Swiper
        grabCursor={true}
        effect={"creative"}
        creativeEffect={{
          prev: { shadow: true, translate: [0, 0, -400] },
          next: { translate: ["100%", 0, 0] },
        }}
        modules={[EffectCreative, Pagination]}
        className="mySwiper"
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        spaceBetween={20}
      >
        {tabs.map((tab, index) => (
          <SwiperSlide
            key={tab.id}
            className="bg-[var(--service-box)]  p-5 rounded-lg"
          >
            {/* Video */}
            <div className="relative w-full aspect-video bg-[#111] rounded-lg overflow-hidden mb-6">
              {tab.isYoutube ? (
                <div className="relative w-full h-full">
                  <video
                    muted
                    autoPlay
                    loop
                    playsInline
                    preload="metadata"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  >
                    <source src={tab.display_video} type="video/mp4" />
                  </video>
                  <div
                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                    onClick={() => openModal(tab.video)}
                  >
                    <div className="bg-black bg-opacity-50 rounded-full p-4 hover:bg-opacity-70 transition-all duration-300">
                      <Play className="text-white size-6 fill-white" />
                    </div>
                  </div>
                </div>
              ) : (
                <video
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                >
                  <source src={tab.video} type="video/mp4" />
                </video>
              )}
            </div>

            {/* Text */}
            <div className="flex flex-col h-80">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-xs font-semibold text-orange-600 dark:text-orange-200 bg-orange-100 dark:bg-orange-700 rounded-full mb-3">
                  {t(`${tab.id}.title`)}
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-4 leading-tight text-gray-900 dark:text-white">
                {t(`${tab.id}.heading`)}
              </h2>
              <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
                {t(`${tab.id}.content`)}
              </p>
            </div>
            <div className="mb-16"></div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* YouTube Modal */}
      <Dialog open={modalIsOpen} onOpenChange={setModalIsOpen}>
        <DialogContent className="max-w-[95vw] w-full h-[50vh] p-0 bg-transparent border-none">
          <div className="w-full h-full">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube Video"
              className="rounded-lg"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MobileTimelineSection;
