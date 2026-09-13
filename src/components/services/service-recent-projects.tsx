"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchGalleryData } from "@/lib/api/gallery";
import { galleryImages } from "@/data/gallery";
import type { GalleryItem } from "@/types/gallery";
import { cn } from "@/lib/utils";

interface ServiceRecentProjectsProps {
  serviceCategory?: string;
  initialItems?: GalleryItem[];
  className?: string;
}

export function ServiceRecentProjects({
  serviceCategory,
  initialItems = [],
  className,
}: ServiceRecentProjectsProps) {
  const [items, setItems] = React.useState<GalleryItem[]>(initialItems);
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

  // Fetch gallery items if not provided via props
  React.useEffect(() => {
    if (initialItems && initialItems.length > 0) return;

    let isMounted = true;
    fetchGalleryData({ limit: 60 })
      .then((res) => {
        if (
          isMounted &&
          res?.data &&
          Array.isArray(res.data) &&
          res.data.length > 0
        ) {
          setItems(res.data);
        }
      })
      .catch((err) =>
        console.error(
          "Failed to fetch gallery items for recent projects:",
          err,
        ),
      );

    return () => {
      isMounted = false;
    };
  }, [initialItems]);

  const categoryNormalized = (serviceCategory || "").toLowerCase().trim();
  const isPools =
    categoryNormalized === "pools" || categoryNormalized.includes("pool");

  // Filter items according to serviceCategory
  const displayProjects = React.useMemo(() => {
    const poolKeywords = ["pool", "pools", "swimming"];
    const landscapeKeywords = [
      "landscape",
      "landscaping",
      "garden",
      "outdoor",
      "living",
      "patio",
      "pergola",
    ];

    const matchesPool = (cat: string) =>
      poolKeywords.some((kw) => cat.includes(kw));

    const matchesLandscaping = (cat: string) =>
      landscapeKeywords.some((kw) => cat.includes(kw)) || !matchesPool(cat);

    const filtered = items.filter((item) => {
      const cat = (item.category || "").toLowerCase().trim();
      return isPools ? matchesPool(cat) : matchesLandscaping(cat);
    });

    if (filtered.length > 0) {
      return filtered.slice(0, 6).map((item) => ({
        id: item._id,
        src:
          item.image ||
          (item as unknown as { imageUrl?: string }).imageUrl ||
          "",
        alt: item.imageAlt || item.location || "Dream Floor Luxury Project",
        location:
          item.location ||
          (isPools
            ? "Private Villa Pool, Dubai"
            : "Villa Garden & Landscape, Dubai"),
        category: item.category,
      }));
    }

    // High quality local fallback if API gallery has no matches
    return galleryImages
      .filter((g) =>
        isPools ? g.category === "pools" : g.category !== "pools",
      )
      .slice(0, 6)
      .map((g) => ({
        id: g.id,
        src: g.src,
        alt: g.alt,
        location: isPools
          ? "Luxury Swimming Pool, Dubai"
          : "Bespoke Landscaping, Dubai",
        category: g.category,
      }));
  }, [items, isPools]);

  const handleNext = React.useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (selectedIndex === null) return;
      setSelectedIndex((prev) =>
        prev !== null && prev < displayProjects.length - 1 ? prev + 1 : 0,
      );
    },
    [selectedIndex, displayProjects.length],
  );

  const handlePrev = React.useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (selectedIndex === null) return;
      setSelectedIndex((prev) =>
        prev !== null && prev > 0 ? prev - 1 : displayProjects.length - 1,
      );
    },
    [selectedIndex, displayProjects.length],
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

  if (displayProjects.length === 0) return null;

  const currentProject =
    selectedIndex !== null ? displayProjects[selectedIndex] : null;

  return (
    <section className={cn("my-10 space-y-6", className)}>
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-primary">
            Our Recent Projects
          </h2>
        </div>

        <Button
          asChild
          variant="outline"
          size="sm"
          className="hidden sm:inline-flex shrink-0 font-semibold border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          <Link href="/projects" className="flex items-center gap-1.5">
            View All Projects <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {displayProjects.map((project, idx) => (
          <div
            key={project.id || idx}
            onClick={() => setSelectedIndex(idx)}
            className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted border border-border/70 cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
          >
            <Image
              src={project.src}
              alt={project.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ))}
      </div>

      {/* Mobile View All Button */}
      <div className="pt-2 sm:hidden text-center">
        <Button
          asChild
          variant="outline"
          className="w-full font-semibold border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground"
        >
          <Link
            href="/projects"
            className="flex items-center justify-center gap-2"
          >
            View All Projects <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Lightbox Modal */}
      {currentProject && (
        <div
          onClick={() => setSelectedIndex(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-3 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[90vh] w-full rounded-2xl overflow-hidden bg-background border border-white/10 flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-4 right-4 z-20 rounded-full bg-black/70 text-white p-2.5 hover:bg-black focus:outline-none transition-colors"
              aria-label="Close image preview"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Navigation Arrows */}
            {displayProjects.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/60 text-white p-2.5 hover:bg-black focus:outline-none transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/60 text-white p-2.5 hover:bg-black focus:outline-none transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Image Box */}
            <div className="relative w-full h-[55vh] sm:h-[70vh] bg-black/95">
              <Image
                src={currentProject.src}
                alt={currentProject.alt}
                fill
                priority
                className="object-contain"
              />
            </div>

            {/* Footer Bar */}
            {/* <div className="p-4 bg-background text-foreground flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-border">
              <div>
                <p className="text-sm font-bold text-primary">
                  {currentProject.alt}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {currentProject.location}
                </p>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-muted-foreground font-medium">
                <span>
                  Project {selectedIndex! + 1} of {displayProjects.length}
                </span>
              </div>
            </div> */}
          </div>
        </div>
      )}
    </section>
  );
}
