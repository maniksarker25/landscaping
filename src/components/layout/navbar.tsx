"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Waves } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-[72px] w-full border-b transition-colors duration-300",
        scrolled
          ? "border-border bg-background/95 backdrop-blur-sm"
          : "border-transparent bg-background/70 backdrop-blur-sm"
      )}
    >
      <Container className="flex h-full items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-xl tracking-tight text-primary"
        >
          <Waves className="h-6 w-6 text-accent" aria-hidden="true" />
          {siteConfig.name}
        </Link>

        <nav aria-label="Primary" className="hidden lg:flex lg:items-center lg:gap-8">
          {siteConfig.nav.map((item) => {
            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "text-sm font-medium tracking-wide transition-colors hover:text-accent",
                  isActive ? "text-primary" : "text-foreground/80"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button asChild>
            <Link href="/contact">Request a Quote</Link>
          </Button>
        </div>

        <MobileMenu />
      </Container>
    </header>
  );
}
