"use client";

import * as React from "react";
import Image from "next/image";

export interface WhatsAppIconProps {
  className?: string;
  size?: number;
  alt?: string;
  style?: React.CSSProperties;
}

export function WhatsAppIcon({
  className,
  size = 24,
  alt = "WhatsApp",
  style,
}: WhatsAppIconProps) {
  return (
    <Image
      src="/images/whatsapp.svg"
      alt={alt}
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: size, ...style }}
    />
  );
}
