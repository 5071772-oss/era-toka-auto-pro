export type LeadRow = {
  name: string;
  contact: string;
  city: string;
  budget: string;
  carType: string;
  model: string;
  condition: string;
  dailyMileage: string;
  charging: string;
  comment: string;
};

export async function appendLead(lead: LeadRow): Promise<void> {
  const timestamp = new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" });
  
  // Albato integration removed by user request.
  // Data is received but not forwarded to any external service for now.
  console.log("New lead received:", { ...lead, timestamp });
}
