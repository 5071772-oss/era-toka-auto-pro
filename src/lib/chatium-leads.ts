/**
 * Заявка уходит в Chatium: там она сохраняется, её видно в кабинете заявок
 * и оттуда же передаётся в CRM. Раньше форма отправляла данные напрямую в
 * веб-форму amoCRM в режиме no-cors — сайт не знал, приняли заявку или нет.
 *
 * Отправка идёт серверной функцией: так браузер клиента не зависит от CORS,
 * а адрес приёма не нужно раскрывать в разметке.
 */
import { createServerFn } from "@tanstack/react-start";

const API_URL = "https://avnhome2012.chatium.ru/era-toka/leads/api/public/create";

export interface LeadPayload {
  name: string;
  phone: string;
  email?: string | undefined;
  /** Модель, которой интересуется клиент: приходит со страницы модели */
  model?: string | undefined;
  /** Комментарий клиента из формы */
  message?: string | undefined;
  pageUrl?: string | undefined;
  formName?: string | undefined;
  utmSource?: string | undefined;
  utmMedium?: string | undefined;
  utmCampaign?: string | undefined;
  utmContent?: string | undefined;
  utmTerm?: string | undefined;
  referrer?: string | undefined;
  consentVersion?: string | undefined;
  consentAt?: string | undefined;
  marketingConsent?: boolean | undefined;
  /** Скрытое поле-ловушка: человек его не заполняет */
  company?: string | undefined;
}

export type LeadResult = { ok: true; id: string | null } | { ok: false; error: string };

export const submitLead = createServerFn({ method: "POST" })
  .validator((payload: LeadPayload) => payload)
  .handler(async ({ data }): Promise<LeadResult> => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify(data),
      });

      const text = await response.text();
      let payload: { ok?: boolean; id?: string; error?: string } | null = null;
      try {
        payload = JSON.parse(text) as { ok?: boolean; id?: string; error?: string };
      } catch {
        payload = null;
      }

      if (!response.ok || !payload?.ok) {
        return { ok: false, error: payload?.error ?? `Приём заявок ответил ${response.status}` };
      }
      return { ok: true, id: payload.id ?? null };
    } catch {
      return { ok: false, error: "Приём заявок недоступен" };
    }
  });
