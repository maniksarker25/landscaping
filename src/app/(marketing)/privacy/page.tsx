import type { Metadata } from "next";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/common/container";
import { CtaBanner } from "@/components/sections/cta-banner";
import { buildMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";
import { fetchPrivacyPolicyData } from "@/lib/api/privacy-policy";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "Learn how Poolscape & Sari Landscaping collects, uses, and protects your personal information in accordance with UAE data protection standards.",
  path: "/privacy",
});

export default async function PrivacyPolicyPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Privacy Policy", path: "/privacy" },
  ]);

  const contentHtml = await fetchPrivacyPolicyData();

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
          { name: "Privacy Policy", href: "/privacy" },
        ]}
      />
      <PageHero
        eyebrow="Legal Notice"
        title="Privacy Policy"
        description="We are committed to protecting your privacy and handling your data with transparency and care."
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
