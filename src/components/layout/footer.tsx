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

  const companyName = legalInfo.companyName || siteConfig.name;
  const address = legalInfo.registeredAddress || siteConfig.address;
  const phone = legalInfo.contactPhone || siteConfig.phone;
  const email = legalInfo.contactEmail || siteConfig.email;
  const website = legalInfo.officialWebsite || "https://www.sari-landscaping.ae";
  const tagline = legalInfo.tagline || siteConfig.description;

  const socialLinks = [
    {
      label: "Instagram",
      href: legalInfo.instagramLink || siteConfig.socials.find((s) => s.label === "Instagram")?.href,
    },
    {
      label: "LinkedIn",
      href: legalInfo.linkedinLink || siteConfig.socials.find((s) => s.label === "LinkedIn")?.href,
    },
    {
      label: "Facebook",
      href: legalInfo.facebookLink || siteConfig.socials.find((s) => s.label === "Facebook")?.href,
    },
  ].filter((s): s is { label: string; href: string } => Boolean(s.href));

  return (
    <footer className="bg-primary text-primary-foreground">
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
              {website && (
                <li className="flex items-center gap-2.5 min-w-0 break-all">
                  <Globe className="h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-foreground transition-colors"
                  >
                    {website.replace(/^https?:\/\//, "")}
                  </a>
                </li>
              )}
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
