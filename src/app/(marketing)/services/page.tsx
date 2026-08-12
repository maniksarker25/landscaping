import type { Metadata } from "next";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/common/container";
import { ServiceCard } from "@/components/cards/service-card";
import { CtaBanner } from "@/components/sections/cta-banner";
import { buildMetadata } from "@/lib/seo";
import { getServicesAsync } from "@/data/services";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Custom pool construction, landscape design, outdoor lighting, and full outdoor living builds across the UAE.",
  path: "/services",
});

export default async function ServicesPage() {
  const servicesList = await getServicesAsync();

  return (
    <>
      <Breadcrumb
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ]}
      />
      <PageHero
        eyebrow="Services"
        title="Every discipline your outdoor space needs, in-house"
        description="From structural pool engineering to seasonal garden maintenance, our teams work from a single coordinated plan."
      />

      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {servicesList.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
