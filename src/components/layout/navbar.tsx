"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Waves, ArrowRight, Mail, Phone } from "lucide-react";
import {
  siteConfig,
  buildNavChildrenFromServices,
  type NavItem,
} from "@/config/site";
import type { ServiceData } from "@/types/service";

import { Container } from "@/components/common/container";
import { MobileMenu } from "@/components/layout/mobile-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn, toTelHref, toWhatsAppHref } from "@/lib/utils";
import type { LegalInfoData } from "@/lib/api/legal-info";
import { fetchLegalInfo } from "@/lib/api/legal-info";
import { fetchServicesData } from "@/lib/api/services";
import { Button } from "../ui/button";
import Image from "next/image";
import { IMAGE } from "../../../public/images/index.image";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [apiServices, setApiServices] = React.useState<ServiceData[]>([]);
  const [legalInfo, setLegalInfo] = React.useState<LegalInfoData | null>(null);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    fetchServicesData()
      .then((json) => {
        if (json.data && Array.isArray(json.data) && json.data.length > 0) {
          setApiServices(json.data);
        }
      })
      .catch((err) =>
        console.error("Failed to fetch API services for navbar:", err),
      );
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

  const navItems = React.useMemo(() => {
    return siteConfig.nav.map((item) => {
      if (item?.label === "Pools") {
        const children = buildNavChildrenFromServices(apiServices, "Pools");
        return {
          ...item,
          children: children.length > 0 ? children : item?.children,
        };
      }
      if (item?.label === "Landscaping") {
        const children = buildNavChildrenFromServices(
          apiServices,
          "Landscaping",
        );
        return {
          ...item,
          children: children.length > 0 ? children : item?.children,
        };
      }
      return item;
    });
  }, [apiServices]);

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
      <div className="w-full bg-primary text-primary-foreground/90 py-2.5 text-xs font-medium relative z-[51]">
        <Container className="flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href={`mailto:${contactEmail}`}
              className="flex items-center gap-2 transition-colors hover:text-white"
            >
              <IconWrapper icon={Mail}>
                <span className="hidden sm:inline text-white text-lg">
                  {contactEmail}
                </span>
              </IconWrapper>
            </a>
            <a
              href={toTelHref(contactPhone)}
              className="flex items-center gap-2 transition-colors hover:text-white"
            >
              <IconWrapper icon={Phone}>
                <span className="hidden sm:inline text-white text-lg">
                  {contactPhone}
                </span>
              </IconWrapper>
            </a>
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-all hover:opacity-90 group"
              aria-label="Chat on WhatsApp"
            >
              <IconWrapper icon={WhatsAppIcon}>
                <span className="inline text-lg font-semibold text-white transition-colors">
                  WhatsApp
                </span>
              </IconWrapper>
            </a>
          </div>
        </Container>
      </div>

      <header
        className={cn(
          "h-[72px] w-full transition-colors duration-300",
          scrolled
            ? "bg-background/95 backdrop-blur-sm"
            : "bg-background/70 backdrop-blur-sm",
        )}
      >
        <Container className="flex h-full items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-90"
            aria-label={siteConfig.name}
          >
            <Image
              src={IMAGE.logo}
              alt={siteConfig.name}
              width={160}
              height={50}
              className="h-14 w-auto object-contain"
              priority
            />
          </Link>

          <NavigationMenu className="hidden lg:flex" delayDuration={100}>
            <NavigationMenuList>
              {navItems.map((item) => {
                const isActive = isItemActive(item);

                if (item?.children?.length) {
                  return (
                    <NavigationMenuItem key={item?.href}>
                      <NavigationMenuTrigger
                        className={cn(isActive && "text-primary")}
                      >
                        {item?.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul
                          className={cn(
                            "grid gap-1 p-4",
                            item?.children?.length === 1
                              ? "w-[320px] lg:w-[360px] grid-cols-1"
                              : "min-w-[560px] lg:w-[640px] grid-cols-2",
                          )}
                        >
                          {item?.children.map((child) => {
                            const Icon = child.icon;
                            return (
                              <li key={child.href}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    href={child.href}
                                    className="group flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-muted focus:bg-muted focus:outline-none"
                                  >
                                    {Icon && (
                                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                                        <Icon
                                          className="h-4.5 w-4.5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    )}
                                    <span className="flex flex-col gap-0.5">
                                      <span className="text-sm line-clamp-1 font-semibold text-primary group-hover:text-accent transition-colors">
                                        {child.label}
                                      </span>
                                      {/* {child.description && (
                                        <span className="text-xs text-muted-foreground line-clamp-2 leading-relaxed font-normal">
                                          {child.description}
                                        </span>
                                      )} */}
                                    </span>
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            );
                          })}
                        </ul>
                        {/* <div className="flex items-center justify-between border-t border-border bg-muted/50 px-5 py-3">
                          <span className="text-xs text-foreground/60">
                            Not sure where to start?
                          </span>
                          <NavigationMenuLink asChild>
                            <Link
                              href={item?.href}
                              className="flex items-center gap-1 text-xs font-medium text-accent hover:underline"
                            >
                              View all {item?.label.toLowerCase()}
                              <ArrowRight
                                className="h-3 w-3"
                                aria-hidden="true"
                              />
                            </Link>
                          </NavigationMenuLink>
                        </div> */}
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                }

                return (
                  <NavigationMenuItem key={item?.href}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={item?.href}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "inline-flex items-center text-sm font-medium tracking-wide transition-colors hover:text-accent",
                          isActive ? "text-primary" : "text-foreground/80",
                        )}
                      >
                        {item?.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="hidden lg:block">
            <Button asChild>
              <Link href="/contact">Request a Quote</Link>
            </Button>
          </div>

          <MobileMenu items={navItems} />
        </Container>
      </header>
    </div>
  );
}

const IconWrapper = ({
  children,
  icon: Icon,
}: {
  children: React.ReactNode;
  icon: React.ComponentType<{ className?: string }>;
}) => {
  return (
    <div className="flex items-center gap-2 px-3 py-1 bg-[#135797] rounded-full">
      <Icon className="h-6 w-6 text-white" aria-hidden="true" />
      {children}
    </div>
  );
};
