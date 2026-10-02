/**
 * Каталог приходит из Chatium: там лежат фотографии, характеристики и тексты,
 * и там же их правят. Загрузка выполняется серверной функцией — так встроенный
 * запасной набор данных не попадает в браузер (экономия около 460 КБ на страницу),
 * а сайт не зависит от CORS при переходах между страницами.
 *
 * Если Chatium недоступен, отдаём встроенный набор: каталог не должен пропадать.
 */
import { createServerFn } from "@tanstack/react-start";

const API_URL = "https://avnhome2012.chatium.ru/catalog/api/public/cars";
const CACHE_TTL_MS = 5 * 60 * 1000;

export interface CarPhoto {
  /** 280 px — карточка в списке */
  card: string;
  /** 560 px — та же карточка на экранах с двойной плотностью */
  card2x: string;
  /** 1200 px — страница модели */
  full: string;
}

export interface CarListItem {
  slug: string;
  brand: string;
  title: string;
  price: string;
  priceYuan: number | null;
  vehicleTypeLabel: string;
  summary: string;
  hybrid: boolean;
  photo: CarPhoto | null;
}

export interface CarDetail extends CarListItem {
  specRows: { label: string; value: string }[];
  description: string | null;
  extraSpecs: string | null;
  purchaseTerms: string | null;
  deliveryTerms: string | null;
  reviewUrl: string | null;
  photos: CarPhoto[];
}

export type CatalogSource = "chatium" | "local";

interface ChatiumCar {
  slug?: string;
  brand?: string;
  title?: string;
  price?: string;
  priceYuan?: number | null;
  vehicleTypeLabel?: string;
  summary?: string;
  specRows?: { label: string; value: string }[];
  description?: string | null;
  extraSpecs?: string | null;
  purchaseTerms?: string | null;
  deliveryTerms?: string | null;
  reviewUrl?: string | null;
  photos?: { card?: string; card2x?: string; full?: string }[];
}

interface CatalogData {
  items: CarListItem[];
  details: Map<string, CarDetail>;
  source: CatalogSource;
}

let cache: { at: number; data: CatalogData } | null = null;

function isImageUrl(value: string | undefined): value is string {
  return typeof value === "string" && value.length > 0;
}

function photoOf(source: { card?: string; card2x?: string; full?: string }): CarPhoto | null {
  const card = isImageUrl(source.card) ? source.card : null;
  const full = isImageUrl(source.full) ? source.full : null;
  if (!card || !full) return null;
  return { card, card2x: isImageUrl(source.card2x) ? source.card2x : card, full };
}

function itemFromChatium(car: ChatiumCar): CarListItem | null {
  if (!car.slug || !car.title || !car.brand) return null;
  const vehicleTypeLabel = car.vehicleTypeLabel ?? "Электромобиль";
  return {
    slug: car.slug,
    brand: car.brand,
    title: car.title,
    price: car.price ?? "",
    priceYuan: typeof car.priceYuan === "number" ? car.priceYuan : null,
    vehicleTypeLabel,
    summary: car.summary ?? "",
    hybrid: vehicleTypeLabel !== "Электромобиль",
    photo: photoOf(car.photos?.[0] ?? {}),
  };
}

function detailFromChatium(car: ChatiumCar): CarDetail | null {
  const item = itemFromChatium(car);
  if (!item) return null;
  const photos = (car.photos ?? []).map(photoOf).filter((photo): photo is CarPhoto => photo !== null);
  return {
    ...item,
    photo: photos[0] ?? item.photo,
    specRows: car.specRows ?? [],
    description: car.description ?? null,
    extraSpecs: car.extraSpecs ?? null,
    purchaseTerms: car.purchaseTerms ?? null,
    deliveryTerms: car.deliveryTerms ?? null,
    reviewUrl: car.reviewUrl ?? null,
    photos,
  };
}

async function readCatalog(): Promise<CatalogData> {
  if (cache && Date.now() - cache.at < CACHE_TTL_MS) return cache.data;

  try {
    const response = await fetch(API_URL, { headers: { accept: "application/json" } });
    if (!response.ok) throw new Error(`Chatium ответил ${response.status}`);
    const payload = (await response.json()) as { cars?: ChatiumCar[] };
    const raw = Array.isArray(payload.cars) ? payload.cars : [];
    const items = raw.map(itemFromChatium).filter((item): item is CarListItem => item !== null);
    if (!items.length) throw new Error("Chatium вернул пустой каталог");

    const details = new Map<string, CarDetail>();
    for (const car of raw) {
      const detail = detailFromChatium(car);
      if (detail) details.set(detail.slug, detail);
    }

    const data: CatalogData = { items, details, source: "chatium" };
    cache = { at: Date.now(), data };
    return data;
  } catch {
    const { localList } = await import("./catalog-local");
    const data: CatalogData = { items: localList(), details: new Map(), source: "local" };
    return data;
  }
}

/** Список моделей для каталога и главной страницы. */
export const getCatalogList = createServerFn({ method: "GET" }).handler(async () => {
  const data = await readCatalog();
  return { cars: data.items, source: data.source };
});

/** Одна модель со всеми текстами — для страницы модели. */
export const getCarDetail = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const catalog = await readCatalog();
    const fromChatium = catalog.details.get(slug);
    if (fromChatium) return { car: fromChatium, source: "chatium" as const };

    const { localDetail } = await import("./catalog-local");
    return { car: localDetail(slug), source: "local" as const };
  });
