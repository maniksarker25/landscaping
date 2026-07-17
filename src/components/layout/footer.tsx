import Link from "next/link";
import { Waves, Phone, Mail, MapPin, Instagram, Linkedin, Facebook } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/common/container";
import { Separator } from "@/components/ui/separator";
import { toTelHref } from "@/lib/utils";
import { NewsletterForm } from "@/components/forms/newsletter-form";

const socialIcons = {
  Instagram,
  LinkedIn: Linkedin,
  Facebook,
};

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Link href="/" className="flex items-center gap-2 font-display text-xl">
              <Waves className="h-6 w-6 text-secondary" aria-hidden="true" />
              {siteConfig.name}
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-primary-foreground/70">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex gap-3">
              {siteConfig.socials.map((social) => {
                const Icon = socialIcons[social.label as keyof typeof socialIcons];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-primary-foreground/20"
                  >
                    {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
                  </a>
                );
              })}
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <h3 className="font-display text-sm uppercase tracking-[0.2em] text-secondary">
              Explore
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-primary-foreground/75">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-primary-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-display text-sm uppercase tracking-[0.2em] text-secondary">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-primary-foreground/75">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                {siteConfig.address}
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                <a href={toTelHref(siteConfig.phone)} className="hover:text-primary-foreground">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-primary-foreground">
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm uppercase tracking-[0.2em] text-secondary">
              Stay Updated
            </h3>
            <p className="mt-4 text-sm text-primary-foreground/70">
              Occasional notes on finished projects and seasonal care tips. No spam.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <Separator className="my-10 bg-primary-foreground/10" />

        <div className="flex flex-col items-center justify-between gap-4 text-xs text-primary-foreground/60 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-primary-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
