import { createServerFn } from "@tanstack/react-start";
import { CARS, type Car } from "@/lib/catalog-data";

const SPREADSHEET_ID = "1ZEKRBH3_XYB_78WTP0fEowZ8VnGDirGGLDImqiTNYaQ";
const RANGE = "Лист1!A1:Z300";
const FEATURED_RANGE = "Главная!A1:Z7";
const CONNECTION_ID = "std_01kzc3e87pfqfvgr5c1jbch3k6";

const splitPhotos = (value: string | undefined) =>
  (value ?? "").split("|").map((url) => url.trim()).filter(Boolean);

function parseCsv(csv: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [], cell = "", quoted = false;
  for (let i = 0; i < csv.length; i += 1) {
    const char = csv[i], next = csv[i + 1];
    if (char === '"' && quoted && next === '"') { cell += '"'; i += 1; }
    else if (char === '"') quoted = !quoted;
    else if (char === "," && !quoted) { row.push(cell); cell = ""; }
    else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(cell); if (row.some((value) => value.trim())) rows.push(row);
      row = []; cell = "";
    } else cell += char;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

function readCell(row: string[], headers: string[], ...names: string[]) {
  const index = headers.findIndex((header) => names.includes(header.trim().toLowerCase()));
  return index >= 0 ? row[index]?.trim() ?? "" : "";
}

function normalizeRows(values: string[][]): Car[] {
  if (values.length < 2) return [];
  const headers = values[0].map((header) => header.trim().toLowerCase());
  return values.slice(1).flatMap((row) => {
    const brand = readCell(row, headers, "brand", "бренд");
    const title = readCell(row, headers, "model", "модель", "название");
    if (!brand || !title) return [];

    const mainPhoto = readCell(row, headers, "main photo", "главное фото", "основное фото");
    const photos = [
      mainPhoto,
      ...splitPhotos(readCell(row, headers, "additional photos", "дополнительные фото")),
      readCell(row, headers, "одиночное фото 1", "single photo 1", "additional photo 1", "additional 1", "дополнительное фото 1"),
      readCell(row, headers, "одиночное фото 2", "single photo 2", "additional photo 2", "additional 2", "дополнительное фото 2"),
      readCell(row, headers, "одиночное фото 3", "single photo 3", "additional photo 3", "additional 3", "дополнительное фото 3"),
    ].filter((url, index, all) => url && all.indexOf(url) === index);
    const specs = readCell(row, headers, "specifications", "характеристики");
    return [{
      brand,
      title,
      price: readCell(row, headers, "price", "цена") || "По запросу",
      img: photos[0] || CARS.find((car) => car.brand === brand && car.title === title)?.img || "",
      images: photos,
      specs: specs || readCell(row, headers, "description", "описание"),
    }];
  });
}

export const getCatalog = createServerFn({ method: "GET" }).handler(async () => {
  const { callGatewayConnection } = await import("@/lib/connectors.server");
  try {
    const response = await callGatewayConnection({
      connection_id: CONNECTION_ID,
      connector_id: "google_sheets",
      method: "GET",
      path: `/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(RANGE)}`,
    });
    if (response.status !== 200) return CARS;
    const parsed = JSON.parse(response.body) as { values?: string[][] };
    return normalizeRows(parsed.values ?? []) || CARS;
  } catch (error) {
    console.error("[v0] Google Sheets catalog fetch failed", error instanceof Error ? error.message : "unknown error");
    return CARS;
  }
});

export const getCatalogImages = getCatalog;

export const getFeaturedCatalog = createServerFn({ method: "GET" }).handler(async () => {
  try {
    // The sheet is shared for viewing, so this server-side CSV export is reliable
    // in previews and production without exposing OAuth tokens to the browser.
    const response = await fetch(`https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&sheet=${encodeURIComponent("Главная")}`, { cache: "no-store" });
    if (!response.ok) return CARS.slice(0, 6);
    const featured = normalizeRows(parseCsv(await response.text()).slice(0, 7));
    return featured.length > 0 ? featured.slice(0, 6) : CARS.slice(0, 6);
  } catch (error) {
    console.error("[v0] Featured catalog fetch failed", error instanceof Error ? error.message : "unknown error");
    return CARS.slice(0, 6);
  }
});
