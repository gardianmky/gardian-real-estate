"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  onFallback?: () => void;
}

export function ImageWithFallback({
  src,
  alt,
  className,
  fallbackSrc = "/placeholder-user.jpg",
  width,
  height,
  fill,
  sizes,
  onFallback,
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
      onFallback?.();
    }
  };

  if (fill) {
    return (
      <Image
        src={imgSrc}
        alt={alt}
        fill
        className={className}
        sizes={sizes}
        onError={handleError}
      />
    );
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width || 400}
      height={height || 300}
      className={className}
      sizes={sizes}
      onError={handleError}
    />
  );
}

interface RegularImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  onHide?: () => void;
}

export function RegularImageWithFallback({
  src,
  alt,
  className,
  onHide,
}: RegularImageWithFallbackProps) {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = "none";
    onHide?.();
  };

  return (
    <img src={src} alt={alt} className={className} onError={handleError} />
  );
}
