"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/common/container";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";

export function OurServicesSection() {
  const serviceCards = [
    {
      id: "swimming-pool",
      title: "Swimming Pool",
      description:
        "Experience what true luxury feels with our bespoke swimming pool construction services. We specialize in Overflow Swimming Pools, Infinity Swimming Pools, and Skimmer Swimming Pools, ensuring each design is tailored to your specific requirements.",
      href: "/pools",
      image: "/images/hero2-bg.png",
      alt: "Custom Swimming Pool Construction in Dubai",
    },
    {
      id: "landscaping",
      title: "Landscaping & Outdoor Living",
      description:
        "Transform your outdoor space into a beautiful paradise with our landscaping and outdoor living services. From gardens, pergolas, and gazebos to complete outdoor transformations, we bring creativity, quality, and attention to detail to every project.",
      href: "/landscaping",
      image: "/images/hero1-bg.png",
      alt: "Landscaping & Outdoor Living Design in Dubai",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-background relative overflow-hidden">
      <Container>
        {/* Section Title & Description */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto mb-12 sm:mb-16 text-left lg:text-center"
        >
          <motion.span
            variants={staggerItem}
            className="text-base sm:text-lg font-bold text-primary mb-2 block"
          >
            Our Services
          </motion.span>
          <motion.h2
            variants={staggerItem}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mb-6"
          >
            What Exactly We Do?
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-base sm:text-lg leading-relaxed text-muted-foreground font-normal"
          >
            As one of the leading landscaping and swimming pool companies in Dubai, we offer a complete range of outdoor solutions to enhance the beauty and functionality of your property. From stunning swimming pools and lush gardens to elegant pergolas and outdoor living spaces, our team is committed to delivering high-quality workmanship and customized solutions. Whether you are looking to create a peaceful outdoor retreat or a stylish entertainment area, we have the expertise to bring your vision to life. Explore our services below and discover how we can transform your outdoor space.
          </motion.p>
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
                className="group relative flex flex-col h-full overflow-hidden rounded-2xl border border-border/50 bg-white shadow-md hover:shadow-xl transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                {/* Content Container */}
                <div className="flex flex-col flex-1 p-6 sm:p-8 bg-white">
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-black tracking-tight group-hover:text-primary transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-black/75 font-normal">
                    {card.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
