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
  ShieldCheck,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Get in touch to arrange a site visit and a fixed-scope quote for your swimming pool or landscaping project.",
  path: "/contact",
});

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={props.className}
      aria-hidden="true"
      {...props}
    >
      <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.054L2 22l5.077-1.331a9.92 9.92 0 004.93 1.302h.005c5.505 0 9.988-4.478 9.99-9.985A9.97 9.97 0 0012.012 2zm5.795 13.973c-.237.667-1.378 1.29-1.895 1.357-.47.062-.97.108-2.748-.627-2.274-.939-3.713-3.267-3.827-3.418-.113-.15-.92-1.222-.92-2.332 0-1.11.577-1.656.782-1.875.204-.22.454-.275.606-.275.152 0 .303.001.436.007.136.007.319-.052.5-.052.186 0 .637.07.967.863.33.793.896 2.183.975 2.342.079.16.133.345.027.558-.106.213-.16.347-.318.53-.159.184-.334.409-.477.548-.159.155-.326.323-.139.643.187.32.83 1.356 1.782 2.203.953.847 1.758 1.11 2.06 1.258.303.149.48.127.66-.08.18-.206.776-.902.986-1.21.21-.308.42-.257.708-.149.29.108 1.838.867 2.152 1.023.315.156.524.232.602.366.079.133.079.77-.158 1.437z" />
    </svg>
  );
}

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
    {
      icon: MapPin,
      label: "Studio & Registered Address",
      value: address,
      href: undefined,
      accentColor: "bg-primary/10 text-primary",
    },
    {
      icon: Clock,
      label: "Working Hours",
      value: "Sat–Thu, 9:00 AM – 6:00 PM",
      href: undefined,
      accentColor: "bg-primary/10 text-primary",
    },
  ];

  return (
    <>
      <Breadcrumb
        items={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
      />
      <PageHero
        eyebrow="Contact Us"
        title="Let's talk about your project"
        description="Share a few details and we'll arrange a site visit within the week."
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

            {/* Corporate / Legal Overview Card */}
            {legalInfo && (
              <div className="rounded-xl border border-border bg-card p-5 sm:p-6 space-y-3.5 text-xs shadow-sm">
                <h3 className="font-display text-sm font-bold text-foreground flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-primary" /> Corporate &
                  Legal Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-muted-foreground">
                  {legalInfo.companyName && (
                    <div>
                      <span className="font-semibold text-foreground">
                        Company Name:
                      </span>{" "}
                      {legalInfo.companyName}
                    </div>
                  )}
                  {legalInfo.businessType && (
                    <div>
                      <span className="font-semibold text-foreground">
                        Business Type:
                      </span>{" "}
                      {legalInfo.businessType}
                    </div>
                  )}
                  {legalInfo.jurisdiction && (
                    <div>
                      <span className="font-semibold text-foreground">
                        Jurisdiction:
                      </span>{" "}
                      {legalInfo.jurisdiction}
                    </div>
                  )}
                  {legalInfo.siteName && (
                    <div>
                      <span className="font-semibold text-foreground">
                        Site Name:
                      </span>{" "}
                      {legalInfo.siteName}
                    </div>
                  )}
                </div>
                {legalInfo.tagline && (
                  <p className="text-xs italic text-muted-foreground border-t border-border/60 pt-2.5">
                    &ldquo;{legalInfo.tagline}&rdquo;
                  </p>
                )}
              </div>
            )}
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
