"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface VideoItem {
  src: string;
  poster?: string;
  title?: string;
}

export interface VideoSectionProps {
  title?: string;
  videos: (VideoItem | string)[];
  className?: string;
}

export function VideoSection({ title, videos, className }: VideoSectionProps) {
  const normalizedVideos: VideoItem[] = videos.map((v, idx) => {
    if (typeof v === "string") {
      return { src: v, title: `Video ${idx + 1}` };
    }
    return v;
  });

  return (
    <div className={cn("space-y-4 font-sans", className)}>
      {title && (
        <h2 className="text-2xl lg:text-[28px] font-bold text-[#729d00] leading-tight tracking-tight">
          {title}
        </h2>
      )}

      <div
        className={cn(
          "grid gap-4",
          normalizedVideos.length > 1
            ? "grid-cols-1 sm:grid-cols-2"
            : "grid-cols-1 max-w-2xl"
        )}
      >
        {normalizedVideos.map((video, idx) => (
          <div
            key={idx}
            className="overflow-hidden rounded-[3px] border border-gray-200 bg-black/95 shadow-sm"
          >
            <video
              src={video.src}
              poster={video.poster}
              controls
              playsInline
              preload="metadata"
              className="w-full aspect-[9/16] sm:aspect-[4/5] md:aspect-[3/4] object-cover max-h-[460px] mx-auto"
            >
              Your browser does not support the video tag.
            </video>
            {video.title && (
              <div className="p-2.5 bg-gray-50 border-t border-gray-100 text-xs font-medium text-gray-700">
                {video.title}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoSection;
