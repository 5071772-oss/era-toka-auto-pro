import type { LeadInput } from "./leads.schema";

export async function processLead(lead: LeadInput): Promise<void> {
  const timestamp = new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" });
  
  // Disconnected Google Sheets as requested.
  // Currently logging to server console. 
  console.log("New simplified lead received:", { ...lead, timestamp });
}
