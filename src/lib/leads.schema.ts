import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Укажите имя").max(100, "Слишком длинное имя"),
  contact: z
    .string()
    .trim()
    .min(3, "Укажите телефон или Telegram")
    .max(120, "Слишком длинный контакт"),
  city: z.string().trim().max(100).optional().default(""),
  budget: z.string().trim().max(100).optional().default(""),
  carType: z.string().trim().max(60).optional().default(""),
  model: z.string().trim().max(150).optional().default(""),
  condition: z.string().trim().max(60).optional().default(""),
  dailyMileage: z.string().trim().max(60).optional().default(""),
  charging: z.string().trim().max(60).optional().default(""),
  comment: z.string().trim().max(1000, "Не более 1000 символов").optional().default(""),
});

export type LeadInput = z.input<typeof leadSchema>;
