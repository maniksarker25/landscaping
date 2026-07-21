"use client";

import * as React from "react";
import Image from "next/image";
import { ZoomIn, X } from "lucide-react";
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
  const [selectedImage, setSelectedImage] = React.useState<PoolGalleryImage | null>(null);

  if (!images || images.length === 0) return null;

  return (
    <div className={cn("space-y-4 my-6", className)}>
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
              onClick={() => setSelectedImage(img)}
              className="group relative h-[380px] sm:h-[480px] w-full overflow-hidden rounded-xl bg-muted shadow-md cursor-pointer border border-border/50"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="inline-flex items-center gap-2 rounded-full bg-background/90 backdrop-blur-sm px-4 py-2 text-xs font-semibold text-primary shadow-lg">
                  <ZoomIn className="h-4 w-4" /> Expand Photo
                </span>
              </div>
              {img.caption && (
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white text-xs font-medium">
                  {img.caption}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {images.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImage(img)}
              className="group relative h-40 sm:h-48 md:h-56 w-full overflow-hidden rounded-lg bg-muted shadow-sm cursor-pointer border border-border/60 transition-all hover:shadow-md"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="h-8 w-8 rounded-full bg-background/90 text-primary flex items-center justify-center shadow">
                  <ZoomIn className="h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Image Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[85vh] w-full rounded-2xl overflow-hidden bg-background shadow-2xl border border-border/30 flex flex-col"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 rounded-full bg-black/60 text-white p-2 hover:bg-black transition-colors"
              aria-label="Close image preview"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative w-full h-[60vh] sm:h-[70vh] bg-black">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain"
              />
            </div>

            <div className="p-4 bg-background text-foreground flex items-center justify-between border-t border-border">
              <p className="text-sm font-medium">{selectedImage.alt}</p>
              <span className="text-xs text-muted-foreground">Click anywhere outside to close</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
