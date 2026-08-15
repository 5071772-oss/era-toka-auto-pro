import { createServerFn } from "@tanstack/react-start";
import { leadSchema, type LeadInput } from "./leads.schema";

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input: LeadInput) => leadSchema.parse(input))
  .handler(async ({ data }) => {
    const { processLead } = await import("./leads.server");
    await processLead(data);
    return { ok: true as const };
  });
