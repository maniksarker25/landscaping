"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";
import { stats } from "@/data/stats";
import { cn } from "@/lib/utils";
import { heroSlides } from "@/data/hero-slides";

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
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-black/0.5  backdrop-blur-sm" />
      </div>

      <Container className="relative flex min-h-[calc(100vh_-_15vh)] flex-col justify-end py-12 md:py-28">
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
            className="font-display text-4xl leading-[1.08] sm:text-5xl lg:text-6xl"
          >
            Pools & landscapes, <br className="hidden sm:block" />
            considered from the ground up.
          </motion.h1>
          <motion.p
            variants={staggerItem}
            className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/75 sm:text-lg"
          >
            We design and build swimming pools and gardens that are engineered
            for this climate and finished to last — from first sketch to the
            final walkthrough.
          </motion.p>
          <motion.div
            variants={staggerItem}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Button asChild size="lg" variant="accent">
              <Link href="/contact">
                Request a Quote
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <Link href="/projects">
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
          className="mt-6 grid grid-cols-2 gap-8 border-y border-primary-foreground/10 p-4 backdrop-blur-md sm:grid-cols-4"
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
    </section>
  );
}
