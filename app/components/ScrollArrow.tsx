"use client";

import { useEffect, useState } from "react";

export default function ScrollArrow({ scrollTo }: { scrollTo: string }) {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isAboveGallery, setIsAboveGallery] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Get gallery position
      const galleryElement = document.getElementById(scrollTo);
      if (galleryElement) {
        const galleryTop = galleryElement.offsetTop;
        setIsAboveGallery(scrolled < galleryTop - windowHeight / 2);
      }

      // Check if at bottom
      setIsAtBottom(scrolled + windowHeight >= documentHeight - 100);
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollTo]);

  const handleClick = () => {
    if (isAtBottom || !isAboveGallery) {
      // Scroll to top when below gallery or at bottom
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Scroll to gallery when above it
      const element = document.getElementById(scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Remove isVisible from the condition since it's always true
  const shouldShow = isAboveGallery || isAtBottom;

  return shouldShow ? (
    <div
      onClick={handleClick}
      className="hidden md:flex justify-center cursor-pointer fixed bottom-8 right-8 hover:opacity-75 transition-opacity"
    >
      <svg
        className="w-8 h-8 text-gray-600 dark:text-gray-300"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {isAtBottom || !isAboveGallery ? (
          <path d="M5 10l7-7m0 0l7 7m-7-7v18" /> // Up arrow
        ) : (
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3" /> // Down arrow
        )}
      </svg>
    </div>
  ) : null;
}
