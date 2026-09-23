import * as React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
import {
  getServiceDetailBySlugAsync,
  getAllServiceSlugsAsync,
} from "@/data/services-data";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugsAsync();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceDetailBySlugAsync(slug);

  if (!service) {
    return {
      title: "Service Not Found | Poolscape",
      description: "The requested service page could not be found.",
    };
  }

  return {
    title: `${service?.seo?.metaTitle || service?.title} | Four Seasons Landscaping Dubai`,
    description: service?.seo?.metaDescription || "",
    keywords: service?.seo?.keywords || [],
    openGraph: {
      title: service?.seo?.metaTitle || service?.title,
      description: service?.seo?.metaDescription || "",
      images: [{ url: service?.heroImage || service?.featuredImage || "" }],
    },
  };
}

// Media Assets from reference site
const OVERFLOW_GALLERY_1 = [
  {
    url: "https://poolsgardensuae.com/wp-content/uploads/2026/07/IMG_0244-scaled.jpg",
    alt: "Overflow Pool Luxury Villa Dubai",
  },
  {
    url: "https://poolsgardensuae.com/wp-content/uploads/2026/07/IMG_1561-scaled.jpg",
    alt: "Modern Overflow Swimming Pool",
  },
  {
    url: "https://poolsgardensuae.com/wp-content/uploads/2026/07/IMG_2259-scaled.jpg",
    alt: "Custom Villa Swimming Pool Dubai",
  },
  {
    url: "https://poolsgardensuae.com/wp-content/uploads/2026/07/IMG_20251226_1916522_Original-scaled.jpg",
    alt: "Night LED Overflow Pool Lighting",
  },
  {
    url: "https://poolsgardensuae.com/wp-content/uploads/2024/06/Overflow-Swimming-Pool-Construction-in-Dubai-3.jpg",
    alt: "Overflow Swimming Pool Construction in Dubai",
  },
  {
    url: "https://poolsgardensuae.com/wp-content/uploads/2024/06/Overflow-Swimming-Pool-Construction-in-Dubai-4.jpg",
    alt: "Geometric Luxury Swimming Pool Design",
  },
  {
    url: "https://poolsgardensuae.com/wp-content/uploads/2024/06/Overflow-Swimming-Pool-Construction-in-Dubai-5.jpg",
    alt: "Sunken Seating and Pool Deck Construction",
  },
  {
    url: "https://poolsgardensuae.com/wp-content/uploads/2024/06/Overflow-Swimming-Pool-Construction-in-Dubai-6.jpg",
    alt: "Premium Spanish Tile Overflow Pool",
  },
];

const RECENT_WORK_GALLERY = [
  {
    url: "https://poolsgardensuae.com/wp-content/uploads/2024/06/swimming-pool-construction-scaled.webp",
    alt: "Completed Villa Pool with Sunken Lounge",
  },
  {
    url: "https://poolsgardensuae.com/wp-content/uploads/2024/06/swimming-pool-construction-2-scaled.webp",
    alt: "Custom Overflow Swimming Pool Construction",
  },
  {
    url: "https://poolsgardensuae.com/wp-content/uploads/2024/06/swimming-pool-construction-3.webp",
    alt: "Modern Pool and Landscape Design Dubai",
  },
  {
    url: "https://poolsgardensuae.com/wp-content/uploads/2024/06/swimming-pool-construction-4-scaled.webp",
    alt: "Luxury Swimming Pool with Natural Stone Deck",
  },
  {
    url: "https://poolsgardensuae.com/wp-content/uploads/2024/06/swimming-pool-construction-5-scaled.webp",
    alt: "Turnkey Pool Project Arabian Ranches",
  },
  {
    url: "https://poolsgardensuae.com/wp-content/uploads/2024/06/swimming-pool-construction-6.webp",
    alt: "Resort Style Overflow Pool Installation",
  },
  {
    url: "https://poolsgardensuae.com/wp-content/uploads/2024/06/swimming-pool-construction-7.webp",
    alt: "Pergola and Pool Integration",
  },
  {
    url: "https://poolsgardensuae.com/wp-content/uploads/2024/06/swimming-pool-construction-8.webp",
    alt: "Bespoke Overflow Water Feature Pool",
  },
  {
    url: "https://poolsgardensuae.com/wp-content/uploads/2024/06/swimming-pool-construction-9-scaled.webp",
    alt: "Private Villa Backyard Pool Dubai Hills",
  },
  {
    url: "https://poolsgardensuae.com/wp-content/uploads/2024/06/swimming-pool-construction-10.webp",
    alt: "Architectural Pool and Garden Makeover",
  },
  {
    url: "https://poolsgardensuae.com/wp-content/uploads/2024/06/swimming-pool-construction-11-scaled.webp",
    alt: "Luxury Outdoor Living and Overflow Pool",
  },
];

