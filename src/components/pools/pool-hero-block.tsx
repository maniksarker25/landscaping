"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import type { PoolBlockHeroContent } from "@/types/pool-detail";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PoolHeroBlockProps {
  hero: PoolBlockHeroContent;
  className?: string;
}

export function PoolHeroBlock({ hero, className }: PoolHeroBlockProps) {
  if (!hero) return null;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl bg-primary text-primary-foreground p-8 sm:p-12 my-8 shadow-xl border border-primary/20",
        className
      )}
    >
      {hero.bgImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={hero.bgImage}
            alt={hero.headline}
            fill
            className="object-cover opacity-20 transition-transform duration-1000 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/80" />
        </div>
      )}

      <div className="relative z-10 max-w-2xl space-y-4">
        <span className="inline-block rounded-full bg-emerald-500/20 border border-emerald-400/40 px-3 py-1 text-xs font-bold text-emerald-300 tracking-wide">
          Dubai Engineering Excellence
        </span>
        <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
          {hero.headline}
        </h2>
        {hero.subheadline && (
          <p className="text-sm sm:text-base text-primary-foreground/80 leading-relaxed">
            {hero.subheadline}
          </p>
        )}

        {hero.ctaText && (
          <div className="pt-2 flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold shadow-lg">
              <Link href={hero.ctaLink || "/contact"}>
                {hero.ctaText} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <a href="tel:+971529990092">
                <Phone className="mr-2 h-4 w-4" /> Call Specialist
              </a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
