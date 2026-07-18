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
    <section className="bg-muted/50 py-24 sm:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-2">
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
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/5 text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-base">{reason.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {reason.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
