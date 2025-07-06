"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
  useMemo,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { DialogTitle } from "@radix-ui/react-dialog";

gsap.registerPlugin(ScrollTrigger);

// Animation functions

const initScrollAnimations = ({
  viewContainer,
  scrollContainer,
}: {
  viewContainer: HTMLElement | null;
  scrollContainer: HTMLElement | null;
}) => {
  // Set initial state
  gsap.set("#heading, #paragraph", { x: -600 });

  // View container animation
  gsap.to(viewContainer, {
    scale: 0.5,
    x: "25%",
    scrollTrigger: {
      trigger: scrollContainer,
      start: "top -40%",
      end: "+=900px",
      scrub: true,
    },
  });

  // Content animations
  gsap.to("#heading, #paragraph", {
    x: 0,
    stagger: 0,
    scrollTrigger: {
      trigger: scrollContainer,
      start: "top -60%",
      end: "top -70%",
      scrub: true,
    },
  });

  // Tabs animation
  const tabs = document.getElementById("scroll-indicator");
  if (tabs) {
    gsap.fromTo(
      tabs,
      { opacity: 0, x: "-100px" },
      {
        opacity: 1,
        x: 0,
        scrollTrigger: {
          trigger: scrollContainer,
          start: "top -60%",
          end: "top -70%",
          scrub: true,
        },
      }
    );
  }

  return () => {
    ScrollTrigger.getAll().forEach((instance) => instance.kill());
    gsap.globalTimeline.clear();
  };
};

const cleanupScrollAnimations = () => {
  ScrollTrigger.getAll().forEach((instance) => instance.kill());
  gsap.globalTimeline.clear();
};

interface Tab {
  id: string;
  title: string;
  heading: string;
  content: string;
  video: string;
  display_video?: string;
  isYoutube: boolean;
}

