"use client";

import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { heroSlides } from "@/data/hero-slides";
import { stats } from "@/data/stats";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

const SLIDE_DURATION = 5000; // ms each slide stays on screen

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const slideCount = heroSlides.length;

  React.useEffect(() => {
    if (paused || prefersReducedMotion || slideCount <= 1) return;

    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % slideCount);
    }, SLIDE_DURATION);

    return () => window.clearInterval(id);
  }, [active, paused, prefersReducedMotion, slideCount]);

  React.useEffect(() => {
    const onVisibilityChange = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  const goTo = (index: number) =>
    setActive(((index % slideCount) + slideCount) % slideCount);

  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      <div
        className="absolute inset-0 "
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured pool and landscape projects"
      >
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-all duration-[2s] ease-out",
              index === active ? "opacity-90" : "opacity-0",
            )}
            aria-hidden={index !== active}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-primary/30" />
      </div>
      <Container className="relative flex min-h-[calc(100vh_-_15vh)] flex-col justify-end pt-12 pb-16 md:pt-28 md:pb-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.span
            variants={staggerItem}
            className="mb-5 inline-block rounded-full border border-primary-foreground/20 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white backdrop-blur-md"
          >
            Pool & Landscape Studio &middot; UAE
          </motion.span>
          <motion.h1
            variants={staggerItem}
            className="font-display text-3xl leading-[1.08] sm:text-5xl lg:text-6xl"
          >
            Leading Landscaping &<br className="hidden sm:block" />
            Swimming Pool Specialists in Dubai
          </motion.h1>
          <motion.p
            variants={staggerItem}
            className="mt-6 max-w-xl text-sm md:text-base leading-relaxed text-primary-foreground/75 sm:text-lg"
          >
            We design and build swimming pools and gardens that are engineered
            for this climate and finished to last — from first sketch to the
            final walkthrough.
          </motion.p>
          <motion.div
            variants={staggerItem}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Button asChild size="sm" variant="accent">
              <Link href="/contact" className="text-xs md:text-base">
                Request a Quote
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant="ghost"
              className="bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <Link href="/projects" className="text-xs md:text-base">
                <Play className="h-4 w-4" aria-hidden="true" />
                View Our Work
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {slideCount > 1 && (
          <div className="mt-10 flex items-center gap-2.5">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Show slide ${index + 1} of ${slideCount}`}
                aria-current={index === active}
                className="group relative h-1.5 flex-1 max-w-10 overflow-hidden rounded-full bg-primary-foreground/25"
              >
                {index === active && (
                  <motion.span
                    key={active}
                    className="absolute inset-y-0 left-0 rounded-full bg-secondary"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration:
                        paused || prefersReducedMotion
                          ? 0
                          : SLIDE_DURATION / 1000,
                      ease: "linear",
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        )}

        <motion.dl
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-6 md:grid grid-cols-2 hidden gap-8 border rounded-md bg-white/10 border-primary-foreground/10 p-4 backdrop-blur-md sm:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.id}>
              <dt className="text-xs uppercase tracking-wide text-primary-foreground/60">
                {stat.label}
              </dt>
              <dd className="mt-1 font-display text-3xl text-secondary">
                {stat.value}
                {stat.suffix}
              </dd>
            </div>
          ))}
        </motion.dl>
      </Container>

      {/* Curved SVG Bottom Divider */}
      <div className="relative z-10 w-full overflow-hidden leading-none -mb-px pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 125"
          preserveAspectRatio="none"
          className="w-full h-12 sm:h-16 md:h-24 lg:h-28 block fill-background"
          aria-hidden="true"
        >
          <path d="M 0 125 L 0.0 62.5 L 15.0 60.0 L 30.0 57.6 L 45.0 55.2 L 60.0 53.1 L 75.0 51.2 L 90.0 49.6 L 105.0 48.2 L 120.0 47.3 L 135.0 46.7 L 150.0 46.5 L 165.0 46.7 L 180.0 47.3 L 195.0 48.2 L 210.0 49.6 L 225.0 51.2 L 240.0 53.1 L 255.0 55.2 L 270.0 57.6 L 285.0 60.0 L 300.0 62.5 L 315.0 65.0 L 330.0 67.4 L 345.0 69.8 L 360.0 71.9 L 375.0 73.8 L 390.0 75.4 L 405.0 76.8 L 420.0 77.7 L 435.0 78.3 L 450.0 78.5 L 465.0 78.3 L 480.0 77.7 L 495.0 76.8 L 510.0 75.4 L 525.0 73.8 L 540.0 71.9 L 555.0 69.8 L 570.0 67.4 L 585.0 65.0 L 600.0 62.5 L 615.0 60.0 L 630.0 57.6 L 645.0 55.2 L 660.0 53.1 L 675.0 51.2 L 690.0 49.6 L 705.0 48.2 L 720.0 47.3 L 735.0 46.7 L 750.0 46.5 L 765.0 46.7 L 780.0 47.3 L 795.0 48.2 L 810.0 49.6 L 825.0 51.2 L 840.0 53.1 L 855.0 55.2 L 870.0 57.6 L 885.0 60.0 L 900.0 62.5 L 915.0 65.0 L 930.0 67.4 L 945.0 69.8 L 960.0 71.9 L 975.0 73.8 L 990.0 75.4 L 1005.0 76.8 L 1020.0 77.7 L 1035.0 78.3 L 1050.0 78.5 L 1065.0 78.3 L 1080.0 77.7 L 1095.0 76.8 L 1110.0 75.4 L 1125.0 73.8 L 1140.0 71.9 L 1155.0 69.8 L 1170.0 67.4 L 1185.0 65.0 L 1200.0 62.5 L 1200 125 Z" />
        </svg>
      </div>
    </section>
  );
}
