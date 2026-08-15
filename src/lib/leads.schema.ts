import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Укажите имя").max(100, "Слишком длинное имя"),
  phone: z
    .string()
    .trim()
    .min(5, "Укажите корректный телефон")
    .max(30, "Слишком длинный номер"),
  email: z
    .string()
    .trim()
    .email("Укажите корректный email")
    .max(120, "Слишком длинный email"),
});

export type LeadInput = z.infer<typeof leadSchema>;
