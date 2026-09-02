"use client";

import * as React from "react";
import { MapPin, Phone, Mail, MessageSquare } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn, toTelHref, toWhatsAppHref, getMapEmbedUrl } from "@/lib/utils";
import type { LegalInfoData } from "@/lib/api/legal-info";

interface ServiceBottomContactProps {
  className?: string;
}

export function ServiceBottomContact({ className }: ServiceBottomContactProps) {
  const [legalInfo, setLegalInfo] = React.useState<LegalInfoData | null>(null);

  React.useEffect(() => {
    fetch("/api/legal-info/get")
      .then((res) => res.json())
      .then((json) => {
        if (json.data) {
          setLegalInfo(json.data);
        }
      })
      .catch((err) =>
        console.error("Failed to fetch legal info for service bottom contact:", err),
      );
  }, []);

  const phone = legalInfo?.contactPhone || siteConfig.phone;
  const email = legalInfo?.contactEmail || siteConfig.email;
  const address = legalInfo?.registeredAddress || siteConfig.address;
  const whatsappUrl = toWhatsAppHref(phone);

  return (
    <div className={cn("my-16 space-y-8 rounded-2xl bg-card p-6 sm:p-10 border border-border/80 shadow-md", className)}>
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-primary">
          Contact Us
        </span>
        <h2 className="font-display text-3xl font-bold tracking-tight text-primary">
          How To Find Us?
        </h2>
        <p className="text-sm text-muted-foreground">
          Visit our Dubai office or get in touch with our design and construction team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Contact Info Items */}
        <div className="space-y-6">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border/60 transition-all hover:border-primary/40">
            <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground">Office Address</h4>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                {address}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border/60 transition-all hover:border-primary/40">
            <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground">Phone Support</h4>
              <a
                href={toTelHref(phone)}
                className="text-xs sm:text-sm text-primary font-semibold hover:underline block mt-0.5"
              >
                {phone}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border/60 transition-all hover:border-primary/40">
            <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground">Email Inquiry</h4>
              <a
                href={`mailto:${email}`}
                className="text-xs sm:text-sm text-primary font-semibold hover:underline block mt-0.5"
              >
                {email}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 transition-all hover:border-emerald-300 dark:bg-emerald-950/40 dark:border-emerald-900">
            <div className="h-10 w-10 shrink-0 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-emerald-950 dark:text-emerald-300">WhatsApp Chat</h4>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-400 font-bold hover:underline block mt-0.5"
              >
                Click to Chat on WhatsApp ({phone})
              </a>
            </div>
          </div>
        </div>

        {/* Embedded Interactive Map */}
        <div className="h-[320px] sm:h-[380px] w-full overflow-hidden rounded-xl border border-border shadow-inner relative">
          <iframe
            src={getMapEmbedUrl(address)}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location Map"
          />
        </div>
      </div>
    </div>
  );
}
