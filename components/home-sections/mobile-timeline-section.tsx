"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronsUpIcon, Play } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const viewContainerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentYoutubeUrl, setCurrentYoutubeUrl] = useState("");
  const [isPinned, setIsPinned] = useState(false);

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

  // Initialize scroll-triggered pinning and tab changes
  useEffect(() => {
    if (!scrollContainerRef.current || !viewContainerRef.current) return;

    const scrollContainer = scrollContainerRef.current;
    const viewContainer = viewContainerRef.current;

    // Calculate heights
    const tabHeight = window.innerHeight * 0.8; // 80vh per tab
    const totalScrollHeight = tabHeight * tabs.length;

    // Set container height
    scrollContainer.style.height = `${
      totalScrollHeight + window.innerHeight
    }px`;

    // Create pinning animation
    const pinTl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollContainer,
        start: "top top",
        end: `+=${totalScrollHeight}`,
        scrub: true,
        pin: viewContainer,
        pinSpacing: false,
        onUpdate: (self) => {
          const progress = self.progress;
          const currentIndex = Math.floor(progress * tabs.length);
          const clampedIndex = Math.min(currentIndex, tabs.length - 1);

          if (clampedIndex !== activeTab) {
            setActiveTab(clampedIndex);
          }

          // Update progress bar
          updateProgressBar(progress);

          // Set pinned state
          if (progress > 0 && progress < 1) {
            setIsPinned(true);
          } else {
            setIsPinned(false);
          }
        },
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [tabs.length]);

  // Update progress bar based on scroll progress
  const updateProgressBar = useCallback((progress: number) => {
    if (progressFillRef.current) {
      gsap.set(progressFillRef.current, {
        scaleX: progress,
      });
    }
  }, []);

  // Handle video changes when activeTab changes
  useEffect(() => {
    const currentTab = tabs[activeTab];
    if (!currentTab.isYoutube && videoRef.current) {
      const video = videoRef.current;
      if (video.src !== currentTab.video) {
        video.src = currentTab.video;
        video.load();
      }
      video.play().catch((e) => console.log("Video play failed:", e));
    }
  }, [activeTab, tabs]);

  // Animate text content changes
  useEffect(() => {
    if (textContainerRef.current) {
      gsap.fromTo(
        textContainerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [activeTab]);

  // Modal functions
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

  const youtubeId = useMemo(
    () => getYouTubeId(currentYoutubeUrl),
    [currentYoutubeUrl, getYouTubeId]
  );

  // Initialize first video
  useEffect(() => {
    if (videoRef.current && !tabs[0].isYoutube) {
      const video = videoRef.current;
      video.src = tabs[0].video;
      video.load();
      video.muted = true;
    }
  }, [tabs]);

  const currentTab = tabs[activeTab];

  return (
    <div className="relative lg:hidden">
      {" "}
      {/* Only show on mobile/tablet */}
      <div ref={scrollContainerRef} className="relative">
        <div
          ref={viewContainerRef}
          className="relative flex flex-col h-screen w-full max-w-sm mx-auto px-4 py-8"
        >
          {/* Video Container */}
          <div className="relative w-full aspect-video bg-[#111] rounded-lg overflow-hidden mb-6 mt-16">
            {currentTab.isYoutube ? (
              <div className="relative w-full h-full">
                <video
                  key={`yt-display-${activeTab}`}
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="metadata"
                  className="absolute top-0 left-0 w-full h-full object-cover"
                >
                  <source src={currentTab.display_video} type="video/mp4" />
                </video>
                <div
                  className="absolute inset-0 flex items-center justify-center cursor-pointer"
                  onClick={() => openModal(currentTab.video)}
                >
                  <div className="bg-black bg-opacity-50 rounded-full p-4 hover:bg-opacity-70 transition-all duration-300">
                    <Play className="text-white size-6 fill-white" />
                  </div>
                </div>
              </div>
            ) : (
              <video
                ref={videoRef}
                key={`video-${activeTab}`}
                muted
                autoPlay
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              >
                <source src={currentTab.video} type="video/mp4" />
              </video>
            )}
          </div>

          {/* Text Content */}
          <div ref={textContainerRef} className="flex-1 flex flex-col">
            <h2 className="text-3xl font-bold mb-3 leading-tight">
              {currentTab.heading}
            </h2>
            <p className="text-base leading-relaxed opacity-80  mb-6">
              {currentTab.content}
            </p>

            {/* Tab Indicator (just numbers) */}
            <div className="text-center mb-4">
              <span className="text-xs text-gray-500">
                {activeTab + 1} of {tabs.length}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="relative">
              <div
                ref={progressBarRef}
                className="h-1 bg-gray-700 rounded-full overflow-hidden"
              >
                <div
                  ref={progressFillRef}
                  className="h-full bg-[var(--color-primary)] origin-left scale-x-0 transition-transform duration-300 ease-out"
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>Start</span>
                <span>End</span>
              </div>
              {/* Scroll Hint */}
              {!isPinned && (
                <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2  text-center">
                  <div className="animate-bounce">
                    <div className="w-full flex justify-center">
                      <ChevronsUpIcon className="text-brand" />
                    </div>
                    <span className="text-xs text-black dark:text-white">
                      Scroll to explore
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
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
