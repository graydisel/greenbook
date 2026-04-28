import { z } from "zod";

export const checkoutSchema = z.object({
  nameRequired: z.string().min(2, "Name is too short").max(20, "Max 20 chars"),
  emailRequired: z.email("Invalid email address"),
  addressRequired: z.string().min(5, "Please enter a full address"),
  payment: z.enum(["card", "googlePay", "cashOnReceive"], "Please select a payment method"),
});

export type CheckoutInputs = z.infer<typeof checkoutSchema>;