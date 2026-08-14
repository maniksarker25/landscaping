"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations";
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
import { baseUrl } from "@/lib/helper";

export function ContactForm() {
  const [status, setStatus] = React.useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [serviceOptions, setServiceOptions] = React.useState<string[]>([]);
  const [isLoadingServices, setIsLoadingServices] =
    React.useState<boolean>(true);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      interestedService: "",
      message: "",
    },
  });

  React.useEffect(() => {
    fetch("/api/service/get-all")
      .then((res) => res.json())
      .then((json) => {
        if (json.data && Array.isArray(json.data) && json.data.length > 0) {
          const titles = json.data
            .map(
              (item: { title?: string; name?: string }) =>
                item.title || item.name,
            )
            .filter(
              (t: string): t is string => Boolean(t) && typeof t === "string",
            );
          setServiceOptions(titles);
        }
      })
      .catch((err) =>
        console.error("Failed to fetch API services for contact form:", err),
      )
      .finally(() => {
        setIsLoadingServices(false);
      });
  }, []);

  const isLoading = status === "submitting" || isSubmitting;

  async function onSubmit(values: ContactFormValues) {
    setStatus("submitting");
    setErrorMessage(null);

    try {
      const response = await fetch(`${baseUrl}/contact/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: values?.name.trim(),
          email: values?.email.trim(),
          phone: values?.phone?.trim() || "",
          interestedService: values?.interestedService,
          interestedCategory: values?.interestedService,
          message: values?.message.trim(),
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const errorText =
          data?.error ||
          data?.message ||
          "Failed to submit your inquiry. Please try again.";
        throw new Error(errorText);
      }

      setStatus("success");
      reset();
    } catch (err: unknown) {
      console.error("Error submitting contact form:", err);
      setStatus("error");
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage(
          "An unexpected network error occurred. Please try again.",
        );
      }
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center justify-center text-center gap-3 sm:gap-4 rounded-xl border border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20 px-5 sm:px-8 py-10 sm:py-12 animate-in fade-in-50 duration-300"
      >
        <CheckCircle2
          className="h-10 w-10 sm:h-12 sm:w-12 text-emerald-600 dark:text-emerald-400 shrink-0"
          aria-hidden="true"
        />
        <h3 className="font-display text-lg sm:text-xl font-bold text-foreground">
          Message Sent Successfully!
        </h3>
        <p className="max-w-sm text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Thank you for reaching out. Our team will review your inquiry and get
          back to you shortly.
        </p>
        <Button
          variant="outline"
          size="default"
          onClick={() => {
            setStatus("idle");
            setErrorMessage(null);
          }}
          className="mt-2 text-xs sm:text-sm font-medium"
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-4 sm:space-y-5 w-full min-w-0"
    >
      <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 min-w-0">
        {/* Name Field */}
        <div className="space-y-1.5 min-w-0">
          <Label htmlFor="name" className="text-xs sm:text-sm font-semibold">
            Full name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            placeholder="John Doe"
            disabled={isLoading}
            className="h-10 sm:h-11 text-sm bg-background"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-[11px] sm:text-xs text-destructive">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-1.5 min-w-0">
          <Label htmlFor="email" className="text-xs sm:text-sm font-semibold">
            Email address <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            disabled={isLoading}
            className="h-10 sm:h-11 text-sm bg-background"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-[11px] sm:text-xs text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 min-w-0">
        {/* Phone Field */}
        <div className="space-y-1.5 min-w-0">
          <Label htmlFor="phone" className="text-xs sm:text-sm font-semibold">
            Phone number
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1234567890"
            disabled={isLoading}
            className="h-10 sm:h-11 text-sm bg-background"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-[11px] sm:text-xs text-destructive">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Interested Service Field */}
        <div className="space-y-1.5 min-w-0">
          <Label
            htmlFor="interestedService"
            className="text-xs sm:text-sm font-semibold"
          >
            Service of interest <span className="text-destructive">*</span>
          </Label>
          <Controller
            control={control}
            name="interestedService"
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={isLoading || isLoadingServices}
              >
                <SelectTrigger
                  id="interestedService"
                  aria-label="Service of interest"
                  className="h-10 sm:h-11 text-sm bg-background"
                >
                  <SelectValue
                    placeholder={
                      isLoadingServices
                        ? "Loading services..."
                        : "Select a service"
                    }
                  />
                </SelectTrigger>
                <SelectContent className="max-h-60 overflow-y-auto">
                  {serviceOptions.map((opt) => (
                    <SelectItem
                      key={opt}
                      value={opt}
                      className="text-xs sm:text-sm"
                    >
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.interestedService && (
            <p className="text-[11px] sm:text-xs text-destructive">
              {errors.interestedService.message}
            </p>
          )}
        </div>
      </div>

      {/* Message Field */}
      <div className="space-y-1.5 min-w-0">
        <Label htmlFor="message" className="text-xs sm:text-sm font-semibold">
          Message <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="message"
          rows={4}
          placeholder="Tell us about your project requirements, location, or ask for a quote..."
          disabled={isLoading}
          className="text-sm bg-background resize-none"
          {...register("message")}
        />
        {errors.message && (
          <p className="text-[11px] sm:text-xs text-destructive">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Error Alert Box */}
      {status === "error" && (
        <div
          role="alert"
          aria-live="assertive"
          className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/10 p-3.5 sm:p-4 text-xs sm:text-sm text-destructive break-words max-w-full overflow-hidden"
        >
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-0.5 min-w-0 flex-1">
            <p className="font-semibold">Submission Failed</p>
            <p className="text-xs opacity-90 leading-relaxed">
              {errorMessage ||
                "Something went wrong while sending your message. Please check your connection and try again."}
            </p>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-1">
        <Button
          type="submit"
          size="lg"
          className="w-full sm:w-auto min-w-[160px] h-11 sm:h-12 text-sm font-semibold tracking-wide transition-all active:scale-[0.98]"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
              Sending Message...
            </>
          ) : (
            "Send Message"
          )}
        </Button>
      </div>
    </form>
  );
}