const CONSTRUCTION_VIDEOS = [
  {
    src: "https://poolsgardensuae.com/wp-content/uploads/2024/06/Swimming-Pool-Construction-Services-in-Dubai.mp4",
    title: "Swimming Pool Construction Services in Dubai",
  },
  {
    src: "https://poolsgardensuae.com/wp-content/uploads/2024/06/Swimming-Pool-Construction-Services-in-Dubai1.mp4",
    title: "Completed Overflow Pool Project Dubai",
  },
];

const ADVANTAGES_POINTS = [
  {
    title: "Aesthetic Appeal:",
    text: "The uninterrupted water flow creates a visually striking effect, seamlessly blending with the landscape and often giving the illusion of merging with the horizon.",
  },
  {
    title: "Functional Design:",
    text: "The overflow system maintains the pool water at the optimal level automatically, reducing the need for manual water additions.",
  },
  {
    title: "Soothing Atmosphere:",
    text: "The gentle sound of water cascading over the edge provides a tranquil and calming environment, enhancing the ambiance of your outdoor space.",
  },
  {
    title: "Ease of Maintenance:",
    text: "The design directs debris into the catch basin, simplifying cleaning and upkeep.",
  },
  {
    title: "Property Value Enhancement:",
    text: "Installing an overflow swimming pool can significantly boost the aesthetic appeal and market value of your property.",
  },
];

