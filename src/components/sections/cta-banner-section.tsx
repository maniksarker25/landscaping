"use client";

import React from "react";
import { PhoneCall } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CtaBannerSectionProps {
  title?: string;
  subtitle?: string;
  phoneText?: string;
  phoneNumber?: string;
  className?: string;
}

export function CtaBannerSection({
  title = "Looking for Swimming Pool Contractors in Dubai?",
  subtitle,
  phoneText = "Call us today at",
  phoneNumber = "+971 551889002",
  className,
}: CtaBannerSectionProps) {
  const cleanPhone = phoneNumber.replace(/[^0-9+]/g, "");

  return (
    <div
      className={cn(
        "rounded-[4px] border border-[#5597CF]/30 bg-[#f4f8e8] p-5 sm:p-6 text-center transition-all hover:border-[#5597CF]/50 shadow-sm font-sans my-4",
        className,
      )}
    >
      <a
        href={`tel:${cleanPhone}`}
        className="group inline-flex flex-col items-center gap-1.5 transition-transform hover:scale-[1.01]"
      >
        <span className="text-lg sm:text-[21px] font-bold text-[#222222] group-hover:text-[#5597CF] transition-colors leading-snug">
          {title}
        </span>
        {subtitle && (
          <span className="text-sm text-[#555555] font-normal">{subtitle}</span>
        )}
        <span className="inline-flex items-center gap-2 text-base sm:text-lg font-bold text-[#5597CF] group-hover:underline mt-0.5">
          <PhoneCall className="w-4 h-4" />
          {phoneText} {phoneNumber}
        </span>
      </a>
    </div>
  );
}

export default CtaBannerSection;
