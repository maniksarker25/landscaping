"use client";

import Image from "next/image";
import { staggerItem } from "@/lib/animations";
import { Container } from "../common/container";
import { motion } from "framer-motion";

function TrustedBySection() {
  return (
    <>
      <section className="py-12 bg-background relative overflow-hidden">
        <Container>
          {/* Section Title */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
          >
            <motion.h2
              variants={staggerItem}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary tracking-tight uppercase"
            >
              Trusted By
            </motion.h2>
            <motion.p
              variants={staggerItem}
              className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed"
            >
              Our prestigious clients who believes in our high standards of services.
            </motion.p>
            <motion.div
              variants={staggerItem}
              className="w-16 h-1 bg-primary mx-auto mt-4"
            />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-16 w-max mx-auto">
            {/* Cell 1: Emaar */}
            <div className="hover:bg-slate-50 flex items-center justify-center h-24 sm:h-28 w-44 sm:w-64 border border-slate-200 border-t-0 border-l-0 p-2 sm:p-3">
              <Image
                src="/images/trust-brand/emaap.jpg"
                alt="Emaar Properties"
                width={220}
                height={80}
                className="max-h-20 sm:max-h-24 w-auto object-contain"
              />
            </div>

            {/* Cell 2: Damac */}
            <div className="hover:bg-slate-50 flex items-center justify-center h-24 sm:h-28 w-44 sm:w-64 border border-slate-200 border-t-0 border-x-0 md:border-r p-2 sm:p-3">
              <Image
                src="/images/trust-brand/damac-hills.png"
                alt="Damac Hills"
                width={220}
                height={80}
                className="max-h-20 sm:max-h-24 w-auto object-contain"
              />
            </div>

            {/* Cell 3: Nakheel */}
            <div className="hover:bg-slate-50 flex items-center justify-center h-24 sm:h-28 w-44 sm:w-64 border border-slate-200 border-t-0 border-x-0 md:border-r p-2 sm:p-3">
              <Image
                src="/images/trust-brand/nakheel.webp"
                alt="Nakheel"
                width={220}
                height={80}
                className="max-h-20 sm:max-h-24 w-auto object-contain"
              />
            </div>

            {/* Cell 4: Jumeirah */}
            <div className="hover:bg-slate-50 flex items-center justify-center h-24 sm:h-28 w-44 sm:w-64 border border-slate-200 border-t-0 border-x-0 lg:border-r p-2 sm:p-3">
              <Image
                src="/images/trust-brand/jumeirah-logo.webp"
                alt="Jumeirah Golf Estates"
                width={220}
                height={80}
                className="max-h-20 sm:max-h-24 w-auto object-contain"
              />
            </div>

            {/* Cell 5: Dubai Holding */}
            <div className="hover:bg-slate-50 flex items-center justify-center h-24 sm:h-28 w-44 sm:w-64 border border-slate-200 border-t-0 xl:border-r-0 p-2 sm:p-3">
              <Image
                src="/images/trust-brand/invest_group.png"
                alt="Dubai Holding"
                width={220}
                height={80}
                className="max-h-20 sm:max-h-24 w-auto object-contain"
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

export default TrustedBySection;
