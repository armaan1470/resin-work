"use client";

import { useEffect, useRef } from "react";
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

  useEffect(() => {
    const isMobile =
      typeof window !== "undefined" &&
      /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    let viewportListener: (() => void) | null = null;

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

    if (isOpen) {
      if (!isMobile) {
        document.body.style.overflow = "hidden";
      }
      document.addEventListener("keydown", escHandler);
      document.addEventListener("mousedown", clickOutsideHandler);
      showOverlay();

      // VisualViewport resize listener for mobile keyboard
      if (isMobile && typeof window !== "undefined" && window.visualViewport) {
        viewportListener = () => {
          setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
            // Fallback manual scroll
            setTimeout(() => {
              if (inputRef.current) {
                const rect = inputRef.current.getBoundingClientRect();
                if (rect.top < 0 || rect.bottom > window.innerHeight) {
                  window.scrollTo({
                    top: window.scrollY + rect.top - 10,
                    behavior: "smooth",
                  });
                }
              }
            }, 200);
          }, 100);
        };
        window.visualViewport.addEventListener("resize", viewportListener);
      }
    } else {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", escHandler);
      document.removeEventListener("mousedown", clickOutsideHandler);
      if (viewportListener && window.visualViewport) {
        window.visualViewport.removeEventListener("resize", viewportListener);
      }
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
      height: "100vh",
      borderRadius: "0px",
      duration: 0.6,
      ease: "power3.inOut",
      onComplete: () => {
        gsap.fromTo(
          modalRef.current!,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 }
        );

        // Delay focus/scroll to ensure overlay is fully visible and keyboard is up
        setTimeout(() => {
          inputRef.current?.focus();

          // Try scrollIntoView with block: "start"
          // inputRef.current?.scrollIntoView({
          //   behavior: "smooth",
          //   block: "start",
          // });

          // Fallback: scroll window if still not visible (for mobile)
          setTimeout(() => {
            if (inputRef.current) {
              const rect = inputRef.current.getBoundingClientRect();
              if (rect.top < 0 || rect.bottom > window.innerHeight) {
                window.scrollTo({
                  top: window.scrollY + rect.top - 5,
                  behavior: "smooth",
                });
              }
            }
          }, 200);
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
      <div
        ref={modalRef}
        className="absolute inset-0 flex items-center justify-center opacity-0"
      >
        <div className="relative h-full rounded-2xl shadow-2xl p-10 w-full mx-4 my-10 flex flex-col justify-center items-center bg-transparent">
          {/* Close button */}
          <button
            onClick={hideOverlay}
            aria-label="Close search"
            className="absolute p-2 border border-gray-200/34 rounded-full top-4 right-4 text-white hover:border-transparent text-2xl"
          >
            <IoClose />
          </button>

          {/* Search form */}
          <form
            onSubmit={handleSubmit}
            className="relative flex w-[90%] md:w-[70%] h-[4rem] items-center gap-2"
          >
            <input
              type="text"
              placeholder="Search..."
              ref={inputRef}
              onFocus={() => {
                // Fallback: only scroll if visualViewport is not available
                if (typeof window !== "undefined" && !window.visualViewport) {
                  setTimeout(() => {
                    inputRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                    setTimeout(() => {
                      if (inputRef.current) {
                        const rect = inputRef.current.getBoundingClientRect();
                        if (rect.top < 0 || rect.bottom > window.innerHeight) {
                          window.scrollTo({
                            top: window.scrollY + rect.top - 10,
                            behavior: "smooth",
                          });
                        }
                      }
                    }, 200);
                  }, 100);
                }
              }}
              className="w-full text-[1.2rem] md:text-[1.5rem] rounded-full outline-none border-[2.5px] border-gray-100 px-6 py-4 text-sm text-white placeholder:text-gray-400 bg-transparent"
              autoFocus
              aria-label="Search"
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
