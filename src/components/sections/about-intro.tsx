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
      <section className="py-12 sm:py-24 overflow-hidden bg-background">
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
                  src="/images/about-intro-pool.jpg"
                  alt="Luxury swimming pool and landscape design in Dubai"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Experience Badge overlay on image */}
              <div className="absolute bottom-6 left-6 bg-primary text-primary-foreground p-4 rounded-lg shadow-xl flex items-center gap-3 border border-white/20">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white font-extrabold text-xl">
                  14+
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-white/80">
                    Industry Experience
                  </p>
                  <p className="text-sm font-extrabold text-white">
                    Over 14 Years of Experience
                  </p>
                </div>
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
                <span className="inline-block rounded-full bg-primary/10 px-3.5 py-1 text-xs sm:text-sm font-bold text-primary tracking-wide mb-3">
                  Over 14 Years of Experience
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-foreground leading-[1.25] tracking-tight">
                  Welcome to Dream Floor Landscaping
                </h2>
              </motion.div>

              <motion.div
                variants={staggerItem}
                className="mt-4 sm:mt-6 space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed"
              >
                <p>
                  Dream Floor Landscaping is a trusted provider of landscaping and outdoor living solutions across the UAE. We specialize in creating beautiful, functional, and well-maintained outdoor spaces that enhance the appearance and value of residential and commercial properties.
                </p>
                <p>
                  Our services include landscaping, swimming pool construction and maintenance, garden design, irrigation systems, water features, pergolas, gazebos, outdoor lighting, artificial grass installation, and general garden maintenance. With a skilled team and years of industry experience, we deliver tailored solutions that meet the unique requirements of every client.
                </p>
                <p>
                  At Dream Floor, we believe that every outdoor space should be both attractive and practical. From concept and design to installation and ongoing maintenance, we are committed to providing quality workmanship, reliable service, and attention to detail in every project we undertake.
                </p>
                <p>
                  Our success is built on customer satisfaction, professionalism, and a commitment to excellence. Whether you are looking to create a new outdoor space or upgrade an existing one, we are dedicated to bringing your vision to life.
                </p>
              </motion.div>

              <motion.div variants={staggerItem} className="mt-8">
                <Button asChild size="lg" className="rounded-md font-bold px-8 py-6 text-base shadow-md">
                  <Link href="/about" className="inline-flex items-center gap-2">
                    About Us
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </motion.div>

              {/* Mobile Only Image - Shown after About Us button on mobile */}
              <motion.div
                variants={staggerItem}
                className="block lg:hidden mt-8 relative aspect-[4/3] sm:aspect-[16/9] w-full rounded-xl overflow-hidden shadow-md"
              >
                <Image
                  src="/images/about-intro-pool.jpg"
                  alt="Luxury swimming pool and landscape design in Dubai"
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  );
}
