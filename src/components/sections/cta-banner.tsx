"use client";

import { Container } from "@/components/common/container";
import { WaveDivider } from "@/components/common/wave-divider";
import { Button } from "@/components/ui/button";
import { fadeUp, viewport } from "@/lib/animations";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-primary py-10 sm:py-12 text-primary-foreground">
      <WaveDivider className="absolute top-0 text-primary-foreground opacity-30" />
      <Container className="relative">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-display text-2xl leading-tight sm:text-3xl font-bold">
            Ready to start planning your outdoor space?
          </h2>
          <p className="mt-2.5 text-xs sm:text-sm text-primary-foreground/80">
            Tell us about your project and we&apos;ll arrange a site visit within the week.
          </p>
          <div className="mt-5 flex items-center justify-center">
            <Button asChild size="lg" variant="accent" className="font-bold shadow-md">
              <Link href="/contact" className="inline-flex items-center gap-2">
                Request a Quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