const WHY_CHOOSE_US_POINTS = [
  {
    title: "Experienced Professionals:",
    text: "Our team comprises seasoned and creative professionals who bring each client’s vision to life.",
  },
  {
    title: "Customer-Centric Approach:",
    text: "We closely collaborate with clients, actively listening to their preferences to meet all their requirements.",
  },
  {
    title: "Comprehensive Services:",
    text: "From design and installation to ongoing maintenance, we offer a full suite of pool services.",
  },
  {
    title: "Quality Craftsmanship:",
    text: "Using premium materials and innovative methods, we ensure durable, stunning pools.",
  },
  {
    title: "Competitive Pricing:",
    text: "We provide high-quality services at competitive rates, offering the best value for your investment.",
  },
];

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getServiceDetailBySlugAsync(slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background font-sans">
      {/* 1. Header Hero Banner */}
      <ServiceDetailHero
        title="Searching For The Premier Overflow Swimming Pool Contractor In Dubai!"
        subtitle="Home » Overflow Swimming Pool Construction Dubai, UAE"
        heroImage="https://poolsgardensuae.com/wp-content/uploads/2024/06/swimming-pool-construction-8.webp"
      />

      {/* 2. Main Content Split Layout */}
      <Container className="py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Left Column */}
          <div className="lg:col-span-8 space-y-8 lg:space-y-10">
            {/* Section 1: Intro */}
            <TextSection
              mainHeader="If So, Look No Further!"
              subHeader="Designing, Building, and Maintaining Luxurious Overflow Swimming Pools in Dubai"
              description="Looking for a company that specializes in installing overflow swimming pools in Dubai? Four Season Pool & Gardens Landscaping LLC stands as Dubai’s most trusted name in overflow swimming pool construction. We have a rich history of creating the best swimming pools perfectly according to the needs of our clients in Dubai and beyond. Our services extend to both residential and commercial projects, ensuring excellence in every project."
            />

            {/* Section 2: Photo Gallery 1 */}
            <ImageGallerySection images={OVERFLOW_GALLERY_1} columns={3} />

            {/* Section 3: Why Opt */}
            <TextSection
              mainHeader="Why Opt for Overflow Swimming Pools in Dubai?"
              description="Overflow or infinity pools embody the ultimate in overflow pool design, offering a luxurious escape that blends seamlessly with the horizon. These pools create a visual effect of water with no boundaries, flowing over the edges into a discreetly hidden catch basin, only to be recirculated back into the pool. Ideal for the Dubai landscape, overflow pools transform any setting into a stunning oasis of serenity and beauty."
            />

            {/* Section 4: Callout Banner */}
            <CtaBannerSection
              title="Looking for Swimming Pool Contractors in Dubai?"
              phoneText="Call us today at"
              phoneNumber="+971 551889002"
            />

            {/* Section 5: Advantages */}
            <TextSection
              mainHeader="Advantages of Choosing Overflow Swimming Pools:"
              bulletPoints={ADVANTAGES_POINTS}
            />

            {/* Section 6: Construction Videos */}
            <VideoSection videos={CONSTRUCTION_VIDEOS} />

            {/* Section 7: Leading The Way */}
            <TextSection
              mainHeader="Leading the Way as Your Overflow Swimming Pool Contractor in Dubai"
              description={[
                "As the top overflow swimming pool contractor in Dubai, our goal is to turn your dream pool into a reality. If you’re looking for the top swimming pool company in Dubai to manage your pool project, look no further. Initiate your inquiry with us today, and we’re eager to assist. Renowned among swimming pool companies in Dubai, we’ve earned our reputation through consistent dedication to quality and customer satisfaction.",
                "For over a decade, we’ve been crafting swimming pools in diverse designs and sizes throughout Dubai and the UAE. Our dynamic team of youthful, skilled professionals uses modern technology and tools, setting industry benchmarks in swimming pool construction. Apart from that, you can reach out to us whether you’re looking for a skimmer swimming pool or water features.",
              ]}
            />

            {/* Section 8: Recent Work Gallery 2 */}
            <ImageGallerySection
              title="Get Inspired By Our Recent Work"
              images={RECENT_WORK_GALLERY}
              columns={4}
            />

            {/* Section 9: Understanding Overflow */}
            <TextSection
              mainHeader="Understanding Overflow Swimming Pools and Their Distinctiveness"
              description="An overflow swimming pool, often referred to as a vanishing edge or infinity pool, is characterized by one or more edges that blend seamlessly with the surroundings, offering an 'infinity' view. These pools incorporate a cleverly concealed trough at the edge to collect overflowing water, directing it into a catch basin or surge tank. This design maintains a constant water level and flow back into the pool, preserving its iconic look. Overflow swimming pools are favored by luxury property owners and commercial venues for their stunning visual connection with the landscape and practical water management features."
            />

            {/* Section 10: Expert Installation */}
            <TextSection
              mainHeader="Expert Overflow Swimming Pool Installation Services"
              description={[
                "We mention it as a humble boast that we’re the premier overflow Swimming pool installation company in Dubai. We prioritize our clients' visions, crafting pools that perfectly match their imagination. Our focus extends beyond landscaping to specialize in the installation and design of overflow swimming pools. A well-designed and installed pool not only enhances the beauty of your property but also significantly increases its value.",
                "Four Season Pool & Gardens Landscaping LLC has been a leading force in Dubai's swimming pool industry for over a decade. Our expertise in designing, installing, and maintaining swimming pools has made us the trusted choice for hundreds of homeowners and businesses across the UAE.",
              ]}
            />

            {/* Section 11: Google Reviews */}
            <GoogleReviewsSection />

            {/* Section 12: Why Choose Us */}
            <div className="space-y-6">
              <TextSection
                mainHeader="Why Choose Us for Your Overflow Swimming Pool Construction in Dubai?"
                description="Here are some of the top reasons you should choose us for overflow swimming pool construction:"
                bulletPoints={WHY_CHOOSE_US_POINTS}
              />

              <TextSection
                mainHeader="Innovative Design and Customization"
                description="Every client has unique tastes, and every property has distinct features. That’s why we offer tailored solutions to meet your needs. Whether you desire a sleek, modern pool that blends with Dubai’s skyline or a lush, tropical oasis that turns your backyard into a peaceful retreat, our team can create it. We offer endless customization options, from size and shape to materials, lighting, and water features."
              />

              <TextSection
                mainHeader="Eco-Friendly Pool Solutions"
                description="We believe in sustainable practices that minimize environmental impact. We offer energy-efficient pumps, solar heating systems, and eco-friendly pool chemicals to reduce your carbon footprint and save on energy costs. Our team can help you choose the best green solutions for your pool."
              />

              <TextSection
                mainHeader="Aftercare and Maintenance"
                description="A swimming pool requires continuous care to maintain its pristine look. We offer comprehensive aftercare and maintenance services to ensure your pool remains in optimal condition. From regular cleaning and chemical balancing to equipment repairs, our team ensures your pool remains clean, safe, and ready for use."
              />
            </div>
          </div>

          {/* Right Column: Sticky Quick Consultation Form */}
          <div className="lg:col-span-4 w-full lg:sticky lg:top-24 h-fit">
            <ServiceSidebarForm currentServiceTitle="Overflow Swimming Pool Construction" />
          </div>
        </div>

        {/* 3. Full-Width Bottom Sections */}
        <div className="mt-14 space-y-12 border-t border-gray-200/80 pt-10">
          {/* How To Find Us with Google Map */}
          <ContactMapSection />

          {/* Drop Us A Line Bottom Form */}
          <BottomInquirySection />
        </div>
      </Container>
    </main>
  );
}
