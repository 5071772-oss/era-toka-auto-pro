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

const SPREADSHEET_ID = "1AibLk1eprkng7xkktrFX8eC1LGuvf6pmdd3f91zHwoE";

export async function appendLead(lead: LeadRow): Promise<void> {
  const timestamp = new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" });
  
  const lovableApiKey = process.env['LOVABLE_API_KEY'];
  const googleSheetsApiKey = process.env['GOOGLE_SHEETS_API_KEY'];

  if (!lovableApiKey || !googleSheetsApiKey) {
    console.error("Missing Google Sheets credentials");
    // Fallback log for dev if not configured
    console.log("New lead received (no sheet connection):", { ...lead, timestamp });
    return;
  }

  const values = [
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
      lead.comment
    ]
  ];

  try {
    const response = await fetch(
      `https://connector-gateway.lovable.dev/google_sheets/v4/spreadsheets/${SPREADSHEET_ID}/values/Leads!A1:append?valueInputOption=USER_ENTERED`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${lovableApiKey}`,
          "X-Connection-Api-Key": googleSheetsApiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ values }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("Google Sheets API error:", error);
      throw new Error("Не удалось сохранить заявку в таблицу");
    }
  } catch (err) {
    console.error("Failed to append lead to Google Sheets:", err);
    throw err;
  }
}
