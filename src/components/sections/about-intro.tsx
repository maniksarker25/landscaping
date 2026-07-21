"use client";

import { Container } from "@/components/common/container";
import { siteConfig } from "@/config/site";
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  viewport,
} from "@/lib/animations";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

export function AboutIntro() {
  return (
    <>
      {/* Main Content Section */}
      <section className="py-12 sm:py-32 overflow-hidden bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Image Side */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="relative"
            >
              <div className="relative aspect-[4/3] sm:aspect-[4/5] lg:aspect-square w-full rounded-xl overflow-hidden">
                <Image
                  src="https://i.pinimg.com/1200x/8a/ac/70/8aac706bc4423fb4173526652e3e4258.jpg"
                  alt="Luxurious swimming pool design in Dubai"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Decorative element */}
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10" />
              <div className="absolute -top-8 -left-8 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
            </motion.div>

            {/* Text Side */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="flex flex-col justify-center"
            >
              <motion.div variants={staggerItem}>
                <h2 className="text-xl sm:text-2xl lg:text-4xl font-display font-bold text-foreground leading-tight tracking-tight">
                  Searching For Swimming Pool And Landscaping Companies In
                  Dubai, UAE?
                </h2>
              </motion.div>

              <motion.div variants={staggerItem} className="mt-6">
                <h3 className="text-lg font-semibold text-secondary uppercase tracking-wide">
                  Welcome to {siteConfig.name}
                </h3>
              </motion.div>

              <motion.div
                variants={staggerItem}
                className="mt-6 space-y-6 text-muted-foreground leading-relaxed"
              >
                <p>
                  Are you seeking premium swimming pool and landscaping
                  companies in Dubai, UAE? If so, your search ends right here at{" "}
                  {siteConfig.name}. We proudly say that we're your premier
                  destination for creating stunning outdoor environments in
                  Dubai, Abu Dhabi, Sharjah, and all nearby areas. We specialize
                  in transforming ordinary spaces into extraordinary retreats.
                </p>
                <p>
                  Being the best is not a claim that we make out of thin air;
                  our track record speaks for it. Our portfolio showcases our
                  commitment to excellence and dedication to customer
                  satisfaction. Discover how we can bring your vision to life
                  with our expert pool construction and landscaping.
                </p>
              </motion.div>

              <motion.div
                variants={staggerItem}
                className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {[
                  "Expert Pool Construction",
                  "Premium Landscaping",
                  "Dedicated Maintenance",
                  "Customer Satisfaction",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center">
                      <CheckCircle2 className="h-5 w-5 text-secondary" />
                    </div>
                    <span className="font-medium text-foreground">
                      {feature}
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  );
}
