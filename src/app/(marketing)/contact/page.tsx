import { Breadcrumb } from "@/components/common/breadcrumb";
import { Container } from "@/components/common/container";
import { ContactForm } from "@/components/forms/contact-form";
import { PageHero } from "@/components/sections/page-hero";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { toTelHref, toWhatsAppHref, getMapEmbedUrl } from "@/lib/utils";
import { fetchLegalInfo } from "@/lib/api/legal-info";
import {
  Clock,
  Mail,
  MapPin,
  Phone,
  Globe,
  Building2,
} from "lucide-react";
import type { Metadata } from "next";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Get in touch to arrange a site visit and a fixed-scope quote for your swimming pool or landscaping project.",
  path: "/contact",
});
import contactBg from "@/app/../../public/images/contact-bg.webp"

export default async function ContactPage() {
  const legalRes = await fetchLegalInfo();
  const legalInfo = legalRes.data;

  const phone = legalInfo?.contactPhone || siteConfig.phone;
  const email = legalInfo?.contactEmail || siteConfig.email;
  const address = legalInfo?.registeredAddress || siteConfig.address;
  const whatsappUrl = toWhatsAppHref(phone);
  const mapEmbedUrl = getMapEmbedUrl(address);

  const infoItems = [
    {
      icon: Phone,
      label: "Phone Support",
      value: phone,
      href: toTelHref(phone),
      accentColor: "bg-primary/10 text-primary",
    },
    {
      icon: WhatsAppIcon,
      label: "WhatsApp Support",
      value: `Chat on WhatsApp (${phone})`,
      href: whatsappUrl,
      accentColor:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400",
    },
    {
      icon: Mail,
      label: "Email Support",
      value: email,
      href: `mailto:${email}`,
      accentColor: "bg-primary/10 text-primary",
    },
    ...(legalInfo?.officialWebsite
      ? [
        {
          icon: Globe,
          label: "Official Website",
          value: legalInfo.officialWebsite,
          href: legalInfo.officialWebsite,
          accentColor: "bg-primary/10 text-primary",
        },
      ]
      : []),
  ];

  return (
    <>
      <PageHero
        image={contactBg}
        eyebrow="Contact Us"
        title="Let’s Bring Your Outdoor Vision to Life"
        description="Tell us about your project and our team will arrange a site visit and consultation."
      />

      <section className="py-12 sm:py-16 lg:py-24">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 items-start">
          {/* Left Column: Contact Details & Embedded Map */}
          <div className="space-y-8 min-w-0 w-full">
            <ul className="space-y-5 sm:space-y-6">
              {infoItems.map((item) => {
                const Icon = item.icon;
                const content = (
                  <>
                    <span
                      className={`flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full ${item.accentColor} transition-transform group-hover:scale-105`}
                    >
                      <Icon
                        className="h-4 w-4 sm:h-5 sm:w-5"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="min-w-0 flex-1 break-words">
                      <span className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {item.label}
                      </span>
                      <span className="mt-0.5 block text-sm sm:text-base font-medium text-foreground leading-snug break-all sm:break-words">
                        {item.value}
                      </span>
                    </span>
                  </>
                );
                return (
                  <li
                    key={item.label}
                    className="flex items-start gap-3.5 sm:gap-4 min-w-0 w-full"
                  >
                    {item.href ? (
                      <a
                        href={item.href}
                        target={
                          item.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          item.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="flex items-start gap-3.5 sm:gap-4 min-w-0 w-full hover:text-primary transition-colors group"
                      >
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right Column: Contact Form Card */}
          <div className="rounded-xl border border-border bg-card p-5 sm:p-8 lg:p-10 shadow-sm sm:shadow-md min-w-0 w-full">
            <h2 className="font-display text-lg sm:text-xl font-bold tracking-tight text-foreground">
              Send us a message
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              We typically respond within one business day.
            </p>
            <div className="mt-6 sm:mt-8">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>

      {/* Full-width Map Section */}
      <section className="w-full pb-12 sm:pb-16 lg:pb-24">
        <Container className="w-full">
          <div className="h-[400px] sm:h-[480px] lg:h-[520px] w-full overflow-hidden rounded-2xl border border-border bg-muted shadow-md">
            <iframe
              title="Studio location map"
              src={mapEmbedUrl}
              className="h-full w-full border-0"
              loading="lazy"
            />
          </div>
        </Container>
      </section>
    </>
  );
}
