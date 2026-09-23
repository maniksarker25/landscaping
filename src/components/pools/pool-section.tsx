"use client";

import React from "react";
import PoolTypesSection, {
  type PoolTypeItem,
} from "@/components/sections/pool-types-section";
import ImageGallerySection, {
  type GalleryImage,
} from "@/components/sections/image-gallery-section";
import VideoSection, {
  type VideoItem,
} from "@/components/sections/video-section";
import CtaBannerSection from "@/components/sections/cta-banner-section";
import TextSection, {
  type BulletPoint,
} from "@/components/sections/textSection";
import GoogleReviewsSection from "@/components/sections/google-reviews-section";
import ContactMapSection from "@/components/sections/contact-map-section";
import BottomInquirySection from "@/components/sections/bottom-inquiry-section";
import { ServiceSidebarForm } from "@/components/services/service-sidebar-form";
import { ServiceDetailHero } from "@/components/services/service-detail-hero";

export type PoolSectionType =
  | "pool-types"
  | "types"
  | "gallery"
  | "video"
  | "videos"
  | "cta"
  | "text"
  | "hero"
  | "reviews"
  | "sidebar-form"
  | "map"
  | "inquiry";

export interface PoolSectionProps {
  /** The section to render */
  type: PoolSectionType;

  /**
   * The data to pass to the section.
   * Accepts arrays or objects matching the section's expected data shape.
   */
  data?: any;

  /** Optional heading or title override */
  title?: string;

  /** Optional subtitle override */
  subtitle?: string;

  /** Optional description override */
  description?: string | string[] | React.ReactNode;

  /** Optional bullet points for text sections */
  bulletPoints?: (BulletPoint | string)[];

  /** Optional column count for gallery (2, 3, or 4) */
  columns?: 2 | 3 | 4;

  /** Custom extra styling */
  className?: string;

  /** Header color class (e.g. text-[#729d00]) */
  headerColor?: string;

  /** Service title for sidebar form / inquiry */
  serviceTitle?: string;

  /** Hero image URL */
  heroImage?: string;

  /** Hero badge */
  badge?: string;
}

/**
 * Universal pool section component: pass the `type` and `data` (via props drilling)
 * to render any section whenever and wherever you want!
 *
 * Examples:
 * ```tsx
 * <PoolSection type="pool-types" data={poolTypes} />
 * <PoolSection type="gallery" data={galleryImages} title="Our Projects" columns={3} />
 * <PoolSection type="text" data={textSectionData} />
 * <PoolSection type="video" data={videoList} />
 * <PoolSection type="cta" data={ctaData} />
 * <PoolSection type="sidebar-form" serviceTitle="Skimmer Pool" />
 * <PoolSection type="reviews" />
 * ```
 */
export function PoolSection({
  type,
  data,
  title,
  subtitle,
  description,
  bulletPoints,
  columns,
  className,
  headerColor,
  serviceTitle,
  heroImage,
  badge,
}: PoolSectionProps) {
  switch (type) {
    case "pool-types":
    case "types": {
      const items: PoolTypeItem[] = Array.isArray(data)
        ? data
        : data?.items || [];
      return (
        <PoolTypesSection
          items={items}
          title={title || data?.title}
          subTitle={subtitle || data?.subTitle}
          description={description || data?.description}
          headerColor={headerColor}
          className={className}
        />
      );
    }

    case "gallery": {
      const images: (GalleryImage | string)[] = Array.isArray(data)
        ? data
        : data?.images || [];
      return (
        <ImageGallerySection
          images={images}
          title={title || data?.title}
          columns={columns || data?.columns || 3}
          className={className}
        />
      );
    }

    case "video":
    case "videos": {
      const videos: (VideoItem | string)[] = Array.isArray(data)
        ? data
        : data?.videos || [];
      return (
        <VideoSection
          videos={videos}
          title={title || data?.title}
          className={className}
        />
      );
    }

    case "cta": {
      return (
        <CtaBannerSection
          title={title || data?.title}
          subtitle={subtitle || data?.subtitle}
          phoneText={data?.phoneText}
          phoneNumber={data?.phoneNumber}
          className={className}
        />
      );
    }

    case "text": {
      const mainHeader = title || data?.mainHeader;
      const subHeader = subtitle || data?.subHeader;
      const desc = description || data?.paragraphs || data?.description;
      const bullets = bulletPoints || data?.bulletPoints;

      return (
        <TextSection
          mainHeader={mainHeader}
          subHeader={subHeader}
          description={desc}
          bulletPoints={bullets}
          headerColor={headerColor}
          className={className}
        />
      );
    }

    case "hero": {
      const heroTitle = title || data?.heroTitle || data?.title;
      const heroSub = subtitle || data?.heroSubtitle || data?.subtitle;
      const heroImg = heroImage || data?.heroImage || data?.image;
      const heroBadge = badge || data?.badge;

      if (!heroTitle) return null;

      return (
        <ServiceDetailHero
          title={heroTitle}
          subtitle={heroSub}
          heroImage={heroImg}
          badge={heroBadge}
        />
      );
    }

    case "reviews":
      return <GoogleReviewsSection />;

    case "sidebar-form":
      return (
        <ServiceSidebarForm
          currentServiceTitle={
            serviceTitle ||
            data?.sidebarServiceTitle ||
            data?.title ||
            "Swimming Pool Construction"
          }
        />
      );

    case "map":
      return <ContactMapSection />;

    case "inquiry":
      return (
        <BottomInquirySection
          title={title || data?.title}
          subtitle={subtitle || data?.subtitle}
          imageSrc={data?.imageSrc || heroImage}
          className={className}
        />
      );

    default:
      return null;
  }
}

export default PoolSection;
