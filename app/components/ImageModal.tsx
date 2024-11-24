"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";

interface ImageModalProps {
  images: { imgix_url: string; alt_text: string }[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export default function ImageModal({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: ImageModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight")
        onNavigate((currentIndex + 1) % images.length);
      if (e.key === "ArrowLeft")
        onNavigate((currentIndex - 1 + images.length) % images.length);
    },
    [currentIndex, images.length, onClose, onNavigate]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 bg-black/90 dark:bg-black/95 flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <button
        className="absolute top-4 right-4 text-white text-4xl hover:opacity-80 transition-opacity"
        onClick={onClose}
      >
        ×
      </button>

      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 
          text-white text-4xl p-4 pt-3 transition-colors rounded-lg"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((currentIndex - 1 + images.length) % images.length);
        }}
      >
        ‹
      </button>

      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 
          text-white text-4xl p-4 pt-3 transition-colors rounded-lg"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((currentIndex + 1) % images.length);
        }}
      >
        ›
      </button>

      <div className="relative w-[90vw] h-[90vh]">
        <Image
          src={images[currentIndex].imgix_url}
          alt={images[currentIndex].alt_text}
          fill
          className="object-contain"
          sizes="100vw"
          priority
        />
      </div>
    </div>
  );
}
