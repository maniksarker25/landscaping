"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/common/container";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";

export function OurServicesSection() {
  const serviceCards = [
    {
      id: "swimming-pool",
      title: "SWIMMING POOL",
      description:
        "Experience premium swimming pool solutions designed to complement your lifestyle and property. We specialize in custom swimming pool construction, including Overflow Pools, Infinity Pools, and Skimmer Pools, tailored to your vision and requirements.",
      href: "/pools",
      image: "/images/hero2-bg.png",
      alt: "Custom Swimming Pool Construction in Dubai",
      badge: "Pool Construction & Maintenance",
    },
    {
      id: "landscaping",
      title: "LANDSCAPING & OUTDOOR LIVING",
      description:
        "Transform your outdoor space into a beautiful paradise with our landscaping and outdoor living services. From gardens, pergolas, and gazebos to complete outdoor transformations, we bring creativity, quality, and attention to detail to every project.",
      href: "/landscaping",
      image: "/images/hero1-bg.png",
      alt: "Landscaping & Outdoor Living Design in Dubai",
      badge: "Garden & Landscape Design",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-background relative overflow-hidden">
      <Container>
        {/* Section Title */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <motion.span
            variants={staggerItem}
            className="text-xs sm:text-sm font-bold uppercase tracking-widest text-primary mb-3 block"
          >
            What We Do
          </motion.span>
          <motion.h2
            variants={staggerItem}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary tracking-tight uppercase"
          >
            Our Services
          </motion.h2>
          <motion.div
            variants={staggerItem}
            className="w-16 h-1 bg-primary mx-auto mt-4"
          />
        </motion.div>

        {/* 2-Column Service Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10"
        >
          {serviceCards.map((card) => (
            <motion.div key={card.id} variants={staggerItem}>
              <Link
                href={card.href}
                className="group relative flex flex-col h-full overflow-hidden rounded-xl border border-border/70 bg-card  transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Badge */}
                  <span className="absolute top-4 left-4 z-10 rounded-full bg-primary/90 backdrop-blur-md px-3.5 py-1 text-xs font-semibold text-primary-foreground tracking-wider uppercase">
                    {card.badge}
                  </span>
                </div>

                {/* Content Container */}
                <div className="flex flex-col flex-1 p-6 sm:p-8 justify-between bg-card">
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-extrabold uppercase text-foreground group-hover:text-primary transition-colors duration-300">
                      {card.title}
                    </h3>
                    <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground font-normal">
                      {card.description}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center gap-2 font-bold text-sm uppercase tracking-wider text-primary">
                    <span>Explore Service</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
