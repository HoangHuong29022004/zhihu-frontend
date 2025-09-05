"use client";
import Image, { ImageProps } from "next/image";
import { useState, useEffect } from "react";

interface ImageBaseProps extends Omit<ImageProps, "src"> {
  src: string;
  fallbackSrc?: string;
}

const isValidImageUrl = (url: string): boolean => {
  if (!url) return false;
  return (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("/")
  );
};

const ImageBase = ({
  src,
  fallbackSrc = `${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/default_image.png`,
  alt,
  ...props
}: ImageBaseProps) => {
  const [imgSrc, setImgSrc] = useState<string>(
    isValidImageUrl(src) ? src : fallbackSrc
  );

  useEffect(() => {
    setImgSrc(isValidImageUrl(src) ? src : fallbackSrc);
  }, [src, fallbackSrc]);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt || "image"}
      unoptimized
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
};

export default ImageBase;
