import { createServerFn } from "@tanstack/react-start";
import { leadSchema, type LeadInput } from "./leads.schema";

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input: LeadInput) => leadSchema.parse(input))
  .handler(async ({ data }) => {
    const { appendLead } = await import("./leads.server");
    await appendLead({
      name: data.name,
      contact: data.contact,
      city: data.city ?? "",
      budget: data.budget ?? "",
      carType: data.carType ?? "",
      model: data.model ?? "",
      condition: data.condition ?? "",
      dailyMileage: data.dailyMileage ?? "",
      charging: data.charging ?? "",
      comment: data.comment ?? "",
    });
    return { ok: true as const };
  });
