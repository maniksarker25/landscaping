"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckCircle2,
  Loader2,
  Send,
  ShieldCheck,
  PhoneCall,
} from "lucide-react";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations";
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
import { cn } from "@/lib/utils";
import { fetchServicesData } from "@/lib/api/services";
import { baseUrl } from "@/lib/helper";

interface ServiceSidebarFormProps {
  currentServiceTitle?: string;
  className?: string;
}

export function ServiceSidebarForm({
  currentServiceTitle,
  className,
}: ServiceSidebarFormProps) {
  const [status, setStatus] = React.useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const [serviceOptions, setServiceOptions] = React.useState<string[]>([]);

  React.useEffect(() => {
    fetchServicesData()
      .then((json) => {
        if (json.data && Array.isArray(json.data) && json.data.length > 0) {
          const titles = json.data
            .map((item: { title?: string; name?: string }) => item.title || item.name)
            .filter((t: string | undefined): t is string => Boolean(t) && typeof t === "string");
          if (titles.length > 0) {
            setServiceOptions(titles);
          }
        }
      })
      .catch((err) =>
        console.error("Failed to fetch API services for sidebar form:", err),
      );
  }, []);

  const defaultService =
    serviceOptions.find((p) =>
      currentServiceTitle?.toLowerCase().includes(p.toLowerCase()),
    ) || serviceOptions[0] || "Infinity Swimming Pool";

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      interestedService: defaultService,
      message: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus("submitting");
    try {
      const res = await fetch(`${baseUrl}/contact/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone || "",
          interestedService: values.interestedService,
          interestedCategory: values.interestedService,
          message: values.message,
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-gray-300 bg-card p-6 backdrop-blur-sm sticky top-24 z-20 space-y-5 transition-all",
        className,
      )}
    >
      {/* Header */}
      <div className="space-y-1.5 border-b border-border/80 pb-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-900">
          <ShieldCheck className="h-3.5 w-3.5" /> Fast Free Quote
        </div>
        <h3 className="font-display text-xl font-bold tracking-tight text-primary">
          Get Free Consultation
        </h3>
        <p className="text-xs text-muted-foreground">
          Fill out the form below & our landscape and pool experts will respond
          within 24 hours.
        </p>
      </div>

      {status === "success" ? (
        <div
          role="status"
          className="flex flex-col items-center gap-3 rounded-xl border border-emerald-300 bg-emerald-50/80 p-6 text-center animate-in fade-in"
        >
          <CheckCircle2 className="h-10 w-10 text-emerald-600" />
          <h4 className="font-display text-lg font-bold text-emerald-950">
            Consultation Requested!
          </h4>
          <p className="text-xs text-emerald-800 leading-relaxed">
            Thank you! Our senior engineer will contact you shortly to schedule
            your free site visit and 3D design session.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setStatus("idle")}
            className="mt-2 text-xs border-emerald-300"
          >
            Submit Another Request
          </Button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-4"
        >
          <div className="space-y-1.5">
            <Label htmlFor="sidebar-name" className="text-xs font-semibold">
              Full Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="sidebar-name"
              placeholder="e.g. John Smith"
              className="h-10 text-sm bg-background/50 focus:bg-background"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-[11px] text-destructive">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="sidebar-phone" className="text-xs font-semibold">
              Phone Number <span className="text-destructive">*</span>
            </Label>
            <Input
              id="sidebar-phone"
              type="tel"
              placeholder="+971 52 999 0092"
              className="h-10 text-sm bg-background/50 focus:bg-background"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-[11px] text-destructive">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="sidebar-email" className="text-xs font-semibold">
              Email Address <span className="text-destructive">*</span>
            </Label>
            <Input
              id="sidebar-email"
              type="email"
              placeholder="john@example.com"
              className="h-10 text-sm bg-background/50 focus:bg-background"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-[11px] text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="sidebar-serviceType"
              className="text-xs font-semibold"
            >
              Select Service Type
            </Label>
            <Controller
              control={control}
              name="interestedService"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id="sidebar-serviceType"
                    className="h-10 text-sm bg-background/50"
                  >
                    <SelectValue placeholder="Select Service" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="sidebar-message" className="text-xs font-semibold">
              Message (Optional)
            </Label>
            <Textarea
              id="sidebar-message"
              rows={3}
              placeholder="Specify requirements, location in Dubai, or custom features..."
              className="text-sm bg-background/50 focus:bg-background resize-none"
              {...register("message")}
            />
          </div>

          {status === "error" && (
            <p className="text-xs text-destructive">
              Something went wrong. Please try again or call us directly.
            </p>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-transform active:scale-[0.98]"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending
                Request...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" /> Request Free Quote
              </>
            )}
          </Button>

          <div className="pt-2 border-t border-border/60 text-center">
            <a
              href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline"
            >
              <PhoneCall className="h-3.5 w-3.5" /> Direct Call:{" "}
              {siteConfig.phone}
            </a>
          </div>
        </form>
      )}
    </div>
  );
}
