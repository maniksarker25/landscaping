import * as React from "react";
import { Container } from "@/components/common/container";
import { ServiceDetailHero } from "@/components/services/service-detail-hero";
import { ServiceSidebarForm } from "@/components/services/service-sidebar-form";
import TextSection from "@/components/sections/textSection";
import ImageGallerySection from "@/components/sections/image-gallery-section";
import VideoSection from "@/components/sections/video-section";
import CtaBannerSection from "@/components/sections/cta-banner-section";
import GoogleReviewsSection from "@/components/sections/google-reviews-section";
import ContactMapSection from "@/components/sections/contact-map-section";
import BottomInquirySection from "@/components/sections/bottom-inquiry-section";
import PoolTypesSection from "@/components/sections/pool-types-section";
import type {
  PoolStaticDetail,
  PoolTypeItem,
  GalleryImage,
  VideoItem,
  PoolTextSection,
  CtaBannerData,
} from "@/data/pools-static-data";

export interface PoolStaticDetailViewProps {
  /** The full pool static data object (optional if passing section props directly) */
  data?: Partial<PoolStaticDetail>;

  /** Optional custom data overrides for individual sections */
  hero?: {
    title?: string;
    subtitle?: string;
    heroImage?: string;
    badge?: string;
  };
  intro?: {
    mainHeader?: string;
    subHeader?: string;
    description?: string[] | string;
  };
  poolTypes?: PoolTypeItem[];
  gallery1?: GalleryImage[];
  videos?: VideoItem[];
  recentWorkGallery?: GalleryImage[];
  sections?: PoolTextSection[];
  ctaBanner?: CtaBannerData;
  sidebarServiceTitle?: string;

  /** Optional section visibility controls */
  showHero?: boolean;
  showIntro?: boolean;
  showGallery1?: boolean;
  showPoolTypes?: boolean;
  showCtaBanner?: boolean;
  showVideos?: boolean;
  showRecentWork?: boolean;
  showSections?: boolean;
  showReviews?: boolean;
  showSidebarForm?: boolean;
  showBottomMap?: boolean;
  showBottomInquiry?: boolean;
}

