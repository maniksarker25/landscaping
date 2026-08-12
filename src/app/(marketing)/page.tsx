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
import { getTestimonialsAsync } from "@/data/testimonials";
import { getFaqsAsync } from "@/data/faqs";

export const metadata: Metadata = buildMetadata({
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  path: "/",
});

export default async function HomePage() {
  const [initialTestimonials, initialFaqs] = await Promise.all([
    getTestimonialsAsync(),
    getFaqsAsync(),
  ]);

  return (
    <>
      <Hero />
      <div className="block md:hidden">
        <Gallery />
      </div>
      <AboutIntro />
      <div className="hidden md:block">
        <Gallery />
      </div>
      <ServicesOverview />
      <WhyChooseUs />
      <Process />
      <Testimonials initialTestimonials={initialTestimonials} />
      <FaqSection limit={5} initialFaqs={initialFaqs} />
      <LocationMap />
    </>
  );
}
