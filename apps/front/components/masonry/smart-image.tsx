"use client";

import React, { CSSProperties, useState, useRef, useEffect } from "react";
import Image from "next/image";

interface SmartImageProps {
  aspectRatio?: string;
  height: number;
  width: number;
  alt?: string;
  isLoading?: boolean;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  enlarge?: boolean;
  src: string;
  unoptimized?: boolean;
  priority?: boolean;
  sizes?: string;
  radius?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
}

// Modified SmartImage component
const SmartImage: React.FC<SmartImageProps> = ({
  aspectRatio,
  height,
  width,
  alt = "",
  isLoading = false,
  objectFit = "contain",
  enlarge = false,
  src,
  unoptimized = false,
  priority,
  sizes = "100vw",
  radius = "none",
  className,
  ...rest
}) => {
  const [isEnlarged, setIsEnlarged] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (enlarge) {
      setIsEnlarged(!isEnlarged);
    }
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isEnlarged) {
        setIsEnlarged(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isEnlarged]);

  useEffect(() => {
    if (isEnlarged) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isEnlarged]);

  const calculateTransform = (): CSSProperties => {
    if (!imageRef.current) return {};

    const rect = imageRef.current.getBoundingClientRect();
    // Calculate scale based on fitting the image into 90% of viewport, respecting aspect ratio
    if (
      Number.isNaN(width) ||
      Number.isNaN(height) ||
      width === 0 ||
      height === 0
    ) {
      return {};
    }

    const imgAspectRatio = width / height;
    const viewportAspectRatio = window.innerWidth / window.innerHeight;

    let scale;
    if (imgAspectRatio > viewportAspectRatio) {
      // Image is wider than viewport, scale based on width
      scale = (window.innerWidth * 0.9) / rect.width;
    } else {
      // Image is taller than viewport or similar aspect ratio, scale based on height
      scale = (window.innerHeight * 0.9) / rect.height;
    }

    const translateX =
      (window.innerWidth - rect.width * scale) / 2 -
      rect.left * scale -
      (rect.width * (scale - 1)) / 2;
    const translateY =
      (window.innerHeight - rect.height * scale) / 2 -
      rect.top * scale -
      (rect.height * (scale - 1)) / 2;

    return {
      transformOrigin: "top left", // Needed for correct scaling from original position
      transform: isEnlarged
        ? `translate(${translateX}px, ${translateY}px) scale(${scale})`
        : "translate(0px, 0px) scale(1)",
      transition: "transform 0.3s ease-in-out, z-index 0s step-start 0.3s",
      zIndex: isEnlarged ? 20 : 1, // Use higher z-index for Tailwind context
    };
  };

  // Helper to map radius prop to Tailwind classes
  const radiusClass = {
    none: "rounded-none",
    xs: "rounded-sm", // Assuming xs maps to sm
    sm: "rounded",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  }[radius];

  // Tailwind classes for object fit
  const objectFitClass = {
    contain: "object-contain",
    cover: "object-cover",
    fill: "object-fill",
    none: "object-none",
    "scale-down": "object-scale-down",
  }[objectFit];

  return (
    <>
      <div
        ref={imageRef}
        // Tailwind classes equivalent to Flex props and inline styles
        className={`w-full overflow-hidden relative ${radiusClass} ${
          enlarge ? "cursor-pointer" : ""
        } ${className}`}
        style={{
          ...calculateTransform(), // Apply dynamic transform and zIndex
          outline: "none", // Equivalent to outline-none
          isolation: "isolate", // Equivalent to isolation
          // Conditional aspectRatio/height based on prop
          ...(aspectRatio ? { aspectRatio: aspectRatio } : { height: "auto" }),
        }}
        onClick={handleClick}
        {...rest} // Spread other relevant props if any (be cautious with non-HTML props)
      >
        {/* Placeholder for Skeleton if needed, using Tailwind classes */}
        {isLoading && (
          <div
            className={`absolute inset-0 bg-gray-300 animate-pulse ${radiusClass}`}
          ></div>
        )}

        {!isLoading && (
          <Image
            src={src}
            alt={alt}
            priority={priority}
            sizes={sizes}
            unoptimized={unoptimized}
            fill={false} // Set fill to false when controlling size manually
            width={width}
            height={height}
            className={`block w-full h-auto ${objectFitClass}`} // Tailwind classes
          />
        )}
      </div>

      {isEnlarged && enlarge && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer transition-opacity duration-300 z-50" // Use higher z-index like z-50 for fixed overlay
          style={{
            opacity: isEnlarged ? 1 : 0,
          }}
          onClick={handleClick}
        >
          <div
            className="relative"
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 60,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              fill={false}
              width={width}
              height={height}
              sizes="90vw"
              unoptimized={unoptimized}
              className={`block w-full h-auto ${objectFitClass}`}
              style={{ maxWidth: "90vw", maxHeight: "90vh" }}
            />
          </div>
        </div>
      )}
    </>
  );
};
SmartImage.displayName = "SmartImage";

export { SmartImage };
