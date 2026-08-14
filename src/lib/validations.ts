import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number.")
    .optional()
    .or(z.literal("")),
  interestedService: z
    .string()
    .trim()
    .min(1, "Select a service of interest."),
  message: z
    .string()
    .trim()
    .min(5, "Tell us a little more about your project."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const contactPayloadSchema = z
  .object({
    name: z.string().trim().min(2, "Full name must be at least 2 characters."),
    email: z.string().trim().email("Please enter a valid email address."),
    phone: z.string().trim().optional().or(z.literal("")),
    interestedCategory: z.string().trim().optional(),
    interestedService: z.string().trim().optional(),
    service: z.string().trim().optional(),
    message: z.string().trim().min(1, "Please enter a message."),
  })
  .transform((data) => {
    const interestedService =
      data.interestedService || data.interestedCategory || data.service || "General Inquiry";
    const interestedCategory = data.interestedCategory || interestedService;
    return {
      name: data.name,
      email: data.email,
      phone: data.phone || "",
      interestedCategory,
      interestedService,
      message: data.message,
    };
  });

export const newsletterFormSchema = z.object({
  email: z.string().email("Enter a valid email address."),
});

export type NewsletterFormValues = z.infer<typeof newsletterFormSchema>;
