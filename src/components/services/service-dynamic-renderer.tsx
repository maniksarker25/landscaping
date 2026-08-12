"use client";

import * as React from "react";
import type { PoolDetailSection, GoogleReviewsData } from "@/types/service";
import { ServiceRichText } from "./service-rich-text";
import { ServiceGalleryGrid } from "./service-gallery-grid";
import { ServiceCtaBanner } from "./service-cta-banner";
import { ServiceTrustReviews } from "./service-trust-reviews";
import { cn } from "@/lib/utils";
import { ServiceFeaturesGrid } from "./service-features-grid";
import { ServiceFaqAccordion } from "./service-faq-accordion";
import { ServiceDropUsALine } from "./service-drop-us-a-line";
import { defaultGoogleReviews } from "@/data/services-data";

import type { TestimonialItem } from "@/types/testimonial";

interface ServiceDynamicRendererProps {
  sections: PoolDetailSection[];
  googleReviews?: GoogleReviewsData;
  initialTestimonials?: TestimonialItem[];
  className?: string;
}

export function ServiceDynamicRenderer({
  sections,
  googleReviews,
  initialTestimonials,
  className,
}: ServiceDynamicRendererProps) {

  if (!sections || sections.length === 0) return null;

  const reviewsData = googleReviews || defaultGoogleReviews;
  const hasReviews = sections.some(
    (s) => s.blockType === "trust-reviews" || s.type === "trust-reviews",
  );
  const finalSections = hasReviews
    ? sections
    : [
        ...sections,
        {
          id: "trust-reviews-virtual",
          type: "trust-reviews" as const,
          title: "What Our Clients Say About Us",
        },
      ];

  return (
    <div className={cn("space-y-8", className)}>
      {finalSections.map((section, index) => {
        const key = section.id || `section-${index}`;
        const blockKind = section.blockType || section.type;

        switch (blockKind) {
          case "hero_section":
            return null;

          case "rich_text_jodit":
          case "rich-text": {
            const html = section.content?.richTextHtml || section.contentHtml;
            return html ? (
              <ServiceRichText
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
              <ServiceFeaturesGrid
                key={key}
                title={section.title}
                features={feats}
                layoutStyle={section.layoutStyle}
              />
            ) : null;
          }

          case "faq_accordion":
          case "technical_specs": {
            const faqItems = section.content?.accordionItems || [];
            return faqItems.length > 0 ? (
              <ServiceFaqAccordion
                key={key}
                title={
                  section.title ||
                  (blockKind === "technical_specs"
                    ? "Technical Specifications & Phases"
                    : undefined)
                }
                items={faqItems}
              />
            ) : null;
          }

          // case "contact_form":
          //   return (
          //     <ServiceDropUsALine key={key} />
          //   );

          case "gallery_grid":
          case "gallery-6grid":
          case "side-by-side-images": {
            let images = section.images;

            if (!images && section.content?.gallery) {
              images = section.content.gallery.map((g) => ({
                src: g.imageUrl,
                alt: g.altText || g.caption || "Service showcase image",
                caption: g.caption,
              }));
            }

            const variant =
              blockKind === "side-by-side-images" ? "side-by-side" : "grid-6";

            return images && images.length > 0 ? (
              <ServiceGalleryGrid
                key={key}
                title={section.title}
                images={images}
                variant={variant}
                layoutStyle={section.layoutStyle}
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
              <ServiceCtaBanner key={key} cta={ctaConfig} />
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
              <ServiceTrustReviews
                key={key}
                title={section.title}
                data={reviewsData}
                initialTestimonials={initialTestimonials}
              />
            );


          default:
            return null;
        }
      })}
    </div>
  );
}