export function PoolStaticDetailView({
  data,
  hero,
  intro,
  poolTypes,
  gallery1,
  videos,
  recentWorkGallery,
  sections,
  ctaBanner,
  sidebarServiceTitle,
  showHero = true,
  showIntro = true,
  showGallery1 = true,
  showPoolTypes = true,
  showCtaBanner = true,
  showVideos = true,
  showRecentWork = true,
  showSections = true,
  showReviews = true,
  showSidebarForm = true,
  showBottomMap = true,
  showBottomInquiry = true,
}: PoolStaticDetailViewProps) {
  // Resolve data with optional direct props drilling overrides
  const heroTitle = hero?.title || data?.heroTitle || data?.title;
  const heroSubtitle = hero?.subtitle || data?.heroSubtitle;
  const heroImage = hero?.heroImage || data?.heroImage;
  const heroBadge = hero?.badge;

  const effectiveIntro = intro || data?.intro;
  const effectivePoolTypes = poolTypes || data?.poolTypes;
  const effectiveGallery1 = gallery1 || data?.gallery1;
  const effectiveVideos = videos || data?.videos;
  const effectiveRecentWork = recentWorkGallery || data?.recentWorkGallery;
  const effectiveSections = sections || data?.sections || [];
  const effectiveCtaBanner = ctaBanner || data?.ctaBanner;
  const effectiveSidebarTitle =
    sidebarServiceTitle ||
    data?.sidebarServiceTitle ||
    data?.title ||
    "Swimming Pool Construction";

  return (
    <main className="min-h-screen bg-background font-sans">
      {/* 1. Header Hero Banner */}
      {showHero && heroTitle && (
        <ServiceDetailHero
          title={heroTitle}
          subtitle={heroSubtitle}
          heroImage={heroImage}
          badge={heroBadge}
        />
      )}

      {/* 2. Main Content Split Layout */}
      <Container className="py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Left Column */}
          <div className="lg:col-span-8 space-y-8 lg:space-y-10">
            {/* Section 1: Intro Text */}
            {showIntro && effectiveIntro && (
              <TextSection
                mainHeader={effectiveIntro.mainHeader}
                subHeader={effectiveIntro.subHeader}
                description={effectiveIntro.description}
              />
            )}

            {/* Section 2: Primary Gallery */}
            {showGallery1 && effectiveGallery1 && effectiveGallery1.length > 0 && (
              <ImageGallerySection
                images={effectiveGallery1}
                columns={effectiveGallery1.length >= 6 ? 3 : 2}
              />
            )}

            {/* Section 3: Pool Types Grid */}
            {showPoolTypes &&
              effectivePoolTypes &&
              effectivePoolTypes.length > 0 && (
                <PoolTypesSection
                  title="Types of Pool Construction in Dubai"
                  items={effectivePoolTypes}
                />
              )}

            {/* Section 4: First Group of Content Sections */}
            {showSections &&
              effectiveSections.length > 0 &&
              effectiveSections.slice(0, 2).map((sec, idx) => (
                <TextSection
                  key={`sec-top-${idx}`}
                  mainHeader={sec.mainHeader}
                  subHeader={sec.subHeader}
                  description={sec.paragraphs}
                  bulletPoints={sec.bulletPoints}
                />
              ))}

            {/* Section 5: CTA Banner */}
            {showCtaBanner && effectiveCtaBanner && (
              <CtaBannerSection
                title={effectiveCtaBanner.title}
                phoneText={effectiveCtaBanner.phoneText}
                phoneNumber={effectiveCtaBanner.phoneNumber}
              />
            )}

            {/* Section 6: Video Showcase */}
            {showVideos && effectiveVideos && effectiveVideos.length > 0 && (
              <VideoSection videos={effectiveVideos} />
            )}

            {/* Section 7: Middle Group of Content Sections */}
            {showSections &&
              effectiveSections.length > 2 &&
              effectiveSections.slice(2, 4).map((sec, idx) => (
                <TextSection
                  key={`sec-mid-${idx}`}
                  mainHeader={sec.mainHeader}
                  subHeader={sec.subHeader}
                  description={sec.paragraphs}
                  bulletPoints={sec.bulletPoints}
                />
              ))}

            {/* Section 8: Recent Work Gallery */}
            {showRecentWork &&
              effectiveRecentWork &&
              effectiveRecentWork.length > 0 && (
                <ImageGallerySection
                  title="Get Inspired By Our Recent Work"
                  images={effectiveRecentWork}
                  columns={4}
                />
              )}

            {/* Section 9: Remaining In-Depth Article Sections */}
            {showSections &&
              effectiveSections.length > 4 &&
              effectiveSections.slice(4).map((sec, idx) => (
                <TextSection
                  key={`sec-bot-${idx}`}
                  mainHeader={sec.mainHeader}
                  subHeader={sec.subHeader}
                  description={sec.paragraphs}
                  bulletPoints={sec.bulletPoints}
                />
              ))}

            {/* Section 10: Google Reviews */}
            {showReviews && <GoogleReviewsSection />}
          </div>

          {/* Right Column: Sticky Quick Consultation Form */}
          {showSidebarForm && (
            <div className="lg:col-span-4 w-full lg:sticky lg:top-24 h-fit">
              <ServiceSidebarForm
                currentServiceTitle={effectiveSidebarTitle}
              />
            </div>
          )}
        </div>

        {/* 3. Full-Width Bottom Sections */}
        {(showBottomMap || showBottomInquiry) && (
          <div className="mt-14 space-y-12 border-t border-gray-200/80 pt-10">
            {showBottomMap && <ContactMapSection />}
            {showBottomInquiry && <BottomInquirySection />}
          </div>
        )}
      </Container>
    </main>
  );
}

export default PoolStaticDetailView;
