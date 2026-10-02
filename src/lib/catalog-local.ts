/**
 * Встроенный набор каталога — запасной вариант, если Chatium недоступен.
 * Модуль подключается только на сервере (динамическим импортом из серверной
 * функции): в браузер эти данные не попадают, страница от этого легче на 460 КБ.
 */
import { CARS, type Car } from "./catalog-data";
import { parseSpecs, priceInYuan } from "./car-specs";
import { carSlug } from "./car-slug";
import { imageFor } from "./car-image";
import type { CarDetail, CarListItem, CarPhoto } from "./chatium-catalog";

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

export function localList(): CarListItem[] {
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

export function localDetail(slug: string): CarDetail | undefined {
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
