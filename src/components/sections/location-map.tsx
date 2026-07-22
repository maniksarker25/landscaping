"use client";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { Map } from "lucide-react";
import { useState } from "react";
// add comment for push
export function LocationMap() {
  const [isInteractive, setIsInteractive] = useState(false);

  return (
    <section
      className="relative w-full h-[400px] overflow-hidden group"
      onMouseLeave={() => setIsInteractive(false)}
    >
      {/* Map iframe */}
      <div className="absolute inset-0 w-full h-full">
        <iframe
          src={`https://maps.google.com/maps?q=${encodeURIComponent(siteConfig.address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Overlay gradient - optional but keeps it looking nice */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/5 to-transparent pointer-events-none" />

      {/* Interaction Overlay */}
      {!isInteractive && (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer transition-colors bg-transparent"
          onClick={() => setIsInteractive(true)}
        >
          <Button className="shadow-xl backdrop-blur-md  text-black bg-background/90 hover:bg-background pointer-events-none transition-transform group-hover:-translate-y-1">
            <Map className="w-4 h-4 mr-2" />
            Click to interact
          </Button>
        </div>
      )}
    </section>
  );
}
