import type { LucideIcon } from "lucide-react";

export type PoolSectionType =
  | "rich-text"
  | "gallery-6grid"
  | "side-by-side-images"
  | "cta-callout"
  | "process-timeline"
  | "features-list"
  | "trust-reviews";

export interface PoolGalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface PoolFeatureItem {
  title: string;
  description: string;
  iconName?: string;
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

export interface PoolDetailSection {
  id: string;
  type: PoolSectionType;
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

export interface PoolDetailData {
  slug: string;
  aliases?: string[];
  title: string;
  subtitle: string;
  heroImage: string;
  badge?: string;
  description: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
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
