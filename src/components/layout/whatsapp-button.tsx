"use client";

import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { toWhatsAppHref } from "@/lib/utils";
import type { LegalInfoData } from "@/lib/api/legal-info";
import { fetchLegalInfo } from "@/lib/api/legal-info";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";

export function WhatsAppButton() {
  const [legalInfo, setLegalInfo] = React.useState<LegalInfoData | null>(null);

  React.useEffect(() => {
    fetchLegalInfo()
      .then((json) => {
        if (json.data) {
          setLegalInfo(json.data);
        }
      })
      .catch((err) =>
        console.error("Failed to fetch legal info for WhatsApp button:", err),
      );
  }, []);

  const phone = legalInfo?.contactPhone || siteConfig.phone;
  const whatsappUrl = toWhatsAppHref(phone);

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-xl transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-300 border border-emerald-100/60"
      aria-label="Chat with us on WhatsApp"
    >
      <WhatsAppIcon size={36} />
    </Link>
  );
}
