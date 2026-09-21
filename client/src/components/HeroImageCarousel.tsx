import React, { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";

// List of images for the carousel. Add more images here.
// For now, we'll use the existing hero-bg.jpg and a few placeholders.
// NOTE: The images must be available in the public directory.
const images = [
  "/hero-bg.webp",
  "/hero-bg-2.webp",
  "/hero-bg-3.webp",
  "/hero-bg-4.webp",
  "/hero-bg-5.webp",
  "/hero-bg-6.webp",
  "/hero-bg-7.webp",
  "/hero-bg-8.webp",
];

interface HeroImageCarouselProps {
  className?: string;
  isBlurred?: boolean;
}

const HeroImageCarousel: React.FC<HeroImageCarouselProps> = ({
  className,
  isBlurred = false,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [nextIndex, setNextIndex] = useState(1);

  const currentImage = images[activeIndex];
  const nextImage = images[nextIndex];

  // Preload images
  useEffect(() => {
    images.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  }, []);

  // Auto-fade logic
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setNextIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Transition end logic
  useEffect(() => {
    if (isFading) {
      const timeout = setTimeout(() => {
        setActiveIndex(nextIndex);
        setIsFading(false);
      }, 1000); // Transition duration is 1s (matching CSS transition)

      return () => clearTimeout(timeout);
    }
  }, [isFading, nextIndex]);

  const baseClasses = "absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out";

  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      {/* Current Image */}
      <div
        className={cn(baseClasses, "opacity-100")}
        style={{
          backgroundImage: `url('${currentImage}')`,
          filter: isBlurred ? "blur(10px)" : "none",
          transform: isBlurred ? "scale(1.1)" : "none",
        }}
      />

      {/* Next Image (Fading In) */}
      <div
        className={cn(baseClasses, isFading ? "opacity-100" : "opacity-0")}
        style={{
          backgroundImage: `url('${nextImage}')`,
          filter: isBlurred ? "blur(10px)" : "none",
          transform: isBlurred ? "scale(1.1)" : "none",
        }}
      />
    </div>
  );
};

export default HeroImageCarousel;
