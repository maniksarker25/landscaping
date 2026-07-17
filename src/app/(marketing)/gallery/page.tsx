import type { Metadata } from "next";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/common/container";
import { GalleryGrid } from "@/components/sections/gallery-grid";
import { CtaBanner } from "@/components/sections/cta-banner";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Gallery",
  description: "Browse pools, gardens, outdoor living spaces, and lighting from completed projects.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Gallery", href: "/gallery" }]} />
      <PageHero eyebrow="Gallery" title="A closer look at the details" />

      <section className="py-20 sm:py-24">
        <Container>
          <GalleryGrid />
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
