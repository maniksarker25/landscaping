"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { baseUrl } from "@/lib/helper";

export interface BottomInquirySectionProps {
  title?: string;
  subtitle?: string;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
}

export function BottomInquirySection({
  title = "Drop Us A Line",
  subtitle = "feel free to contact",
  imageSrc = "https://poolsgardensuae.com/wp-content/uploads/2024/06/swimming-pool-construction-scaled.webp",
  imageAlt = "Luxury Villa Overflow Swimming Pool Construction Dubai",
  className,
}: BottomInquirySectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isRobotChecked, setIsRobotChecked] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number";
    } else if (formData.phone.trim().length < 6) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!isRobotChecked) {
      newErrors.recaptcha = "Please verify that you are not a robot";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const res = await fetch(`${baseUrl}/contact/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          interestedService: "Overflow Swimming Pool Construction",
          interestedCategory: "Pools",
          message: formData.message.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || data?.message || "Failed to submit");
      }

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setIsRobotChecked(false);
    } catch (err: unknown) {
      console.error("Bottom inquiry submit error:", err);
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <section className={cn("w-full py-12 font-sans", className)}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Featured Project Image */}
        <div className="lg:col-span-6 relative aspect-[4/3] rounded-[4px] overflow-hidden shadow-md bg-gray-100 min-h-[350px]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Right Column: Inquiry Form */}
        <div className="lg:col-span-6 space-y-4">
          <div>
            <h2 className="text-3xl lg:text-[36px] font-bold text-[#1a1a1a] tracking-tight leading-none mb-1">
              {title}
            </h2>
            <p className="text-sm font-semibold uppercase text-gray-500 tracking-wider">
              {subtitle}
            </p>
          </div>

          {status === "success" ? (
            <div className="flex flex-col items-center gap-3 rounded-[3px] border border-[#729d00]/40 bg-[#729d00]/10 p-6 text-center animate-in fade-in">
              <CheckCircle2 className="h-10 w-10 text-[#729d00]" />
              <h3 className="font-bold text-lg text-[#222222]">
                Thank you for contacting us!
              </h3>
              <p className="text-xs text-[#555555] leading-relaxed">
                Your message has been sent successfully. Our team will get back
                to you as soon as possible.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-2 bg-[#729d00] hover:bg-[#729d00] text-white text-xs font-semibold px-4 py-2 rounded-[3px] transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
              {/* Name */}
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name(required)"
                  className={cn(
                    "w-full h-[45px] px-3.5 bg-white border rounded-[2px] text-sm text-[#333333] placeholder:text-[#767676] focus:border-[#729d00] focus:ring-0 focus:outline-none transition-colors",
                    errors.name ? "border-red-500" : "border-[#dedede]",
                  )}
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email(required)"
                  className={cn(
                    "w-full h-[45px] px-3.5 bg-white border rounded-[2px] text-sm text-[#333333] placeholder:text-[#767676] focus:border-[#729d00] focus:ring-0 focus:outline-none transition-colors",
                    errors.email ? "border-red-500" : "border-[#dedede]",
                  )}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone(required)"
                  className={cn(
                    "w-full h-[45px] px-3.5 bg-white border rounded-[2px] text-sm text-[#333333] placeholder:text-[#767676] focus:border-[#729d00] focus:ring-0 focus:outline-none transition-colors",
                    errors.phone ? "border-red-500" : "border-[#dedede]",
                  )}
                />
                {errors.phone && (
                  <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Message"
                  className="w-full min-h-[110px] p-3.5 bg-white border border-[#dedede] rounded-[2px] text-sm text-[#333333] placeholder:text-[#767676] focus:border-[#729d00] focus:ring-0 focus:outline-none transition-colors resize-y"
                />
              </div>

              {/* reCAPTCHA */}
              <div>
                <div
                  className={cn(
                    "h-[74px] border bg-[#f9f9f9] rounded-[3px] px-3.5 flex items-center justify-between transition-colors select-none",
                    errors.recaptcha ? "border-red-400" : "border-[#d3d3d3]",
                  )}
                >
                  <div
                    className="flex items-center gap-3 cursor-pointer select-none"
                    onClick={() => {
                      setIsRobotChecked(!isRobotChecked);
                      if (errors.recaptcha) {
                        setErrors((prev) => {
                          const next = { ...prev };
                          delete next.recaptcha;
                          return next;
                        });
                      }
                    }}
                  >
                    <div
                      className={cn(
                        "w-[26px] h-[26px] rounded-[2px] border-2 bg-white flex items-center justify-center transition-all",
                        isRobotChecked
                          ? "border-[#0f9d58] bg-[#0f9d58]"
                          : "border-[#c1c1c1] hover:border-[#999999]",
                      )}
                    >
                      {isRobotChecked && (
                        <svg
                          className="w-4 h-4 text-white stroke-[3]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm font-normal text-[#222222]">
                      I&apos;m not a robot
                    </span>
                  </div>

                  <div className="flex flex-col items-center justify-center pl-2 select-none">
                    <svg
                      className="w-8 h-8"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M24 6C15.2 6 7.9 12.4 6.4 20.8L12.2 22.3C13.2 16.5 18.1 12 24 12C28.2 12 31.9 14.3 33.9 17.7L28 22H42V8L37.1 12.9C34 8.7 29.3 6 24 6Z"
                        fill="#1C65E3"
                      />
                      <path
                        d="M41.6 27.2L35.8 25.7C34.8 31.5 29.9 36 24 36C19.8 36 16.1 33.7 14.1 30.3L20 26H6V40L10.9 35.1C14 39.3 18.7 42 24 42C32.8 42 40.1 35.6 41.6 27.2Z"
                        fill="#9AA0A6"
                      />
                    </svg>
                    <span className="text-[9px] text-[#555555] font-sans tracking-tight mt-0.5">
                      reCAPTCHA
                    </span>
                  </div>
                </div>
                {errors.recaptcha && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.recaptcha}
                  </p>
                )}
              </div>

              {/* Error Alert */}
              {status === "error" && errorMessage && (
                <p className="text-xs text-red-600 bg-red-50 p-2 rounded-[2px] border border-red-200">
                  {errorMessage}
                </p>
              )}

              {/* Submit Button */}
              <div className="pt-1">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="bg-[#729d00] hover:bg-[#729d00] active:bg-[#729d00] text-white font-bold text-[13px] tracking-wider uppercase px-7 py-3 rounded-[3px] transition-colors shadow-none cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {status === "submitting" ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      SUBMITTING...
                    </span>
                  ) : (
                    "SUBMIT NOW"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default BottomInquirySection;
