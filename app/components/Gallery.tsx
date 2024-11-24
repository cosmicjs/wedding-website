"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ImageModal from "./ImageModal";

interface GalleryProps {
  media: Array<{
    imgix_url: string;
    alt_text: string;
    width: number;
    height: number;
  }>;
}

export default function Gallery({ media }: GalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is a common mobile breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleImageClick = (index: number) => {
    if (!isMobile) {
      setSelectedImageIndex(index);
    }
  };

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 p-4 space-y-6">
        {media.map((item, index) => (
          <div
            key={index}
            className={`relative rounded-lg overflow-hidden 
              transition-transform duration-300 hover:scale-[1.02] bg-white dark:bg-gray-800 
              shadow-md hover:shadow-lg break-inside-avoid ${
                !isMobile ? "cursor-pointer" : ""
              }`}
            onClick={() => handleImageClick(index)}
          >
            <div className="relative w-full">
              <Image
                src={item.imgix_url}
                alt={item.alt_text}
                width={item.width}
                height={item.height}
                className="w-full h-auto"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        ))}
      </div>

      {selectedImageIndex !== null && (
        <ImageModal
          images={media}
          currentIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
          onNavigate={setSelectedImageIndex}
        />
      )}
    </>
  );
}
