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
    "Dream Floor Landscaping is a trusted provider of landscaping and outdoor living solutions across the UAE.",
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
        eyebrow="Over 14 Years of Experience"
        title="Welcome to Dream Floor Landscaping"
        description="A trusted provider of landscaping and outdoor living solutions across the UAE, specializing in creating beautiful, functional, and well-maintained outdoor spaces."
      />

      <section className="py-16 sm:py-24">
        <Container className="grid items-start gap-14 lg:grid-cols-2">
          <div className="hidden lg:block relative aspect-[4/5] overflow-hidden rounded-xl shadow-md">
            <Image
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop"
              alt="Dream Floor Landscaping team project"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="space-y-6">
            <SectionTitle
              eyebrow="Over 14 Years of Experience"
              title="Welcome to Dream Floor Landscaping"
            />
            <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              <p>
                Dream Floor Landscaping is a trusted provider of landscaping and outdoor living solutions across the UAE. We specialize in creating beautiful, functional, and well-maintained outdoor spaces that enhance the appearance and value of residential and commercial properties.
              </p>
              <p>
                Our services include landscaping, swimming pool construction and maintenance, garden design, irrigation systems, water features, pergolas, gazebos, outdoor lighting, artificial grass installation, and general garden maintenance. With a skilled team and years of industry experience, we deliver tailored solutions that meet the unique requirements of every client.
              </p>
              <p>
                At Dream Floor, we believe that every outdoor space should be both attractive and practical. From concept and design to installation and ongoing maintenance, we are committed to providing quality workmanship, reliable service, and attention to detail in every project we undertake.
              </p>
              <p>
                Our success is built on customer satisfaction, professionalism, and a commitment to excellence. Whether you are looking to create a new outdoor space or upgrade an existing one, we are dedicated to bringing your vision to life.
              </p>
            </div>
            <dl className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4 pt-6 border-t border-border">
              {stats.map((stat) => (
                <div key={stat.id}>
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                    {stat.label}
                  </dt>
                  <dd className="mt-1 font-display text-2xl font-bold text-primary">
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
              <div key={value.title} className="rounded-lg border border-border bg-card p-8 shadow-xs">
                <span className="font-display text-3xl text-accent/50">
                  0{index + 1}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold">{value.title}</h3>
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
