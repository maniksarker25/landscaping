"use client";

import * as React from "react";
import type { PoolDetailSection, GoogleReviewsData } from "@/types/pool-detail";
import { PoolRichText } from "./pool-rich-text";
import { PoolGalleryGrid } from "./pool-gallery-grid";
import { PoolCtaBanner } from "./pool-cta-banner";
import { PoolTrustReviews } from "./pool-trust-reviews";
import { CheckCircle, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

interface PoolDynamicRendererProps {
  sections: PoolDetailSection[];
  googleReviews?: GoogleReviewsData;
  className?: string;
}

export function PoolDynamicRenderer({
  sections,
  googleReviews,
  className,
}: PoolDynamicRendererProps) {
  if (!sections || sections.length === 0) return null;

  return (
    <div className={cn("space-y-8", className)}>
      {sections.map((section) => {
        switch (section.type) {
          case "rich-text":
            return (
              section.contentHtml && (
                <PoolRichText
                  key={section.id}
                  title={section.title}
                  contentHtml={section.contentHtml}
                />
              )
            );

          case "gallery-6grid":
            return (
              section.images && (
                <PoolGalleryGrid
                  key={section.id}
                  title={section.title}
                  images={section.images}
                  variant="grid-6"
                />
              )
            );

          case "side-by-side-images":
            return (
              section.images && (
                <PoolGalleryGrid
                  key={section.id}
                  title={section.title}
                  images={section.images}
                  variant="side-by-side"
                />
              )
            );

          case "cta-callout":
            return (
              section.cta && (
                <PoolCtaBanner key={section.id} cta={section.cta} />
              )
            );

          case "process-timeline":
            return (
              <div key={section.id} className="my-10 space-y-6">
                {section.title && (
                  <div>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-primary">
                      {section.title}
                    </h2>
                    {section.subtitle && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {section.subtitle}
                      </p>
                    )}
                  </div>
                )}

                {section.processSteps && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {section.processSteps.map((step) => (
                      <div
                        key={step.stepNumber}
                        className="flex flex-col justify-between p-5 rounded-xl bg-card border border-border/80 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
                      >
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="h-8 w-8 rounded-lg bg-primary text-primary-foreground font-display font-bold text-sm flex items-center justify-center">
                              0{step.stepNumber}
                            </span>
                            <h4 className="font-display text-base font-bold text-foreground">
                              {step.title}
                            </h4>
                          </div>
                          <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed pl-11">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );

          case "features-list":
            return (
              <div key={section.id} className="my-10 space-y-6">
                {section.title && (
                  <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-primary">
                    {section.title}
                  </h2>
                )}

                {section.features && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {section.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3.5 p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/80 shadow-sm"
                      >
                        <div className="h-9 w-9 shrink-0 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                          <CheckCircle className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-emerald-950">
                            {feat.title}
                          </h4>
                          <p className="text-xs text-emerald-850 mt-0.5 leading-relaxed">
                            {feat.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );

          case "trust-reviews":
            return (
              <PoolTrustReviews
                key={section.id}
                title={section.title}
                data={googleReviews}
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
