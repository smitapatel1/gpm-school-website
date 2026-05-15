import { useState, useEffect } from "react";
import { getBlurPlaceholder } from "@/lib/lazy-loading";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  placeholder?: string;
  onLoad?: () => void;
}

/**
 * LazyImage Component
 * Lazy loads images using Intersection Observer for better performance
 */
export default function LazyImage({
  src,
  alt,
  className = "",
  width,
  height,
  placeholder,
  onLoad,
}: LazyImageProps) {
  const [imageSrc, setImageSrc] = useState<string>(placeholder || getBlurPlaceholder());
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!imageRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageSrc(src);
            observer.unobserve(imageRef);
          }
        });
      },
      { rootMargin: "50px" }
    );

    observer.observe(imageRef);

    return () => {
      observer.disconnect();
    };
  }, [imageRef, src]);

  return (
    <img
      ref={setImageRef}
      src={imageSrc}
      alt={alt}
      className={`transition-opacity duration-300 ${className}`}
      width={width}
      height={height}
      onLoad={onLoad}
    />
  );
}
