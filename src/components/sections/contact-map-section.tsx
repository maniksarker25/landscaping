"use client";

import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ContactInfoItem {
  address?: string;
  phones?: string[];
  email?: string;
}

export interface ContactMapSectionProps {
  categoryTitle?: string;
  title?: string;
  subtitle?: string;
  contact?: ContactInfoItem;
  mapEmbedUrl?: string;
  className?: string;
}

export function ContactMapSection({
  categoryTitle = "Contacts",
  title = "How To Find Us?",
  subtitle = "contact us now",
  contact = {
    address: "301 - Building 5, Al Quoz 3, Dubai - UAE",
    phones: ["+971 4343 9090", "+971 55 188 9009", "+971 55 188 9002"],
    email: "info@poolsgardensuae.com",
  },
  mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14447.886022872322!2d55.2341258!3d25.1366114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6966607e0c8b%3A0xbcf2392762a4d334!2sAl%20Quoz%203%20-%20Dubai!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae",
  className,
}: ContactMapSectionProps) {
  return (
    <section className={cn("w-full py-10 font-sans", className)}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Contact details */}
        <div className="lg:col-span-4 flex flex-col justify-center space-y-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#5597CF] block mb-1">
              {categoryTitle}
            </span>
            <h2 className="text-3xl lg:text-[34px] font-bold text-[#1a1a1a] tracking-tight leading-none mb-1">
              {title}
            </h2>
            <p className="text-sm font-semibold uppercase text-gray-500 tracking-wider">
              {subtitle}
            </p>
          </div>

          <div className="space-y-3 pt-2 text-sm text-[#444444]">
            {contact.address && (
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#5597CF] flex-shrink-0 mt-0.5" />
                <span className="leading-snug">{contact.address}</span>
              </div>
            )}

            {contact.phones &&
              contact.phones.map((phone, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#5597CF] flex-shrink-0" />
                  <a
                    href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                    className="hover:text-[#5597CF] transition-colors font-medium"
                  >
                    {phone}
                  </a>
                </div>
              ))}

            {contact.email && (
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#5597CF] flex-shrink-0" />
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-[#5597CF] transition-colors"
                >
                  {contact.email}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Embedded Google Map */}
        <div className="lg:col-span-8 min-h-[300px] lg:min-h-[340px] rounded-[4px] overflow-hidden border border-gray-200 shadow-sm relative">
          <iframe
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: "320px" }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location Map"
            className="w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}

export default ContactMapSection;
