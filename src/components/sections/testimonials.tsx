"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/common/container";
import { SectionTitle } from "@/components/common/section-title";
import { TestimonialCard } from "@/components/cards/testimonial-card";
import type { Testimonial } from "@/types";
import type { TestimonialItem } from "@/types/testimonial";
import {
  convertTestimonialItemToTestimonial,
  defaultTestimonials,
} from "@/data/testimonials";
import { fetchTestimonialsData } from "@/lib/api/testimonials";

interface TestimonialsProps {
  initialTestimonials?: Testimonial[];
  eyebrow?: string;
  title?: string;
  align?: "left" | "center";
}

export function Testimonials({
  initialTestimonials,
  eyebrow = "Testimonials",
  title = "Words From Our Customers",
  align = "left",
}: TestimonialsProps) {
  const [dataList, setDataList] = React.useState<Testimonial[]>(() => {
    if (initialTestimonials && initialTestimonials.length > 0) {
      return initialTestimonials;
    }
    return defaultTestimonials;
  });

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 3500, stopOnInteraction: false })],
  );

  const scrollPrev = React.useCallback(
    () => emblaApi?.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = React.useCallback(
    () => emblaApi?.scrollNext(),
    [emblaApi],
  );
  const scrollTo = React.useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  React.useEffect(() => {
    fetchTestimonialsData()
      .then((json) => {
        if (json.data && Array.isArray(json.data) && json.data.length > 0) {
          const mapped = json.data.map((item: TestimonialItem) =>
            convertTestimonialItemToTestimonial(item),
          );
          setDataList(mapped);
        }
      })
      .catch((err) =>
        console.error("Failed to fetch client testimonials:", err),
      );
  }, []);

  if (!dataList || dataList.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-24 bg-muted/20 border-t border-border/50">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionTitle
            eyebrow={eyebrow}
            title={title}
            align={align}
          />
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background transition-colors hover:bg-[#71a600] hover:text-white hover:border-[#71a600]"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background transition-colors hover:bg-[#71a600] hover:text-white hover:border-[#71a600]"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-10 overflow-hidden" ref={emblaRef}>
          <div className="-ml-6 flex items-stretch">
            {dataList.map((testimonial) => (
              <div
                key={testimonial.id}
                className="min-w-0 shrink-0 grow-0 basis-full pl-6 sm:basis-1/2 lg:basis-1/3 flex flex-col"
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Pagination Bullets */}
        <div className="mt-8 flex justify-center items-center gap-2">
          {dataList.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => scrollTo(idx)}
              className={`h-2 transition-all duration-300 rounded-full ${
                selectedIndex === idx
                  ? "w-8 bg-[#71a600]"
                  : "w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

