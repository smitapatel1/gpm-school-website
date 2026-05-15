/**
 * Lazy Loading Utility
 * Implements lazy loading for images to improve performance
 */

/**
 * Initialize lazy loading for images
 * Uses Intersection Observer API for efficient lazy loading
 */
export function initLazyLoading() {
  if (!("IntersectionObserver" in window)) {
    // Fallback for older browsers - load all images immediately
    const images = document.querySelectorAll("img[data-src]");
    images.forEach((img) => {
      const src = img.getAttribute("data-src");
      if (src) {
        img.setAttribute("src", src);
      }
    });
    return;
  }

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.getAttribute("data-src");
        const srcset = img.getAttribute("data-srcset");

        if (src) {
          img.setAttribute("src", src);
        }
        if (srcset) {
          img.setAttribute("srcset", srcset);
        }

        img.classList.add("loaded");
        observer.unobserve(img);
      }
    });
  });

  const images = document.querySelectorAll("img[data-src]");
  images.forEach((img) => imageObserver.observe(img));
}

/**
 * Lazy load component - React component for lazy loading images
 */
export interface LazyImageProps {
  src: string;
  alt: string;
  placeholder?: string;
  className?: string;
  width?: number;
  height?: number;
}

/**
 * Get blur placeholder for image
 */
export function getBlurPlaceholder(color: string = "#E8E8E8"): string {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='${encodeURIComponent(
    color
  )}' width='400' height='300'/%3E%3C/svg%3E`;
}

/**
 * Preload image
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

/**
 * Prefetch images for better performance
 */
export function prefetchImages(srcs: string[]) {
  srcs.forEach((src) => {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.as = "image";
    link.href = src;
    document.head.appendChild(link);
  });
}

/**
 * Get responsive image srcset
 */
export function getResponsiveSrcset(
  baseUrl: string,
  sizes: { width: number; density: number }[] = [
    { width: 320, density: 1 },
    { width: 640, density: 2 },
    { width: 1024, density: 1 },
    { width: 1920, density: 1 },
  ]
): string {
  return sizes
    .map(({ width, density }) => {
      const url = `${baseUrl}?w=${width}&q=80`;
      return `${url} ${width * density}w`;
    })
    .join(", ");
}

/**
 * Optimize image URL for web
 */
export function optimizeImageUrl(
  url: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: "webp" | "jpg" | "png";
  } = {}
): string {
  if (!url) return "";

  // If URL is already optimized or is a data URL, return as is
  if (url.includes("?") || url.startsWith("data:")) {
    return url;
  }

  const params = new URLSearchParams();

  if (options.width) params.append("w", options.width.toString());
  if (options.height) params.append("h", options.height.toString());
  if (options.quality) params.append("q", options.quality.toString());
  if (options.format) params.append("f", options.format);

  const separator = url.includes("?") ? "&" : "?";
  return params.toString() ? `${url}${separator}${params.toString()}` : url;
}

/**
 * Get image dimensions from URL
 */
export async function getImageDimensions(
  src: string
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = () => {
      reject(new Error(`Failed to load image: ${src}`));
    };
    img.src = src;
  });
}

/**
 * Calculate aspect ratio
 */
export function calculateAspectRatio(
  width: number,
  height: number
): string {
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(width, height);
  return `${width / divisor}/${height / divisor}`;
}
