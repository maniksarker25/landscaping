"use client";

import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { heroSlides } from "@/data/hero-slides";
import { toWhatsAppHref } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import type { LegalInfoData } from "@/lib/api/legal-info";
import { fetchLegalInfo } from "@/lib/api/legal-info";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

const SLIDE_DURATION = 6000; // ms per slide

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [legalInfo, setLegalInfo] = React.useState<LegalInfoData | null>(null);
  const slideCount = heroSlides.length;
  const currentSlide = heroSlides[active] ?? heroSlides[0];

  React.useEffect(() => {
    fetchLegalInfo()
      .then((json) => {
        if (json.data) {
          setLegalInfo(json.data);
        }
      })
      .catch((err) =>
        console.error("Failed to fetch legal info for hero:", err),
      );
  }, []);

  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["0%", "10%"],
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

  const phone = legalInfo?.contactPhone || siteConfig.phone;
  const whatsappUrl = toWhatsAppHref(phone);

  if (!currentSlide) return null;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-primary text-primary-foreground flex flex-col"
    >
      {/* ── Hero Slide Area ── */}
      <div className="relative min-h-[55vh] sm:min-h-[70vh] md:min-h-[60vh] flex flex-col justify-center">
        {/* Background Image Carousel with Parallax */}
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 z-0 h-[112%] transform-gpu will-change-transform pointer-events-none overflow-hidden"
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
                  scale: isActive ? 1.08 : 1,
                }}
                transition={{
                  opacity: { duration: 1.2, ease: "easeInOut" },
                  scale: { duration: SLIDE_DURATION / 1000 + 0.5, ease: "easeOut" },
                }}
                className="absolute inset-0 h-full w-full pointer-events-none transform-gpu"
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

        {/* Hero Content – left-aligned card with horizontal slide effect */}
        <Container className="relative z-10 flex flex-col justify-center py-12 md:py-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="max-w-2xl bg-white/70 p-6 sm:p-8 md:p-10 border-b-[10px] border-primary"
            >
              {/* Dynamic slide title */}
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-2xl font-semibold leading-tight sm:text-3xl lg:text-4xl text-black tracking-tight"
              >
                {currentSlide.title ??
                  "Swimming Pools, Landscaping & Outdoor Living"}
              </motion.h1>

              {/* Dynamic slide subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
                className="mt-3 text-sm sm:text-base font-semibold text-black/75 leading-relaxed"
              >
                {currentSlide.subtitle ??
                  "Transforming outdoor spaces with expertly designed pools, landscapes, and outdoor features."}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 flex flex-wrap items-center gap-3"
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-primary rounded-none text-white font-bold shadow-lg hover:bg-primary/90 hover:shadow-xl transition-all text-xs sm:text-sm uppercase tracking-wider px-6 sm:px-8 py-3 h-auto"
                >
                  <Link href="/contact" className="flex items-center gap-2">
                    GET A FREE QUOTE
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-none border-black/30 text-black bg-white/10 hover:bg-white/30 backdrop-blur-sm text-xs sm:text-sm font-semibold uppercase tracking-wider px-6 py-3 h-auto"
                >
                  <Link href="/projects">View Our Work</Link>
                </Button>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Slide Dot Indicators – centered at the bottom of the image */}
          {slideCount > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Show slide ${index + 1} of ${slideCount}`}
                  aria-current={index === active}
                  className={`transition-all duration-300 rounded-full ${index === active
                    ? "w-8 h-2 bg-white"
                    : "w-2 h-2 bg-white/50 hover:bg-white/75"
                    }`}
                />
              ))}
            </div>
          )}
        </Container>
      </div>

      {/* ── WhatsApp CTA Bar ── */}
      <div className="relative z-10 bg-primary">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4 py-5 sm:py-6 text-white text-center">
          <p className="font-bold text-base sm:text-lg leading-snug">
            Are You Looking for a Swimming Pool and Landscaping Contractor?
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 whitespace-nowrap bg-white text-gray-900 font-semibold text-sm px-5 py-2.5 rounded-sm hover:bg-gray-100 transition-colors shadow"
          >
            WhatsApp Us
          </a>
        </div>

        {/* Wavy white bottom divider */}
        <div className="relative w-full overflow-hidden leading-none -mb-px pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 80"
            preserveAspectRatio="none"
            className="w-full h-10 sm:h-14 md:h-16 block fill-background"
            aria-hidden="true"
          >
            <path d="M0,40 C150,80 350,0 600,40 C850,80 1050,0 1200,40 L1200,80 L0,80 Z" />
          </svg>
        </div>
      </div>
    </section>
  );
}
