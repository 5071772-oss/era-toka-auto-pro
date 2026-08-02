const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_sheets/v4";
const SPREADSHEET_ID = "1AibLk1eprkng7xkktrFX8eC1LGuvf6pmdd3f91zHwoE";
const RANGE = "Leads!A:K";

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
  const lovableApiKey = process.env["LOVABLE_API_KEY"];
  const connectionKey = process.env["GOOGLE_SHEETS_API_KEY"];

  if (!lovableApiKey || !connectionKey) {
    throw new Error("Хранилище заявок не настроено");
  }

  const timestamp = new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" });

  const response = await fetch(
    `${GATEWAY_URL}/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableApiKey}`,
        "X-Connection-Api-Key": connectionKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values: [
          [
            timestamp,
            lead.name,
            lead.contact,
            lead.city,
            lead.budget,
            lead.carType,
            lead.model,
            lead.condition,
            lead.dailyMileage,
            lead.charging,
            lead.comment,
          ],
        ],
      }),
    },
  );

  if (!response.ok) {
    const body = await response.text();
    console.error(`Google Sheets append failed [${response.status}]: ${body}`);
    throw new Error("Не удалось сохранить заявку");
  }
}
