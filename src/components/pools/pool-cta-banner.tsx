"use client";

import * as React from "react";
import { Phone, ArrowRight } from "lucide-react";
import type { PoolCtaConfig } from "@/types/pool-detail";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PoolCtaBannerProps {
  cta: PoolCtaConfig;
  className?: string;
}

export function PoolCtaBanner({ cta, className }: PoolCtaBannerProps) {
  return (
    <div
      className={cn(
        "my-8 rounded-xl bg-gradient-to-r from-emerald-100 via-emerald-50 to-teal-100 p-6 sm:p-8 text-center border border-emerald-300/80 shadow-sm transition-all hover:shadow-md",
        className
      )}
    >
      <h3 className="font-display text-xl sm:text-2xl font-bold text-emerald-950 tracking-tight">
        {cta.headline}
      </h3>
      {cta.subline && (
        <p className="mt-2 text-sm sm:text-base font-medium text-emerald-850 max-w-xl mx-auto">
          {cta.subline}
        </p>
      )}

      <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
        <a
          href={`tel:${cta.phoneNumber}`}
          className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
        >
          <Phone className="h-4 w-4 animate-bounce" />
          <span>Call us at: {cta.phoneDisplay}</span>
        </a>

        {cta.buttonHref && (
          <Button asChild variant="outline" className="border-emerald-700 text-emerald-900 hover:bg-emerald-200/60 w-full sm:w-auto">
            <a href={cta.buttonHref}>
              <span>{cta.buttonText || "Learn More"}</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}
