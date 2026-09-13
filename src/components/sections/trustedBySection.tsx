"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";
import { Container } from "../common/container";
import { motion } from "framer-motion";

interface Brand {
  name: string;
  logo: string;
  width: number;
  height: number;
  className: string;
}

// Exactly ordered as in the design: Invest Group, Jumeirah, Damac Hills, Emaar, Nakheel
const BRANDS: Brand[] = [
  {
    name: "Invest Group Overseas",
    logo: "/images/trust-brand/invest_group.png",
    width: 260,
    height: 220,
    className: "h-14 sm:h-16 lg:h-18",
  },
  {
    name: "Jumeirah",
    logo: "/images/trust-brand/jumeirah-logo.webp",
    width: 260,
    height: 90,
    className: "h-9 sm:h-11 lg:h-12",
  },
  {
    name: "Damac Hills",
    logo: "/images/trust-brand/damac-hills.png",
    width: 260,
    height: 80,
    className: "h-8 sm:h-10 lg:h-11",
  },
  {
    name: "Emaar",
    logo: "/images/trust-brand/emaap.jpg",
    width: 260,
    height: 80,
    className: "h-9 sm:h-10 lg:h-12",
  },
  {
    name: "Nakheel",
    logo: "/images/trust-brand/nakheel.webp",
    width: 260,
    height: 220,
    className: "h-14 sm:h-16 lg:h-18",
  },
];

export function TrustedBySection() {
  return (
    <section className="py-14 sm:py-20 bg-white relative overflow-hidden">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1f242e] tracking-tight">
            Trusted By
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-gray-500 font-normal leading-relaxed">
            Our prestigious clients who believes in our high standards of
            services.
          </p>
        </motion.div>
      </Container>

      {/* Marquee Slider */}
      <div className="relative w-full overflow-hidden">
        {/* Soft edge fades */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-10 bg-gradient-to-r from-white to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-10 bg-gradient-to-l from-white to-transparent"
          aria-hidden="true"
        />

        <Marquee
          speed={35}
          pauseOnHover={false}
          pauseOnClick={false}
          autoFill={true}
          className="flex items-center py-2 select-none"
        >
          {BRANDS.map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              className="mx-8 sm:mx-12 md:mx-16 lg:mx-20 flex items-center justify-center flex-shrink-0 cursor-pointer"
              title={brand.name}
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                width={brand.width}
                height={brand.height}
                className={`${brand.className} w-auto object-contain transition-transform duration-300 hover:scale-105`}
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

export default TrustedBySection;
