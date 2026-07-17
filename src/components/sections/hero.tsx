"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";
import { stats } from "@/data/stats";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=2000&auto=format&fit=crop"
          alt=""
          fill
          priority
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/40" />
      </div>

      <Container className="relative flex min-h-[88vh] flex-col justify-end pb-16 pt-40 sm:pb-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.span
            variants={staggerItem}
            className="mb-5 inline-block rounded-full border border-primary-foreground/20 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-secondary"
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
          <motion.div variants={staggerItem} className="mt-9 flex flex-wrap items-center gap-4">
            <Button asChild size="lg" variant="accent">
              <Link href="/contact">
                Request a Quote
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10">
              <Link href="/projects">
                <Play className="h-4 w-4" aria-hidden="true" />
                View Our Work
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        <motion.dl
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-16 grid grid-cols-2 gap-8 border-t border-primary-foreground/10 pt-8 sm:grid-cols-4"
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
