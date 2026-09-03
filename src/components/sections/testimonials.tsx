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
import { convertTestimonialItemToTestimonial } from "@/data/testimonials";
import { fetchTestimonialsData } from "@/lib/api/testimonials";

interface TestimonialsProps {
  initialTestimonials?: Testimonial[];
}

export function Testimonials({ initialTestimonials }: TestimonialsProps) {
  const [dataList, setDataList] = React.useState<Testimonial[]>(
    initialTestimonials || [],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 3000 })],
  );

  const scrollPrev = React.useCallback(
    () => emblaApi?.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = React.useCallback(
    () => emblaApi?.scrollNext(),
    [emblaApi],
  );

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
    <section className="py-12 sm:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionTitle
            eyebrow="Client Stories"
            title="What it's like to work with us"
          />
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-primary/5"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-primary/5"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-12 overflow-hidden" ref={emblaRef}>
          <div className="-ml-6 flex">
            {dataList.map((testimonial) => (
              <div
                key={testimonial.id}
                className="min-w-0 shrink-0 grow-0 basis-full pl-6 sm:basis-1/2 lg:basis-1/3"
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
