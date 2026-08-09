const ALBATO_WEBHOOK_URL = "https://h.albato.ru/wh/38/1lfcq3m/OuvN89TZVvcPmbJR4er3i5ny65BMQNQb1rj5I_x6f3Q/";

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

  const response = await fetch(ALBATO_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...lead,
      timestamp,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    console.error(`Webhook submission failed [${response.status}]: ${body}`);
    throw new Error("Не удалось сохранить заявку");
  }
}
