"use client";

import { QuoteMapSection } from "@/components/sections/quote-map-section";
import { PageHero } from "@/components/sections/page-hero";
import { Testimonials } from "@/components/sections/testimonials";
import {
  LightboxModal,
  type LightboxItem,
} from "@/components/common/lightbox-modal";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Filter, X, Check, ChevronDown, ZoomIn } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const categories: { label: string; value: string }[] = [
  { label: "All Projects", value: "all" },
  { label: "Swimming Pools", value: "pools" },
  { label: "Landscaping", value: "landscaping" },
  { label: "Outdoor Living", value: "outdoor-living" },
];

const PROJECT_IMAGES: Omit<LightboxItem, "id">[] = [
  {
    title: "PALM JUMEIRAH INFINITY POOL",
    category: "pools",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1682377521564-b180edfc960c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "JUMEIRAH ISLAND GARDEN",
    category: "landscaping",
    imageUrl:
      "https://images.unsplash.com/photo-1757439402214-2311405d70bd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "JUMEIRAH PARK RESIDENCE",
    category: "landscaping",
    imageUrl:
      "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "MEADOWS OVERFLOW POOL",
    category: "pools",
    imageUrl:
      "https://images.unsplash.com/photo-1782939355849-4a748ada9c84?q=80&w=2084&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "PEARL JUMEIRAH TERRACE",
    category: "outdoor-living",
    imageUrl:
      "https://images.unsplash.com/photo-1777907604937-69219987431f?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "ARABIAN RANCHES PERGOLA",
    category: "outdoor-living",
    imageUrl:
      "https://images.unsplash.com/photo-1711114378509-acc95d490b25?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "PALM JUMEIRAH VILLA POOL",
    category: "pools",
    imageUrl:
      "https://images.unsplash.com/photo-1774597998589-a47635d76ee5?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "PEARL JUMEIRAH LANDSCAPE",
    category: "landscaping",
    imageUrl:
      "https://images.unsplash.com/photo-1645447556616-e9d1c52e8037?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "JUMEIRAH ISLAND SKIMMER POOL",
    category: "pools",
    imageUrl:
      "https://images.unsplash.com/photo-1700957814555-0a05851e1d21?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const buildItems = (): LightboxItem[] =>
  PROJECT_IMAGES.map((item, i) => ({ ...item, id: `project-${i}` }));

export default function Gallery() {
  const [items, setItems] = useState<LightboxItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadedIds, setLoadedIds] = useState<Set<string>>(new Set());
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );
  const [activeCategory, setActiveCategory] = useState("all");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      setItems(buildItems());
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Filter items dynamically based on active category
  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return items;
    return items.filter((item) => item.category === activeCategory);
  }, [items, activeCategory]);

  const handleImageLoad = (id: string) => {
    setLoadedIds((prev) => new Set(prev).add(id));
  };

  const getItemCount = (categoryValue: string) => {
    if (categoryValue === "all") return items.length;
    return items.filter((i) => i.category === categoryValue).length;
  };

  const activeCategoryLabel =
    categories.find((c) => c.value === activeCategory)?.label || "All Projects";

  const skeletonHeights = useMemo(
    () => Array.from({ length: 6 }, () => 300),
    [],
  );

  return (
    <div className="w-full">
      {pathname === "/projects" && (
        <PageHero
          eyebrow="Projects"
          title="Our Recent Completed Projects"
          description="A showcase of our luxury swimming pools, landscaping, and outdoor living transformations in Dubai."
        />
      )}

      <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center font-display tracking-tight text-primary">
          {pathname === "/projects"
            ? "Our Recent Projects"
            : "Some of Our Recent Projects"}
        </h1>

        {/* 1. Mobile Filter Button Trigger (Visible ONLY on small devices) */}
        <div className="flex sm:hidden justify-center mb-6">
          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center justify-between gap-3 rounded-full bg-card px-5 py-2.5 text-xs font-semibold border border-border shadow-sm text-foreground hover:border-primary/50 transition-all w-full max-w-xs"
          >
            <span className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-primary" />
              <span>Filter Projects</span>
            </span>
            <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-primary text-[11px] font-bold">
              {activeCategoryLabel}
              <ChevronDown className="h-3 w-3" />
            </span>
          </button>
        </div>

        {/* 2. Desktop Category Filter Buttons (Visible ONLY on sm screens & up) */}
        <div className="hidden sm:flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
          {categories.map((category) => {
            const count = getItemCount(category.value);
            const isActive = activeCategory === category.value;
            return (
              <button
                key={category.value}
                type="button"
                onClick={() => {
                  setActiveCategory(category.value);
                  setSelectedImageIndex(null);
                }}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-300 shadow-sm border",
                  isActive
                    ? "bg-primary text-primary-foreground border-primary shadow-md scale-105"
                    : "bg-background text-foreground/80 border-border hover:border-primary/50 hover:bg-muted",
                )}
              >
                <span>{category.label}</span>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] sm:text-[11px] font-bold transition-colors",
                    isActive
                      ? "bg-primary-foreground/20 text-white"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Skeleton state on initial loading */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skeletonHeights.map((h, i) => (
              <div
                key={`skeleton-${i}`}
                className="flex flex-col gap-0 shadow-sm rounded-lg overflow-hidden border border-border"
              >
                <div
                  className="w-full bg-muted animate-pulse"
                  style={{ height: `${h}px` }}
                />
                <div className="py-4 px-2 bg-card flex items-center justify-center border-t border-border">
                  <div className="h-3 w-32 bg-muted rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Dynamic Filtered Grid Gallery */}
        {!loading && (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <motion.div
                  layout
                  key={item.id}
                  onClick={() => setSelectedImageIndex(index)}
                  className="group cursor-pointer rounded-xl overflow-hidden flex flex-col bg-card shadow-sm border border-border/80 hover:shadow-xl hover:border-primary/40 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted">
                    <Image
                      src={item.imageUrl}
                      alt={item.title || "Project Image"}
                      fill
                      className={`object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-95 ${
                        loadedIds.has(item.id)
                          ? "image-loaded"
                          : "image-loading"
                      }`}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      onLoad={() => handleImageLoad(item.id)}
                    />

                    {/* Category Badge Tag on Image */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="inline-block rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase text-white shadow">
                        {item.category?.replace("-", " ")}
                      </span>
                    </div>

                    {/* Visual Premium Hover Overlay */}
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                      <div className="h-10 w-10 rounded-full bg-background/90 text-primary flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                        <ZoomIn className="h-5 w-5" />
                      </div>
                    </div>
                  </div>

                  {/* Title Box */}
                  <div className="py-4 px-4 text-center bg-card z-10 transition-colors group-hover:bg-muted/40 flex items-center justify-center border-t border-border/40">
                    <span className="text-xs font-bold tracking-[0.15em] uppercase text-foreground group-hover:text-primary transition-colors">
                      {item.title || "Project"}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && filteredItems.length === 0 && (
          <div className="text-center py-20 bg-muted/20 rounded-2xl border border-dashed border-border mt-4">
            <div className="text-5xl mb-3">🔍</div>
            <h3 className="text-lg font-bold text-primary mb-1">
              No projects found in this category
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4">
              Try selecting "All Projects" to view our complete portfolio.
            </p>
            <button
              onClick={() => setActiveCategory("all")}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors"
            >
              Show All Projects
            </button>
          </div>
        )}

        {/* Standalone Lightbox Component */}
        <LightboxModal
          items={filteredItems}
          selectedIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
          onIndexChange={(newIndex) => setSelectedImageIndex(newIndex)}
        />
      </div>

      {/* Mobile Category Filter Modal Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-md rounded-t-3xl sm:rounded-2xl bg-card border border-border p-6 shadow-2xl space-y-4 text-foreground"
            >
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-primary" />
                  <h3 className="font-display text-base font-bold">
                    Filter By Category
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="rounded-full bg-muted p-1.5 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-2 py-2">
                {categories.map((category) => {
                  const count = getItemCount(category.value);
                  const isActive = activeCategory === category.value;
                  return (
                    <button
                      key={category.value}
                      type="button"
                      onClick={() => {
                        setActiveCategory(category.value);
                        setSelectedImageIndex(null);
                        setIsMobileFilterOpen(false);
                      }}
                      className={cn(
                        "flex items-center justify-between w-full p-3.5 rounded-xl text-xs font-semibold border transition-all text-left",
                        isActive
                          ? "bg-primary/10 border-primary text-primary shadow-sm"
                          : "bg-background border-border/60 text-foreground/80 hover:bg-muted",
                      )}
                    >
                      <span className="flex items-center gap-2">
                        {isActive && <Check className="h-4 w-4 text-primary" />}
                        <span>{category.label}</span>
                      </span>
                      <span className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-bold text-muted-foreground">
                        {count} {count === 1 ? "project" : "projects"}
                      </span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-md hover:bg-primary/90 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Testimonials />
      <QuoteMapSection />
    </div>
  );
}
