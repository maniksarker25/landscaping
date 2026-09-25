"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ZoomIn } from "lucide-react";
import type { GalleryItem } from "@/types/gallery";

export interface GalleryCardProps {
  item: GalleryItem;
  index: number;
  targetSlug?: string;
  onSelectImage: (index: number) => void;
  isShowText?: boolean;
}

export const GalleryCard = React.memo(function GalleryCard({
  item,
  index,
  onSelectImage,
}: GalleryCardProps) {
  const handleClickImage = React.useCallback(() => {
    onSelectImage(index);
  }, [onSelectImage, index]);

  return (
    <motion.div
      key={item?._id}
      className="group relative rounded-lg overflow-hidden flex flex-col bg-card shadow-sm border border-border/70 hover:border-[#71a600]/60 transition-all duration-300 transform-gpu cursor-pointer"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      onClick={handleClickImage}
    >
      {/* Image Area - Clicking opens Lightbox Modal */}
      <div className="relative w-full aspect-[3/2] overflow-hidden bg-muted">
        <Image
          src={item?.image ?? ""}
          alt={item?.imageAlt || item?.location || "Project Image"}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          quality={80}
          priority={index < 4}
          className="object-cover transition-transform duration-500 ease-out transform-gpu group-hover:scale-110"
        />

        {/* Visual Premium Hover Overlay matching poolsgardensuae */}
        <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center">
          <div className="h-10 w-10 rounded-full bg-white/90 text-[#71a600] flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform mb-2">
            <ZoomIn className="h-5 w-5" />
          </div>
          <span className="text-white text-xs font-semibold drop-shadow-md line-clamp-1 max-w-[90%]">
            {item?.imageAlt || item?.location || "View Project"}
          </span>
        </div>
      </div>
    </motion.div>
  );
});

