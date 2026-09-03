"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { getMapEmbedUrl } from "@/lib/utils";
import type { LegalInfoData } from "@/lib/api/legal-info";
import { fetchLegalInfo } from "@/lib/api/legal-info";
import { Map } from "lucide-react";

export function LocationMap() {
  const [isInteractive, setIsInteractive] = useState(false);
  const [legalInfo, setLegalInfo] = useState<LegalInfoData | null>(null);

  useEffect(() => {
    fetchLegalInfo()
      .then((json) => {
        if (json.data) {
          setLegalInfo(json.data);
        }
      })
      .catch((err) =>
        console.error("Failed to fetch legal info for location map:", err),
      );
  }, []);

  const address = legalInfo?.registeredAddress || siteConfig.address;
  const mapEmbedUrl = getMapEmbedUrl(address);

  return (
    <section
      className="relative w-full h-[400px] overflow-hidden group"
      onMouseLeave={() => setIsInteractive(false)}
    >
      {/* Map iframe */}
      <div className="absolute inset-0 w-full h-full">
        <iframe
          src={mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Location Map"
        />
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/5 to-transparent pointer-events-none" />

      {/* Interaction Overlay */}
      {!isInteractive && (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer transition-colors bg-transparent"
          onClick={() => setIsInteractive(true)}
        >
          <Button className="shadow-xl backdrop-blur-md text-black bg-background/90 hover:bg-background pointer-events-none transition-transform group-hover:-translate-y-1">
            <Map className="w-4 h-4 mr-2" />
            Click to interact
          </Button>
        </div>
      )}
    </section>
  );
}
