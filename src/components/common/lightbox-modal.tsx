"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LightboxItem {
  id: string;
  title: string;
  imageUrl: string;
  category?: string;
}

export interface LightboxModalProps {
  items: LightboxItem[];
  selectedIndex: number | null;
  onClose: () => void;
  onIndexChange?: (index: number) => void;
}

export function LightboxModal({
  items,
  selectedIndex,
  onClose,
  onIndexChange,
}: LightboxModalProps) {
  const [scale, setScale] = React.useState(1);

  const isOpen = selectedIndex !== null && selectedIndex >= 0 && selectedIndex < items.length;
  const currentItem = isOpen ? items[selectedIndex] : null;

  // Lock body scroll when lightbox is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Reset zoom scale when selected index changes
  React.useEffect(() => {
    setScale(1);
  }, [selectedIndex]);

  const handleNext = React.useCallback(() => {
    if (selectedIndex === null || items.length === 0) return;
    const nextIndex = (selectedIndex + 1) % items.length;
    if (onIndexChange) {
      onIndexChange(nextIndex);
    }
  }, [selectedIndex, items.length, onIndexChange]);

  const handlePrev = React.useCallback(() => {
    if (selectedIndex === null || items.length === 0) return;
    const prevIndex = (selectedIndex - 1 + items.length) % items.length;
    if (onIndexChange) {
      onIndexChange(prevIndex);
    }
  }, [selectedIndex, items.length, onIndexChange]);

  // Keyboard navigation
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handleNext, handlePrev]);

  if (!isOpen || !currentItem) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-between p-4 bg-black/90 backdrop-blur-md select-none"
      >
        {/* Top Control Bar */}
        <div className="flex w-full max-w-7xl items-center justify-between text-white py-3 px-4 relative z-[102]">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold tracking-wider font-sans">
              {selectedIndex! + 1} / {items.length}
            </span>
            {currentItem.category && (
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/20 uppercase font-bold tracking-wider">
                {currentItem.category}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setScale((prev) => Math.max(1, prev - 0.5))}
              disabled={scale <= 1}
              className="rounded-full bg-white/10 p-2 text-white transition-all hover:bg-white/20 disabled:opacity-40"
              aria-label="Zoom out"
            >
              <ZoomOut className="h-5 w-5" />
            </button>
            <span className="text-xs font-semibold text-white min-w-[40px] text-center font-sans">
              {Math.round(scale * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setScale((prev) => Math.min(3, prev + 0.5))}
              disabled={scale >= 3}
              className="rounded-full bg-white/10 p-2 text-white transition-all hover:bg-white/20 disabled:opacity-40"
              aria-label="Zoom in"
            >
              <ZoomIn className="h-5 w-5" />
            </button>

            <div className="h-6 w-px bg-white/20 mx-1" />

            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-white/20 p-2 text-white transition-all hover:bg-white/30 hover:scale-105 active:scale-95"
              aria-label="Close lightbox modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Main Interactive Stage */}
        <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden">
          {/* Desktop Previous Button */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-6 z-[102] rounded-full bg-white/10 border border-white/20 p-3.5 text-white transition-all hover:bg-white/20 hover:scale-105 active:scale-95 hidden md:block"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Image Container with Drag & Zoom */}
          <div className="relative w-full max-w-5xl h-[70vh] flex items-center justify-center">
            <motion.div
              key={selectedIndex}
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
              onDragEnd={(_, info) => {
                if (scale === 1) {
                  const swipeThreshold = 50;
                  if (info.offset.x < -swipeThreshold) {
                    handleNext();
                  } else if (info.offset.x > swipeThreshold) {
                    handlePrev();
                  }
                }
              }}
              animate={{ scale }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onDoubleClick={() => setScale((prev) => (prev === 1 ? 2 : 1))}
              className={cn(
                "relative max-w-full max-h-full flex items-center justify-center touch-none",
                scale > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
              )}
            >
              <Image
                src={currentItem.imageUrl}
                alt={currentItem.title || "Project preview"}
                width={1600}
                height={1000}
                className="rounded-2xl object-contain max-w-full max-h-[70vh] pointer-events-none shadow-2xl"
                priority
              />
            </motion.div>
          </div>

          {/* Desktop Next Button */}
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-6 z-[102] rounded-full bg-white/10 border border-white/20 p-3.5 text-white transition-all hover:bg-white/20 hover:scale-105 active:scale-95 hidden md:block"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Bottom Bar */}
        <div className="flex md:hidden items-center justify-between px-6 py-3 w-full relative z-[102] border-t border-white/10 bg-black/60">
          <button
            type="button"
            onClick={handlePrev}
            className="rounded-full bg-white/10 border border-white/20 p-2.5 text-white active:bg-white/30"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="text-xs text-white/80 font-medium font-sans truncate max-w-[200px]">
            {currentItem.title}
          </span>
          <button
            type="button"
            onClick={handleNext}
            className="rounded-full bg-white/10 border border-white/20 p-2.5 text-white active:bg-white/30"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
