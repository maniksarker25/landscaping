"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Loader2, Send, MapPin, Star, ExternalLink, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Container } from "@/components/common/container";
import { cn } from "@/lib/utils";

const quoteFormSchema = z.object({
  name: z.string().min(2, "Name is required."),
  email: z.string().email("Valid email is required."),
  phone: z.string().min(7, "Phone number is required."),
  service: z.string().min(1, "Select a service."),
  address: z.string().optional(),
  message: z.string().optional(),
  recaptcha: z.boolean().refine((val) => val === true, {
    message: "Please verify that you are not a robot.",
  }),
});

type QuoteFormValues = z.infer<typeof quoteFormSchema>;

interface QuoteMapSectionProps {
  backgroundImage?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export function QuoteMapSection({
  backgroundImage = "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2000&auto=format&fit=crop",
  title = "Get a Free Quote Today",
  subtitle = "Complete the form below and we'll get back to you asap!",
  className,
}: QuoteMapSectionProps) {
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "Gazebo",
      address: "",
      message: "",
      recaptcha: false,
    },
  });

  const isCaptchaChecked = watch("recaptcha");

  async function onSubmit(values: QuoteFormValues) {
    setStatus("submitting");
    try {
      const res = await fetch("/contact/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          interestedService: values.service,
          interestedCategory: values.service,
          message: values.message || "",
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  const serviceOptions = [
    "Gazebo & Pergola",
    "Swimming Pool Construction",
    "Infinity Swimming Pool",
    "Overflow Swimming Pool",
    "Skimmer Swimming Pool",
    "Pool Maintenance",
    "Landscape Design & Lighting",
    "Water Features & Fountains",
  ];

  return (
    <section
      className={cn(
        "relative w-full py-16 sm:py-24 bg-fixed bg-cover bg-center overflow-hidden",
        className
      )}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Form Card */}
          <div className="flex flex-col justify-between rounded-2xl bg-background/95 backdrop-blur-md p-6 sm:p-8 shadow-2xl border border-white/20 text-foreground">
            <div>
              <div className="space-y-1.5 mb-6">
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-primary">
                  {title}
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {subtitle}
                </p>
              </div>

              {status === "success" ? (
                <div className="py-12 flex flex-col items-center text-center space-y-3 bg-emerald-50/80 rounded-xl border border-emerald-300 p-6 animate-in fade-in">
                  <CheckCircle2 className="h-12 w-12 text-emerald-600" />
                  <h3 className="font-display text-xl font-bold text-emerald-950">
                    Quote Request Received!
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-850 max-w-sm">
                    Thank you! Our engineering team will review your project details and contact you shortly.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setStatus("idle")}
                    className="mt-2 text-xs border-emerald-300"
                  >
                    Submit Another Quote
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="quote-name" className="text-xs font-semibold text-foreground/80">
                        Your Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="quote-name"
                        placeholder="Your Name (required)"
                        className="h-10 text-sm bg-background border-border"
                        {...register("name")}
                      />
                      {errors.name && (
                        <p className="text-[11px] text-destructive">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="quote-email" className="text-xs font-semibold text-foreground/80">
                        Email <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="quote-email"
                        type="email"
                        placeholder="Email (required)"
                        className="h-10 text-sm bg-background border-border"
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-destructive">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Phone & Service Dropdown Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="quote-phone" className="text-xs font-semibold text-foreground/80">
                        Phone <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="quote-phone"
                        type="tel"
                        placeholder="Phone (required)"
                        className="h-10 text-sm bg-background border-border"
                        {...register("phone")}
                      />
                      {errors.phone && (
                        <p className="text-[11px] text-destructive">{errors.phone.message}</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="quote-service" className="text-xs font-semibold text-foreground/80">
                        Service Required
                      </Label>
                      <Controller
                        control={control}
                        name="service"
                        render={({ field }) => (
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger id="quote-service" className="h-10 text-sm bg-background border-border">
                              <SelectValue placeholder="Select Service" />
                            </SelectTrigger>
                            <SelectContent>
                              {serviceOptions.map((opt) => (
                                <SelectItem key={opt} value={opt}>
                                  {opt}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                  </div>

                  {/* Address Row */}
                  <div className="space-y-1">
                    <Label htmlFor="quote-address" className="text-xs font-semibold text-foreground/80">
                      Address / Villa Location
                    </Label>
                    <Input
                      id="quote-address"
                      placeholder="Address (e.g. Palm Jumeirah, Villa #42)"
                      className="h-10 text-sm bg-background border-border"
                      {...register("address")}
                    />
                  </div>

                  {/* Message Row */}
                  <div className="space-y-1">
                    <Label htmlFor="quote-message" className="text-xs font-semibold text-foreground/80">
                      Message
                    </Label>
                    <Textarea
                      id="quote-message"
                      rows={3}
                      placeholder="Message (Tell us about your pool or garden ideas)"
                      className="text-sm bg-background border-border resize-none"
                      {...register("message")}
                    />
                  </div>

                  {/* Security Captcha Checkbox Simulation */}
                  <div className="pt-2">
                    <div
                      onClick={() => setValue("recaptcha", !isCaptchaChecked, { shouldValidate: true })}
                      className={cn(
                        "inline-flex items-center gap-3 p-3 rounded-lg border bg-muted/30 cursor-pointer select-none transition-colors max-w-xs",
                        isCaptchaChecked ? "border-emerald-500 bg-emerald-50/40" : "border-border"
                      )}
                    >
                      <div
                        className={cn(
                          "h-5 w-5 rounded border flex items-center justify-center transition-all",
                          isCaptchaChecked ? "bg-emerald-600 border-emerald-600 text-white" : "border-gray-400 bg-background"
                        )}
                      >
                        {isCaptchaChecked && <CheckCircle2 className="h-4 w-4" />}
                      </div>
                      <span className="text-xs font-medium text-foreground">I'm not a robot</span>
                      <div className="ml-auto text-[10px] text-muted-foreground flex flex-col items-center leading-tight">
                        <ShieldCheck className="h-4 w-4 text-blue-500" />
                        <span>reCAPTCHA</span>
                      </div>
                    </div>
                    {errors.recaptcha && (
                      <p className="text-[11px] text-destructive mt-1">{errors.recaptcha.message}</p>
                    )}
                  </div>

                  {status === "error" && (
                    <p className="text-xs text-destructive">
                      Something went wrong. Please try again or call us directly.
                    </p>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full sm:w-auto px-8 bg-[#78a800] hover:bg-[#689400] text-white font-extrabold tracking-wider uppercase shadow-lg transition-transform active:scale-[0.98]"
                      disabled={status === "submitting"}
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> SUBMITTING...
                        </>
                      ) : (
                        "SUBMIT NOW"
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Google Map Card */}
          <div className="flex flex-col rounded-2xl overflow-hidden bg-background shadow-2xl border border-white/20 relative min-h-[420px]">
            {/* Business Badge Overlay inside Map */}
            <div className="absolute top-4 left-4 z-10 max-w-xs sm:max-w-sm rounded-xl bg-background/95 backdrop-blur-md p-3.5 shadow-lg border border-border text-foreground space-y-1">
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-xs sm:text-sm font-bold text-primary leading-tight">
                  {siteConfig.name} - Swimming Pool Construction Contractor In Dubai
                </h4>
                <a
                  href={`https://maps.google.com/maps?q=${encodeURIComponent(siteConfig.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-emerald-700"
                  aria-label="View on Google Maps"
                >
                  <ExternalLink className="h-4 w-4 shrink-0" />
                </a>
              </div>
              <p className="text-[11px] text-muted-foreground leading-tight">
                {siteConfig.address}
              </p>
              <div className="flex items-center gap-1.5 pt-1 text-xs">
                <span className="font-bold text-amber-500">4.8</span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] text-muted-foreground">(39 reviews)</span>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="w-full h-full min-h-[420px] relative">
              <iframe
                src={`https://maps.google.com/maps?q=${encodeURIComponent(siteConfig.address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "420px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Dubai Studio Location Map"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
