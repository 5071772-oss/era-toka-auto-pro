/** Канонический адрес сайта: canonical, og:url, sitemap, JSON-LD. */
export const SITE_URL = "https://era-toka.ru";

/**
 * Номер счётчика Яндекс.Метрики.
 * Пока пустая строка — счётчик не подключается. Впишите номер счётчика,
 * и он появится на всех страницах (код в src/routes/__root.tsx).
 */
export const METRIKA_COUNTER_ID = "";

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
