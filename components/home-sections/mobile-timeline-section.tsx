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
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const [activeTab, setActiveTab] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentYoutubeUrl, setCurrentYoutubeUrl] = useState("");
  const [isPinned, setIsPinned] = useState(false);

  // Use ref to track current tab to avoid stale closures
  const activeTabRef = useRef(0);

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

  // Update progress bar based on scroll progress
  const updateProgressBar = useCallback((progress: number) => {
    if (progressFillRef.current) {
      gsap.set(progressFillRef.current, {
        scaleX: progress,
        transformOrigin: "left center",
      });
    }
  }, []);

  // Initialize scroll-triggered pinning and tab changes
  useEffect(() => {
    if (!scrollContainerRef.current || !viewContainerRef.current) return;

    const scrollContainer = scrollContainerRef.current;
    const viewContainer = viewContainerRef.current;

    // Clean up previous ScrollTrigger
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill();
    }

    // Calculate heights more precisely
    const viewportHeight = window.innerHeight;
    const sectionHeight = viewportHeight * 4; // Total scroll distance for all tabs

    // Set container height to create scroll distance
    scrollContainer.style.height = `${sectionHeight + viewportHeight}px`;

    // Create the main ScrollTrigger with proper calculations
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: scrollContainer,
      start: "top top",
      end: `+=${sectionHeight}`,
      scrub: true,
      pin: viewContainer,
      pinSpacing: false,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const progress = self.progress;

        // Calculate which tab should be active
        const tabProgress = progress * tabs.length;
        const newActiveTab = Math.floor(tabProgress);
        const clampedTab = Math.min(Math.max(newActiveTab, 0), tabs.length - 1);

        // Update progress bar
        updateProgressBar(progress);

        // Only update active tab if it actually changed
        if (clampedTab !== activeTabRef.current) {
          activeTabRef.current = clampedTab;
          setActiveTab(clampedTab);
        }

        // Update pinned state
        const shouldBePinned = progress > 0.01 && progress < 0.99;
        setIsPinned(shouldBePinned);
      },
      onRefresh: () => {
        // Reset to first tab on refresh
        activeTabRef.current = 0;
        setActiveTab(0);
        setIsPinned(false);
      },
    });

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
    };
  }, [tabs.length, updateProgressBar]);

  // Handle video changes when activeTab changes
  useEffect(() => {
    const currentTab = tabs[activeTab];
    if (!currentTab) return;

    if (!currentTab.isYoutube && videoRef.current) {
      const video = videoRef.current;

      // Only change video source if it's different
      if (video.src !== currentTab.video) {
        video.src = currentTab.video;
        video.load();
      }

      // Play video with error handling
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((e) => {
          console.log("Video play failed:", e);
        });
      }
    }
  }, [activeTab, tabs]);

  // Animate text content changes with improved timing
  useEffect(() => {
    if (textContainerRef.current) {
      // Kill any existing animation
      gsap.killTweensOf(textContainerRef.current);

      // Animate content change
      gsap.fromTo(
        textContainerRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
          delay: 0.1,
        }
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
    if (videoRef.current && !tabs[0]?.isYoutube) {
      const video = videoRef.current;
      video.src = tabs[0].video;
      video.load();
      video.muted = true;
    }
  }, [tabs]);

  // Refresh ScrollTrigger on window resize
  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currentTab = tabs[activeTab];

  if (!currentTab) {
    return null;
  }

  return (
    <div className="relative lg:hidden">
      <div ref={scrollContainerRef} className="relative">
        <div
          ref={viewContainerRef}
          className="relative flex flex-col w-full min-h-screen max-w-sm mx-auto px-4 pt-16 pb-4"
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

          {/* Progress Bar */}
          <div className="relative pt-8 pb-10">
            <div
              ref={progressBarRef}
              className="h-2 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden "
            >
              <div
                ref={progressFillRef}
                className="h-full bg-[var(--color-primary)] origin-left scale-x-0"
              />
            </div>
            {/* <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Start</span>
              <span>End</span>
            </div> */}

            {/* Scroll Hint - only show when not pinned */}
            {!isPinned && (
              <div className="absolute -bottom-80 left-1/2 transform -translate-x-1/2 text-center">
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

          {/* Text Content */}
          <div ref={textContainerRef} className=" flex flex-col ">
            <h2 className="text-3xl font-bold mb-3 leading-tight">
              {currentTab.heading}
            </h2>
            <p className="text-base leading-relaxed opacity-80 mb-6">
              {currentTab.content}
            </p>

            {/* Tab Indicator */}
            <div className="text-center mb-4">
              <span className="text-xs text-gray-500">
                {activeTab + 1} of {tabs.length}
              </span>
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
