import * as React from "react";

export function GallerySkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3 lg:gap-3.5">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="relative w-full aspect-[3/2] rounded-lg overflow-hidden bg-muted/60 border border-border/70 animate-pulse shadow-sm"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-muted/80 via-muted/40 to-muted/80" />
        </div>
      ))}
    </div>
  );
}
