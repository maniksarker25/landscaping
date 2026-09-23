"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Mail, Phone } from "lucide-react";
import { siteConfig, type NavItem } from "@/config/site";
import { Container } from "@/components/common/container";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { cn, toTelHref, toWhatsAppHref } from "@/lib/utils";
import type { LegalInfoData } from "@/lib/api/legal-info";
import { fetchLegalInfo } from "@/lib/api/legal-info";
import { Button } from "../ui/button";
import Image from "next/image";
import { IMAGE } from "../../../public/images/index.image";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [showTopBar, setShowTopBar] = React.useState(true);
  const [legalInfo, setLegalInfo] = React.useState<LegalInfoData | null>(null);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);

  React.useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setScrolled(currentScrollY >= 20);

          if (currentScrollY <= 15) {
            setShowTopBar(true);
          } else if (currentScrollY > 80) {
            setShowTopBar(false);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    fetchLegalInfo()
      .then((json) => {
        if (json.data) {
          setLegalInfo(json.data);
        }
      })
      .catch((err) =>
        console.error("Failed to fetch legal info for navbar:", err),
      );
  }, []);

  const contactPhone = legalInfo?.contactPhone || siteConfig.phone;
  const contactEmail = legalInfo?.contactEmail || siteConfig.email;
  const whatsAppUrl = toWhatsAppHref(contactPhone);

  const navItems = siteConfig.nav;

  const isItemActive = (item: NavItem) =>
    item?.href === "/"
      ? pathname === "/"
      : Boolean(pathname?.startsWith(item?.href));

  return (
    <div
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-300",
        scrolled
          ? "border-b border-border shadow-sm"
          : "border-b border-transparent",
      )}
    >
      {/* Top Header / Utility Bar */}
      <div
        className={cn(
          "w-full bg-primary text-primary-foreground text-xs font-medium relative z-[51] transition-all duration-300 ease-in-out overflow-hidden",
          showTopBar
            ? "max-h-24 opacity-100 py-3.5 sm:py-3.5"
            : "max-h-0 opacity-0 py-0 pointer-events-none",
        )}
      >
        <Container className="flex items-center justify-between">
          {/* Left: 3 Circular Icon Buttons (Phone, Mail, WhatsApp) */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <a
              href={toTelHref(contactPhone)}
              className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-black/20 hover:bg-black/35 text-white transition-all shadow-xs"
              aria-label="Call Us"
            >
              <Phone className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
            </a>
            <a
              href={`mailto:${contactEmail}`}
              className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-black/20 hover:bg-black/35 text-white transition-all shadow-xs"
              aria-label="Send Email"
            >
              <Mail className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
            </a>
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-black/20 hover:bg-black/35 text-white transition-all shadow-xs"
              aria-label="Chat on WhatsApp"
            >
              <WhatsAppIcon className="h-5 w-5 sm:h-5.5 sm:w-5.5" />
            </a>
          </div>

          {/* Right: GET A QUOTE (All Screens) + CALL US NOW & LETSCHAT (Desktop) */}
          <div className="flex items-center gap-3 sm:gap-5 lg:gap-6">
            {/* GET A QUOTE Button (Mobile Only) */}
            <Link
              href="/contact"
              className="lg:hidden bg-black hover:bg-neutral-900 text-white font-extrabold text-[11px] sm:text-xs uppercase tracking-wider px-3.5 sm:px-4 py-2 sm:py-2 rounded flex items-center gap-1.5 shadow-sm transition-all whitespace-nowrap"
            >
              <span>GET A QUOTE</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>

            {/* LETSCHAT Block (Desktop) */}
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 sm:gap-2.5 transition-opacity hover:opacity-90 group"
              aria-label="Chat on WhatsApp"
            >
              <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-black/20 group-hover:bg-black/35 text-white transition-all">
                <WhatsAppIcon className="h-5 w-5 sm:h-5.5 sm:w-5.5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/80 leading-none">
                  LETSCHAT
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-white leading-tight mt-0.5 whitespace-nowrap">
                  {contactPhone}
                </span>
              </div>
            </a>
          </div>
        </Container>
      </div>

      {/* Main Header / Navigation Bar */}
      <header
        className={cn(
          "h-[90px] sm:h-[100px] w-full transition-colors duration-300 py-1.5",
          scrolled
            ? "bg-background/95 backdrop-blur-sm"
            : "bg-background/70 backdrop-blur-sm",
        )}
      >
        <Container className="flex h-full items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-90 py-1 mt-1 shrink-0"
            aria-label={siteConfig.name}
          >
            <Image
              src={IMAGE.logo}
              alt={siteConfig.name}
              width={280}
              height={90}
              className="h-[80px] sm:h-[92px] w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center gap-6 xl:gap-8 h-full"
            aria-label="Main Navigation"
          >
            {navItems.map((item) => {
              const isActive = isItemActive(item);
              const isMenuOpen = activeDropdown === item.href;

              if (item?.children?.length) {
                return (
                  <div
                    key={item.href}
                    className="relative group h-full flex items-center"
                    onMouseEnter={() => setActiveDropdown(item.href)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "inline-flex items-center gap-1.5 text-xs xl:text-sm font-bold uppercase tracking-wider transition-colors duration-150 py-7 select-none",
                        isActive || isMenuOpen
                          ? "text-primary"
                          : "text-foreground/85 group-hover:text-primary",
                      )}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 transition-transform duration-200",
                          isMenuOpen ? "rotate-180" : "group-hover:rotate-180",
                        )}
                        aria-hidden="true"
                      />
                    </Link>

                    {/* Dropdown Menu directly aligned under trigger */}
                    <div
                      className={cn(
                        "absolute left-0 top-[calc(100%-12px)] pt-2 transition-all duration-150 z-50",
                        isMenuOpen
                          ? "opacity-100 visible pointer-events-auto"
                          : "opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto",
                      )}
                    >
                      <div className="w-[330px] bg-white shadow-2xl border border-neutral-100 rounded-sm overflow-hidden py-0">
                        <ul className="flex flex-col">
                          {item.children.map((child) => {
                            const isChildActive = pathname === child.href;
                            return (
                              <li key={child.href} className="w-full">
                                <Link
                                  href={child.href}
                                  onClick={() => setActiveDropdown(null)}
                                  className={cn(
                                    "block w-full px-6 py-3.5 text-xs sm:text-[13px] font-bold uppercase tracking-wider transition-colors duration-150 leading-snug",
                                    isChildActive
                                      ? "bg-primary text-white"
                                      : "text-neutral-900 bg-white hover:bg-primary hover:text-white",
                                  )}
                                >
                                  {child.label}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "inline-flex items-center text-xs xl:text-sm font-bold uppercase tracking-wider transition-colors duration-150 py-7",
                    isActive
                      ? "text-primary"
                      : "text-foreground/85 hover:text-primary",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:block shrink-0">
            <Button
              asChild
              size="lg"
              className="text-sm xl:text-base font-bold px-6 py-2.5"
            >
              <Link href="/contact">Request a Quote</Link>
            </Button>
          </div>

          {/* Mobile Hamburger Menu */}
          <MobileMenu items={navItems} />
        </Container>
      </header>
    </div>
  );
}