const TimelineSection = () => {
  // Refs for DOM elements
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const viewContainerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const progressDotRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [activeTab, setActiveTab] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentYoutubeUrl, setCurrentYoutubeUrl] = useState("");
  const [hasScrolled, setHasScrolled] = useState(false);

  // Memoize tabs array to prevent recreating on every render
  const tabs: Tab[] = useMemo(
    () => [
      {
        id: "tab1",
        title: "Research and Development",
        heading: "In-House R&D",
        content:
          "Our in-house R&D facility located in Germany & India is a hub of innovation, where advanced materials science meets industry-driven solutions to create groundbreaking 3D printing resins. By pushing the boundaries of performance and customization, we empower industries to achieve unprecedented results in additive manufacturing.",
        video: "/video/video1.mp4",
        isYoutube: false,
      },
      {
        id: "tab2",
        title: "Manufacturing",
        heading: "In-House Manufacturing ",
        content:
          "With state-of-the-art manufacturing facilities, we deliver consistent, high-quality 3D printing resins at scale. Our production processes combine precision engineering with rigorous quality control, ensuring each batch meets the exacting standards demanded by industrial applications across diverse sectors.",
        video: "https://youtu.be/swD7peONcaE?si=an8lkJW_0q2KROLi",
        display_video: "/video/video2.mp4",
        isYoutube: true,
      },
      {
        id: "tab3",
        title: "CDMO",
        heading: "Contract Development and Manufacturing Organization",
        content:
          "Contract Development and Manufacturing Organization. With state-of-the-art manufacturing facilities, we deliver consistent, high-quality 3D printing resins at scale. Our production processes combine precision engineering with rigorous quality control, ensuring each batch meets the exacting standards demanded by industrial applications across diverse sectors.",
        video: "https://youtu.be/DStoMEQx8DY?si=u0Ylj2T6XlRbxxOr",
        display_video: "/video/video3.mp4",
        isYoutube: true,
      },
      {
        id: "tab4",
        title: "Technology",
        heading: "Technology Innovation",
        content:
          "With state-of-the-art manufacturing facilities, we deliver consistent, high-quality 3D printing resins at scale. Our production processes combine precision engineering with rigorous quality control, ensuring each batch meets the exacting standards demanded by industrial applications across diverse sectors.",
        video: "https://youtu.be/ZLx9TeeG0bc?si=RWvS0yqlTVLPdU6p",
        display_video: "/video/video4.mp4",
        isYoutube: true,
      },
    ],
    []
  );

  // Create separate refs for headings and content - memoized
  const headingRefs = useRef(
    tabs.map(() => React.createRef<HTMLHeadingElement>())
  );
  const contentRefs = useRef(
    tabs.map(() => React.createRef<HTMLParagraphElement>())
  );

  useEffect(() => {
    gsap.fromTo(
      "#text-container",
      {
        x: -100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: scrollContainerRef.current,
          start: "top -90%",
          end: "+=40%",
          scrub: true,
        },
      }
    );
  }, []);

  // Handle content animations when tab changes - optimized with useCallback
  const animateTabContent = useCallback(
    (tabIndex: number) => {
      // Animate in heading and content together
      gsap.fromTo(
        [
          headingRefs.current[tabIndex].current,
          contentRefs.current[tabIndex].current,
        ],
        {
          x: -100,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        }
      );

      // Hide all other contents
      tabs.forEach((_, index) => {
        if (index !== tabIndex) {
          gsap.set(
            [
              headingRefs.current[index].current,
              contentRefs.current[index].current,
            ],
            {
              opacity: 0,
              x: 100,
            }
          );
        }
      });
    },
    [tabs]
  );

  useEffect(() => {
    animateTabContent(activeTab);
  }, [activeTab, animateTabContent]);

  // Memoized modal functions
  const openModal = useCallback((url: string) => {
    setCurrentYoutubeUrl(url);
    setModalIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalIsOpen(false);
  }, []);

  const handleTabClick = useCallback(
    (e: React.MouseEvent, tabId: string, index: number) => {
      e.preventDefault();
      setActiveTab(index);

      // Handle video change immediately
      const currentTab = tabs[index];
      if (!currentTab.isYoutube && videoRef.current) {
        videoRef.current.src = currentTab.video;
        videoRef.current.load();
        videoRef.current
          .play()
          .catch((e) => console.log("Video play failed:", e));
      }
    },
    [tabs]
  );

  // Throttled scroll handler for better performance - FIXED with higher threshold
  const throttledScrollHandler = useCallback(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!hasScrolled) setHasScrolled(true);

      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;

      // FIXED: Increased threshold from 40vh to 100vh per tab transition
      // This makes it much harder to accidentally skip tabs during scrolling
      const SCROLL_THRESHOLD_PER_TAB = 80; // vh units
      const INITIAL_THRESHOLD = 300; // vh units for first tab

      // Calculate active tab based on scroll position with higher threshold
      let newActiveTab: number;
      if (scrollPosition < (INITIAL_THRESHOLD * viewportHeight) / 100) {
        newActiveTab = 0;
      } else {
        newActiveTab = Math.min(
          Math.floor(
            (scrollPosition - (INITIAL_THRESHOLD * viewportHeight) / 100) /
              ((SCROLL_THRESHOLD_PER_TAB * viewportHeight) / 100) +
              1
          ),
          tabs.length - 1
        );
      }

      if (newActiveTab !== activeTab) {
        setActiveTab(newActiveTab);
      }
      ticking = false;
    };

    return () => {
      if (!ticking) {
        requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };
  }, [activeTab, hasScrolled, tabs.length]);

  // Handle scroll events to update active tab - optimized
  useEffect(() => {
    const scrollHandler = throttledScrollHandler();
    window.addEventListener("scroll", scrollHandler, { passive: true });
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [throttledScrollHandler]);

  // Handle video changes when activeTab changes - optimized
  useEffect(() => {
    const currentTab = tabs[activeTab];
    if (!currentTab.isYoutube && videoRef.current) {
      const video = videoRef.current;

      // Only change source if it's different
      if (video.src !== currentTab.video) {
        video.src = currentTab.video;
        video.load();
      }

      if (hasScrolled) {
        video.play().catch((e) => console.log("Video play failed:", e));
      }
    }
  }, [activeTab, hasScrolled, tabs]);

  // Function to update progress bar based on active tab - optimized with useCallback
  const updateProgressBar = useCallback(
    (activeIndex: number) => {
      const firstButton = buttonRefs.current[0];
      const activeButton = buttonRefs.current[activeIndex];
      const lastButton = buttonRefs.current[tabs.length - 1];
      const progressBar = progressBarRef.current;
      const progressFill = progressFillRef.current;
      const progressDot = progressDotRef.current;

      if (
        firstButton &&
        activeButton &&
        lastButton &&
        progressBar &&
        progressFill &&
        progressDot
      ) {
        const progressBarWidth = progressBar.offsetWidth;

        // --- Calculate Fill ---
        const fillStartX = firstButton.offsetLeft;
        let fillEndX: number;

        if (activeIndex === 0) {
          fillEndX = firstButton.offsetLeft;
        } else if (activeIndex === tabs.length - 1) {
          fillEndX = lastButton.offsetLeft + lastButton.offsetWidth;
        } else {
          fillEndX = activeButton.offsetLeft + activeButton.offsetWidth / 2;
        }

        const fillWidth = fillEndX - fillStartX;
        const fillScale =
          progressBarWidth > 0 ? fillWidth / progressBarWidth : 0;

        gsap.to(progressFill, {
          x: fillStartX,
          scaleX: fillScale >= 0 ? fillScale : 0,
          transformOrigin: "left center",
          duration: 0.5,
          ease: "power2.out",
        });

        // --- Calculate Dot ---
        let dotOffset: number;
        const dotCenter = progressDot.offsetWidth / 2;

        if (activeIndex === 0) {
          dotOffset = firstButton.offsetLeft - dotCenter;
        } else if (activeIndex === tabs.length - 1) {
          dotOffset =
            lastButton.offsetLeft + lastButton.offsetWidth - dotCenter;
        } else {
          dotOffset =
            activeButton.offsetLeft + activeButton.offsetWidth / 2 - dotCenter;
        }

        gsap.to(progressDot, {
          x: dotOffset,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    },
    [tabs.length]
  );

  // Handle progress bar updates
  useLayoutEffect(() => {
    // A timeout is used here as a more forceful way to ensure the calculation
    // happens after the browser has completed all rendering and layout updates
    // that result from the change in the active tab's style.
    const timeoutId = setTimeout(() => {
      updateProgressBar(activeTab);
    }, 200); // Increased delay for more reliability.

    return () => {
      clearTimeout(timeoutId);
    };
  }, [activeTab]);

  // Initialize component - optimized
  useEffect(() => {
    // Set initial content states - show first tab immediately
    tabs.forEach((_, index) => {
      if (index === 0) {
        gsap.set(
          [
            headingRefs.current[index].current,
            contentRefs.current[index].current,
          ],
          {
            opacity: 1,
            x: 0,
          }
        );
      } else {
        gsap.set(
          [
            headingRefs.current[index].current,
            contentRefs.current[index].current,
          ],
          {
            opacity: 0,
            x: 50,
          }
        );
      }
    });

    // FIXED: Updated scroll container height calculation to match new threshold
    if (scrollContainerRef.current) {
      const firstTabHeight = 300; // 300vh for first tab
      const otherTabsHeight = 80 * (tabs.length - 1); // 100vh for others (increased from 40vh)
      const totalHeight = firstTabHeight + otherTabsHeight;
      scrollContainerRef.current.style.height = `${totalHeight}vh`;
    }

    // Initialize animations
    const animationCleanup = initScrollAnimations({
      viewContainer: viewContainerRef.current,
      scrollContainer: scrollContainerRef.current,
    });

    // Load first video
    if (videoRef.current && !tabs[0].isYoutube) {
      const video = videoRef.current;
      video.src = tabs[0].video;
      video.load();
      video.muted = true;
    }

    return () => {
      cleanupScrollAnimations();
      animationCleanup();
    };
  }, [tabs]);

  // Function to extract YouTube ID from URL - memoized
  const getYouTubeId = useCallback((url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  }, []);

  // Memoize YouTube ID to prevent recalculation
  const youtubeId = useMemo(
    () => getYouTubeId(currentYoutubeUrl),
    [currentYoutubeUrl, getYouTubeId]
  );

  return (
    <div className="relative z-20">
      <div className="" ref={scrollContainerRef}>
        <div className="sticky top-0 h-screen w-full max-w-[1600px] mx-auto">
          <div className="h-full w-full flex justify-center items-center">
            <div
              className="relative w-[90%] max-w-[1200px] aspect-[16/9] bg-[#111] rounded-md overflow-hidden scale-[1] translate-x-0 z-10"
              ref={viewContainerRef}
            >
              {tabs[activeTab].isYoutube ? (
                <div className="relative w-full h-full">
                  <video
                    key={`yt-display-${activeTab}`}
                    muted
                    autoPlay
                    loop
                    playsInline
                    preload="metadata"
                    className="absolute top-0 left-0 w-full h-full object-cover will-change-transform"
                  >
                    <source
                      src={tabs[activeTab].display_video}
                      type="video/mp4"
                    />
                  </video>
                  <div
                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                    onClick={() => openModal(tabs[activeTab].video)}
                  >
                    <div className="ease-in-out duration-300 bg-black bg-opacity-50 rounded-full p-8 hover:bg-opacity-70 hover:scale-110 transition-all">
                      <Play className="text-white size-10 fill-white" />
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
                  className="w-full h-full object-cover will-change-transform"
                >
                  <source src={tabs[activeTab].video} type="video/mp4" />
                </video>
              )}
            </div>
            <div
              id="text-container"
              className="absolute left-[5%] top-[34%] w-[48%] max-w-[550px] z-20"
              ref={textContainerRef}
            >
              {tabs.map((tab, index) => (
                <div
                  key={tab.id}
                  id={tab.id}
                  className={cn(
                    "flex flex-col justify-start items-start w-[80%] xl:w-full translate-y-0",
                    index === activeTab
                      ? "visible h-full top-0 translate-x-0 pointer-events-auto absolute z-30"
                      : "invisible pointer-events-none"
                  )}
                >
                  <h1
                    ref={headingRefs.current[index]}
                    id="heading"
                    className="text-[30px] font-bold mb-4 leading-tight"
                    style={{
                      whiteSpace: "normal",
                      overflow: "visible",
                      textOverflow: "clip",
                    }}
                  >
                    {tab.heading}
                  </h1>
                  <p
                    ref={contentRefs.current[index]}
                    id="paragraph"
                    className="text-base leading-[1.6] opacity-80 break-words"
                    style={{
                      whiteSpace: "normal",
                      overflow: "visible",
                      textOverflow: "clip",
                      wordWrap: "break-word",
                      hyphens: "auto",
                    }}
                  >
                    {tab.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div
            id="scroll-indicator"
            className="absolute top-[80vh] text-white text-sm text-center w-[88%] left-1/2 transform -translate-x-1/2 opacity-100 z-50"
            ref={tabsRef}
          >
            <div className="flex justify-between mb-5 relative z-50">
              {tabs.map((tab, index) => (
                <button
                  key={tab.id}
                  ref={(el) => {
                    buttonRefs.current[index] = el;
                  }}
                  className={cn(
                    "text-sm text-[#878787] font-medium cursor-pointer transition-all duration-200 ease-in-out rounded-md  relative z-50 pointer-events-auto bg-transparent",
                    index === activeTab && "text-brand font-bold text-base"
                  )}
                  onClick={(e) => handleTabClick(e, tab.id, index)}
                  style={{
                    pointerEvents: "auto",
                    minHeight: "44px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {tab.title}
                </button>
              ))}
            </div>
            <div
              ref={progressBarRef}
              className="h-1 rounded-full bg-gray-400/10 bg-opacity-30 w-full"
            >
              <div
                ref={progressFillRef}
                className="relative h-full bg-[var(--color-primary)] origin-left scale-x-0 overflow-hidden"
              ></div>
              <div
                ref={progressDotRef}
                className="absolute -bottom-1 origin-left size-3 rounded-full bg-[var(--color-primary)]"
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* YouTube Modal */}
      <Dialog open={modalIsOpen} onOpenChange={setModalIsOpen}>
        <DialogTitle className="sr-only">This is Youtube Dialog</DialogTitle>
        <DialogContent className="w-[100%] h-[38%] lg:min-w-[1200px] lg:min-h-[675px] p-0 bg-transparent border-none">
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

export default TimelineSection;
