"use client";

import { Container } from "@/components/common/container";
import { SectionTitle } from "@/components/common/section-title";
import { fadeUp, staggerContainer, staggerItem, viewport } from "@/lib/animations";
import { motion } from "framer-motion";
import { Clock, Gem, ShieldCheck, Users } from "lucide-react";
import Image from "next/image";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Engineered, Not Guessed",
    description: "Every structure is calculated by our in-house engineering team before construction starts.",
  },
  {
    icon: Users,
    title: "One Studio, Every Discipline",
    description: "Pool, landscape, lighting, and carpentry teams work from a single coordinated plan.",
  },
  {
    icon: Gem,
    title: "Material-First Design",
    description: "We choose finishes for how they age in this climate, not just how they look on day one.",
  },
  {
    icon: Clock,
    title: "Fixed Timelines",
    description: "You get a project schedule up front, with weekly updates as work progresses.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      {/* Top Wave SVG Divider */}
      <div className="w-full overflow-hidden leading-none pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 125"
          preserveAspectRatio="none"
          className="w-full h-12 sm:h-16 md:h-24 lg:h-28 block fill-background"
          aria-hidden="true"
        >
          <path
            d="M 0 125 L 0.0 62.5 L 15.0 60.0 L 30.0 57.6 L 45.0 55.2 L 60.0 53.1 L 75.0 51.2 L 90.0 49.6 L 105.0 48.2 L 120.0 47.3 L 135.0 46.7 L 150.0 46.5 L 165.0 46.7 L 180.0 47.3 L 195.0 48.2 L 210.0 49.6 L 225.0 51.2 L 240.0 53.1 L 255.0 55.2 L 270.0 57.6 L 285.0 60.0 L 300.0 62.5 L 315.0 65.0 L 330.0 67.4 L 345.0 69.8 L 360.0 71.9 L 375.0 73.8 L 390.0 75.4 L 405.0 76.8 L 420.0 77.7 L 435.0 78.3 L 450.0 78.5 L 465.0 78.3 L 480.0 77.7 L 495.0 76.8 L 510.0 75.4 L 525.0 73.8 L 540.0 71.9 L 555.0 69.8 L 570.0 67.4 L 585.0 65.0 L 600.0 62.5 L 615.0 60.0 L 630.0 57.6 L 645.0 55.2 L 660.0 53.1 L 675.0 51.2 L 690.0 49.6 L 705.0 48.2 L 720.0 47.3 L 735.0 46.7 L 750.0 46.5 L 765.0 46.7 L 780.0 47.3 L 795.0 48.2 L 810.0 49.6 L 825.0 51.2 L 840.0 53.1 L 855.0 55.2 L 870.0 57.6 L 885.0 60.0 L 900.0 62.5 L 915.0 65.0 L 930.0 67.4 L 945.0 69.8 L 960.0 71.9 L 975.0 73.8 L 990.0 75.4 L 1005.0 76.8 L 1020.0 77.7 L 1035.0 78.3 L 1050.0 78.5 L 1065.0 78.3 L 1080.0 77.7 L 1095.0 76.8 L 1110.0 75.4 L 1125.0 73.8 L 1140.0 71.9 L 1155.0 69.8 L 1170.0 67.4 L 1185.0 65.0 L 1200.0 62.5 L 1200 125 Z"
            transform="scale(1,-1) translate(0,-125)"
          />
        </svg>
      </div>

      <Container className="grid items-center gap-14 lg:grid-cols-2 py-12 sm:py-16">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="relative aspect-[4/5] overflow-hidden rounded-lg"
        >
          <Image
            src="https://i.pinimg.com/1200x/f1/78/08/f1780840d9d18b94504d35b8ee87ae2a.jpg"
            alt="Landscaped villa garden with pool"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </motion.div>

        <div>
          <SectionTitle
            eyebrow="Why Choose Us"
            title="Fourteen years of building outdoor spaces that hold up"
            description="We've built our studio around getting the unglamorous parts right — engineering, drainage, and material selection — so the finished space stays beautiful for years, not one season."
            light
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-10 grid gap-6 sm:grid-cols-2"
          >
            {reasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <motion.div key={reason.title} variants={staggerItem} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-foreground/10 text-secondary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-base text-primary-foreground">{reason.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-primary-foreground/75">
                      {reason.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Container>

      {/* Bottom Wave SVG Divider */}
      <div className="relative z-10 w-full overflow-hidden leading-none -mb-px pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 125"
          preserveAspectRatio="none"
          className="w-full h-12 sm:h-16 md:h-24 lg:h-28 block fill-background"
          aria-hidden="true"
        >
          <path
            d="M 0 125 L 0.0 62.5 L 15.0 60.0 L 30.0 57.6 L 45.0 55.2 L 60.0 53.1 L 75.0 51.2 L 90.0 49.6 L 105.0 48.2 L 120.0 47.3 L 135.0 46.7 L 150.0 46.5 L 165.0 46.7 L 180.0 47.3 L 195.0 48.2 L 210.0 49.6 L 225.0 51.2 L 240.0 53.1 L 255.0 55.2 L 270.0 57.6 L 285.0 60.0 L 300.0 62.5 L 315.0 65.0 L 330.0 67.4 L 345.0 69.8 L 360.0 71.9 L 375.0 73.8 L 390.0 75.4 L 405.0 76.8 L 420.0 77.7 L 435.0 78.3 L 450.0 78.5 L 465.0 78.3 L 480.0 77.7 L 495.0 76.8 L 510.0 75.4 L 525.0 73.8 L 540.0 71.9 L 555.0 69.8 L 570.0 67.4 L 585.0 65.0 L 600.0 62.5 L 615.0 60.0 L 630.0 57.6 L 645.0 55.2 L 660.0 53.1 L 675.0 51.2 L 690.0 49.6 L 705.0 48.2 L 720.0 47.3 L 735.0 46.7 L 750.0 46.5 L 765.0 46.7 L 780.0 47.3 L 795.0 48.2 L 810.0 49.6 L 825.0 51.2 L 840.0 53.1 L 855.0 55.2 L 870.0 57.6 L 885.0 60.0 L 900.0 62.5 L 915.0 65.0 L 930.0 67.4 L 945.0 69.8 L 960.0 71.9 L 975.0 73.8 L 990.0 75.4 L 1005.0 76.8 L 1020.0 77.7 L 1035.0 78.3 L 1050.0 78.5 L 1065.0 78.3 L 1080.0 77.7 L 1095.0 76.8 L 1110.0 75.4 L 1125.0 73.8 L 1140.0 71.9 L 1155.0 69.8 L 1170.0 67.4 L 1185.0 65.0 L 1200.0 62.5 L 1200 125 Z"
          />
        </svg>
      </div>
    </section>
  );
}
