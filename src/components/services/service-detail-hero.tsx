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
  className,
}: ServiceDetailHeroProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden text-primary-foreground min-h-[340px] sm:min-h-[420px] flex items-center justify-center",
        className,
      )}
    >
      {/* Background Image with Overlay */}
      <Image
        src={heroImage}
        alt={title}
        fill
        priority
        className="object-cover transition-transform duration-1000"
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* Hero Content */}
      <Container className="relative z-10 py-12 sm:py-16 align-left space-y-4 container mx-auto">
        {/* Breadcrumb Navigation */}
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
          {title}
        </h1>

        {subtitle && (
          <p className="text-sm sm:text-base  md:text-lg text-primary-foreground/80  font-sans leading-relaxed">
            {subtitle}
          </p>
        )}
        <nav
          aria-label="Breadcrumb"
          className="inline-flex items-center justify-center gap-2 rounded-full text-xs text-primary-foreground/90 mb-2"
        >
          <Link
            href="/"
            className="hover:text-white transition-colors underline"
          >
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
      </Container>
    </div>
  );
}
