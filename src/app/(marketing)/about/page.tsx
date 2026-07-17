import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/common/container";
import { SectionTitle } from "@/components/common/section-title";
import { Process } from "@/components/sections/process";
import { CtaBanner } from "@/components/sections/cta-banner";
import { buildMetadata } from "@/lib/seo";
import { stats } from "@/data/stats";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "A UAE-based pool construction and landscape design studio building outdoor spaces engineered for this climate.",
  path: "/about",
});

const values = [
  {
    title: "Design led by engineering",
    body: "Every concept is checked against structural and drainage realities before it's ever presented to a client.",
  },
  {
    title: "One team, start to finish",
    body: "Pool builders, landscapers, and electricians work from the same plan under one project manager.",
  },
  {
    title: "Built for this climate",
    body: "Material and planting choices are made for how they'll hold up under sun and heat, not a showroom photo.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "About", href: "/about" }]} />
      <PageHero
        eyebrow="About Us"
        title="A studio built around getting the unglamorous parts right"
        description="We started as a small pool contracting crew in 2012 and grew into a full outdoor design-build studio because clients kept asking us to handle the garden too."
      />

      <section className="py-20 sm:py-24">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
            <Image
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop"
              alt="Studio team reviewing a landscape plan on site"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <SectionTitle
              eyebrow="Our Story"
              title="Fourteen years of pools and gardens across the Emirates"
              description="What began as a pool-only contracting business expanded naturally into landscaping, lighting, and outdoor living — because clients wanted one team accountable for the whole yard, not three separate contractors handing off half-finished work to each other."
            />
            <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.id}>
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                    {stat.label}
                  </dt>
                  <dd className="mt-1 font-display text-2xl text-primary">
                    {stat.value}
                    {stat.suffix}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <section className="bg-muted/50 py-20 sm:py-24">
        <Container>
          <SectionTitle
            eyebrow="What We Believe"
            title="Principles that shape every project"
            align="center"
            className="mx-auto"
          />
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {values.map((value, index) => (
              <div key={value.title} className="rounded-lg border border-border bg-card p-8">
                <span className="font-display text-3xl text-accent/50">
                  0{index + 1}
                </span>
                <h3 className="mt-4 font-display text-lg">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Process />
      <CtaBanner />
    </>
  );
}
