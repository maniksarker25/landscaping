import type { Metadata } from "next";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/common/container";
import { BlogCard } from "@/components/cards/blog-card";
import { CtaBanner } from "@/components/sections/cta-banner";
import { buildMetadata } from "@/lib/seo";
import { blogPosts } from "@/data/blog";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description: "Notes on pool finishes, climate-adapted planting, and outdoor lighting design.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Blog", href: "/blog" }]} />
      <PageHero
        eyebrow="Blog"
        title="Notes from the studio"
        description="Practical write-ups on the decisions behind pool finishes, planting, and lighting design."
      />

      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
