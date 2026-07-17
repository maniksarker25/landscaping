import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/common/container";
import { ContactForm } from "@/components/forms/contact-form";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { toTelHref } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Get in touch to arrange a site visit and a fixed-scope quote for your project.",
  path: "/contact",
});

const infoItems = [
  { icon: Phone, label: "Phone", value: siteConfig.phone, href: toTelHref(siteConfig.phone) },
  { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: MapPin, label: "Studio", value: siteConfig.address, href: undefined },
  { icon: Clock, label: "Hours", value: "Sat–Thu, 9am–6pm", href: undefined },
];

export default function ContactPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }]} />
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your project"
        description="Share a few details and we'll arrange a site visit within the week."
      />

      <section className="py-20 sm:py-24">
        <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <ul className="space-y-6">
              {infoItems.map((item) => {
                const Icon = item.icon;
                const content = (
                  <>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/5 text-primary">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-wide text-muted-foreground">
                        {item.label}
                      </span>
                      <span className="mt-0.5 block text-sm text-foreground">{item.value}</span>
                    </span>
                  </>
                );
                return (
                  <li key={item.label} className="flex items-start gap-4">
                    {item.href ? (
                      <a href={item.href} className="flex items-start gap-4">
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-10 aspect-[4/3] w-full overflow-hidden rounded-lg border border-border bg-muted">
              <iframe
                title="Studio location map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=55.20%2C25.10%2C55.30%2C25.18&layer=mapnik"
                className="h-full w-full grayscale"
                loading="lazy"
              />
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-8 sm:p-10">
            <h2 className="font-display text-xl">Send us a message</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We typically respond within one business day.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
