import type { LucideIcon } from "lucide-react";

export type PoolSectionType =
  | "rich-text"
  | "gallery-6grid"
  | "side-by-side-images"
  | "cta-callout"
  | "process-timeline"
  | "features-list"
  | "trust-reviews"
  | "hero_section"
  | "rich_text_jodit"
  | "features_grid"
  | "faq_accordion"
  | "gallery_grid"
  | "cta_banner";

export interface PoolGalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface PoolFeatureItem {
  title: string;
  description: string;
  iconName?: string;
  iconUrl?: string;
}

export interface PoolProcessStep {
  stepNumber: number;
  title: string;
  description: string;
}

export interface PoolCtaConfig {
  headline: string;
  subline?: string;
  phoneNumber: string;
  phoneDisplay: string;
  buttonText?: string;
  buttonHref?: string;
}

export interface PoolBlockHeroContent {
  headline: string;
  subheadline: string;
  bgImage: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface PoolBlockFaqItem {
  question: string;
  answer: string;
}

export interface PoolBlockGalleryItem {
  imageUrl: string;
  caption?: string;
  altText?: string;
}

export interface PoolBlockCtaContent {
  title: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  phoneNumber?: string;
}

export interface PoolBlockContent {
  hero?: PoolBlockHeroContent;
  richTextHtml?: string;
  features?: PoolFeatureItem[];
  accordionItems?: PoolBlockFaqItem[];
  gallery?: PoolBlockGalleryItem[];
  cta?: PoolBlockCtaContent;
}

export interface PoolDetailSection {
  id?: string;
  type?: PoolSectionType;
  blockType?: string;
  order?: number;
  layoutStyle?: string;
  content?: PoolBlockContent;

  // Compatibility fields for legacy section formats
  title?: string;
  subtitle?: string;
  contentHtml?: string;
  images?: PoolGalleryImage[];
  cta?: PoolCtaConfig;
  features?: PoolFeatureItem[];
  processSteps?: PoolProcessStep[];
}

export interface GoogleReviewItem {
  id: string;
  authorName: string;
  authorAvatar?: string;
  timeAgo: string;
  rating: number;
  text: string;
  verified?: boolean;
}

export interface GoogleReviewsData {
  averageRating: number;
  totalReviews: number;
  badgeTitle?: string;
  reviews: GoogleReviewItem[];
}

export interface PoolDetailSeo {
  metaTitle: string;
  metaDescription: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
}

export interface PoolDetailData {
  title: string;
  slug: string;
  category?: string;
  isPublished?: boolean;
  featuredImage?: string;
  heroImage?: string;
  subtitle?: string;
  badge?: string;
  aliases?: string[];
  description?: string;
  seo: PoolDetailSeo;
  sections: PoolDetailSection[];
  googleReviews?: GoogleReviewsData;
}

export interface ConsultationFormValues {
  name: string;
  email: string;
  phone: string;
  poolType: string;
  message?: string;
}
