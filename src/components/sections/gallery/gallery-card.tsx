"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ZoomIn, ArrowRight } from "lucide-react";
import type { GalleryItem } from "@/types/gallery";

export interface GalleryCardProps {
  item: GalleryItem;
  index: number;
  targetSlug: string;
  onSelectImage: (index: number) => void;
}

export const GalleryCard = React.memo(function GalleryCard({
  item,
  index,
  targetSlug,
  onSelectImage,
}: GalleryCardProps) {
  const handleClickImage = React.useCallback(() => {
    onSelectImage(index);
  }, [onSelectImage, index]);

  const handleLinkClick = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <motion.div
      key={item?._id}
      className="group rounded-xl overflow-hidden flex flex-col bg-card shadow-sm border border-border/80 hover:border-primary/40 transition-all duration-300 transform-gpu"
      initial={{ opacity: 0, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.99 }}
      transition={{ duration: 0.1, ease: "easeOut" }}
    >
      {/* Image Area - Clicking opens Lightbox Modal */}
      <div
        onClick={handleClickImage}
        className="relative w-full aspect-[4/3] overflow-hidden bg-muted cursor-pointer"
      >
        <Image
          src={item?.image ?? ""}
          alt={item?.imageAlt || item?.location || "Project Image"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={75}
          priority={index < 2}
          className="object-cover transition-transform duration-500 ease-out transform-gpu group-hover:scale-105"
        />

        {/* Category Badge Tag on Image */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
          {item?.category && (
            <span className="inline-block rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase text-white shadow">
              {item.category.replace("-", " ")}
            </span>
          )}
          {item?.location && (
            <span className="inline-block rounded-full bg-primary/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold tracking-wider text-white shadow">
              {item.location}
            </span>
          )}
        </div>

        {/* Visual Premium Hover Overlay */}
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <div className="h-10 w-10 rounded-full bg-background/90 text-primary flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
            <ZoomIn className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Title Box - Clicking navigates to /services/item?.slug */}
      {/* <Link
        href={targetSlug}
        // onClick={handleLinkClick}
        className="py-4 px-4 flex text-center bg-card z-10 transition-colors group-hover:bg-muted/40 items-center justify-center border-t border-border/40 hover:text-primary cursor-pointer"
      > */}
      <div
        className="py-4 px-4 flex text-center bg-card z-10 transition-colors group-hover:bg-muted/40 items-center justify-center border-t border-border/40 hover:text-primary cursor-pointer"
      >
        <span className="text-xs font-bold tracking-[0.15em] uppercase text-foreground group-hover:text-primary transition-colors line-clamp-1 flex items-center justify-center gap-1.5">
          {item?.imageAlt || item?.location || "Luxury Project"}
          {/* <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" /> */}
        </span>
      </div>
    </motion.div>
  );
});
