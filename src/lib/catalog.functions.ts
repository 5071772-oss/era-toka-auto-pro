import { createServerFn } from "@tanstack/react-start";
import { CARS, type Car } from "@/lib/catalog-data";

const SPREADSHEET_ID = "1ZEKRBH3_XYB_78WTP0fEowZ8VnGDirGGLDImqiTNYaQ";
const RANGE = "Лист1!A1:Z300";
const FEATURED_RANGE = "Главная!A1:Z7";
const CONNECTION_ID = "std_01kzc3e87pfqfvgr5c1jbch3k6";

const splitPhotos = (value: string | undefined) =>
  (value ?? "").split("|").map((url) => url.trim()).filter(Boolean);

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
      ...splitPhotos(readCell(row, headers, "additional photos", "дополнительные фото", "additional 1", "дополнительное фото 1")),
      readCell(row, headers, "одиночное фото 1", "single photo 1", "additional 1"),
      readCell(row, headers, "одиночное фото 2", "single photo 2", "additional 2"),
      readCell(row, headers, "одиночное фото 3", "single photo 3", "additional 3"),
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
  const { callGatewayConnection } = await import("@/lib/connectors.server");
  try {
    const response = await callGatewayConnection({
      connection_id: CONNECTION_ID,
      connector_id: "google_sheets",
      method: "GET",
      path: `/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(FEATURED_RANGE)}`,
    });
    if (response.status !== 200) return CARS.slice(0, 6);
    const parsed = JSON.parse(response.body) as { values?: string[][] };
    const featured = normalizeRows((parsed.values ?? []).slice(0, 7));
    return featured.length > 0 ? featured.slice(0, 6) : CARS.slice(0, 6);
  } catch (error) {
    console.error("[v0] Featured catalog fetch failed", error instanceof Error ? error.message : "unknown error");
    return CARS.slice(0, 6);
  }
});
