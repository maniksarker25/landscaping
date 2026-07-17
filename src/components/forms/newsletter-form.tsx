"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { newsletterFormSchema, type NewsletterFormValues } from "@/lib/validations";

export function NewsletterForm() {
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterFormSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit() {
    setStatus("submitting");
    await new Promise((resolve) => setTimeout(resolve, 600));
    setStatus("success");
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-5">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex items-center rounded-full border border-primary-foreground/20 bg-primary-foreground/5 pl-4 pr-1.5">
        <input
          id="newsletter-email"
          type="email"
          placeholder="you@email.com"
          className="h-11 w-full bg-transparent text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none"
          {...register("email")}
        />
        <button
          type="submit"
          aria-label="Subscribe"
          disabled={status === "submitting"}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-primary transition-transform hover:scale-105 disabled:opacity-60"
        >
          {status === "submitting" ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : status === "success" ? (
            <Check className="h-4 w-4" aria-hidden="true" />
          ) : (
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </div>
      {errors.email && (
        <p className="mt-2 text-xs text-destructive-foreground/80">{errors.email.message}</p>
      )}
      {status === "success" && (
        <p role="status" className="mt-2 text-xs text-secondary">
          You&apos;re subscribed.
        </p>
      )}
    </form>
  );
}
