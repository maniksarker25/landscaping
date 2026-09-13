"use client";

import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { heroSlides } from "@/data/hero-slides";
import { stats } from "@/data/stats";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";
import { cn } from "@/lib/utils";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

const SLIDE_DURATION = 6000; // ms per slide

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const slideCount = heroSlides.length;

  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["0%", "10%"]
  );

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

  const prevSlide = () => goTo(active - 1);
  const nextSlide = () => goTo(active + 1);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-primary text-primary-foreground min-h-[calc(100vh_-_10vh)] flex flex-col justify-between"
    >
      {/* Background Image Carousel with Lightweight GPU-Accelerated Parallax */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 z-0 h-[112%] transform-gpu will-change-transform pointer-events-none"
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured pool and landscape projects"
      >
        {heroSlides.map((slide, index) => {
          const isActive = index === active;
          return (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, scale: 1 }}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1.08 : 1.02,
              }}
              transition={{
                opacity: { duration: 1.5, ease: "easeInOut" },
                scale: { duration: SLIDE_DURATION / 1000 + 1, ease: "easeOut" },
              }}
              className="absolute inset-0 h-full w-full pointer-events-none"
              aria-hidden={!isActive}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                className="object-cover object-center"
                sizes="100vw"
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Hero Content Container */}
      <Container className="relative z-10 flex-1 flex flex-col justify-center pt-16 pb-12 md:pt-24 md:pb-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-5xl bg-white/50 backdrop-blur-sm p-4 relative border-2 border-primary"
        >
          <div className="w-4 h-4 bg-primary absolute -right-2 -top-2"></div>
          <div className="w-4 h-4 bg-primary absolute -left-2 -top-2"></div>
          <div className="w-4 h-4 bg-primary absolute -right-2 -bottom-2"></div>
          <div className="w-4 h-4 bg-primary absolute -left-2 -bottom-2"></div>
          {/* Main Top Eyebrow Heading */}
          <motion.div variants={staggerItem} className="mb-4">
            <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wide text-black">
              TOP RATED GARDEN, LANDSCAPING & LAWN CARE SERVICES IN DUBAI
            </span>
          </motion.div>

          {/* Second Heading (H1) */}
          <motion.h1
            variants={staggerItem}
            className="font-display text-3xl font-extrabold leading-[1.1] sm:text-4xl lg:text-5xl text-black tracking-tight drop-shadow-sm"
          >
            SWIMMING POOL CONSTRUCTION &amp; MAINTENANCE
          </motion.h1>

          {/* Subtext Paragraph */}
          <motion.p
            variants={staggerItem}
            className="mt-6 max-w-3xl text-sm sm:text-base lg:text-lg leading-relaxed text-black font-normal"
          >
            Searching for a trusted swimming pool and landscaping company in
            Dubai, UAE? Welcome to{" "}
            <strong className="font-semibold text-black">
              Dream Floor Landscaping LLC
            </strong>
            . Dream Floor specializes in swimming pool construction, pool
            maintenance, landscaping, outdoor living solutions, irrigation
            systems, pergolas, gazebos, BBQ areas, water features, and complete
            garden transformations. We deliver high-quality outdoor solutions
            designed to enhance residential properties across Dubai.
          </motion.p>

          {/* CTA Action Buttons */}
          <motion.div
            variants={staggerItem}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Button
              asChild
              size="lg"
              className="bg-[#1662a9] text-white font-bold hover:bg-secondary/90 shadow-lg hover:shadow-xl transition-all text-xs sm:text-sm uppercase tracking-wider px-6 sm:px-8 py-3 h-auto"
            >
              <Link href="/contact" className="flex items-center gap-2">
                GET A FREE QUOTE
                <ArrowRight className="h-4.5 w-4.5" aria-hidden="true" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-black/30 text-black bg-white/10 hover:bg-white/20 backdrop-blur-md text-xs sm:text-sm font-semibold uppercase tracking-wider px-6 py-3 h-auto"
            >
              <Link href="/projects">View Our Work</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Interactive Slider Navigation & Indicators */}
        {/* {slideCount > 1 && (
          <div className="mt-10 flex items-center justify-between gap-4 max-w-4xl">
            <div className="flex items-center gap-2.5 flex-1 max-w-xs">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Show slide ${index + 1} of ${slideCount}`}
                  aria-current={index === active}
                  className="group relative h-2 flex-1 overflow-hidden rounded-full bg-primary-foreground/25 transition-all hover:bg-primary-foreground/40"
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

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous slide"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/25 hover:scale-105 active:scale-95"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next slide"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/25 hover:scale-105 active:scale-95"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )} */}

        {/* Stats Strip */}
        {/* <motion.dl
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-8 grid grid-cols-2 hidden sm:grid sm:grid-cols-4 gap-4 border rounded-xl bg-white/10 border-primary-foreground/15 p-4 sm:p-5 backdrop-blur-md"
        >
          {stats.map((stat) => (
            <div key={stat.id}>
              <dt className="text-xs uppercase tracking-wider font-semibold text-primary-foreground/70">
                {stat.label}
              </dt>
              <dd className="mt-1 font-display text-2xl sm:text-3xl font-extrabold text-secondary">
                {stat.value}
                {stat.suffix}
              </dd>
            </div>
          ))}
        </motion.dl> */}
      </Container>

      {/* Curved SVG Bottom Divider */}
      <div className="relative z-10 w-full overflow-hidden leading-none -mb-px pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 125"
          preserveAspectRatio="none"
          className="w-full h-10 sm:h-14 md:h-20 lg:h-24 block fill-background"
          aria-hidden="true"
        >
          <path d="M 0 125 L 0.0 62.5 L 15.0 60.0 L 30.0 57.6 L 45.0 55.2 L 60.0 53.1 L 75.0 51.2 L 90.0 49.6 L 105.0 48.2 L 120.0 47.3 L 135.0 46.7 L 150.0 46.5 L 165.0 46.7 L 180.0 47.3 L 195.0 48.2 L 210.0 49.6 L 225.0 51.2 L 240.0 53.1 L 255.0 55.2 L 270.0 57.6 L 285.0 60.0 L 300.0 62.5 L 315.0 65.0 L 330.0 67.4 L 345.0 69.8 L 360.0 71.9 L 375.0 73.8 L 390.0 75.4 L 405.0 76.8 L 420.0 77.7 L 435.0 78.3 L 450.0 78.5 L 465.0 78.3 L 480.0 77.7 L 495.0 76.8 L 510.0 75.4 L 525.0 73.8 L 540.0 71.9 L 555.0 69.8 L 570.0 67.4 L 585.0 65.0 L 600.0 62.5 L 615.0 60.0 L 630.0 57.6 L 645.0 55.2 L 660.0 53.1 L 675.0 51.2 L 690.0 49.6 L 705.0 48.2 L 720.0 47.3 L 735.0 46.7 L 750.0 46.5 L 765.0 46.7 L 780.0 47.3 L 795.0 48.2 L 810.0 49.6 L 825.0 51.2 L 840.0 53.1 L 855.0 55.2 L 870.0 57.6 L 885.0 60.0 L 900.0 62.5 L 915.0 65.0 L 930.0 67.4 L 945.0 69.8 L 960.0 71.9 L 975.0 73.8 L 990.0 75.4 L 1005.0 76.8 L 1020.0 77.7 L 1035.0 78.3 L 1050.0 78.5 L 1065.0 78.3 L 1080.0 77.7 L 1095.0 76.8 L 1110.0 75.4 L 1125.0 73.8 L 1140.0 71.9 L 1155.0 69.8 L 1170.0 67.4 L 1185.0 65.0 L 1200.0 62.5 L 1200 125 Z" />
        </svg>
      </div>
    </section>
  );
}
