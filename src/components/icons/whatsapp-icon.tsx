"use client";

import * as React from "react";
import { FaWhatsapp } from "react-icons/fa";

export interface WhatsAppIconProps {
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}

export function WhatsAppIcon({
  className = "h-5 w-5 sm:h-5.5 sm:w-5.5",
  size,
  style,
}: WhatsAppIconProps) {
  return <FaWhatsapp className={className} size={size} style={style} />;
}
