"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Sparkles } from "lucide-react";
import { Container } from "@/components/common/container";
import { cn } from "@/lib/utils";

interface ServiceDetailHeroProps {
  title: string;
  subtitle?: string;
  heroImage?: string;
  badge?: string;
  className?: string;
}

export function ServiceDetailHero({
  title,
  subtitle,
  heroImage = "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2000&auto=format&fit=crop",
  badge,
  className,
}: ServiceDetailHeroProps) {
  return (
    <div className={cn("relative w-full overflow-hidden bg-primary text-primary-foreground min-h-[340px] sm:min-h-[420px] flex items-center justify-center", className)}>
      {/* Background Image with Overlay */}
      <Image
        src={heroImage}
        alt={title}
        fill
        priority
        className="object-cover opacity-25 scale-105 transition-transform duration-1000"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/20 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-primary/50 to-primary" />

      {/* Hero Content */}
      <Container className="relative z-10 py-12 sm:py-16 text-center space-y-4 max-w-4xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="inline-flex items-center justify-center gap-2 rounded-full bg-background/10 backdrop-blur-md px-4 py-1.5 text-xs text-primary-foreground/90 border border-primary-foreground/15 mb-2">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3 text-primary-foreground/50" />
          <Link href="/services" className="hover:text-white transition-colors">
            Services
          </Link>
          <ChevronRight className="h-3 w-3 text-primary-foreground/50" />
          <span className="text-white font-medium truncate max-w-[180px] sm:max-w-none">
            {title}
          </span>
        </nav>

        {badge && (
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-200 border border-emerald-400/30">
              <Sparkles className="h-3.5 w-3.5" /> {badge}
            </span>
          </div>
        )}

        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
          {title}
        </h1>

        {subtitle && (
          <p className="text-sm sm:text-base md:text-lg text-primary-foreground/80 max-w-2xl mx-auto font-sans leading-relaxed">
            {subtitle}
          </p>
        )}
      </Container>
    </div>
  );
}
