"use client";

import * as React from "react";
import Image from "next/image";
import { ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";
import type { PoolGalleryImage } from "@/types/pool-detail";
import { cn } from "@/lib/utils";

interface PoolGalleryGridProps {
  images: PoolGalleryImage[];
  title?: string;
  variant?: "grid-6" | "side-by-side";
  className?: string;
}

export function PoolGalleryGrid({
  images,
  title,
  variant = "grid-6",
  className,
}: PoolGalleryGridProps) {
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

  const handleNext = React.useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (selectedIndex === null) return;
      setSelectedIndex((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : 0));
    },
    [selectedIndex, images.length]
  );

  const handlePrev = React.useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (selectedIndex === null) return;
      setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : images.length - 1));
    },
    [selectedIndex, images.length]
  );

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, handleNext, handlePrev]);

  if (!images || images.length === 0) return null;

  const currentImage = selectedIndex !== null ? images[selectedIndex] : null;

  return (
    <div className={cn("space-y-4 sm:space-y-6 my-6 sm:my-10", className)}>
      {title && (
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-primary">
          {title}
        </h2>
      )}

      {variant === "side-by-side" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {images.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className="group relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden rounded-2xl bg-muted shadow-md cursor-pointer border border-border/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 sm:p-5 text-white">
                <div className="flex justify-end">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-background/90 backdrop-blur-sm px-3.5 py-1.5 text-xs font-bold text-primary shadow-lg">
                    <ZoomIn className="h-3.5 w-3.5" /> Expand
                  </span>
                </div>
                {img.caption || img.alt ? (
                  <p className="text-xs sm:text-sm font-semibold leading-snug line-clamp-2">
                    {img.caption || img.alt}
                  </p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* 6-Grid / Multi-Image Grid - Optimized for Mobile (1-col on tiny, 2-col on sm, 3-col on md/lg) */
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-5">
          {images.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl sm:rounded-2xl bg-muted shadow-sm cursor-pointer border border-border/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/50"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5 sm:p-4 text-white">
                <div className="flex justify-end">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-primary shadow-md backdrop-blur-sm">
                    <ZoomIn className="h-4 w-4" />
                  </span>
                </div>
                {img.alt && (
                  <p className="text-xs font-medium leading-tight line-clamp-2 text-white/95 drop-shadow">
                    {img.alt}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Image Lightbox Modal */}
      {currentImage && (
        <div
          onClick={() => setSelectedIndex(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-3 sm:p-6 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[90vh] w-full rounded-2xl overflow-hidden bg-background shadow-2xl border border-white/10 flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-4 right-4 z-20 rounded-full bg-black/70 text-white p-2.5 hover:bg-black transition-transform hover:scale-110 focus:outline-none"
              aria-label="Close image preview"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/60 text-white p-2.5 hover:bg-black transition-transform hover:scale-110 focus:outline-none"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/60 text-white p-2.5 hover:bg-black transition-transform hover:scale-110 focus:outline-none"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Image Box */}
            <div className="relative w-full h-[55vh] sm:h-[70vh] bg-black/95">
              <Image
                src={currentImage.src}
                alt={currentImage.alt}
                fill
                priority
                className="object-contain"
              />
            </div>

            {/* Footer Bar */}
            <div className="p-4 bg-background text-foreground flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-border">
              <div>
                <p className="text-sm font-bold text-primary">{currentImage.alt}</p>
                {currentImage.caption && (
                  <p className="text-xs text-muted-foreground mt-0.5">{currentImage.caption}</p>
                )}
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-muted-foreground">
                <span>
                  Photo {selectedIndex! + 1} of {images.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
