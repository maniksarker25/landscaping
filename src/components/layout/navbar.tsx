"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Waves, ArrowRight, Mail, Phone } from "lucide-react";
import { siteConfig, type NavItem } from "@/config/site";
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
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Image from "next/image";
import { IMAGE } from "../../../public/images/index.image";

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

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isItemActive = (item: NavItem) =>
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

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
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-2 transition-colors hover:text-white"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">{siteConfig.email}</span>
            </a>
            <a
              href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-2 transition-colors hover:text-white"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">{siteConfig.phone}</span>
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=111111"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-green-400"
            >
              <WhatsAppIcon
                className="h-3.5 w-3.5 fill-current"
                aria-hidden="true"
              />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>
          {/* <div>
            <Link
              href="/contact"
              className="inline-flex h-7 items-center justify-center rounded bg-accent px-3 text-[11px] font-semibold text-accent-foreground transition-all hover:bg-accent/90 hover:scale-[1.02] active:scale-[0.98]"
            >
              Get a Quote
            </Link>
          </div> */}
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
          {/* <Image src={IMAGE.logo} width={600} height={450} alt="" className="w-24" /> */}
          <Link
            href="/"
            className="flex items-end justify-end gap-2 font-display text-xl tracking-tight text-primary"
          >
            <div className="flex items-end justify-end">
              <h1>DFL</h1>
              <h1 className="text-[10px] mb-1">LLC</h1>
            </div>
          </Link>

          <NavigationMenu className="hidden lg:flex" delayDuration={100}>
            <NavigationMenuList>
              {siteConfig.nav.map((item) => {
                const isActive = isItemActive(item);

                if (item.children?.length) {
                  return (
                    <NavigationMenuItem key={item.href}>
                      <NavigationMenuTrigger
                        className={cn(isActive && "text-primary")}
                      >
                        {item.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[560px] grid-cols-2 gap-1 p-4 lg:w-[640px]">
                          {item.children.map((child) => {
                            const Icon = child.icon;
                            return (
                              <li key={child.href}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    href={child.href}
                                    className="group flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-muted focus:bg-muted focus:outline-none"
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
                                      <span className="text-sm font-medium text-primary">
                                        {child.label}
                                      </span>
                                    </span>
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            );
                          })}
                        </ul>
                        <div className="flex items-center justify-between border-t border-border bg-muted/50 px-5 py-3">
                          <span className="text-xs text-foreground/60">
                            Not sure where to start?
                          </span>
                          <NavigationMenuLink asChild>
                            <Link
                              href={item.href}
                              className="flex items-center gap-1 text-xs font-medium text-accent hover:underline"
                            >
                              View all {item.label.toLowerCase()}
                              <ArrowRight
                                className="h-3 w-3"
                                aria-hidden="true"
                              />
                            </Link>
                          </NavigationMenuLink>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                }

                return (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "inline-flex items-center text-sm font-medium tracking-wide transition-colors hover:text-accent",
                          isActive ? "text-primary" : "text-foreground/80",
                        )}
                      >
                        {item.label}
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

          <MobileMenu />
        </Container>
      </header>
    </div>
  );
}
