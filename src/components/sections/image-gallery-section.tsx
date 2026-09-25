"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GalleryImage {
  url: string;
  alt?: string;
  title?: string;
}

export interface ImageGallerySectionProps {
  title?: string;
  images: (GalleryImage | string)[];
  columns?: 2 | 3 | 4;
  className?: string;
}

const FALLBACK_POOL_IMAGES = [
  "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1562778612-e1e0cda9915c?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=1600&auto=format&fit=crop",
];

function GalleryItem({
  img,
  index,
  onClick,
}: {
  img: GalleryImage;
  index: number;
  onClick: () => void;
}) {
  const [src, setSrc] = useState(img.url);

  return (
    <div
      onClick={onClick}
      className="group relative aspect-[4/3] overflow-hidden rounded-[3px] bg-gray-100 cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
    >
      <Image
        src={src}
        alt={img.alt || "Pool project"}
        fill
        onError={() => {
          setSrc(
            FALLBACK_POOL_IMAGES[index % FALLBACK_POOL_IMAGES.length] ?? "",
          );
        }}
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />
      {/* Overlay with zoom icon */}
      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <span className="p-2 rounded-full bg-white/80 text-gray-800 shadow-sm transform scale-90 group-hover:scale-100 transition-transform duration-300">
          <ZoomIn className="w-5 h-5 text-[#5597CF]" />
        </span>
      </div>
    </div>
  );
}

export function ImageGallerySection({
  title,
  images,
  columns = 3,
  className,
}: ImageGallerySectionProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const normalizedImages: GalleryImage[] = (images || []).map((item, idx) => {
    if (typeof item === "string") {
      return { url: item, alt: `Gallery image ${idx + 1}` };
    }
    return {
      url: item.url,
      alt: item.alt || `Gallery image ${idx + 1}`,
      title: item.title,
    };
  });

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prevImage = React.useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null
        ? (prev - 1 + normalizedImages.length) % normalizedImages.length
        : null,
    );
  }, [normalizedImages.length]);

  const nextImage = React.useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % normalizedImages.length : null,
    );
  }, [normalizedImages.length]);

  React.useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, prevImage, nextImage]);

  if (!images || images.length === 0) {
    return null;
  }

  const gridColsClass =
    columns === 4
      ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      : columns === 2
        ? "grid-cols-1 sm:grid-cols-2"
        : "grid-cols-2 sm:grid-cols-2 md:grid-cols-3";

  return (
    <div className={cn("space-y-4 font-sans", className)}>
      {title && (
        <h2 className="text-2xl lg:text-[28px] font-bold text-[#5597CF] leading-tight tracking-tight">
          {title}
        </h2>
      )}

      <div className={cn("grid gap-2.5 sm:gap-3", gridColsClass)}>
        {normalizedImages.map((img, idx) => (
          <GalleryItem
            key={idx}
            img={img}
            index={idx}
            onClick={() => openLightbox(idx)}
          />
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && normalizedImages[lightboxIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-50 text-white hover:text-[#5597CF] p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:text-[#5597CF] p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:text-[#5597CF] p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-7 h-7" />
          </button>

          {/* Image Container */}
          <div
            className="relative max-w-5xl max-h-[85vh] w-full h-[80vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={normalizedImages[lightboxIndex]!.url}
              alt={normalizedImages[lightboxIndex]!.alt || "Enlarged view"}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Caption / Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-xs font-medium bg-black/50 px-4 py-1.5 rounded-full">
            {lightboxIndex + 1} / {normalizedImages.length}
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageGallerySection;
