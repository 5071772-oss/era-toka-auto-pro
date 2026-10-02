/** Канонический адрес сайта: canonical, og:url, sitemap, JSON-LD. */
export const SITE_URL = "https://era-toka.ru";

/**
 * Номер счётчика Яндекс.Метрики. Пустая строка — счётчик не подключается.
 *
 * Счётчик «ЭРА ТОКА — era-toka.ru» (113340132) принимает данные только
 * с адресов era-toka.ru. Цели заводятся в интерфейсе Метрики с теми же
 * идентификаторами, что перечислены в src/lib/analytics.ts.
 */
export const METRIKA_COUNTER_ID = "113340132";

export function absoluteUrl(pathname: string): string {
  return `${SITE_URL}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

/** Правильная форма слова «модель» для числа: 1 модель, 2 модели, 131 модель. */
export function pluralModels(count: number): string {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return "модель";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "модели";
  return "моделей";
}
