"use client";

import * as React from "react";
import { Filter, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CategoryOption {
  label: string;
  value: string;
}

export interface GalleryFilterButtonsProps {
  categories: CategoryOption[];
  activeCategory: string;
  activeCategoryLabel: string;
  getItemCount: (value: string) => number;
  onSelectCategory: (value: string) => void;
  onOpenMobileFilter: () => void;
}

export const GalleryFilterButtons = React.memo(function GalleryFilterButtons({
  categories,
  activeCategory,
  activeCategoryLabel,
  getItemCount,
  onSelectCategory,
  onOpenMobileFilter,
}: GalleryFilterButtonsProps) {
  return (
    <>
      {/* Mobile Filter Button Trigger */}
      <div className="flex sm:hidden justify-center mb-6">
        <button
          type="button"
          onClick={onOpenMobileFilter}
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

      {/* Desktop Category Filter Buttons */}
      <div className="hidden sm:flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
        {categories.map((category) => {
          const count = getItemCount(category.value);
          const isActive = activeCategory === category.value;
          return (
            <button
              key={category.value}
              type="button"
              onClick={() => onSelectCategory(category.value)}
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
    </>
  );
});
