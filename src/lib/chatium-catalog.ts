/**
 * Данные каталога приходят из Chatium: там же лежат фотографии, характеристики
 * и тексты, и там же их правят. Если Chatium недоступен, сайт показывает
 * встроенный набор из catalog-data.ts — каталог не должен пропадать из-за
 * недоступности источника.
 */
import { CARS, type Car } from "./catalog-data";
import { parseSpecs, priceInYuan } from "./car-specs";
import { carSlug } from "./car-slug";
import { imageFor } from "./car-image";

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

interface ChatiumResponse {
  cars?: ChatiumCar[];
}

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

interface CatalogCache {
  at: number;
  items: CarListItem[];
  details: Map<string, CarDetail>;
}

let cache: CatalogCache | null = null;

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

/** Локальный набор — запасной вариант, если Chatium не ответил. */
function localCarParts(car: Car) {
  const specs = parseSpecs(car.specs);
  const image = imageFor(car.img);
  const variants = image?.variants ?? [];
  const card = variants[0]?.src ?? car.img;
  const big = variants[variants.length - 1]?.src ?? car.img;
  const middle = variants.find((variant) => variant.w >= 400)?.src ?? big;
  const photo: CarPhoto = { card, card2x: middle, full: big };
  const purchase = specs.blocks.find((block) => /покупк|условия/i.test(block.title))?.text ?? null;
  const delivery = specs.blocks.find((block) => /срок/i.test(block.title))?.text ?? null;
  return { specs, photo, purchase, delivery };
}

function localList(): CarListItem[] {
  return CARS.map((car) => {
    const { specs, photo } = localCarParts(car);
    return {
      slug: carSlug(car),
      brand: car.brand,
      title: car.title,
      price: car.price,
      priceYuan: priceInYuan(car.price),
      vehicleTypeLabel: specs.vehicleType,
      summary: specs.summary,
      hybrid: specs.vehicleType !== "Электромобиль",
      photo,
    };
  });
}

function localDetail(slug: string): CarDetail | undefined {
  const car = CARS.find((item) => carSlug(item) === slug);
  if (!car) return undefined;
  const { specs, photo, purchase, delivery } = localCarParts(car);
  const photos = (car.images && car.images.length > 0 ? car.images : [car.img]).map((src) => {
    const image = imageFor(src);
    const variants = image?.variants ?? [];
    return {
      card: variants[0]?.src ?? src,
      card2x: variants.find((variant) => variant.w >= 400)?.src ?? src,
      full: variants[variants.length - 1]?.src ?? src,
    };
  });
  return {
    slug,
    brand: car.brand,
    title: car.title,
    price: car.price,
    priceYuan: priceInYuan(car.price),
    vehicleTypeLabel: specs.vehicleType,
    summary: specs.summary,
    hybrid: specs.vehicleType !== "Электромобиль",
    photo: photos[0] ?? photo,
    specRows: specs.rows,
    description: null,
    extraSpecs: specs.blocks.find((block) => /характер/i.test(block.title))?.text ?? null,
    purchaseTerms: purchase,
    deliveryTerms: delivery,
    reviewUrl: specs.reviewUrl,
    photos: photos.length ? photos : [photo],
  };
}

async function loadCatalog(): Promise<CatalogCache> {
  if (cache && Date.now() - cache.at < CACHE_TTL_MS) return cache;

  try {
    const response = await fetch(API_URL, { headers: { accept: "application/json" } });
    if (!response.ok) throw new Error(`Chatium ответил ${response.status}`);
    const data = (await response.json()) as ChatiumResponse;
    const raw = Array.isArray(data.cars) ? data.cars : [];
    const items = raw.map(itemFromChatium).filter((item): item is CarListItem => item !== null);
    if (!items.length) throw new Error("Chatium вернул пустой каталог");

    const details = new Map<string, CarDetail>();
    for (const car of raw) {
      const detail = detailFromChatium(car);
      if (detail) details.set(detail.slug, detail);
    }

    cache = { at: Date.now(), items, details };
    return cache;
  } catch {
    // Отдаём встроенный набор: лучше устаревшие цены, чем пустой каталог
    const items = localList();
    return { at: Date.now(), items, details: new Map() };
  }
}

export async function getCatalogList(): Promise<{ cars: CarListItem[]; source: CatalogSource }> {
  const catalog = await loadCatalog();
  const source: CatalogSource = catalog.details.size > 0 ? "chatium" : "local";
  return { cars: catalog.items, source };
}

export async function getCarDetail(
  slug: string,
): Promise<{ car: CarDetail | undefined; source: CatalogSource }> {
  const catalog = await loadCatalog();
  const fromChatium = catalog.details.get(slug);
  if (fromChatium) return { car: fromChatium, source: "chatium" };
  return { car: localDetail(slug), source: "local" };
}
