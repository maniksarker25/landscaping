"use client";

import * as React from "react";
import { Container } from "@/components/common/container";
import { SectionTitle } from "@/components/common/section-title";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import type { FaqItem } from "@/types";
import type { FaqApiItem } from "@/types/faq";
import { convertFaqApiItemToFaqItem } from "@/data/faqs";

interface FaqSectionProps {
  limit?: number;
  showTitle?: boolean;
  initialFaqs?: FaqItem[];
}

export function FaqSection({
  limit,
  showTitle = true,
  initialFaqs,
}: FaqSectionProps) {
  const [dataList, setDataList] = React.useState<FaqItem[]>(initialFaqs || []);

  React.useEffect(() => {
    fetch("/api/manage/get-faq")
      .then((res) => res.json())
      .then((json) => {
        if (json.data && Array.isArray(json.data) && json.data.length > 0) {
          const mapped = json.data.map((item: FaqApiItem) =>
            convertFaqApiItemToFaqItem(item),
          );
          setDataList(mapped);
        }
      })
      .catch((err) => console.error("Failed to fetch client FAQs:", err));
  }, []);

  const items = limit ? dataList.slice(0, limit) : dataList;

  return (
    <section className="py-12 sm:py-28">
      <Container className="max-w-3xl">
        {showTitle && (
          <SectionTitle
            eyebrow="FAQs"
            title="Questions we hear often"
            align="center"
            className="mx-auto"
          />
        )}

        {items.length > 0 ? (
          <Accordion type="single" collapsible className="mt-12">
            {items.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-left font-display text-base font-semibold text-foreground hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="mt-12 space-y-4">
            {[...Array(limit || 4)].map((_, i) => (
              <div
                key={i}
                className="h-14 rounded-xl bg-card border border-border/50 animate-pulse px-4 flex items-center"
              >
                <div className="h-4 w-3/4 bg-muted rounded" />
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
