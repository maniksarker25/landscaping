"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Filter, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CategoryOption } from "./gallery-filter-buttons";

export interface GalleryMobileModalProps {
  isOpen: boolean;
  categories: CategoryOption[];
  activeCategory: string;
  getItemCount: (value: string) => number;
  onSelectCategory: (value: string) => void;
  onClose: () => void;
}

export function GalleryMobileModal({
  isOpen,
  categories,
  activeCategory,
  getItemCount,
  onSelectCategory,
  onClose,
}: GalleryMobileModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
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
                onClick={onClose}
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
                      onSelectCategory(category.value);
                      onClose();
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
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-md hover:bg-primary/90 transition-colors"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
