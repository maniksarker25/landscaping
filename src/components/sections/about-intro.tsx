"use client";

import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  viewport,
} from "@/lib/animations";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function AboutIntro() {
  return (
    <>
      {/* Main Content Section */}
      <section className="py-12 sm:py-28 overflow-hidden bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Image Side - Hidden on mobile, visible on desktop */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="hidden lg:block relative"
            >
              <div className="relative aspect-[4/3] sm:aspect-[4/5] lg:aspect-square w-full rounded-xl overflow-hidden shadow-lg">
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
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-foreground leading-[1.25] tracking-tight">
                  Searching for a trusted swimming pool and landscaping company
                  in Dubai, UAE?
                </h2>
              </motion.div>

              <motion.div variants={staggerItem} className="mt-5 sm:mt-6">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-primary tracking-wide">
                  Welcome to Dream Floor Landscaping LLC.
                </h3>
              </motion.div>

              <motion.div
                variants={staggerItem}
                className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl font-medium text-foreground/85 leading-relaxed"
              >
                <p>
                  We specialize in luxury swimming pool construction, custom landscaping,
                  and complete outdoor living transformations across Dubai. From concept to
                  handover, we turn ordinary spaces into extraordinary retreats.
                </p>
              </motion.div>

              <motion.div variants={staggerItem} className="mt-8 sm:mt-10">
                <Button asChild size="lg" className="rounded-md font-bold px-8 py-6 text-base shadow-md">
                  <Link href="/about" className="inline-flex items-center gap-2">
                    About Us
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  );
}
