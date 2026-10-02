import { CARS } from "./catalog-data";
import { carSlug } from "./car-slug";
import type { CarListItem } from "./chatium-catalog";

/**
 * Модели, которые показываем на главной. Список подобран вручную:
 * это витрина, а не весь каталог. Данные (цена, название) берутся из базы,
 * фотографии — из локального набора с несколькими снимками на модель.
 */
export const HOME_CAR_TITLES = [
  "Huawei M9 (6мест) гибрид Ultra + все допы (R22 / 52kwh)",
  "Lixiang L9 Ultra (2025)",
  "Xiaomi SU7 Ultra",
  "Xiaomi YU7 max (без допов)",
  "Denza Z9GT и Z9 (ГИБРИД) в топе + допы",
  "Lotus Eletre 900",
] as const;

export const HOME_CAR_SLUGS: string[] = HOME_CAR_TITLES.map((title) => {
  const car = CARS.find((item) => item.title === title);
  return car ? carSlug(car) : "";
}).filter(Boolean);

/** Оставляем только модели с главной — чтобы не тащить в страницу весь каталог. */
export function pickHomeCars(cars: CarListItem[]): CarListItem[] {
  const wanted = new Set(HOME_CAR_SLUGS);
  return cars.filter((car) => wanted.has(car.slug));
}
