import * as React from "react";

export function GallerySkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl overflow-hidden bg-card border border-border/80 shadow-sm animate-pulse flex flex-col"
        >
          <div className="w-full aspect-[4/3] bg-muted/60" />
          <div className="py-4 px-4 border-t border-border/40 flex justify-center">
            <div className="h-4 w-3/4 bg-muted/80 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
