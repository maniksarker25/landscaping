import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/common/container";
import { SectionTitle } from "@/components/common/section-title";
import { ServiceCard } from "@/components/cards/service-card";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";

export function ServicesOverview() {
  return (
    <section className="py-12 sm:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionTitle
            eyebrow="What We Do"
            title="Full-scope outdoor construction, under one studio"
            description="From first excavation to final planting, every discipline sits in-house so nothing gets lost between contractors."
          />
          <Button asChild variant="outline" className="hidden sm:inline-flex">
            <Link href="/services">
              All Services <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>

        <Button asChild variant="outline" className="mt-10 w-full sm:hidden">
          <Link href="/services">
            All Services <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </Container>
    </section>
  );
}
