"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import type { PoolBlockFaqItem } from "@/types/service";
import { cn } from "@/lib/utils";

interface ServiceFaqAccordionProps {
  items: PoolBlockFaqItem[];
  title?: string;
  className?: string;
}

export function ServiceFaqAccordion({
  items,
  title = "Frequently Asked Questions",
  className,
}: ServiceFaqAccordionProps) {
  if (!items || items.length === 0) return null;

  return (
    <div
      className={cn(
        "my-10 space-y-6 rounded-2xl bg-card border border-border/80 p-2 sm:p-8 shadow-sm",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <div className="h-10 hidden md:flex w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <HelpCircle className="h-5 w-5" />
        </div>
        <h2 className="font-display text-base sm:text-3xl font-bold tracking-tight text-primary">
          {title}
        </h2>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-3">
        {items.map((item, idx) => (
          <AccordionItem
            key={idx}
            value={`item-${idx}`}
            className="rounded-xl border border-border/60 bg-background px-4 sm:px-5 transition-colors data-[state=open]:border-primary/40 data-[state=open]:shadow-sm"
          >
            <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline py-4">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-foreground/80 leading-relaxed pt-1 pb-4">
              <div
                className="prose prose-sm max-w-none text-foreground/80 [&_p]:mb-2 [&_strong]:text-primary"
                dangerouslySetInnerHTML={{ __html: item.answer }}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
