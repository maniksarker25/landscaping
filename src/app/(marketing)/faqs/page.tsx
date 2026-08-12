import type { Metadata } from "next";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { PageHero } from "@/components/sections/page-hero";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaBanner } from "@/components/sections/cta-banner";
import { buildMetadata, buildBreadcrumbJsonLd } from "@/lib/seo";
import { getFaqsAsync } from "@/data/faqs";

export const metadata: Metadata = buildMetadata({
  title: "FAQs",
  description:
    "Answers to common questions about pool construction, landscaping, pricing, and maintenance.",
  path: "/faqs",
});

export default async function FaqsPage() {
  const faqList = await getFaqsAsync();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqList.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "FAQs", path: "/faqs" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Breadcrumb
        items={[
          { name: "Home", href: "/" },
          { name: "FAQs", href: "/faqs" },
        ]}
      />
      <PageHero
        eyebrow="FAQs"
        title="Questions we hear often"
        description="Can't find what you're looking for? Reach out and we'll answer directly."
      />
      <FaqSection showTitle={false} initialFaqs={faqList} />
      <CtaBanner />
    </>
  );
}
