import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Enter your full name."),
  email: z.string().email("Enter a valid email address."),
  phone: z
    .string()
    .min(7, "Enter a valid phone number.")
    .optional()
    .or(z.literal("")),
  service: z.string().min(1, "Select a service."),
  message: z.string().min(10, "Tell us a little more about your project."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const newsletterFormSchema = z.object({
  email: z.string().email("Enter a valid email address."),
});

export type NewsletterFormValues = z.infer<typeof newsletterFormSchema>;
