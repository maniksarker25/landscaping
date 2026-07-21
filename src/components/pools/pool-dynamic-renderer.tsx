"use client";

import * as React from "react";
import type { PoolDetailSection, GoogleReviewsData } from "@/types/pool-detail";
import { PoolRichText } from "./pool-rich-text";
import { PoolGalleryGrid } from "./pool-gallery-grid";
import { PoolCtaBanner } from "./pool-cta-banner";
import { PoolTrustReviews } from "./pool-trust-reviews";
import { cn } from "@/lib/utils";
import { PoolHeroBlock } from "./pool-hero-block";
import { PoolFeaturesGrid } from "./pool-features-grid";
import { PoolFaqAccordion } from "./pool-faq-accordion";

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
      {sections.map((section, index) => {
        const key = section.id || `section-${index}`;
        const blockKind = section.blockType || section.type;

        switch (blockKind) {
          case "hero_section":
            return section.content?.hero ? (
              <PoolHeroBlock key={key} hero={section.content.hero} />
            ) : null;

          case "rich_text_jodit":
          case "rich-text": {
            const html = section.content?.richTextHtml || section.contentHtml;
            return html ? (
              <PoolRichText
                key={key}
                title={section.title}
                contentHtml={html}
              />
            ) : null;
          }

          case "features_grid":
          case "features-list": {
            const feats = section.content?.features || section.features || [];
            return feats.length > 0 ? (
              <PoolFeaturesGrid
                key={key}
                title={section.title}
                features={feats}
              />
            ) : null;
          }

          case "faq_accordion": {
            const faqItems = section.content?.accordionItems || [];
            return faqItems.length > 0 ? (
              <PoolFaqAccordion
                key={key}
                title={section.title}
                items={faqItems}
              />
            ) : null;
          }

          case "gallery_grid":
          case "gallery-6grid":
          case "side-by-side-images": {
            let images = section.images;

            if (!images && section.content?.gallery) {
              images = section.content.gallery.map((g) => ({
                src: g.imageUrl,
                alt: g.altText || g.caption || "Swimming pool image",
                caption: g.caption,
              }));
            }

            const variant =
              blockKind === "side-by-side-images" ? "side-by-side" : "grid-6";

            return images && images.length > 0 ? (
              <PoolGalleryGrid
                key={key}
                title={section.title}
                images={images}
                variant={variant}
              />
            ) : null;
          }

          case "cta_banner":
          case "cta-callout": {
            let ctaConfig = section.cta;

            if (!ctaConfig && section.content?.cta) {
              const c = section.content.cta;
              ctaConfig = {
                headline: c.title,
                subline: c.description,
                phoneNumber: c.phoneNumber || "+971529990092",
                phoneDisplay: c.phoneNumber || "+971 52 999 0092",
                buttonText: c.buttonText,
                buttonHref: c.buttonLink || "/contact",
              };
            }

            return ctaConfig ? (
              <PoolCtaBanner key={key} cta={ctaConfig} />
            ) : null;
          }

          case "process-timeline":
            return (
              <div key={key} className="my-10 space-y-6">
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

          case "trust-reviews":
            return (
              <PoolTrustReviews
                key={key}
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
