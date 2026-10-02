/**
 * Цели Яндекс.Метрики.
 *
 * Номер счётчика задаётся в src/lib/site.ts. Пока он пустой, все вызовы молча
 * ничего не делают — код можно держать в проекте до подключения счётчика.
 *
 * Имена целей совпадают с теми, что заводятся в интерфейсе Метрики: если
 * поменять их здесь, надо поменять и там, иначе события не будут считаться.
 */
import { METRIKA_COUNTER_ID } from "./site";

export const GOALS = {
  /** Отправлена заявка через форму */
  formSent: "form_sent",
  /** Клик по ссылке в мессенджер (Telegram, Max) */
  messenger: "messenger_click",
  /** Клик по телефону */
  phone: "phone_click",
  /** Кнопка «Узнать стоимость» */
  priceRequest: "price_request",
  /** Кнопка «Подобрать аналог» */
  analogRequest: "analog_request",
} as const;

export type GoalName = (typeof GOALS)[keyof typeof GOALS];

type YandexMetrika = (counterId: number, action: string, goal?: string) => void;

declare global {
  interface Window {
    ym?: YandexMetrika;
  }
}

export function reachGoal(goal: GoalName): void {
  if (typeof window === "undefined" || !METRIKA_COUNTER_ID) return;
  window.ym?.(Number(METRIKA_COUNTER_ID), "reachGoal", goal);
}

/**
 * Считает клики по телефону и мессенджерам. Один обработчик на весь документ:
 * такие ссылки есть в шапке, в подвале, в форме и в блоках, и дублировать код
 * в каждом месте не нужно.
 */
export function initAnalytics(): () => void {
  if (typeof document === "undefined") return () => {};

  const onClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement | null;
    const link = target?.closest?.("a[href]") as HTMLAnchorElement | null;
    if (!link) return;

    const href = link.getAttribute("href") ?? "";
    if (href.startsWith("tel:")) {
      reachGoal(GOALS.phone);
      return;
    }
    if (/(?:^|\.)t\.me\/|telegram\.me\//i.test(href) || /(?:^|\.)max\.ru\//i.test(href)) {
      reachGoal(GOALS.messenger);
    }
  };

  document.addEventListener("click", onClick, true);
  return () => document.removeEventListener("click", onClick, true);
}
