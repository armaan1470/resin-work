"use client";

import { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import gsap from "gsap";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
}

export default function SearchOverlay({
  isOpen,
  onClose,
  onSearch,
}: SearchOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const isMobile =
      typeof window !== "undefined" &&
      /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    let viewportListener: (() => void) | null = null;
    let initialViewportHeight = 0;
    let scrollTimeout: NodeJS.Timeout | null = null;

    const escHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const clickOutsideHandler = (e: MouseEvent) => {
      if (
        overlayRef.current &&
        modalRef.current &&
        !modalRef.current.contains(e.target as Node)
      ) {
        hideOverlay();
      }
    };

    // Handle viewport changes for mobile keyboard
    const handleViewportChange = () => {
      if (!isMobile || !window.visualViewport) return;

      const currentHeight = window.visualViewport.height;
      const heightDifference = initialViewportHeight - currentHeight;

      // Clear any existing scroll timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // If height decreased significantly (keyboard opened)
      if (heightDifference > 150) {
        setIsKeyboardOpen(true);
        // Single scroll with smooth behavior for responsiveness
        scrollTimeout = setTimeout(() => {
          inputRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
            // inline: "nearest",
          });
        }, 50);
      } else {
        setIsKeyboardOpen(false);
      }
    };

    if (isOpen) {
      if (!isMobile) {
        document.body.style.overflow = "hidden";
      } else {
        // Store initial viewport height
        initialViewportHeight =
          window.visualViewport?.height || window.innerHeight;

        // Set up viewport listener for mobile
        if (window.visualViewport) {
          viewportListener = handleViewportChange;
          window.visualViewport.addEventListener("resize", viewportListener);
        }
      }

      document.addEventListener("keydown", escHandler);
      document.addEventListener("mousedown", clickOutsideHandler);
      showOverlay();
    } else {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", escHandler);
      document.removeEventListener("mousedown", clickOutsideHandler);
      if (viewportListener && window.visualViewport) {
        window.visualViewport.removeEventListener("resize", viewportListener);
      }
      setIsKeyboardOpen(false);
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", escHandler);
      document.removeEventListener("mousedown", clickOutsideHandler);
      if (viewportListener && window.visualViewport) {
        window.visualViewport.removeEventListener("resize", viewportListener);
      }
    };
  }, [isOpen]);

  const showOverlay = () => {
    if (!overlayRef.current || !modalRef.current) return;

    gsap.set(overlayRef.current, {
      display: "block",
      width: "2.5rem",
      height: "2.5rem",
      borderRadius: "9999px",
      top: "90%",
      left: "50%",
      xPercent: -50,
      yPercent: 0,
    });

    gsap.to(overlayRef.current, {
      top: "0%",
      width: "100vw",
      height: "100dvh",
      borderRadius: "0px",
      duration: 0.6,
      ease: "power3.inOut",
      onComplete: () => {
        gsap.fromTo(
          modalRef.current!,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 }
        );

        // Delay focus to ensure overlay is fully visible and keyboard is up
        setTimeout(() => {
          inputRef.current?.focus();
          // No scrollIntoView or manual scroll here; handled by viewportListener or onFocus fallback
        }, 400); // Delay matches or exceeds animation duration
      },
    });
  };

  const hideOverlay = () => {
    if (!overlayRef.current || !modalRef.current) return;

    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        gsap.to(overlayRef.current!, {
          height: "2.5rem",
          width: "2.5rem",
          borderRadius: "9999px",
          top: "90%",
          duration: 0.6,
          ease: "power3.inOut",
          onComplete: () => {
            overlayRef.current!.style.display = "none";
            onClose();
          },
        });
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputRef.current?.value.trim();
    if (query) {
      onSearch(query);
      hideOverlay();
    }
  };

  // Handle input focus event - single, quick scroll
  const handleInputFocus = () => {
    // Only scroll if not already handled by viewport listener
    setTimeout(() => {
      inputRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        // inline: "nearest",
      });
    }, 150);
  };

  return (
    <div
      ref={overlayRef}
      className={`fixed bg-black/60 backdrop-blur-md z-[9999] left-1/2 ${
        isOpen ? "block" : "hidden"
      }`}
      style={{
        transform: "translateX(-50%)",
      }}
    >
      {/* Close button outside of modalRef */}
      <button
        onClick={hideOverlay}
        aria-label="Close search"
        className="fixed p-2 border border-gray-200/34 rounded-full top-4 right-4 text-white hover:border-transparent text-2xl z-[10000]"
      >
        <IoClose />
      </button>

      <div
        ref={modalRef}
        className={`absolute inset-0 flex items-center justify-center opacity-0 transition-transform duration-200 ease-out ${
          isKeyboardOpen ? "items-start pt-16" : "items-center"
        }`}
      >
        <div className="relative h-full rounded-2xl shadow-2xl p-10 w-full mx-2 my-10 flex flex-col justify-center items-center bg-transparent">
          {/* Search form */}
          <form
            onSubmit={handleSubmit}
            className="relative flex w-full md:w-[70%] h-[4rem] items-center gap-2"
          >
            <input
              type="text"
              placeholder="Search..."
              ref={inputRef}
              onFocus={handleInputFocus}
              className="w-full text-[1.2rem] md:text-[1.5rem] rounded-full outline-none border-[2.5px] border-gray-100 px-6 py-4 text-sm text-white placeholder:text-gray-400 bg-transparent"
              autoFocus
              aria-label="Search"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
            <button
              className="absolute right-5 md:right-6 top-4 md:top-3.5"
              type="submit"
              aria-label="Submit search"
            >
              <FiSearch className="size-7 md:size-8 text-white cursor-pointer" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
