// import type { Metadata } from "next";
// import { Breadcrumb } from "@/components/common/breadcrumb";
// import { PageHero } from "@/components/sections/page-hero";
// import { Container } from "@/components/common/container";
// import { ProjectCard } from "@/components/cards/project-card";
// import { CtaBanner } from "@/components/sections/cta-banner";
// import { buildMetadata } from "@/lib/seo";
// import { projects } from "@/data/projects";

// export const metadata: Metadata = buildMetadata({
//   title: "Projects",
//   description:
//     "A selection of completed pool and landscape projects across the UAE.",
//   path: "/projects",
// });

// export default function ProjectsPage() {
//   return (
//     <>
//       <PageHero
//         eyebrow="Projects"
//         title="A selection of completed work"
//         description="Every project starts with the site's existing conditions — climate, soil, and how the family actually plans to use the space."
//       />

//       <section className="pb-12 pt-4">
//         <Breadcrumb
//           items={[
//             { name: "Home", href: "/" },
//             { name: "Projects", href: "/projects" },
//           ]}
//           className="bg-transparent border-0"
//         />
//         <Container>
//           <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
//             {projects.map((project) => (
//               <ProjectCard key={project.slug} project={project} />
//             ))}
//           </div>
//         </Container>
//       </section>

//       <CtaBanner />
//     </>
//   );
// }

// components/Gallery.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface GalleryItem {
  id: string;
  imageUrl: string;
}

