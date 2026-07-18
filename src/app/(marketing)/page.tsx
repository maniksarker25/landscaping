import { FaqSection } from "@/components/sections/faq-section";
import { Hero } from "@/components/sections/hero";
import { AboutIntro } from "@/components/sections/about-intro";
import { LocationMap } from "@/components/sections/location-map";
import { Process } from "@/components/sections/process";
import { ServicesOverview } from "@/components/sections/services-overview";
import { Testimonials } from "@/components/sections/testimonials";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Gallery from "./projects/page";

export const metadata: Metadata = buildMetadata({
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutIntro />
      <ServicesOverview />
      <WhyChooseUs />
      <Process />
      {/* <FeaturedProjects /> */}
      <Gallery />
      <Testimonials />
      <FaqSection limit={5} />
      <LocationMap />
      {/* <CtaBanner /> */}
    </>
  );
}
