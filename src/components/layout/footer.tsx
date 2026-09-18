import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Linkedin,
  Facebook,
  Twitter,
  MessageCircle,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/common/container";
import { toTelHref, toWhatsAppHref } from "@/lib/utils";
import { fetchLegalInfo } from "@/lib/api/legal-info";

export async function Footer() {
  const legalRes = await fetchLegalInfo();
  const legalInfo = legalRes.data;

  const companyName = legalInfo?.companyName || "Dream Floor Landscaping LLC";
  const address =
    legalInfo?.registeredAddress ||
    siteConfig.address ||
    "Al Quoz 3, Dubai - UAE";
  const phone =
    legalInfo?.contactPhone || siteConfig.phone || "+971 4 000 0000";
  const email =
    legalInfo?.contactEmail || siteConfig.email || "info@dreamfloor.ae";

  const socialLinks = [
    {
      label: "Facebook",
      href:
        legalInfo?.facebookLink ||
        siteConfig.socials.find((s) => s.label === "Facebook")?.href ||
        "#",
      icon: Facebook,
    },
    {
      label: "Instagram",
      href:
        legalInfo?.instagramLink ||
        siteConfig.socials.find((s) => s.label === "Instagram")?.href ||
        "#",
      icon: Instagram,
    },
    {
      label: "LinkedIn",
      href:
        legalInfo?.linkedinLink ||
        siteConfig.socials.find((s) => s.label === "LinkedIn")?.href ||
        "#",
      icon: Linkedin,
    },
    {
      label: "Twitter",
      href: "#",
      icon: Twitter,
    },
  ];

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Swimming Pools", href: "/pools" },
    { label: "Landscaping & Outdoor Living", href: "/landscaping" },
    { label: "Our Projects", href: "/projects" },
    { label: "Contact Us", href: "/contact" },
  ];

  const serviceLinks = [
    { label: "Swimming Pool Construction & Maintenance", href: "/pools" },
    { label: "Landscaping Services", href: "/landscaping" },
  ];

  return (
    <footer className="bg-primary text-white pt-16 pb-6 border-t border-neutral-900">
      <Container className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 pb-4 md:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 pb-14">
          {/* Column 1: ABOUT US */}
          <div className="space-y-5">
            <h3 className="font-display text-lg font-extrabold uppercase tracking-wider text-white">
              ABOUT US
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed max-w-sm">
              {companyName} offers landscaping &amp; swimming pool construction
              services in Dubai. Our expert landscape designers can help you to
              build the ideal design for your commercial or residential property.
            </p>
            {/* Social Media Links */}
            <div className="pt-2 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5597CF] text-white transition-colors hover:bg-primary border hover:border-[#5597CF] hover:text-white"
                  >
                    <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: QUICK LINKS */}
          <div className="space-y-5">
            <h3 className="font-display text-lg font-extrabold uppercase tracking-wider text-white">
              QUICK LINKS
            </h3>
            <ul className="space-y-3 text-sm text-neutral-300">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 transition-colors hover:text-white font-medium"
                  >
                    <span className="text-white font-bold transition-transform group-hover:translate-x-1">
                      ➔
                    </span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: SERVICES */}
          <div className="space-y-5">
            <h3 className="font-display text-lg font-extrabold uppercase tracking-wider text-white">
              SERVICES
            </h3>
            <ul className="space-y-3 text-sm text-neutral-300">
              {serviceLinks.map((service) => (
                <li key={service.label}>
                  <Link
                    href={service.href}
                    className="group inline-flex items-center gap-2 transition-colors hover:text-white font-medium"
                  >
                    <span className="text-white font-bold transition-transform group-hover:translate-x-1">
                      ➔
                    </span>
                    <span>{service.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: CONTACT */}
          <div className="space-y-5">
            <h3 className="font-display text-lg font-extrabold uppercase tracking-wider text-white">
              CONTACT
            </h3>
            <ul className="space-y-4 text-sm text-neutral-300">
              <li>
                <a
                  href={toTelHref(phone)}
                  className="flex items-center gap-3 transition-colors hover:text-white group"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span className="font-semibold text-white/90">{phone}</span>
                </a>
              </li>

              <li>
                <a
                  href={toWhatsAppHref(phone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 transition-colors hover:text-white group"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <MessageCircle className="h-4 w-4" />
                  </div>
                  <span className="font-semibold text-white/90">
                    WhatsApp Us
                  </span>
                </a>
              </li>

              <li>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 transition-colors hover:text-white group"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span className="font-semibold text-white/90 break-all">
                    {email}
                  </span>
                </a>
              </li>

              <li>
                <div className="flex items-start gap-3 text-neutral-300">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 mt-0.5">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span className="font-medium leading-relaxed">{address}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Line & Copyright */}
        <div className="border-t border-white pt-6 text-center text-xs text-neutral-400 font-medium">
          <p>
            © {new Date().getFullYear()} {companyName}. All Rights Reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
