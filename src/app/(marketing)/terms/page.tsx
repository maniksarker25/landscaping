import type { Metadata } from "next";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/common/container";
import { CtaBanner } from "@/components/sections/cta-banner";
import { buildMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";
import { fetchTermsConditionsData } from "@/lib/api/terms-conditions";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description:
    "Terms and conditions governing pool construction, landscape architectural design, and maintenance services provided by Poolscape & Sari Landscaping.",
  path: "/terms",
});

export default async function TermsOfServicePage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Terms of Service", path: "/terms" },
  ]);

  const contentHtml = await fetchTermsConditionsData();
  console.log(contentHtml);
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Breadcrumb
        items={[
          { name: "Home", href: "/" },
          { name: "Terms of Service", href: "/terms" },
        ]}
      />
      <PageHero
        eyebrow="Legal Terms"
        title="Terms of Service"
        description="Please read these terms and conditions carefully before engaging our construction and landscaping services."
      />
      <section className="py-12 sm:py-16">
        <Container>
          <article
            className="prose-legal mx-auto max-w-4xl rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-10"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </Container>
      </section>
      <CtaBanner />
    </>
  );
}
