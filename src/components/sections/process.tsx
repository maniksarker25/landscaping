"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/common/container";
import { SectionTitle } from "@/components/common/section-title";
import { processSteps } from "@/data/process";
import { fadeUp, viewport } from "@/lib/animations";

export function Process() {
  return (
    <section className="py-24 sm:py-28">
      <Container>
        <SectionTitle
          eyebrow="Our Process"
          title="A clear path from first call to final walkthrough"
          align="center"
          className="mx-auto"
        />

        <div className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          <div
            className="absolute top-6 left-0 right-0 hidden h-px bg-border lg:block"
            aria-hidden="true"
          />
          {processSteps.map((step, index) => (
            <motion.div
              key={step.step}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              transition={{ delay: index * 0.08 }}
              className="relative"
            >
              <span className="relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-background font-display text-sm text-accent">
                {step.step}
              </span>
              <h3 className="mt-5 font-display text-lg">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
