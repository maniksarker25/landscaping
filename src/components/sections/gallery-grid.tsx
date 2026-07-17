"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { galleryImages } from "@/data/gallery";
import type { GalleryImage } from "@/types";

const categories: { label: string; value: GalleryImage["category"] | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Pools", value: "pools" },
  { label: "Landscaping", value: "landscaping" },
  { label: "Outdoor Living", value: "outdoor-living" },
  { label: "Lighting", value: "lighting" },
];

export function GalleryGrid() {
  const [active, setActive] = React.useState<GalleryImage["category"] | "all">("all");

  const filtered =
    active === "all" ? galleryImages : galleryImages.filter((img) => img.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter gallery by category">
        {categories.map((category) => (
          <button
            key={category.value}
            type="button"
            role="tab"
            aria-selected={active === category.value}
            onClick={() => setActive(category.value)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              active === category.value
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-primary/10"
            )}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {filtered.map((image) => (
          <motion.div
            key={image.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative mb-4 break-inside-avoid overflow-hidden rounded-lg"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={800}
              height={600}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="w-full object-cover"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
