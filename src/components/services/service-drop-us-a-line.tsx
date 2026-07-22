"use client";

import * as React from "react";
import Image from "next/image";
import { ContactForm } from "@/components/forms/contact-form";
import { cn } from "@/lib/utils";

interface ServiceDropUsALineProps {
  className?: string;
}

export function ServiceDropUsALine({ className }: ServiceDropUsALineProps) {
  return (
    <div
      className={cn(
        "my-16 space-y-8 rounded-2xl bg-card p-6 sm:p-10 border border-border/80 shadow-md",
        className,
      )}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* Left Side: Showcase Image */}
        <div className="lg:col-span-5 relative h-[320px] sm:h-[450px] w-full overflow-hidden rounded-xl bg-muted shadow-md border border-border/60">
          <Image
            src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1200&auto=format&fit=crop"
            alt="Luxury Landscaping & Pools in Dubai"
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6 flex flex-col justify-end text-white">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Outdoor Space Specialists
            </span>
            <h3 className="font-display text-2xl font-bold mt-1">
              Ready To Start Your Project?
            </h3>
            <p className="text-xs text-white/80 mt-1">
              Let's create an unbelievable outdoor living space for your home.
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-7 space-y-4">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-primary">
              Drop Us A Line
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Feel free to send us your query or request a quote for pool &
              landscaping construction.
            </p>
          </div>

          <div className="pt-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
