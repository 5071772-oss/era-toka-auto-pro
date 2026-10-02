import type { CarListItem } from "./chatium-catalog";

/**
 * Модели витрины на главной: список подобран вручную, данные (название, цена,
 * марка) приходят из базы Chatium, фотографии — из локального набора, где на
 * каждую модель по несколько снимков.
 *
 * Адреса записаны здесь явно, чтобы страница не тянула в браузер весь массив
 * каталога: раньше из-за этого на главную уезжало около 460 КБ данных.
 */
export const HOME_CARS = [
  {
    slug: "huawei-m9-6mest-gibrid-ultra-vse-dopy-r22-52kwh",
    title: "Huawei M9 (6мест) гибрид Ultra + все допы (R22 / 52kwh)",
  },
  { slug: "lixiang-l9-ultra-2025", title: "Lixiang L9 Ultra (2025)" },
  { slug: "xiaomi-su7-ultra", title: "Xiaomi SU7 Ultra" },
  { slug: "xiaomi-yu7-max-bez-dopov", title: "Xiaomi YU7 max (без допов)" },
  { slug: "denza-z9gt-i-z9-gibrid-v-tope-dopy", title: "Denza Z9GT и Z9 (ГИБРИД) в топе + допы" },
  { slug: "lotus-eletre-900", title: "Lotus Eletre 900" },
] as const;

export const HOME_CAR_SLUGS: string[] = HOME_CARS.map((car) => car.slug);

/** Оставляем только модели витрины и сохраняем заданный порядок. */
export function pickHomeCars(cars: CarListItem[]): CarListItem[] {
  const order = new Map(HOME_CAR_SLUGS.map((slug, index) => [slug, index]));
  return cars
    .filter((car) => order.has(car.slug))
    .sort((a, b) => (order.get(a.slug) ?? 0) - (order.get(b.slug) ?? 0));
}
