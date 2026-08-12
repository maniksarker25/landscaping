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
import {
  Filter,
  X,
  Check,
  ChevronDown,
  ZoomIn,
  Loader2,
  RefreshCw,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { GalleryItem, GalleryMeta } from "@/types/gallery";
import type { ServiceData } from "@/types/service";


const DEFAULT_FALLBACK_ITEMS: GalleryItem[] = [
  {
    _id: "6a70cb159883359416ec6a8a",
    location: "Dubai",
    image:
      "https://res.cloudinary.com/ywodegk2/image/upload/v1785776916/dfl/images/image/1785776914894-FredricksonLandscapeCasaProject-54-d3b93a1fff514f4c92edee013b0c5fa6.jpg",
    imageAlt: "Korean Grass alternative lawn",
    category: "Landscaping",
    createdAt: "2026-08-03T17:08:37.511Z",
    updatedAt: "2026-08-03T17:08:37.511Z",
  },
  {
    _id: "6a70caa49883359416ec6a84",
    location: "Dubai",
    image:
      "https://res.cloudinary.com/ywodegk2/image/upload/v1785776802/dfl/images/image/1785776799425-ocean-travel-modern-nobody-infinity_1.jpg",
    imageAlt: "Infinity-edge-pool-at-dusk-update",
    category: "Pools",
    createdAt: "2026-08-03T17:06:44.766Z",
    updatedAt: "2026-08-03T17:12:45.359Z",
  },
  {
    _id: "fallback-3",
    location: "Palm Jumeirah",
    image:
      "https://plus.unsplash.com/premium_photo-1682377521564-b180edfc960c?q=75&w=800&auto=format&fit=crop",
    imageAlt: "Palm Jumeirah Infinity Pool",
    category: "Pools",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "fallback-4",
    location: "Jumeirah Island",
    image:
      "https://images.unsplash.com/photo-1757439402214-2311405d70bd?q=75&w=800&auto=format&fit=crop",
    imageAlt: "Jumeirah Island Garden",
    category: "Landscaping",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "fallback-5",
    location: "Meadows",
    image:
      "https://images.unsplash.com/photo-1782939355849-4a748ada9c84?q=75&w=800&auto=format&fit=crop",
    imageAlt: "Meadows Overflow Pool",
    category: "Pools",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "fallback-6",
    location: "Pearl Jumeirah",
    image:
      "https://images.unsplash.com/photo-1777907604937-69219987431f?q=75&w=800&auto=format&fit=crop",
    imageAlt: "Pearl Jumeirah Terrace",
    category: "Outdoor Living",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

import type { Testimonial } from "@/types";

export interface GalleryProps {
  initialData?: GalleryItem[];
  initialMeta?: GalleryMeta;
  initialTestimonials?: Testimonial[];
}

export function Gallery({
  initialData,
  initialMeta,
  initialTestimonials,
}: GalleryProps) {
  const [items, setItems] = useState<GalleryItem[]>(() => {
    if (initialData && initialData.length > 0) return initialData;
    return DEFAULT_FALLBACK_ITEMS;
  });
  const [meta, setMeta] = useState<GalleryMeta | undefined>(initialMeta);
  const [loading, setLoading] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );
  const [activeCategory, setActiveCategory] = useState("all");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [apiServices, setApiServices] = useState<ServiceData[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/service/get-all")
      .then((res) => res.json())
      .then((json) => {
        if (json.data && Array.isArray(json.data) && json.data.length > 0) {
          setApiServices(json.data);
        }
      })
      .catch((err) =>
        console.error("Failed to fetch services for gallery slug matching:", err),
      );
  }, []);

  const getTargetSlug = useCallback(
    (item: GalleryItem) => {
      // 1. If item itself has a slug from backend, use it
      const rawSlug = (item as any)?.slug;
      if (rawSlug) {
        return rawSlug.startsWith("/") ? rawSlug : `/services/${rawSlug}`;
      }


      // 2. Match with fetched API services by category
      const itemCat = (item?.category || "").toLowerCase().trim();

      if (apiServices.length > 0) {
        const matched = apiServices.find(
          (s) =>
            s.category?.toLowerCase().trim() === itemCat &&
            s.isPublished !== false,
        );
        if (matched?.slug) {
          return `/services/${matched.slug}`;
        }
      }

      // 3. Fallbacks directly matching backend API service slugs
      if (itemCat === "pools" || itemCat.includes("pool")) {
        return "/services/the-premier-overflow-swimming-pool-contractor";
      }
      if (
        itemCat === "landscaping" ||
        itemCat.includes("landscape") ||
        itemCat.includes("living")
      ) {
        return "/services/tempora-labore-nemo";
      }

      return apiServices[0]?.slug
        ? `/services/${apiServices[0].slug}`
        : "/services/the-premier-overflow-swimming-pool-contractor";
    },
    [apiServices],
  );


  // Dynamic list of available categories computed from loaded items
  const categories = useMemo(() => {
    const unique = new Set<string>();
    items.forEach((item) => {
      if (item?.category) unique.add(item?.category.trim());
    });

    const categoryList: { label: string; value: string }[] = [
      { label: "All Projects", value: "all" },
    ];

    unique.forEach((cat) => {
      const lower = cat.toLowerCase();
      let label = cat;
      if (lower === "pools") label = "Swimming Pools";
      else if (lower === "landscaping") label = "Landscaping";
      else if (lower === "outdoor living" || lower === "outdoor-living")
        label = "Outdoor Living";

      categoryList.push({ label, value: cat });
    });

    return categoryList;
  }, [items]);

  // Fetch updated data from local API proxy when category filter changes on client
  const fetchFilteredGallery = useCallback(async (cat: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("limit", "50");
      if (cat !== "all") {
        params.append("category", cat);
      }

      const res = await fetch(`/api/gallery/get-all?${params.toString()}`);
      if (res.ok) {
        const json = await res.json();
        if (json.data && Array.isArray(json.data) && json.data.length > 0) {
          setItems(json.data);
          if (json.meta) setMeta(json.meta);
        }
      }
    } catch (err) {
      console.error("Failed to refetch gallery category items:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCategorySelect = (catValue: string) => {
    setActiveCategory(catValue);
    setSelectedImageIndex(null);
    fetchFilteredGallery(catValue);
  };

  // Filter items dynamically for UI display
  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return items;
    return items.filter(
      (item) => item?.category?.toLowerCase() === activeCategory.toLowerCase(),
    );
  }, [items, activeCategory]);

  // Map GalleryItems to LightboxItem structure for LightboxModal
  const lightboxItems: LightboxItem[] = useMemo(() => {
    return filteredItems.map((item) => ({
      id: item?._id,
      title: item?.imageAlt || `${item?.location} ${item?.category}`,
      imageUrl: item?.image,
      category: item?.category,
    }));
  }, [filteredItems]);

  const getItemCount = (catValue: string) => {
    if (catValue === "all") return items.length;
    return items.filter(
      (i) => i.category?.toLowerCase() === catValue.toLowerCase(),
    ).length;
  };

  const activeCategoryLabel =
    categories.find((c) => c.value === activeCategory)?.label || "All Projects";

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

        {/* 1. Mobile Filter Button Trigger */}
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

        {/* 2. Desktop Category Filter Buttons */}
        <div className="hidden sm:flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
          {categories.map((category) => {
            const count = getItemCount(category.value);
            const isActive = activeCategory === category.value;
            return (
              <button
                key={category.value}
                type="button"
                onClick={() => handleCategorySelect(category.value)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-300 shadow-sm border transform-gpu",
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

        {/* Loading Indicator */}
        {loading && (
          <div className="flex items-center justify-center py-6 gap-2 text-primary text-sm font-medium">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Loading gallery items...</span>
          </div>
        )}

        {/* Dynamic Filtered Grid Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              const targetSlug = getTargetSlug(item);

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
                    onClick={() => setSelectedImageIndex(index)}
                    className="relative w-full aspect-[4/3] overflow-hidden bg-muted cursor-pointer"
                  >
                    <Image
                      src={item?.image}
                      alt={item?.imageAlt || item?.location || "Project Image"}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={75}
                      priority={index < 2}
                      className="object-cover transition-transform duration-500 ease-out transform-gpu group-hover:scale-105"
                    />

                    {/* Category Badge Tag on Image */}
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                      <span className="inline-block rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase text-white shadow">
                        {item?.category?.replace("-", " ")}
                      </span>
                      {item?.location && (
                        <span className="inline-block rounded-full bg-primary/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold tracking-wider text-white shadow">
                          {item?.location}
                        </span>
                      )}
                    </div>

                    {/* Visual Premium Hover Overlay */}
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                      <div className="h-10 w-10 rounded-full bg-background/90 text-primary flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform transform-gpu">
                        <ZoomIn className="h-5 w-5" />
                      </div>
                    </div>
                  </div>

                  {/* Title Box - Clicking navigates to /services/item?.slug */}
                  <Link
                    href={targetSlug}
                    onClick={(e) => e.stopPropagation()}
                    className="py-4 px-4 flex text-center bg-card z-10 transition-colors group-hover:bg-muted/40 items-center justify-center border-t border-border/40 hover:text-primary cursor-pointer"
                  >
                    <span className="text-xs font-bold tracking-[0.15em] uppercase text-foreground group-hover:text-primary transition-colors line-clamp-1 flex items-center justify-center gap-1.5">
                      {item?.imageAlt || item?.location || "Luxury Project"}
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredItems.length === 0 && !loading && (
          <div className="text-center py-20 bg-muted/20 rounded-2xl border border-dashed border-border mt-4">
            <div className="text-5xl mb-3">🔍</div>
            <h3 className="text-lg font-bold text-primary mb-1">
              No projects found in this category
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4">
              Try selecting "All Projects" to view our complete portfolio.
            </p>
            <button
              onClick={() => handleCategorySelect("all")}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors"
            >
              Show All Projects
            </button>
          </div>
        )}

        {/* Lightbox Component */}
        <LightboxModal
          items={lightboxItems}
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
                        handleCategorySelect(category.value);
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

      {pathname === "/projects" && (
        <Testimonials initialTestimonials={initialTestimonials} />
      )}

      {pathname === "/projects" && <QuoteMapSection />}
    </div>
  );
}

export default Gallery;
