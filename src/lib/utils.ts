import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 *
 * Merge Tailwind class names safely, resolving conflicting utility classes
 * (e.g. `p-2 p-4` -> `p-4`). Use this instead of template-string className
 * concatenation anywhere classes are conditional or composed.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Format a phone number for use in a `tel:` link. */
export function toTelHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

/** Format a phone number for use in a WhatsApp chat link. */
export function toWhatsAppHref(phone: string, text?: string): string {
  if (!phone) return "#";
  const cleanPhone = phone.replace(/[^\d]/g, "");
  const base = `https://wa.me/${cleanPhone}`;
  if (text) {
    return `${base}?text=${encodeURIComponent(text)}`;
  }
  return base;
}

/** Format a slug into a human-readable title as a fallback when no title is set. */
export function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-AE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Safely generate a Google Maps iframe embed URL from an address string or URL.
 * Handles:
 * 1. Plain address/place text (e.g. "MamaBella Ristorante - Best Italian Restaurant in Dubai")
 * 2. Full or short Google Maps URLs (e.g. "https://maps.app.goo.gl/mw3PQiBW29wMC3RY9" or "https://www.google.com/maps/place/...")
 * 3. Pre-formatted embed URLs (containing google.com/maps/embed or output=embed)
 */
export function getMapEmbedUrl(addressInput?: string): string {
  const defaultAddress = "MamaBella Ristorante - Best Italian Restaurant in Dubai";
  const rawInput = (addressInput || "").trim();
  const address = rawInput || defaultAddress;

  if (address.includes("google.com/maps/embed") || address.includes("output=embed")) {
    return address;
  }

  if (address.startsWith("http://") || address.startsWith("https://")) {
    try {
      const urlObj = new URL(address);
      const qParam = urlObj.searchParams.get("q") || urlObj.searchParams.get("query");
      if (qParam) {
        return `https://maps.google.com/maps?q=${encodeURIComponent(qParam)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
      }

      const placeMatch = address.match(/\/place\/([^/@?]+)/);
      if (placeMatch && placeMatch[1]) {
        const placeName = decodeURIComponent(placeMatch[1].replace(/\+/g, " "));
        return `https://maps.google.com/maps?q=${encodeURIComponent(placeName)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
      }
    } catch {
      // Ignore URL parsing errors
    }

    return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  }

  return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
}
