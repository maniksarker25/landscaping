import type { Metadata } from "next";
import Link from "next/link";
import { Layers, ArrowRight } from "lucide-react";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/common/container";
import { ServiceCard } from "@/components/cards/service-card";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Button } from "@/components/ui/button";
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
  const hasServices = servicesList && servicesList.length > 0;

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

      <section className="py-16 sm:py-24">
        <Container>
          {hasServices ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {servicesList.map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-lg rounded-2xl border border-border/80 bg-card p-8 sm:p-12 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Layers className="h-8 w-8" aria-hidden="true" />
              </div>
              <h3 className="mt-6 font-display text-xl sm:text-2xl font-bold text-foreground">
                No Services Available
              </h3>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
                We currently do not have any services listed. Please check back soon or contact our team directly for custom inquiries.
              </p>
              <div className="mt-8 flex items-center justify-center gap-4">
                <Button asChild size="lg" className="bg-primary text-primary-foreground font-bold">
                  <Link href="/contact" className="flex items-center gap-2">
                    Contact Us
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