// Static Unsplash images. Replace with your own project shots any time —
// just keep width/height accurate so the masonry layout doesn't jump/shift.
// Unsplash's `w=` param controls the delivered size; height is derived so
// the aspect ratio you set here always matches what's downloaded.
const PROJECT_IMAGES: Omit<GalleryItem, "id">[] = [
  {
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1682377521564-b180edfc960c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1757439402214-2311405d70bd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1621437102383-99e5cf9859c7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1782939355849-4a748ada9c84?q=80&w=2084&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1777907604937-69219987431f?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1711114378509-acc95d490b25?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1618606338706-fc3bad33dbe6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1774597998589-a47635d76ee5?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1645447556616-e9d1c52e8037?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1700957814555-0a05851e1d21?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1687960116764-f3526d29dae6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const buildItems = (): GalleryItem[] =>
  PROJECT_IMAGES.map((item, i) => ({ ...item, id: `project-${i}` }));

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadedIds, setLoadedIds] = useState<Set<string>>(new Set());
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setItems(buildItems());
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (selectedImageIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedImageIndex]);

  useEffect(() => {
    if (selectedImageIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImageIndex(null);
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, items.length]);

  useEffect(() => {
    setScale(1);
  }, [selectedImageIndex]);

  const handleImageLoad = (id: string) => {
    setLoadedIds((prev) => new Set(prev).add(id));
  };

  const handleNext = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) => (prev! + 1) % items.length);
  };

  const handlePrev = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) => (prev! - 1 + items.length) % items.length);
  };

  const skeletonHeights = useMemo(
    () =>
      Array.from({ length: 8 }, () => Math.floor(Math.random() * 200) + 220),
    [],
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center font-display tracking-tight text-primary">
        Projects Gallery
      </h1>

      {/* Skeleton state on first load */}
      {loading && (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 [column-fill:_balance]">
          {skeletonHeights.map((h, i) => (
            <div
              key={`skeleton-${i}`}
              className="mb-4 break-inside-avoid rounded-xl bg-muted animate-pulse"
              style={{ height: `${h}px` }}
            />
          ))}
        </div>
      )}

      {/* Masonry gallery */}
      {!loading && (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 [column-fill:_balance]">
          <AnimatePresence>
            {items.map((item, index) => (
              <motion.div
                key={item?.id}
                onClick={() => setSelectedImageIndex(index)}
                className="relative mb-4 break-inside-avoid group cursor-pointer overflow-hidden rounded-2xl bg-muted border border-border/40 shadow-sm transition-all hover:shadow-md hover:border-accent/30"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src={item?.imageUrl as string}
                  alt={""}
                  width={600}
                  height={600}
                  className={`w-full h-auto object-cover transition-all duration-500 group-hover:scale-105 ${
                    loadedIds.has(item?.id) ? "image-loaded" : "image-loading"
                  }`}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  onLoad={() => handleImageLoad(item?.id)}
                />

                {/* Visual Premium Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {!loading && items.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-primary mb-2">
            No projects yet
          </h3>
          <p className="text-muted-foreground">
            Add images to PROJECT_IMAGES to get started.
          </p>
        </div>
      )}

      <AnimatePresence>
        {selectedImageIndex !== null && items[selectedImageIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-black/95 p-4 backdrop-blur-md select-none"
          >
            {/* Top Bar */}
            <div className="flex w-full max-w-7xl items-center justify-between text-white py-3 px-4 relative z-[102]">
              <span className="text-sm font-medium tracking-wider text-gray-400 font-sans">
                {selectedImageIndex + 1} / {items.length}
              </span>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setScale((prev) => Math.max(1, prev - 0.5))}
                  disabled={scale <= 1}
                  className="rounded-full bg-white/10 p-2 text-white transition-all hover:bg-white/20 disabled:opacity-40 disabled:hover:bg-white/10"
                  aria-label="Zoom out"
                >
                  <ZoomOut className="h-5 w-5" />
                </button>
                <span className="text-xs font-semibold text-gray-300 min-w-[40px] text-center font-sans">
                  {Math.round(scale * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setScale((prev) => Math.min(3, prev + 0.5))}
                  disabled={scale >= 3}
                  className="rounded-full bg-white/10 p-2 text-white transition-all hover:bg-white/20 disabled:opacity-40 disabled:hover:bg-white/10"
                  aria-label="Zoom in"
                >
                  <ZoomIn className="h-5 w-5" />
                </button>
                <div className="h-6 w-px bg-white/10 mx-1" />
                <button
                  type="button"
                  onClick={() => setSelectedImageIndex(null)}
                  className="rounded-full bg-white/10 p-2 text-white transition-all hover:bg-white/20 hover:scale-105 active:scale-95"
                  aria-label="Close gallery"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Main Area */}
            <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden">
              {/* Prev Button */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-6 z-[102] rounded-full bg-black/40 border border-white/10 p-3.5 text-white transition-all hover:bg-black/60 hover:scale-105 active:scale-95 hidden md:block"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              {/* Image Container with Panning/Drag */}
              <div className="relative w-full max-w-5xl h-[70vh] flex items-center justify-center">
                <motion.div
                  key={selectedImageIndex}
                  drag={scale > 1 ? true : "x"}
                  dragConstraints={
                    scale > 1
                      ? {
                          left: -400 * (scale - 1),
                          right: 400 * (scale - 1),
                          top: -250 * (scale - 1),
                          bottom: 250 * (scale - 1),
                        }
                      : { left: 0, right: 0 }
                  }
                  dragElastic={scale > 1 ? 0.1 : 0.6}
                  onDragEnd={(event, info) => {
                    if (scale === 1) {
                      const swipeThreshold = 50;
                      if (info.offset.x < -swipeThreshold) {
                        handleNext();
                      } else if (info.offset.x > swipeThreshold) {
                        handlePrev();
                      }
                    }
                  }}
                  animate={{ scale: scale }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  onDoubleClick={() => setScale((prev) => (prev === 1 ? 2 : 1))}
                  className={cn(
                    "relative max-w-full max-h-full flex items-center justify-center touch-none",
                    scale > 1
                      ? "cursor-grab active:cursor-grabbing"
                      : "cursor-zoom-in",
                  )}
                >
                  <Image
                    src={items[selectedImageIndex].imageUrl}
                    alt={`Project gallery large image ${selectedImageIndex + 1}`}
                    width={1600}
                    height={1000}
                    className="rounded-2xl object-contain max-w-full max-h-[70vh] pointer-events-none"
                    priority
                  />
                </motion.div>
              </div>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-6 z-[102] rounded-full bg-black/40 border border-white/10 p-3.5 text-white transition-all hover:bg-black/60 hover:scale-105 active:scale-95 hidden md:block"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Mobile Bottom Navigation Controls */}
            <div className="flex md:hidden items-center justify-center gap-6 py-4 w-full relative z-[102] border-t border-white/5 bg-black/40">
              <button
                type="button"
                onClick={handlePrev}
                className="rounded-full bg-white/10 border border-white/10 p-3 text-white active:bg-white/20"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="text-xs text-white/50 tracking-wider font-medium font-sans">
                Swipe or tap to navigate
              </span>
              <button
                type="button"
                onClick={handleNext}
                className="rounded-full bg-white/10 border border-white/10 p-3 text-white active:bg-white/20"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
