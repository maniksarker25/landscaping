"use client";

import * as React from "react";
import { CheckCircle2, Sparkles, ShieldCheck, Wallet, Award, Palette } from "lucide-react";
import type { PoolFeatureItem } from "@/types/pool-detail";
import { cn } from "@/lib/utils";

interface PoolFeaturesGridProps {
  features: PoolFeatureItem[];
  title?: string;
  className?: string;
}

function getFeatureIcon(title: string) {
  const t = title.toLowerCase();
  if (t.includes("design") || t.includes("custom")) return Palette;
  if (t.includes("cost") || t.includes("effective") || t.includes("wallet")) return Wallet;
  if (t.includes("material") || t.includes("shield")) return ShieldCheck;
  if (t.includes("experience") || t.includes("award") || t.includes("proven")) return Award;
  if (t.includes("statement") || t.includes("star")) return Sparkles;
  return CheckCircle2;
}

export function PoolFeaturesGrid({
  features,
  title = "Key Features & Benefits",
  className,
}: PoolFeaturesGridProps) {
  if (!features || features.length === 0) return null;

  return (
    <div className={cn("my-10 space-y-6", className)}>
      {title && (
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-primary">
          {title}
        </h2>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {features.map((feat, idx) => {
          const Icon = getFeatureIcon(feat.title);
          return (
            <div
              key={idx}
              className="group flex items-start gap-4 p-5 rounded-2xl bg-card border border-border/80 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-5.5 w-5.5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-display text-base font-bold text-foreground group-hover:text-primary transition-colors">
                  {feat.title}
                </h4>
                <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
