import Link from "next/link";
import { Waves, Phone, Mail, MapPin, Globe, Instagram, Linkedin, Facebook } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/common/container";
import { Separator } from "@/components/ui/separator";
import { toTelHref } from "@/lib/utils";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { fetchLegalInfo } from "@/lib/api/legal-info";

export async function Footer() {
  const legalRes = await fetchLegalInfo();
  const legalInfo = legalRes.data;

  const companyName = legalInfo?.companyName || siteConfig.name;
  const address = legalInfo?.registeredAddress || siteConfig.address;
  const phone = legalInfo?.contactPhone || siteConfig.phone;
  const email = legalInfo?.contactEmail || siteConfig.email;
  const tagline = legalInfo?.tagline || siteConfig.description;

  const socialLinks = [
    {
      label: "Instagram",
      href: legalInfo?.instagramLink || siteConfig.socials.find((s) => s.label === "Instagram")?.href,
    },
    {
      label: "LinkedIn",
      href: legalInfo?.linkedinLink || siteConfig.socials.find((s) => s.label === "LinkedIn")?.href,
    },
    {
      label: "Facebook",
      href: legalInfo?.facebookLink || siteConfig.socials.find((s) => s.label === "Facebook")?.href,
    },
  ].filter((s): s is { label: string; href: string } => Boolean(s.href));

  return (
    <footer className="relative bg-primary text-primary-foreground">
      {/* Wave Transition Top Divider */}
      <div className="w-full overflow-hidden leading-none pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 125"
          preserveAspectRatio="none"
          className="w-full h-12 sm:h-16 md:h-24 lg:h-28 block fill-background"
          aria-hidden="true"
        >
          <path
            d="M 0 125 L 0.0 62.5 L 15.0 60.0 L 30.0 57.6 L 45.0 55.2 L 60.0 53.1 L 75.0 51.2 L 90.0 49.6 L 105.0 48.2 L 120.0 47.3 L 135.0 46.7 L 150.0 46.5 L 165.0 46.7 L 180.0 47.3 L 195.0 48.2 L 210.0 49.6 L 225.0 51.2 L 240.0 53.1 L 255.0 55.2 L 270.0 57.6 L 285.0 60.0 L 300.0 62.5 L 315.0 65.0 L 330.0 67.4 L 345.0 69.8 L 360.0 71.9 L 375.0 73.8 L 390.0 75.4 L 405.0 76.8 L 420.0 77.7 L 435.0 78.3 L 450.0 78.5 L 465.0 78.3 L 480.0 77.7 L 495.0 76.8 L 510.0 75.4 L 525.0 73.8 L 540.0 71.9 L 555.0 69.8 L 570.0 67.4 L 585.0 65.0 L 600.0 62.5 L 615.0 60.0 L 630.0 57.6 L 645.0 55.2 L 660.0 53.1 L 675.0 51.2 L 690.0 49.6 L 705.0 48.2 L 720.0 47.3 L 735.0 46.7 L 750.0 46.5 L 765.0 46.7 L 780.0 47.3 L 795.0 48.2 L 810.0 49.6 L 825.0 51.2 L 840.0 53.1 L 855.0 55.2 L 870.0 57.6 L 885.0 60.0 L 900.0 62.5 L 915.0 65.0 L 930.0 67.4 L 945.0 69.8 L 960.0 71.9 L 975.0 73.8 L 990.0 75.4 L 1005.0 76.8 L 1020.0 77.7 L 1035.0 78.3 L 1050.0 78.5 L 1065.0 78.3 L 1080.0 77.7 L 1095.0 76.8 L 1110.0 75.4 L 1125.0 73.8 L 1140.0 71.9 L 1155.0 69.8 L 1170.0 67.4 L 1185.0 65.0 L 1200.0 62.5 L 1200 125 Z"
            transform="scale(1,-1) translate(0,-125)"
          />
        </svg>
      </div>
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1.1fr_1.2fr]">
          {/* Brand Info */}
          <div className="min-w-0">
            <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold tracking-tight">
              <Waves className="h-6 w-6 text-secondary shrink-0" aria-hidden="true" />
              <span className="truncate">{companyName}</span>
            </Link>
            <p className="mt-4 max-w-sm text-xs sm:text-sm leading-relaxed text-primary-foreground/75 break-words">
              {tagline}
            </p>
            {socialLinks.length > 0 && (
              <div className="mt-6 flex gap-3">
                {socialLinks.map((social) => {
                  const Icon =
                    social.label === "Instagram"
                      ? Instagram
                      : social.label === "LinkedIn"
                      ? Linkedin
                      : Facebook;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-primary-foreground/20"
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav aria-label="Footer navigation" className="min-w-0">
            <h3 className="font-display text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-secondary">
              Explore
            </h3>
            <ul className="mt-4 space-y-3 text-xs sm:text-sm text-primary-foreground/75">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-primary-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Dynamic Legal Contact Info */}
          <div className="min-w-0">
            <h3 className="font-display text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-secondary">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-3 text-xs sm:text-sm text-primary-foreground/75 min-w-0">
              <li className="flex items-start gap-2.5 min-w-0 break-words">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                <span className="min-w-0 flex-1">{address}</span>
              </li>
              <li className="flex items-center gap-2.5 min-w-0 break-all">
                <Phone className="h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                <a href={toTelHref(phone)} className="hover:text-primary-foreground transition-colors">
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5 min-w-0 break-all">
                <Mail className="h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                <a href={`mailto:${email}`} className="hover:text-primary-foreground transition-colors">
                  {email}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="min-w-0">
            <h3 className="font-display text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-secondary">
              Stay Updated
            </h3>
            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-primary-foreground/75">
              Occasional notes on finished projects and seasonal care tips. No spam.
            </p>
            <div className="mt-4">
              <NewsletterForm />
            </div>
          </div>
        </div>

        <Separator className="my-8 sm:my-10 bg-primary-foreground/10" />

        {/* Footer Bottom Legal Notice */}
        <div className="flex flex-col items-center justify-between gap-4 text-xs text-primary-foreground/60 sm:flex-row text-center sm:text-left">
          <p>
            &copy; {new Date().getFullYear()} {companyName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-primary-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
