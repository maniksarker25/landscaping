"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { WaveDivider } from "@/components/common/wave-divider";
import { fadeUp, viewport } from "@/lib/animations";
import { siteConfig } from "@/config/site";

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-primary py-24 text-primary-foreground sm:py-28">
      <WaveDivider className="absolute top-0 text-primary-foreground" />
      <Container className="relative">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-display text-3xl leading-tight sm:text-4xl">
            Ready to start planning your outdoor space?
          </h2>
          <p className="mt-4 text-primary-foreground/70">
            Tell us about your project and we&apos;ll arrange a site visit within the week.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" variant="accent">
              <Link href="/contact">
                Request a Quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <a href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`}>{siteConfig.phone}</a>
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
