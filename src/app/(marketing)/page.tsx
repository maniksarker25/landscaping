import { Hero } from "@/components/sections/hero";
import { OurServicesSection } from "@/components/sections/our-services-section";
import { AboutIntro } from "@/components/sections/about-intro";
import { LocationMap } from "@/components/sections/location-map";
import { Testimonials } from "@/components/sections/testimonials";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Gallery from "./projects/page";
import { getTestimonialsAsync } from "@/data/testimonials";
import TrustedBySection from "@/components/sections/trustedBySection";

export const metadata: Metadata = buildMetadata({
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  path: "/",
});

export default async function HomePage() {
  const initialTestimonials = await getTestimonialsAsync();

  return (
    <>
      <Hero />
      <AboutIntro />
      <OurServicesSection />
      <Gallery />
      {/* <ServicesOverview /> */}
      {/* <WhyChooseUs /> */}
      <TrustedBySection />
      {/* <Process /> */}
      <Testimonials initialTestimonials={initialTestimonials} />
      <LocationMap />
    </>
  );
}
