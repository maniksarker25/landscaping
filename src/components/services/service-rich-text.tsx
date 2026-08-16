"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ServiceRichTextProps {
  contentHtml: string;
  title?: string;
  className?: string;
}

export function ServiceRichText({ contentHtml, title, className }: ServiceRichTextProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {title && (
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-primary leading-tight">
          {title}
        </h2>
      )}
      <div
        className={cn(
          "prose prose-emerald max-w-none text-foreground/80 leading-relaxed font-sans",
          "[&_h1:not([style*='color']):not([color])]:text-primary [&_h1]:font-display [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-4",
          "[&_h2:not([style*='color']):not([color])]:text-primary [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3",
          "[&_h3:not([style*='color']):not([color])]:text-primary [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-5 [&_h3]:mb-2",
          "[&_p]:mb-4 [&_p]:leading-relaxed",
          "[&_strong:not([style*='color']):not([color])]:text-primary [&_strong]:font-semibold",
          "[&_ul]:space-y-2.5 [&_ul]:my-4 [&_ul]:pl-1",
          "[&_li]:flex [&_li]:items-start [&_li]:gap-2.5",
          "[&_a:not([style*='color']):not([color])]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-emerald-700"
        )}
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </div>
  );
}
